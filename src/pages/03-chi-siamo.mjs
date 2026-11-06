import { biz, SITE_URL } from '../site.mjs';
import { ctaBand, ic } from '../ui.mjs';

export default ({ img }) => ({
  path: '/chi-siamo/',
  title: 'Chi Siamo | Coach Tecnico Federale FGI | Cali Lab Frosinone',
  description: 'Scopri Cali Lab Frosinone: allenamenti a corpo libero e Calisthenics guidati dal Tecnico Federale FGI Andrea presso Pro Sede Gymnica. Prenota 2 prove gratuite.',
  ogImage: 'andrea-zomparelli',
  pageType: 'AboutPage',
  crumbs: [{ name: 'Chi siamo', path: '/chi-siamo/' }],
  schema: [{
    '@type': 'Person', '@id': `${SITE_URL}/chi-siamo/#andrea`, name: biz.founder, givenName: 'Andrea', familyName: 'Zomparelli',
    jobTitle: 'Fondatore e Tecnico Federale FGI', worksFor: { '@id': `${SITE_URL}/#business` },
    description: 'Ex atleta agonista di ginnastica artistica, Tecnico Federale FGI (III livello SNaQ) e psicologo della comunicazione e del marketing. Ha fondato Cali Lab nel 2022.',
  }],
  body: `
<div class="band">
<section class="wrap pagehead profile" aria-labelledby="h1">
<div class="ph">${img('andrea-zomparelli', { alt: 'Andrea Zomparelli, fondatore e coach di Cali Lab Frosinone', eager: true, sizes: '(min-width:960px) 440px, 92vw', pos: '50% 25%' })}</div>
<div>
<p class="eyebrow" style="margin-bottom:16px">Chi siamo</p>
<h1 class="h1" id="h1">Andrea<br><span class="red">Zomparelli</span></h1>
<p class="lede">Fondatore e guida tecnica. Nel 2022 ha aperto Cali Lab, il primo corso di calisthenics a Frosinone con il metodo della ginnastica artistica.</p>
<ul class="creds">
<li>Tecnico Federale FGI · III livello SNaQ</li>
<li>Ex atleta agonista di ginnastica artistica</li>
<li>Psicologo della comunicazione e del marketing</li>
</ul>
</div>
</section>
</div>

<section class="sec wrap" aria-labelledby="come">
<h2 class="h2" id="come">Come lavoriamo</h2>
<ul class="pillars" style="list-style:none;margin-top:32px">
<li class="pillar">${ic('target')}<h3 class="h3">Precisione tecnica</h3><p>Nessuna ripetizione sporca: progressioni rigorose per una forza reale.</p></li>
<li class="pillar">${ic('shield')}<h3 class="h3">Sicurezza e mobilità</h3><p>Prima di caricare, si condizionano tendini e articolazioni.</p></li>
<li class="pillar">${ic('users')}<h3 class="h3">Per tutti</h3><p>Dal principiante all’atleta avanzato, ognuno al proprio ritmo.</p></li>
</ul>
</section>

<section class="sec wrap" aria-labelledby="spazio">
<h2 class="h2" id="spazio">Lo spazio</h2>
<div class="ph wide" style="margin-top:32px">${img('palestra', { alt: 'La palestra con anelli, parallele e tappeti', sizes: '(min-width:1240px) 1200px, 92vw' })}</div>
<p class="muted" style="margin-top:20px;max-width:40em">Ci alleniamo in ${biz.street}, a ${biz.city}, nella ${biz.venue.toLowerCase()}: uno spazio completamente attrezzato, con anelli, parallele, sbarre e tutto ciò che serve.</p>
</section>
${ctaBand({ title: 'Vieni a conoscerci', text: 'Prenota 2 lezioni di prova gratuite, senza impegno.' })}`,
});
