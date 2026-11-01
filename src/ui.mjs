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

// Due percorsi: Junior e Adulti. Gli orari sono righe compatte, il link di prenotazione è testuale.
export const tracks = () => {
  const junior = shifts.filter((s) => s.id === 'junior');
  const adulti = shifts.filter((s) => s.id !== 'junior');
  const rows = (list) => list.map((s) => `<li><span>${s.days}</span><b>${s.time}</b></li>`).join('');
  return `<div class="tracks">
<article class="track">
<p class="eyebrow">Ragazzi 12–16 anni</p>
<h3 class="h3">Cali Lab Junior</h3>
<p class="muted">Coordinazione, mobilità, equilibrio e forza a corpo libero, con progressioni pensate per la crescita.</p>
<ul class="times">${rows(junior)}</ul>
<a class="go" href="${biz.whatsappJunior}">Prenota una prova →</a>
</article>
<article class="track">
<p class="eyebrow">Dai 17 anni · tutti i livelli</p>
<h3 class="h3">Adulti</h3>
<p class="muted">Verticale, skills e potenziamento in lezioni da 90 minuti, sempre guidate da un Tecnico Federale.</p>
<ul class="times">${rows(adulti)}</ul>
<a class="go" href="${biz.whatsapp}">Prenota una prova →</a>
</article>
</div>`;
};
