import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { biz, posts, SITE_URL } from '../site.mjs';
import { icons } from '../layout.mjs';
import { ctaBand, esc } from '../ui.mjs';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'posts');
const fmt = (d) => new Date(d).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

const card = (img, p, h = 'h2') => `<a class="post" href="/${p.slug}/">
<div class="ph">${img(p.image, { alt: '', sizes: '(min-width:960px) 580px, (min-width:600px) 46vw, 92vw' })}</div>
<div class="meta">${p.tag} · ${fmt(p.published)}</div>
<${h}>${esc(p.short)}</${h}>
</a>`;

export default ({ img, images }) => {
  const index = {
    path: '/blog/',
    title: 'Blog Calisthenics & Psicologia dello Sport | Cali Lab',
    description: 'Guide, tutorial sulle skill di calisthenics e approfondimenti di psicologia dello sport con il metodo Cali Lab Frosinone. Leggi gli articoli!',
    ogImage: 'cover-core',
    pageType: 'CollectionPage',
    crumbs: [{ name: 'Blog', path: '/blog/' }],
    schema: [{ '@type': 'Blog', '@id': `${SITE_URL}/blog/#blog`, name: 'Blog di Cali Lab Frosinone', url: `${SITE_URL}/blog/`, inLanguage: 'it-IT', publisher: { '@id': `${SITE_URL}/#business` },
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: `${SITE_URL}/${p.slug}/`, datePublished: p.published })) }],
    body: `
<section class="wrap pagehead">
<h1 class="h1">Il <span class="red">blog</span></h1>
<p class="lede">Guide e approfondimenti su skills di calisthenics, metodo della ginnastica artistica e psicologia dello sport.</p>
</section>
<section class="sec wrap" aria-label="Articoli"><div class="posts">${posts.map((p) => card(img, p)).join('')}</div></section>
<section class="sec wrap"><div class="cta"><div><h2>Segui i video</h2><p>Ogni articolo nasce dagli esercizi che mostriamo su Instagram: guarda le esecuzioni corrette e le propedeutiche.</p></div><div class="btns"><a class="btn btn-dark" href="${biz.instagram}" rel="noopener me" target="_blank">@cali_lab_frosinone</a></div></div></section>`,
  };

  const articles = posts.map((p) => {
    let html = fs.readFileSync(path.join(dir, `${p.slug}.html`), 'utf8');
    html = html.replace(/<img data-img="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*>/g, (_, file, alt = '') => img(path.parse(file).name, { alt, sizes: '(min-width:960px) 370px, 92vw' }));
    const others = posts.filter((x) => x.slug !== p.slug).slice(0, 2);
    return {
      path: `/${p.slug}/`,
      nav: '/blog/',
      post: p,
      lastmod: p.modified,
      title: p.title,
      description: p.description,
      ogImage: p.image,
      crumbs: [{ name: 'Blog', path: '/blog/' }, { name: p.short, path: `/${p.slug}/` }],
      schema: [{
        '@type': 'BlogPosting', '@id': `${SITE_URL}/${p.slug}/#article`, headline: p.h1, description: p.description, inLanguage: 'it-IT',
        mainEntityOfPage: `${SITE_URL}/${p.slug}/`, datePublished: p.published, dateModified: p.modified,
        author: { '@id': `${SITE_URL}/chi-siamo/#andrea` }, publisher: { '@id': `${SITE_URL}/#business` }, isPartOf: { '@id': `${SITE_URL}/blog/#blog` },
      }],
      body: `
<article>
<header class="wrap"><div class="art-head">
<p class="eyebrow">${p.tag}</p>
<h1>${esc(p.h1)}</h1>
<p class="byline">${img('andrea-zomparelli', { alt: '', sizes: '48px' })}<span><b>${biz.founder}</b>Pubblicato il <time datetime="${p.published}">${fmt(p.published)}</time>${p.modified !== p.published ? ` · aggiornato il <time datetime="${p.modified}">${fmt(p.modified)}</time>` : ''}</span></p>
</div></header>
<div class="wrap"><div class="ph art-cover"${images[p.image].w / images[p.image].h > 1.5 ? ` style="aspect-ratio:${images[p.image].w}/${images[p.image].h};max-height:none"` : ''}>${img(p.image, { alt: p.short, eager: true, sizes: '(min-width:1240px) 1200px, 92vw' })}</div></div>
<div class="wrap"><div class="prose">${html}</div>
<aside class="author-box" aria-label="L’autore">${img('andrea-zomparelli', { alt: biz.founder, sizes: '72px' })}<p><b>${biz.founder}</b>Fondatore di Cali Lab, Tecnico Federale FGI, ex atleta agonista di ginnastica artistica e psicologo della comunicazione e del marketing.</p></aside>
</div>
</article>
<section class="sec wrap" aria-labelledby="altri"><div class="head"><h2 class="h2" id="altri">Continua a leggere</h2><a class="more" href="/blog/">Tutti gli articoli →</a></div>
<div class="posts" style="margin-top:32px">${others.map((o) => card(img, o, 'h3')).join('')}</div></section>
${ctaBand({ title: 'Provalo in sala', text: 'Vieni a fare 2 lezioni di prova gratuite con il coach.' })}`,
    };
  });
  return [index, ...articles];
};
