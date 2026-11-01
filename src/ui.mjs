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

// Giorni: L M M G V S D, con i giorni del turno cerchiati e l'orario sotto.
const dowOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dowLetter = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
const dowName = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'];
const shiftLabel = { sera: 'Turno serale', mattina: 'Turno mattutino' };

const shiftHtml = (s) => {
  const on = dowOrder.map((d) => s.dow.includes(d));
  const names = dowName.filter((_, i) => on[i]).join(', ');
  return `<div class="shift">${shiftLabel[s.id] ? `<p class="sl">${shiftLabel[s.id]}</p>` : ''}<div class="days" role="img" aria-label="${names}">${dowLetter.map((l, i) => `<span${on[i] ? ' class="on"' : ''} aria-hidden="true">${l}</span>`).join('')}</div><p class="at">${s.time}</p></div>`;
};

// Due percorsi affiancati (senza card): Junior a sinistra, Adulti a destra.
export const tracks = () => {
  const junior = shifts.filter((s) => s.id === 'junior');
  const adulti = shifts.filter((s) => s.id !== 'junior');
  return `<div class="tracks">
<article class="track">
<p class="eyebrow">Ragazzi 12–16 anni</p>
<h3 class="h3">Cali Lab Junior</h3>
<p class="muted">Coordinazione, mobilità, equilibrio e forza a corpo libero, con progressioni pensate per la crescita.</p>
${junior.map(shiftHtml).join('')}
</article>
<article class="track">
<p class="eyebrow">Dai 17 anni · tutti i livelli</p>
<h3 class="h3">Adulti</h3>
<p class="muted">Verticale, skills e potenziamento in lezioni da 90 minuti, sempre guidate da un Tecnico Federale.</p>
${adulti.map(shiftHtml).join('')}
</article>
</div>`;
};

// Mappa Google "a click" (niente cookie di Google finché non la apri).
export const mapBlock = (cls = '') => `<div class="map${cls ? ` ${cls}` : ''}">
<button class="map-btn" type="button" data-src="https://www.google.com/maps?q=${biz.geo.lat},${biz.geo.lng}&z=16&hl=it&output=embed">
${icons.pin.replace('class="ico"', 'class="ico map-pin"')}
<span class="map-addr">${biz.street}, ${biz.city}<small>${biz.venue}</small></span>
<span class="btn btn-red btn-sm">Mostra la mappa</span>
<small class="map-note">Caricando la mappa accetti i cookie di Google Maps.</small>
</button>
</div>
<script>(function(){var b=document.querySelector('.map-btn');if(!b)return;b.addEventListener('click',function(){var f=document.createElement('iframe');f.src=b.getAttribute('data-src');f.title='Mappa: Cali Lab Frosinone, ${biz.street}';f.referrerPolicy='no-referrer-when-downgrade';f.allowFullscreen=true;b.parentNode.replaceChild(f,b)})})();</script>`;
