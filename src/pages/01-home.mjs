import { biz } from '../site.mjs';
import { icons } from '../layout.mjs';
import { ctaBand, tracks, mapBlock, ic } from '../ui.mjs';

export default ({ img, logoUrl }) => ({
  path: '/',
  title: 'Cali Lab Frosinone | Corsi di Calisthenics e Corpo Libero',
  description: 'Corsi di Calisthenics a Frosinone con metodo di Ginnastica Artistica (FGI). Turno serale e mattutino in Via Ecetra 1. Prenota 2 lezioni di prova gratuite!',
  ogImage: 'palestra',
  ogAlt: 'La palestra Cali Lab a Frosinone con anelli e tappeti',
  body: `
<div class="band">
<section class="wrap hero" aria-labelledby="h1">
<div>
<p class="tagline">Muoviti con controllo</p>
<h1 class="h1" id="h1">Calisthenics<br>a <span class="red">Frosinone</span></h1>
<p class="lede">Il metodo della ginnastica artistica nel mondo del fitness. Corpo libero, anelli e verticale, con un Tecnico Federale FGI.</p>
<div class="btns">
<a class="btn btn-red" href="${biz.whatsapp}">${icons.chat}2 prove gratuite</a>
<a class="btn btn-ghost" href="/corsi/">Vedi i corsi</a>
</div>
</div>
<div class="hero-photo">${img('hero-verticale', { alt: 'Atleta in verticale contro il muro durante una lezione Cali Lab', eager: true, sizes: '(min-width:960px) 42vw, 100vw', pos: '50% 100%' })}</div>
</section>
</div>

<section class="sec wrap" aria-labelledby="corsi-t">
<div class="head"><h2 class="h2" id="corsi-t">Corsi e orari</h2><a class="more" href="/corsi/">Tutti i dettagli →</a></div>
${tracks()}
</section>

<section class="sec wrap" aria-labelledby="gal-t">
<h2 class="h2" id="gal-t">Dentro la palestra</h2>
<div class="mosaic" style="margin-top:36px">
<div class="ph m1">${img('planche-parallettes', { alt: 'Planche sulle parallettes', sizes: '(min-width:960px) 480px, 92vw', pos: '35% 50%' })}</div>
<div class="ph m2">${img('verticale-allieva', { alt: 'Verticale libera in palestra', sizes: '(min-width:960px) 300px, 46vw', pos: '50% 30%' })}</div>
<div class="ph m3">${img('coach-verticale', { alt: 'Il coach assiste una verticale', sizes: '(min-width:960px) 400px, 92vw', pos: '50% 70%' })}</div>
<div class="m4"><img src="${logoUrl}" alt="Cali Lab Frosinone" width="120" height="120" loading="lazy"></div>
<div class="ph m5">${img('maglia-cali-lab', { alt: 'La maglia Cali Lab vista da dietro', sizes: '200px', pos: '55% 52%' })}</div>
<div class="ph m6">${img('planche-plank', { alt: 'Allievo in plank durante l’allenamento', sizes: '(min-width:960px) 480px, 92vw', pos: '50% 50%' })}</div>
<div class="m7">${biz.venue.replace('Palestra ', '')}</div>
</div>
</section>

<section class="sec wrap" aria-labelledby="metodo-t">
<div class="head"><h2 class="h2" id="metodo-t">Il metodo Cali Lab</h2><a class="more" href="/metodo/">Scopri il metodo →</a></div>
<ul class="pillars" style="list-style:none">
<li class="pillar">${ic('target')}<h3 class="h3">Su misura</h3><p>Ogni esercizio scalato sul tuo livello.</p></li>
<li class="pillar">${ic('dumbbell')}<h3 class="h3">Forza e mobilità</h3><p>Controllo del corpo, non solo muscoli.</p></li>
<li class="pillar">${ic('users')}<h3 class="h3">Community</h3><p>Ti alleni in gruppo, non da solo.</p></li>
<li class="pillar">${ic('medal')}<h3 class="h3">Coach FGI</h3><p>Sempre seguito da un Tecnico Federale.</p></li>
</ul>
</section>

<section class="sec wrap dove" aria-labelledby="dove-t">
<h2 class="h2" id="dove-t">Dove ci alleniamo</h2>
<p class="lede" style="margin-top:20px">${biz.venue}: una vera palestra di ginnastica artistica, con anelli, parallele e sbarre.<br><a class="lnk" href="${biz.mapsPlace}" rel="noopener" target="_blank">${biz.street}, ${biz.zip} ${biz.city}</a> · <a href="${biz.phoneHref}">${biz.phone}</a></p>
<div class="grid c2" style="margin-top:32px;gap:16px 24px">
<div class="ph wide">${img('palestra', { alt: 'La palestra Pro Sede Gymnica a Frosinone con anelli, parallele e tappeti', sizes: '(min-width:960px) 580px, 92vw' })}</div>
<div class="mapcell">${mapBlock('fill')}</div>
</div>
</section>

<section class="sec wrap" aria-label="Recensioni">
<figure class="quote">
<blockquote>“Più che una palestra, ho trovato un gruppo di amici con cui allenarmi e crescere insieme.”</blockquote>
<figcaption><span class="stars" aria-hidden="true">★★★★★</span> 5.0 · 19 recensioni su Google</figcaption>
</figure>
</section>
${ctaBand()}`,
});
