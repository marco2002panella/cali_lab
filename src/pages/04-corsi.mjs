import { biz, shifts, SITE_URL } from '../site.mjs';
import { ctaBand, tracks, esc, ic } from '../ui.mjs';

const faq = [
  ['Quanto dura una lezione?', 'Ogni lezione dura 90 minuti: 20 di riscaldamento e prehab, 40 di verticale e skills, 30 di workout.'],
  ['Serve esperienza per iniziare?', 'No. Ogni esercizio è scalabile: i turni sono adatti a tutti i livelli, dal principiante a chi pratica da tempo.'],
  ['Come funzionano le prove gratuite?', `Le prime 2 lezioni sono gratuite, su prenotazione. Scrivi su WhatsApp o chiama Andrea al ${biz.phoneDisplay}.`],
  ['Da che età si può partecipare?', 'Cali Lab Junior è per ragazzi e ragazze dai 12 ai 16 anni. I turni per adulti sono dai 17 anni.'],
  ['Dove si svolgono gli allenamenti?', `In ${biz.street} a ${biz.city}, nella ${biz.venue.toLowerCase()}, attrezzata con anelli, parallele e sbarre.`],
  ['Chi segue gli allenamenti?', 'Andrea Zomparelli, Tecnico Federale FGI (III livello SNaQ) ed ex atleta agonista di ginnastica artistica.'],
];

export default ({ img }) => ({
  path: '/corsi/',
  title: 'Corsi di Calisthenics a Frosinone | Turni e Orari | Cali Lab',
  description: 'Partecipa ai corsi di Calisthenics a Frosinone con Cali Lab. Allenamenti di 90 minuti per ogni livello. Prova 2 lezioni gratis!',
  ogImage: 'verticale-allieva',
  pageType: 'CollectionPage',
  crumbs: [{ name: 'Corsi', path: '/corsi/' }],
  schema: [
    ...shifts.map((s) => ({
      '@type': 'Course', name: s.name, description: `Corso di calisthenics a Frosinone. ${s.who}. ${s.days}, ${s.time}. Lezioni da 90 minuti.`,
      provider: { '@id': `${SITE_URL}/#business` },
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'onsite', location: { '@id': `${SITE_URL}/#business` }, courseWorkload: 'PT1H30M' },
    })),
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
  body: `
<div class="band">
<section class="wrap pagehead">
<h1 class="h1">Corsi di <span class="red">calisthenics</span> a Frosinone</h1>
<p class="lede">Lezioni da 90 minuti, per ogni livello. I primi 2 allenamenti sono gratuiti.</p>
</section>
</div>

<section class="sec wrap" aria-labelledby="lezione">
<h2 class="h2" id="lezione">Come è fatta la lezione</h2>
<p class="lede" style="margin-top:16px">90 minuti, divisi in tre momenti.</p>
<div class="timeline" aria-hidden="true"><span style="flex:20"><b>20′</b><small>Riscaldamento</small></span><span class="on" style="flex:40"><b>40′</b><small>Verticale e skills</small></span><span style="flex:30"><b>30′</b><small>Potenziamento</small></span></div>
<div class="lesson">
<div class="lrow solo"><div class="ltxt">${ic('flame')}<p class="n">01</p><h3 class="h3">Riscaldamento</h3><p>Mobilità e prehab per polsi, gomiti e spalle, per arrivare agli esercizi pronti e senza rischi.</p></div></div>
<div class="lrow"><div class="ltxt">${ic('up')}<p class="n">02</p><h3 class="h3">Verticale</h3><p>Ogni lezione parte dalla verticale: al muro, libera, sulle parallettes. Si procede a step, con il coach che corregge l’allineamento e ti aiuta a vincere il blocco.</p></div>
<div class="lphotos">${img('verticale-anelli', { alt: 'Atleta in verticale sulle parallettes, tra due anelli, davanti alla scritta Handstand', sizes: '(min-width:960px) 640px, 92vw', pos: '55% 60%' })}</div></div>
<div class="lrow rev"><div class="ltxt">${ic('star')}<p class="n">03</p><h3 class="h3">Skills</h3><p>Planche, front lever, muscle up, human flag e le altre skill del calisthenics, con propedeutiche adatte al tuo livello.</p></div>
<div class="lphotos two"><div class="ph">${img('skill-parallele', { alt: 'Atleta in equilibrio su una mano alle parallele', sizes: '(min-width:960px) 316px, 46vw', pos: '45% 50%' })}</div><div class="ph">${img('skill-lsit-bn', { alt: 'Atleta in L-sit su una mano sul tappeto, in bianco e nero', sizes: '(min-width:960px) 316px, 46vw', pos: '50% 40%' })}</div></div></div>
<div class="lrow solo"><div class="ltxt">${ic('dumbbell')}<p class="n">04</p><h3 class="h3">Potenziamento</h3><p>Il workout del giorno, sempre diverso: forza e condizionamento, in gruppo, per chiudere la lezione.</p></div></div>
</div>
</section>

<section class="sec wrap" aria-labelledby="turni-t">
<h2 class="h2" id="turni-t">Corsi e orari</h2>
<p class="lede" style="margin-top:16px">Scegli il turno che fa per te: i primi 2 allenamenti sono gratuiti.</p>
${tracks()}
<p class="small" style="margin-top:24px">${biz.street}, ${biz.city} · ${biz.venue}</p>
</section>

<section class="sec wrap" aria-labelledby="faq-t">
<h2 class="h2" id="faq-t">Domande frequenti</h2>
<div class="faq" style="margin-top:32px;max-width:820px">
${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
</div>
</section>
${ctaBand({ title: '2 prove gratuite', text: 'Scegli il turno e scrivici: ti confermiamo subito la disponibilità.' })}`,
});
