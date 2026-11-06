import { biz, shifts } from './site.mjs';
import { icons } from './layout.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const ctaBand = ({ title = '2 prove gratuite', text = 'Scrivi ad Andrea, Tecnico Federale FGI: ti spiega turni e metodo e prenota le tue prove.' } = {}) => `
<section class="ctaband" aria-labelledby="cta-t">
<div class="wrap cta">
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

// Icone a tratto per pillar e passaggi della lezione (decorative, legate al testo accanto).
const glyph = {
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17.2 14.2c2.8.2 4.3 2 4.3 5.3"/>',
  medal: '<circle cx="12" cy="9" r="6"/><path d="M8.7 14l-1.6 8L12 19l4.9 3-1.6-8"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  shield: '<path d="M12 2.5 20 5.5v6c0 4.8-3.3 8.6-8 10-4.7-1.4-8-5.2-8-10v-6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  check: '<circle cx="12" cy="12" r="9.5"/><path d="m8 12.2 3 3 5-6"/>',
  flame: '<path d="M12 2.5c.8 3.6 5.5 5.6 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2 .9-3.4 2.2-4.5.1 1.8.9 2.8 2 3.2C10.2 8.5 10.5 5.5 12 2.5z"/>',
  up: '<path d="M12 21V4M5 11l7-7 7 7"/>',
  star: '<path d="m12 2.5 2.9 6.2 6.6.8-4.9 4.6 1.3 6.7L12 17.4l-5.9 3.4 1.3-6.7L2.5 9.5l6.6-.8z"/>',
};
export const ic = (name) => `<span class="ico-b" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${glyph[name]}</svg></span>`;
