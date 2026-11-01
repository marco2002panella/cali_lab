# Cali Lab Frosinone: sito

Sito statico generato da uno script Node e servito da un **Cloudflare Worker** con *static assets* (nessun codice a runtime: le pagine arrivano direttamente dalla CDN).

## Comandi

```bash
npm install
npm run dev      # build + wrangler dev su http://localhost:8787
npm run watch    # (altro terminale) ricostruisce dist/ a ogni modifica di src/ o public/
npm run build    # solo build → dist/
npm run deploy   # build + wrangler deploy (serve `wrangler login`)
```

`wrangler.jsonc` esegue `node scripts/build.mjs` prima di `dev` e `deploy`, quindi `dist/` è sempre aggiornato.

## Struttura

| Percorso | Contenuto |
|---|---|
| `src/site.mjs` | Dati unici: indirizzo, telefono, orari dei turni, link social, articoli. Il dominio si cambia con `SITE_URL` (default `https://calisthenicsfrosinone.it`). |
| `src/pages/*.mjs` | Una pagina per file (testi, titoli SEO, dati strutturati). |
| `src/content/posts/*.html` | Corpo degli articoli del blog, migrati dal vecchio sito con gli **stessi URL**. |
| `src/images/` | Foto originali: il build crea AVIF e WebP responsive (480/800/1200/1600 px). |
| `src/styles.css` | CSS mobile-first, minificato e inline in ogni pagina. |
| `public/_headers`, `public/_redirects` | Header di sicurezza, cache lunga per `/assets/*`, redirect. |

## SEO inclusa

- Titolo, meta description, canonical, Open Graph e Twitter card per ogni pagina; immagine social 1200×630 generata.
- Dati strutturati JSON-LD: `ExerciseGym` con indirizzo, coordinate, orari e profili social; `Person`, `Course`, `FAQPage`, `BlogPosting`, `BreadcrumbList`.
- URL identici al sito WordPress (`/metodo/`, `/chi-siamo/`, `/corsi/`, `/blog/`, `/contatti/` e i 4 articoli), per non perdere il posizionamento; `/feed` rimanda al blog.
- `sitemap.xml`, `robots.txt`, pagina 404 con `noindex`, manifest e icone.
- Prestazioni: HTML + CSS inline, font self-hosted con preload, immagini AVIF/WebP con `width`/`height` (niente salti di layout), nessun JavaScript di terze parti.

## Dopo il lancio

1. Collegare il dominio al Worker da Cloudflare e verificare che `https://calisthenicsfrosinone.it/sitemap.xml` risponda.
2. Inviare la sitemap in Google Search Console.
3. Controllare che nome, indirizzo e telefono coincidano con la scheda Google Business Profile.
