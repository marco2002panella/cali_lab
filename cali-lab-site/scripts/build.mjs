// Build statico: pagine HTML + immagini ottimizzate + dati strutturati + sitemap → dist/
// Uso:  node scripts/build.mjs [--watch]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const CACHE = path.join(ROOT, '.cache');
const WIDTHS = [480, 800, 1200, 1600];

const hash = (buf, n = 8) => crypto.createHash('sha1').update(buf).digest('hex').slice(0, n);
const write = (rel, data) => {
  const p = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, data);
};
const emit = (name, ext, data) => {
  const url = `/assets/${name}.${hash(data)}.${ext}`;
  write(url.slice(1), data);
  return url;
};

async function build() {
  const t0 = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(CACHE, { recursive: true });

  // ---- font (self-hosted, con hash nel nome) ----
  const fontSrc = {
    'barlow-800-italic': 'node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-italic.woff2',
    'barlow-800': 'node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-normal.woff2',
    'inter-400': 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
    'inter-600': 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2',
  };
  const fonts = {};
  for (const [k, f] of Object.entries(fontSrc)) fonts[k] = emit(k, 'woff2', fs.readFileSync(path.join(ROOT, f)));

  // ---- CSS (minificato, inline in ogni pagina) ----
  let css = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
  css = css.replace(/__FONT_([a-z0-9-]+)__/g, (_, k) => fonts[k]);
  css = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').replace(/\s+/g, ' ').trim();

  // ---- logo / icone ----
  const logoSvg = fs.readFileSync(path.join(SRC, 'logo.svg'));
  const logoUrl = emit('logo', 'svg', logoSvg);
  const vb = logoSvg.toString().match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const logoRatio = vb[2] / vb[3];
  const iconBg = { r: 10, g: 10, b: 10, alpha: 1 };
  const square = async (size) => {
    const inner = Math.round(size * 0.78);
    const logo = await sharp(logoSvg, { density: 300 }).resize({ width: inner, height: inner, fit: 'inside' }).png().toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: iconBg } }).composite([{ input: logo, gravity: 'center' }]).png().toBuffer();
  };
  const icons = { 180: await square(180), 192: await square(192), 512: await square(512), 48: await square(48) };
  write('apple-touch-icon.png', icons[180]);
  write('icon-192.png', icons[192]);
  write('icon-512.png', icons[512]);
  // favicon.ico con payload PNG (valido per i browser moderni e per i crawler che lo richiedono)
  const ico = Buffer.alloc(22);
  ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
  ico.writeUInt8(48, 6); ico.writeUInt8(48, 7); ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
  ico.writeUInt32LE(icons[48].length, 14); ico.writeUInt32LE(22, 18);
  write('favicon.ico', Buffer.concat([ico, icons[48]]));
  const innerSvg = logoSvg.toString().replace(/<svg[^>]*>/, '').replace('</svg>', '');
  const pad = vb[2] * 0.14;
  const side = vb[2] + pad * 2;
  write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}"><rect width="${side}" height="${side}" rx="${side * 0.18}" fill="#0a0a0a"/><g transform="translate(${pad - vb[0]} ${(side - vb[3]) / 2 - vb[1]})">${innerSvg}</g></svg>`);

  // ---- immagini: avif + webp responsive, con cache su disco ----
  const imgDir = path.join(SRC, 'images');
  const images = {};
  for (const file of fs.readdirSync(imgDir)) {
    const name = path.parse(file).name;
    const buf = fs.readFileSync(path.join(imgDir, file));
    const h = hash(buf);
    const meta = await sharp(buf).metadata();
    const ws = [...new Set([...WIDTHS.filter((w) => w < meta.width), meta.width > 1600 ? 1600 : meta.width])].sort((a, b) => a - b);
    const variants = [];
    for (const w of ws) {
      const hh = Math.round((meta.height * w) / meta.width);
      for (const fmt of ['avif', 'webp']) {
        const rel = `assets/img/${name}.${h}-${w}.${fmt}`;
        const cached = path.join(CACHE, `${name}.${h}-${w}.${fmt}`);
        if (!fs.existsSync(cached)) {
          const pipe = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
          fs.writeFileSync(cached, await (fmt === 'avif' ? pipe.avif({ quality: 52, effort: 4 }) : pipe.webp({ quality: 78 })).toBuffer());
        }
        write(rel, fs.readFileSync(cached));
        variants.push({ w, h: hh, fmt, url: '/' + rel });
      }
    }
    images[name] = { buf, hash: h, w: meta.width, h: meta.height, variants, ws };
  }

  const ogCache = new Map();
  const og = async (name) => {
    if (ogCache.has(name)) return ogCache.get(name);
    const im = images[name];
    const out = await sharp(im.buf).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    const url = emit(`og-${name}`, 'jpg', out);
    ogCache.set(name, url);
    return url;
  };

  const img = (name, { alt = '', sizes = '100vw', cls = '', eager = false, pos } = {}) => {
    const im = images[name];
    if (!im) throw new Error(`Immagine mancante: ${name}`);
    const set = (fmt) => im.variants.filter((v) => v.fmt === fmt).map((v) => `${v.url} ${v.w}w`).join(', ');
    const mid = im.variants.filter((v) => v.fmt === 'webp').find((v) => v.w >= 800) || im.variants.filter((v) => v.fmt === 'webp').at(-1);
    const style = pos ? ` style="object-position:${pos}"` : '';
    return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${mid.url}" width="${im.w}" height="${im.h}" alt="${alt.replace(/"/g, '&quot;')}"${cls ? ` class="${cls}"` : ''}${style} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
  };

  // ---- pagine ----
  const ctx = { img, og, css, fonts, logoUrl, logoRatio, images };
  const { renderPage } = await import(pathToFileURL(path.join(SRC, 'layout.mjs')).href + `?t=${Date.now()}`);
  const pagesDir = path.join(SRC, 'pages');
  const list = [];
  for (const f of fs.readdirSync(pagesDir).filter((x) => x.endsWith('.mjs')).sort()) {
    const mod = await import(pathToFileURL(path.join(pagesDir, f)).href + `?t=${Date.now()}`);
    const defs = await mod.default(ctx);
    list.push(...(Array.isArray(defs) ? defs : [defs]));
  }
  const sitemap = [];
  for (const p of list) {
    const html = await renderPage(p, ctx);
    const file = p.path === '/404' ? '404.html' : p.path === '/' ? 'index.html' : `${p.path.replace(/^\/|\/$/g, '')}/index.html`;
    write(file, html);
    if (!p.noindex) sitemap.push(p);
  }

  // ---- sitemap, robots, manifest, headers, redirects ----
  const { SITE_URL } = await import(pathToFileURL(path.join(SRC, 'site.mjs')).href);
  const prio = (p) => (p.path === '/' ? '1.0' : p.post ? '0.6' : '0.8');
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap
    .map((p) => `  <url><loc>${SITE_URL}${p.path}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<priority>${prio(p)}</priority></url>`)
    .join('\n')}\n</urlset>\n`);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  write('manifest.webmanifest', JSON.stringify({
    name: 'Cali Lab Frosinone', short_name: 'Cali Lab', lang: 'it', start_url: '/', display: 'standalone',
    background_color: '#0a0a0a', theme_color: '#0a0a0a',
    icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
  }));
  fs.copyFileSync(path.join(ROOT, 'public/_headers'), path.join(DIST, '_headers'));
  fs.copyFileSync(path.join(ROOT, 'public/_redirects'), path.join(DIST, '_redirects'));

  const kb = (d) => fs.readdirSync(d, { recursive: true }).reduce((s, f) => { const p = path.join(d, f); return s + (fs.statSync(p).isFile() ? fs.statSync(p).size : 0); }, 0) / 1024;
  console.log(`build ok: ${list.length} pagine, ${Object.keys(images).length} immagini, ${Math.round(kb(DIST))} KB in ${Date.now() - t0} ms`);
}

await build();

if (process.argv.includes('--watch')) {
  let timer;
  let busy = false;
  const run = () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (busy) return;
      busy = true;
      try { await build(); } catch (e) { console.error(e); }
      busy = false;
    }, 250);
  };
  for (const d of ['src', 'public']) fs.watch(path.join(ROOT, d), { recursive: true }, run);
  console.log('in ascolto su src/ e public/ …');
}
