import { biz, shifts } from '../site.mjs';
import { icons } from '../layout.mjs';

export default ({ img }) => ({
  path: '/contatti/',
  title: 'Contatti e Sede | Cali Lab Frosinone - Calisthenics',
  description: 'Contatta Cali Lab Frosinone in Via Ecetra 1. Prenota 2 lezioni di prova gratuite con il Tecnico Federale FGI. Scrivici su WhatsApp o chiamaci al 338 136 3965.',
  ogImage: 'coach-verticale',
  pageType: 'ContactPage',
  crumbs: [{ name: 'Contatti', path: '/contatti/' }],
  body: `
<section class="wrap pagehead">
<h1 class="h1">Prenota<br><span class="red">2 prove</span> gratuite</h1>
</section>

<section class="sec wrap" style="display:grid;gap:40px">
<div class="grid c2" style="align-items:start;gap:48px 64px">
<div>
<div class="btns">
<a class="btn btn-red" href="${biz.whatsapp}">${icons.chat}Scrivici su WhatsApp</a>
<a class="btn btn-ghost" href="${biz.phoneHref}">${icons.phone}Chiama ${biz.phoneDisplay}</a>
</div>
<dl class="rows" style="margin-top:40px">
<div class="row"><dt>Coach</dt><dd>Andrea · Tecnico Federale FGI</dd></div>
<div class="row"><dt>Sede</dt><dd>${biz.street}, ${biz.zip} ${biz.city} (${biz.region})<br><span class="muted">${biz.venue}</span></dd></div>
${shifts.map((s) => `<div class="row"><dt>${s.id === 'junior' ? 'Junior' : s.id === 'sera' ? 'Sera' : 'Mattina'}</dt><dd>${s.days} · ${s.time}</dd></div>`).join('')}
</dl>
<a class="more" style="margin-top:20px" href="${biz.mapsPlace}" rel="noopener" target="_blank">${icons.pin}&nbsp;Indicazioni su Google Maps →</a>
</div>
<div class="ph" style="aspect-ratio:4/5;max-height:640px">${img('verticale-assistita', { alt: 'Il coach assiste un allievo in verticale', eager: true, sizes: '(min-width:960px) 540px, 92vw', pos: '60% 40%' })}</div>
</div>
</section>

<section class="sec wrap" aria-label="La palestra"><div class="ph" style="aspect-ratio:16/7;max-height:440px">${img('palestra', { alt: 'La palestra Pro Sede Gymnica', sizes: '(min-width:1240px) 1200px, 92vw' })}</div></section>`,
});
