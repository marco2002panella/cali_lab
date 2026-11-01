import { biz } from '../site.mjs';

export default () => ({
  path: '/404',
  noindex: true,
  title: 'Pagina non trovata | Cali Lab Frosinone',
  description: 'La pagina che cerchi non esiste più o è stata spostata.',
  body: `
<section class="wrap pagehead" style="min-height:60vh">
<p class="eyebrow" style="margin-bottom:16px">Errore 404</p>
<h1 class="h1">Pagina<br><span class="red">non trovata</span></h1>
<p class="lede">Il link che hai seguito non esiste più. Torna alla home o scrivici su WhatsApp.</p>
<div class="btns" style="margin-top:32px"><a class="btn btn-red" href="/">Vai alla home</a><a class="btn btn-ghost" href="${biz.whatsapp}">Scrivici</a></div>
</section>`,
});
