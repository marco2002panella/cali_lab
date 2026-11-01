// Dati del sito in un solo posto: NAP (nome, indirizzo, telefono), orari, link.
// Il dominio si cambia con la variabile SITE_URL al momento del build.
export const SITE_URL = (process.env.SITE_URL || 'https://calisthenicsfrosinone.it').replace(/\/$/, '');

export const biz = {
  name: 'Cali Lab Frosinone',
  short: 'Cali Lab',
  phone: '+39 338 136 3965',
  phoneHref: 'tel:+393381363965',
  phoneDisplay: '338 136 3965',
  whatsapp: 'https://wa.me/393381363965?text=Ciao%20Andrea,%20vorrei%20prenotare%20le%202%20prove%20gratuite%20da%20Cali%20Lab',
  whatsappJunior: 'https://wa.me/393381363965?text=Ciao%21%20Vorrei%20prenotare%20le%202%20prove%20gratuite%20per%20il%20nuovo%20corso%20Cali%20Lab%20Junior.',
  street: 'Via Ecetra 1',
  zip: '03100',
  city: 'Frosinone',
  region: 'FR',
  venue: 'Palestra Pro Sede Gymnica',
  geo: { lat: 41.6164891, lng: 13.3059567 },
  maps: 'https://maps.app.goo.gl/wBSpVjmUVRyQR7iF6',
  mapsPlace: 'https://www.google.com/maps/place/Cali+Lab+Frosinone+-+Calisthenics/@41.6164931,13.3033818,17z/data=!3m1!4b1!4m6!3m5!1s0x132545030e1a43ad:0x3fc654a98ac65a3b!8m2!3d41.6164891!4d13.3059567!16s%2Fg%2F11tcs0x_bc',
  instagram: 'https://www.instagram.com/cali_lab_frosinone/',
  facebook: 'https://www.facebook.com/calilabfrosinone',
  founder: 'Andrea Zomparelli',
};

// Turni (fonte unica per pagina Corsi, Contatti e dati strutturati)
export const shifts = [
  { id: 'junior', name: 'Cali Lab Junior', who: 'Ragazzi 12–16 anni · Base e coordinazione', days: 'Martedì e Giovedì', time: '18:30 – 20:00', dow: ['Tuesday', 'Thursday'], opens: '18:30', closes: '20:00', isNew: true },
  { id: 'sera', name: 'Adulti · Turno serale', who: 'Dai 17 anni · Tutti i livelli', days: 'Lunedì – Venerdì', time: '19:30 – 21:00', dow: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '19:30', closes: '21:00' },
  { id: 'mattina', name: 'Adulti · Turno mattutino', who: 'Dai 17 anni · Tutti i livelli', days: 'Martedì e Giovedì', time: '10:30 – 12:00', dow: ['Tuesday', 'Thursday'], opens: '10:30', closes: '12:00' },
];

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/metodo/', label: 'Metodo' },
  { href: '/chi-siamo/', label: 'Chi siamo' },
  { href: '/corsi/', label: 'Corsi' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contatti/', label: 'Contatti' },
];

export const posts = [
  { slug: 'paura-verticale-blocco-motorio', tag: 'Psicologia e sport', image: 'cover-paura-verticale', published: '2026-09-11', modified: '2026-09-11',
    h1: 'Paura della verticale? La scienza dietro il blocco motorio e il metodo step-by-step per superarlo',
    short: 'Paura della verticale? La scienza dietro il blocco motorio',
    title: 'Paura della verticale? Cause psicologiche e come superarla | Cali Lab',
    description: 'Blocchi sulla verticale? Scopri la spiegazione scientifica tra modello EPPM, autoefficacia di Bandura e il metodo step-by-step di Cali Lab.' },
  { slug: 'allenamento-core-calisthenics-biomeccanica', tag: 'Tutorial', image: 'cover-core', published: '2026-10-12', modified: '2026-10-16',
    h1: 'Core training: anatomia, biomeccanica e come allenare l’addome nel calisthenics',
    short: 'Core training: anatomia, biomeccanica e come allenare l’addome',
    title: 'Allenamento Core nel Calisthenics: anatomia e biomeccanica',
    description: 'Scopri anatomia e biomeccanica del tronco per ottimizzare l’allenamento del core nel Calisthenics: fascia toracolombare, stabilità e progressioni.' },
  { slug: 'guida-full-planche-biomeccanica-allenamento', tag: 'Tutorial', image: 'planche-parallettes', published: '2026-09-25', modified: '2026-09-25',
    h1: 'Come imparare la Full Planche: anatomia, biomeccanica, studio EMG ed esercizi specifici',
    short: 'Come imparare la Full Planche: biomeccanica ed esercizi specifici',
    title: 'Planche: biomeccanica, studio EMG e guida completa | Cali Lab',
    description: 'Scopri come padroneggiare la full planche: analisi biomeccanica, dati elettromiografici (EMG) e propedeutiche. Leggi la guida Cali Lab.' },
  { slug: 'calisthenics-ragazzi-frosinone-cali-lab-junior', tag: 'Community', image: 'junior-bilanciere', published: '2026-09-25', modified: '2026-09-25',
    h1: 'Cali Lab Junior: arriva il corso di calisthenics dedicato a ragazzi e ragazze a Frosinone',
    short: 'Cali Lab Junior: il corso di calisthenics per ragazzi a Frosinone',
    title: 'Cali Lab Junior: il corso di Calisthenics per ragazzi a Frosinone',
    description: 'Dal 1° ottobre inizia Cali Lab Junior a Frosinone: allenamento a corpo libero, coordinazione e mobilità per ragazzi dai 12/13 anni. Prenota 2 prove gratuite.' },
];
