import { biz, shifts } from './site.mjs';
import { icons } from './layout.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const ctaBand = ({ title = '2 prove gratuite', text = 'Scrivi ad Andrea, Tecnico Federale FGI: ti spiega turni e metodo e prenota le tue prove.' } = {}) => `
<section class="sec wrap" aria-labelledby="cta-t">
<div class="cta">
<div><h2 id="cta-t">${title}</h2><p>${text}</p></div>
<div class="btns"><a class="btn btn-dark" href="${biz.whatsapp}">${icons.chat}WhatsApp</a><a class="btn btn-line" href="${biz.phoneHref}">${icons.phone}${biz.phoneDisplay}</a></div>
</div>
</section>`;

const cardPhoto = { junior: ['junior-bilanciere', '55% 50%', 'Il coach segue un ragazzo durante un esercizio al bilanciere'], sera: ['verticale-allieva', '45% 40%', 'Allieva in verticale libera in palestra'], mattina: ['planche-parallettes', '35% 50%', 'Atleta in planche sulle parallettes'] };

export const courseCards = (img, { buttons = true } = {}) => shifts.map((s) => {
  const [name, pos, alt] = cardPhoto[s.id];
  const href = s.id === 'junior' ? biz.whatsappJunior : biz.whatsapp;
  return `<article class="course${s.isNew ? ' is-new' : ''}">
<div class="ph">${s.isNew ? '<span class="tag">NUOVO</span>' : ''}${img(name, { alt, pos, sizes: '(min-width:960px) 380px, (min-width:600px) 45vw, 92vw' })}</div>
<div class="course-b">
<h3 class="h3">${s.name}</h3>
<p class="muted">${s.who}</p>
<p style="margin-top:14px;font-weight:600">${s.days}</p>
<p class="t">${s.time}</p>
${buttons ? `<a class="btn btn-ghost btn-sm" href="${href}">Prenota una prova</a>` : ''}
</div>
</article>`;
}).join('');
