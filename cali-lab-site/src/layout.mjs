import { SITE_URL, biz, nav, shifts } from './site.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ldJson = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

export const icons = {
  phone: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  chat: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  pin: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

export const businessLd = {
  '@type': ['ExerciseGym', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: biz.name,
  alternateName: biz.short,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  telephone: biz.phone,
  description: 'Corsi di calisthenics e corpo libero a Frosinone con il metodo della ginnastica artistica FGI. Turni serali e mattutini, corso Junior per ragazzi. 2 prove gratuite.',
  address: { '@type': 'PostalAddress', streetAddress: biz.street, postalCode: biz.zip, addressLocality: biz.city, addressRegion: biz.region, addressCountry: 'IT' },
  geo: { '@type': 'GeoCoordinates', latitude: biz.geo.lat, longitude: biz.geo.lng },
  hasMap: biz.mapsPlace,
  areaServed: { '@type': 'City', name: 'Frosinone' },
  openingHoursSpecification: shifts.map((s) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: s.dow, opens: s.opens, closes: s.closes })),
  sameAs: [biz.instagram, biz.facebook, biz.maps],
  founder: { '@id': `${SITE_URL}/chi-siamo/#andrea` },
  knowsLanguage: 'it',
};

export async function renderPage(p, { css, fonts, logoUrl, logoRatio, og, img }) {
  const url = `${SITE_URL}${p.path === '/404' ? '/' : p.path}`;
  const ogUrl = p.ogImage ? SITE_URL + (await og(p.ogImage)) : '';
  const fullTitle = p.title;

  const graph = [];
  if (p.path === '/') {
    graph.push(businessLd);
    graph.push({ '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: biz.name, inLanguage: 'it-IT', publisher: { '@id': `${SITE_URL}/#business` } });
  }
  if (p.crumbs && p.crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, ...p.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 2, name: c.name, item: `${SITE_URL}${c.path}` }))],
    });
  }
  if (p.path !== '/' && !p.noindex && !p.post) {
    graph.push({ '@type': p.pageType || 'WebPage', '@id': `${url}#page`, url, name: p.title, description: p.description, inLanguage: 'it-IT', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#business` }, ...(ogUrl ? { primaryImageOfPage: ogUrl } : {}) });
  }
  for (const s of p.schema || []) graph.push(s);
  const jsonld = graph.length ? ldJson({ '@context': 'https://schema.org', '@graph': graph }) : '';

  const bc = p.crumbs && p.crumbs.length
    ? `<nav class="crumbs wrap" aria-label="Briciole di pane"><ol><li><a href="/">Home</a></li>${p.crumbs.map((c, i) => `<li>${i === p.crumbs.length - 1 ? `<span aria-current="page">${esc(c.name)}</span>` : `<a href="${c.path}">${esc(c.name)}</a>`}</li>`).join('')}</ol></nav>`
    : '';

  const navLinks = nav.map((n) => `<a href="${n.href}"${(p.nav || p.path) === n.href ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  const lh = 44;

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">'}
${p.noindex ? '' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#0a0a0a">
<meta name="color-scheme" content="dark">
<meta name="format-detection" content="telephone=yes">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta property="og:site_name" content="${biz.name}">
<meta property="og:locale" content="it_IT">
<meta property="og:type" content="${p.post ? 'article' : 'website'}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
${ogUrl ? `<meta property="og:image" content="${ogUrl}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(p.ogAlt || biz.name)}">` : ''}
${p.post ? `<meta property="article:published_time" content="${p.post.published}"><meta property="article:modified_time" content="${p.post.modified}"><meta property="article:author" content="${biz.founder}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(p.description)}">
${ogUrl ? `<meta name="twitter:image" content="${ogUrl}">` : ''}
<link rel="preload" href="${fonts['barlow-800-italic']}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${fonts['inter-400']}" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.classList.add('js')</script>
<style>${css}</style>
${jsonld}
</head>
<body>
<a class="skip" href="#main">Vai al contenuto</a>
<header class="hd">
<div class="wrap">
<a class="logo" href="/" aria-label="${biz.name}, home"><img src="${logoUrl}" width="${Math.round(lh * logoRatio)}" height="${lh}" alt="${biz.name}"></a>
<div class="navbox" id="menu">
<nav class="nav" aria-label="Principale">${navLinks}</nav>
<div class="nav-foot">
<a class="btn btn-red" href="${biz.whatsapp}">${icons.chat}Scrivici su WhatsApp</a>
<a class="btn btn-ghost" href="${biz.phoneHref}">${icons.phone}Chiama ${biz.phoneDisplay}</a>
<p>${biz.street}, ${biz.city}<br>${biz.venue}</p>
</div>
</div>
<a class="btn btn-red btn-sm hd-cta" href="/contatti/">Prova gratuita</a>
<button class="burger" type="button" aria-label="Apri menu" aria-expanded="false" aria-controls="menu"><i></i></button>
</div>
</header>
<main id="main">
${bc}
${p.body}
</main>
<footer class="ft">
<div class="wrap">
<div>
<a class="logo" href="/" aria-label="${biz.name}, home"><img src="${logoUrl}" width="${Math.round(80 * logoRatio)}" height="80" alt="${biz.name}" loading="lazy"></a>
<p class="small" style="margin-top:16px;max-width:22em">Calisthenics e corpo libero a Frosinone, con il metodo della ginnastica artistica FGI.</p>
</div>
<div><h2>Pagine</h2><ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul></div>
<div><h2>Seguici</h2><ul><li><a href="${biz.instagram}" rel="noopener me" target="_blank">Instagram</a></li><li><a href="${biz.facebook}" rel="noopener me" target="_blank">Facebook</a></li><li><a href="${biz.whatsapp}">WhatsApp</a></li></ul></div>
<div><h2>Dove siamo</h2>
<address><span>${biz.venue}</span><span>${biz.street}, ${biz.zip} ${biz.city} (${biz.region})</span><a href="${biz.phoneHref}" style="min-height:44px;display:flex;align-items:center">${biz.phone}</a><a href="${biz.mapsPlace}" rel="noopener" target="_blank" style="min-height:44px;display:flex;align-items:center;color:var(--redt)">Apri su Google Maps →</a></address></div>
<p class="copy">© ${new Date().getFullYear()} ${biz.name}. Tutti i diritti riservati.</p>
</div>
</footer>
<div class="bar">
<a class="btn btn-ghost" href="${biz.phoneHref}" aria-label="Chiama ${biz.phoneDisplay}">${icons.phone}Chiama</a>
<a class="btn btn-red" href="${biz.whatsapp}">${icons.chat}Prova gratuita</a>
</div>
<script>
(function(){var b=document.querySelector('.burger'),h=document.documentElement,m=document.getElementById('menu');if(!b||!m)return;function s(o){h.classList.toggle('menu-open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Chiudi menu':'Apri menu')}b.addEventListener('click',function(){s(!h.classList.contains('menu-open'))});m.addEventListener('click',function(e){if(e.target.closest('a'))s(false)});document.addEventListener('keydown',function(e){if(e.key==='Escape')s(false)});matchMedia('(min-width:960px)').addEventListener('change',function(e){if(e.matches)s(false)})})();
</script>
</body>
</html>
`;
}
