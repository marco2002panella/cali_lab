import { ctaBand, ic } from '../ui.mjs';

const steps = [
  { n: '01', t: 'Forza e propriocezione', p: 'Impari a percepire ogni muscolo: una forza reale, che parte dal core e arriva alle estremità.', img: 'anelli-coach', alt: 'Il coach aiuta un ragazzo agli anelli', pos: '60% 50%' },
  { n: '02', t: 'Mobilità e stretching', p: 'Più ampiezza di movimento, meno infortuni, skill più fluide. Un corpo forte ma rigido è un corpo limitato.', img: 'stretching', alt: 'Allungamento a fine riscaldamento', pos: '60% 50%' },
  { n: '03', t: 'Equilibrio e verticalismo', p: 'Si lavora sulla verticale per migliorare focus, stabilità e controllo: la base di ogni skill avanzata.', img: 'verticale-assistita', alt: 'Il coach assiste una verticale', pos: '50% 40%', tall: true },
  { n: '04', t: 'Preparazione specifica', p: 'Ogni sessione è programmata con la precisione del metodo FGI. Ogni ripetizione ha uno scopo.', img: 'trazioni-elastico', alt: 'Trazioni alla sbarra con elastico', pos: '50% 40%' },
];

export default ({ img }) => ({
  path: '/metodo/',
  title: 'Il Nostro Metodo | Calisthenics e Ginnastica Artistica | Cali Lab',
  description: 'Scopri il metodo Cali Lab a Frosinone: allenamenti di 90 minuti basati sulla Ginnastica Artistica FGI. Mobilità, forza e controllo motorio. 2 prove gratuite.',
  ogImage: 'anelli-coach',
  crumbs: [{ name: 'Metodo', path: '/metodo/' }],
  body: `
<div class="band">
<section class="wrap pagehead">
<p class="eyebrow" style="margin-bottom:16px">Allenamento consapevole</p>
<h1 class="h1">Il metodo<br><span class="red">Cali Lab</span></h1>
<p class="lede">Rendere la precisione e il metodo scientifico della ginnastica d’élite alla portata di tutti. Non solo più forti: più consapevoli, coordinati ed eleganti nei movimenti.</p>
</section>
</div>

<div class="wrap" style="display:grid;gap:clamp(56px,9vw,104px);margin-top:var(--sec)">
${steps.map((s, i) => `<section class="alt${i % 2 ? ' rev' : ''}" aria-labelledby="m${i}">
<div class="ph${s.tall ? ' tall' : ''}">${img(s.img, { alt: s.alt, pos: s.pos, sizes: '(min-width:960px) 560px, 92vw' })}</div>
<div><div class="n" aria-hidden="true">${s.n}</div><h2 class="h2" id="m${i}">${s.t}</h2><p>${s.p}</p></div>
</section>`).join('\n')}
</div>

<section class="sec wrap" aria-labelledby="perche">
<h2 class="h2" id="perche">Perché sceglierlo</h2>
<ul class="pillars" style="list-style:none;margin-top:32px">
<li class="pillar">${ic('bolt')}<h3 class="h3">Capacità latenti</h3><p>Valorizzi le tue capacità fisiche, anche quelle che non sapevi di avere.</p></li>
<li class="pillar">${ic('shield')}<h3 class="h3">Limiti in sicurezza</h3><p>Impari ad ascoltare il corpo e a superare i limiti senza rischiare.</p></li>
<li class="pillar">${ic('check')}<h3 class="h3">Tecnica perfetta</h3><p>Risultati estetici e funzionali come conseguenza di una tecnica pulita.</p></li>
</ul>
<div class="btns" style="margin-top:36px"><a class="btn btn-ghost" href="/corsi/">Vedi corsi e orari</a></div>
</section>
${ctaBand({ title: 'Provalo. Gratis.', text: 'I primi 2 allenamenti sono gratuiti. I posti per ogni classe sono limitati: scrivici per controllare la disponibilità.' })}`,
});
