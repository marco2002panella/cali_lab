import { biz, shifts, SITE_URL } from '../site.mjs';
import { ctaBand, courseCards, esc } from '../ui.mjs';

const faq = [
  ['Quanto dura una lezione?', 'Ogni lezione dura 90 minuti: 20 di riscaldamento e prehab, 40 di verticale e skills, 30 di workout.'],
  ['Serve esperienza per iniziare?', 'No. Ogni esercizio è scalabile: i turni sono adatti a tutti i livelli, dal principiante a chi pratica da tempo.'],
  ['Come funzionano le prove gratuite?', `Le prime 2 lezioni sono gratuite, su prenotazione. Scrivi su WhatsApp o chiama Andrea al ${biz.phoneDisplay}.`],
  ['Da che età si può partecipare?', 'Cali Lab Junior è per ragazzi e ragazze dai 12 ai 16 anni. I turni per adulti sono dai 17 anni.'],
  ['Dove si svolgono gli allenamenti?', `In ${biz.street} a ${biz.city}, nella ${biz.venue.toLowerCase()}, attrezzata con anelli, parallele e sbarre.`],
  ['Chi segue gli allenamenti?', 'Andrea Zomparelli, Tecnico Federale FGI (III livello SNaQ) ed ex atleta agonista di ginnastica artistica.'],
];

const blocks = [
  ['20′', 'Riscaldamento', 'Mobilità e prehab per polsi, gomiti e spalle.'],
  ['40′', 'Verticale e skills', 'Planche, front lever, muscle up, human flag e altro.'],
  ['30′', 'Workout', 'Il potenziamento del giorno, sempre diverso.'],
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
<section class="wrap pagehead">
<h1 class="h1">Corsi di <span class="red">calisthenics</span> a Frosinone</h1>
<p class="lede">Lezioni da 90 minuti, per ogni livello. I primi 2 allenamenti sono gratuiti.</p>
</section>

<section class="sec wrap" aria-label="Turni">
<div class="grid c3">${courseCards(img)}</div>
<p class="small" style="margin-top:24px">${biz.street}, ${biz.city} · ${biz.venue}</p>
</section>

<section class="sec wrap" aria-labelledby="lezione">
<h2 class="h2" id="lezione">Come è fatta la lezione</h2>
<div class="steps" style="margin-top:36px">
${blocks.map(([n, t, p]) => `<div class="step"><div class="n">${n}</div><h3 class="h3" style="margin-top:8px">${t}</h3><p>${p}</p></div>`).join('')}
</div>
</section>

<section class="sec wrap" aria-labelledby="faq-t">
<h2 class="h2" id="faq-t">Domande frequenti</h2>
<div class="faq" style="margin-top:32px;max-width:820px">
${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
</div>
</section>
${ctaBand({ title: '2 prove gratuite', text: 'Scegli il turno e scrivici: ti confermiamo subito la disponibilità.' })}`,
});
