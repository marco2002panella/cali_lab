import { biz } from '../site.mjs';
import { icons } from '../layout.mjs';
import { ctaBand, tracks, mapBlock } from '../ui.mjs';

export default ({ img }) => ({
  path: '/',
  title: 'Cali Lab Frosinone | Corsi di Calisthenics e Corpo Libero',
  description: 'Corsi di Calisthenics a Frosinone con metodo di Ginnastica Artistica (FGI). Turno serale e mattutino in Via Ecetra 1. Prenota 2 lezioni di prova gratuite!',
  ogImage: 'palestra',
  ogAlt: 'La palestra Cali Lab a Frosinone con anelli e tappeti',
  body: `
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

<section class="sec wrap" aria-labelledby="corsi-t">
<div class="head"><h2 class="h2" id="corsi-t">Corsi e orari</h2><a class="more" href="/corsi/">Tutti i dettagli →</a></div>
${tracks()}
</section>

<section class="sec wrap split" aria-labelledby="metodo-t">
<div class="slider">
<div class="reel" aria-label="Foto dalla palestra">
<div class="ph">${img('planche-parallettes', { alt: 'Planche sulle parallettes', sizes: '(min-width:960px) 580px, 92vw', pos: '35% 50%' })}</div>
<div class="ph">${img('verticale-allieva', { alt: 'Verticale libera in palestra', sizes: '(min-width:960px) 580px, 92vw', pos: '45% 50%' })}</div>
<div class="ph">${img('coach-verticale', { alt: 'Il coach assiste una verticale', sizes: '(min-width:960px) 580px, 92vw', pos: '60% 60%' })}</div>
<div class="ph">${img('maglia-cali-lab', { alt: 'La maglia Cali Lab vista da dietro', sizes: '(min-width:960px) 580px, 92vw', pos: '55% 52%' })}</div>
</div>
<div class="dots" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></div>
</div>
<script>(function(){var s=document.querySelector('.reel');if(!s)return;var k=s.children,d=document.querySelectorAll('.dots i'),vis=false,hold=0;function cur(){var c=s.scrollLeft+s.clientWidth/2,b=0,m=1e9;for(var i=0;i<k.length;i++){var x=Math.abs(k[i].offsetLeft+k[i].offsetWidth/2-c);if(x<m){m=x;b=i}}return b}function mark(){var c=cur();for(var i=0;i<d.length;i++)d[i].className=i===c?'on':''}s.addEventListener("scroll",mark,{passive:true});if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;function step(){if(!vis||Date.now()<hold)return;var n=cur()+1;if(n>=k.length)n=0;s.scrollTo({left:k[n].offsetLeft,behavior:'smooth'})}['touchstart','pointerdown','wheel'].forEach(function(e){s.addEventListener(e,function(){hold=Date.now()+7000},{passive:true})});new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(s);setInterval(step,3200)})();</script>
<div class="side">
<div class="head"><h2 class="h2" id="metodo-t">Il metodo Cali Lab</h2><a class="more" href="/metodo/">Scopri il metodo →</a></div>
<ul class="pillars" style="list-style:none">
<li class="pillar"><h3 class="h3">Su misura</h3><p>Ogni esercizio scalato sul tuo livello.</p></li>
<li class="pillar"><h3 class="h3">Forza e mobilità</h3><p>Controllo del corpo, non solo muscoli.</p></li>
<li class="pillar"><h3 class="h3">Community</h3><p>Ti alleni in gruppo, non da solo.</p></li>
<li class="pillar"><h3 class="h3">Coach FGI</h3><p>Sempre seguito da un Tecnico Federale.</p></li>
</ul>
</div>
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
