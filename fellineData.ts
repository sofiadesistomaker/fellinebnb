export interface CinemaScene {
  id: string;
  roman: string;
  title: string;
  subtitle: string;
  locationNote: string;
  image: string;
  objectPosition: string;
  motionClass: string;
}

export interface SuitePhoto {
  image: string;
  label: string;
  objectPosition: string;
}

export interface SuiteItem {
  id: string;
  index: string;
  name: string;
  category: string;
  areaSqm: number;
  maxGuests: number;
  bedConfig: string;
  exposure: string;
  rateFromEur: number;
  image: string;
  objectPosition: string;
  gallery: SuitePhoto[];
  lead: string;
  description: string;
  architecturalNotes: string[];
  amenities: string[];
}

export interface RitualChapter {
  id: string;
  number: string;
  timeOfDay: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  objectPosition: string;
  guestQuote: string;
  guestAuthor: string;
}

export interface GalleryPlate {
  id: string;
  title: string;
  area: string;
  material: string;
  lightHour: string;
  caption: string;
  image: string;
  objectPosition: string;
  spanClass: string;
  aspectClass: string;
}

export interface TerritoryDestination {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  direction: string;
  description: string;
  hostTip: string;
}

export interface ConciergeServiceGroup {
  id: 'esperienze' | 'dimora' | 'ospitalita';
  label: string;
  items: {
    title: string;
    detail: string;
    note?: string;
  }[];
}

export interface GuestReview {
  id: string;
  author: string;
  credentials: string;
  rating: number;
  timeframe: string;
  category: 'ospitalita' | 'posizione' | 'rituali';
  excerpt: string;
  hostReply?: string;
}

export const PROPERTY_INFO = {
  brandShort: 'Felline in B&B',
  brandFull: 'Felline in B&B Dimora di Charme nel Salento',
  address: 'Via Crocefisso, 16, 73040 Felline (LE)',
  region: 'Basso Salento · Puglia, Italia',
  website: 'fellinebnb.it',
  email: 'fellinebnb@gmail.com',
  emailHref: 'mailto:fellinebnb@gmail.com',
  phoneDisplay: '+39 339 844 2659',
  phoneHref: 'tel:+393398442659',
  whatsappNumber: '393398442659',
  hosts: 'Antonio e Nadia',
  rating: '4,6',
  reviewCount: 62,
  stars: '4 Stelle',
  coordinates: '39° 56′ 24″ N · 18° 06′ 52″ E',
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const defaultMessage =
    'Buongiorno Antonio e Nadia, vorrei ricevere informazioni sulla disponibilità di Felline in B&B Dimora di Charme.';
  return `https://wa.me/${PROPERTY_INFO.whatsappNumber}?text=${encodeURIComponent(
    message || defaultMessage
  )}`;
}

export const ASSETS = {
  terraceDining: '/assets/aistudio/3f0dd131-20eb-4f99-86dc-63bc528f18b6_8b4347b1.jpeg',
  terraceBench: '/assets/aistudio/223d0754-a1cb-4efc-910b-e13533d9cd8e_3b22ddc2.jpeg',
  courtyardLoggia: '/assets/aistudio/caa8d880-eeed-42f2-9b58-ce911e0b3056_efdc7805.jpeg',
  majolicaStairs: '/assets/aistudio/4c9bd2f8-ae46-4c4e-b016-37b2ce1881cb_86c4c3bd.jpeg',
  cactusWalkway: '/assets/aistudio/192d4a9b-8598-4f7a-a87a-430110534520_9239224f.jpeg',
  amphoraGarden: '/assets/aistudio/06bca80e-320b-40f6-bbe9-7e025547db7d_e9dc4f77.jpeg',
  citrusPillar: '/assets/aistudio/5609a919-f737-4841-abf4-4ed8605e7ae4_ac0343b9.jpeg',
  fireplaceHearth: '/assets/aistudio/f9f70646-4ec9-4add-8c7a-a85c0d6d6ba2_f045893d.jpeg',
  nightPergola: '/assets/aistudio/ded45175-e083-4570-8334-5a648ab8d51e_86c65a51.jpeg',
  nightCourtyard: '/assets/aistudio/e84e94af-92ed-4055-94bc-00f379e0d7bb_034c414a.jpeg',
  stoneLamps: '/assets/aistudio/b9b7c23b-b187-42a8-841c-b4f3dc069960_e7f20d87.jpeg',
  stoneSuiteBed: '/assets/aistudio/2ac0c5c5-f3e7-4dbb-83b9-c6030127f97a_616d8c65.jpeg',
  ironBedRoom: '/assets/aistudio/385619fd-d121-431d-b3ca-1fcf284c3cf7_eef56e2f.jpeg',
  aquaWardrobe: '/assets/aistudio/e3218374-1fb1-4504-994d-d9bdbcd2a304_23f83b3e.jpeg',
  woodMasterRoom: '/assets/aistudio/7d34cf2f-2e71-405e-8d33-5019f7c1a0cf_0297d2bb.jpeg',
  turquoiseRoom: '/assets/aistudio/5202e761-1a59-47c2-90d8-9050e980e43d_b375950e.jpeg',
  turquoiseChair: '/assets/aistudio/9814126a-5a9b-4d5c-abc7-935600466635_2_0ad3ef98.jpeg',
} as const;

export const CINEMA_SCENES: CinemaScene[] = [
  {
    id: 'terrazza',
    roman: 'I',
    title: 'La Terrazza Panoramica',
    subtitle: 'Pergolato in cannicciato, cotto caldo e luce dorata sui tetti di Felline',
    locationNote: 'Terrazza alta · Sguardo sul Basso Salento',
    image: ASSETS.terraceDining,
    objectPosition: 'object-[50%_54%]',
    motionClass: 'cinema-ken-1',
  },
  {
    id: 'corte',
    roman: 'II',
    title: 'La Corte dei Cactus',
    subtitle: 'Loggia in pietra viva, colonne in tufo e giardino di cactus monumentali',
    locationNote: 'Corte interna · Via Crocefisso, 16',
    image: ASSETS.courtyardLoggia,
    objectPosition: 'object-[50%_62%]',
    motionClass: 'cinema-ken-2',
  },
  {
    id: 'maioliche',
    roman: 'III',
    title: 'La Scalinata di Maioliche',
    subtitle: 'Gradini in pietra locale, ceramiche dipinte a mano e anfore scolpite tra le palme',
    locationNote: 'Giardino botanico privato · Felline',
    image: ASSETS.majolicaStairs,
    objectPosition: 'object-[50%_52%]',
    motionClass: 'cinema-ken-3',
  },
  {
    id: 'pietra',
    roman: 'IV',
    title: 'La Dimora in Pietra Viva',
    subtitle: 'Blocchi di tufo a vista, colonne classiche e lanterne ambrate artigianali',
    locationNote: 'Suite in pietra · Dimora storica',
    image: ASSETS.stoneLamps,
    objectPosition: 'object-[50%_38%]',
    motionClass: 'cinema-ken-4',
  },
];

export const SUITES: SuiteItem[] = [
  {
    id: 'dimora-pietra-viva',
    index: '01',
    name: 'Dimora in Pietra Viva',
    category: 'Piano Corte · Architettura in Tufo',
    areaSqm: 42,
    maxGuests: 2,
    bedConfig: 'Matrimoniale artigianale in legno',
    exposure: 'Accesso diretto alla corte dei cactus',
    rateFromEur: 195,
    image: ASSETS.stoneLamps,
    objectPosition: 'object-[50%_38%]',
    gallery: [
      {
        image: ASSETS.stoneLamps,
        label: 'Pietra viva e lanterne ambrate',
        objectPosition: 'object-[50%_38%]',
      },
      {
        image: ASSETS.stoneSuiteBed,
        label: 'Camera matrimoniale',
        objectPosition: 'object-[50%_32%]',
      },
      {
        image: ASSETS.courtyardLoggia,
        label: 'Loggia sulla corte',
        objectPosition: 'object-[50%_62%]',
      },
    ],
    lead: 'Una dimora scolpita nei blocchi di pietra salentina, riscaldata dalla luce ambrata di lampade artigianali e dalle travi scure del soffitto.',
    description:
      'Ogni elemento racconta la mano autentica di chi ama questa casa: pareti in pietra viva a vista, una colonna scanalata d’ispirazione classica, letto matrimoniale in legno caldo e accesso immediato alla loggia ombreggiata tra palme e cactus.',
    architecturalNotes: [
      'Pareti originali in blocchi di pietra salentina a vista e colonna scanalata',
      'Travi in legno scuro e tre lampade sospese a luce calda ambrata',
      'Soglia ad arco in pietra con uscita sulla corte interna dei cactus',
    ],
    amenities: [
      'Aria condizionata silenziosa',
      'Wi-Fi gratuito ad alta velocità',
      'Colazione artigianale inclusa',
      'Bagno privato indipendente',
      'Animali domestici ammessi',
    ],
  },
  {
    id: 'camera-ferro-battuto',
    index: '02',
    name: 'Camera Azzurra in Ferro Battuto',
    category: 'Piano Nobile · Luce Mediterranea',
    areaSqm: 34,
    maxGuests: 2,
    bedConfig: 'Matrimoniale in ferro battuto',
    exposure: 'Luminosa con accesso alla terrazza',
    rateFromEur: 175,
    image: ASSETS.ironBedRoom,
    objectPosition: 'object-[50%_54%]',
    gallery: [
      {
        image: ASSETS.ironBedRoom,
        label: 'Letto in ferro battuto',
        objectPosition: 'object-[50%_54%]',
      },
      {
        image: ASSETS.aquaWardrobe,
        label: 'Nicchie azzurre in muratura',
        objectPosition: 'object-[50%_46%]',
      },
      {
        image: ASSETS.terraceBench,
        label: 'Terrazza panoramica',
        objectPosition: 'object-[50%_48%]',
      },
    ],
    lead: 'La luminosità quieta delle case del Sud: pareti bianche di calce, un letto romantico in ferro battuto e nicchie in muratura dipinte color mare.',
    description:
      'Pensata per un riposo fresco e rilassante dopo le giornate sullo Ionio, accoglie gli ospiti tra tende ricamate che filtrano il sole del mattino, armadiature su misura nei toni pastello del Mediterraneo e pala a soffitto in ottone e paglia di Vienna.',
    architecturalNotes: [
      'Letto matrimoniale in ferro battuto lavorato con comodini in legno',
      'Armadio e nicchie artigianali in muratura color azzurro mare',
      'Climatizzazione autonoma e ventilatore a pale in ottone e paglia di Vienna',
    ],
    amenities: [
      'Aria condizionata e ventilatore a soffitto',
      'Wi-Fi gratuito e TV in camera',
      'Colazione artigianale inclusa',
      'Noleggio biciclette gratuito',
      'Accesso agli spazi aperti e alla terrazza',
    ],
  },
  {
    id: 'residenza-padronale-terrazza',
    index: '03',
    name: 'Residenza Padronale & Terrazza',
    category: 'Piano Terrazza · Coppie e Famiglie',
    areaSqm: 52,
    maxGuests: 4,
    bedConfig: 'Camera padronale in noce + camera ospiti',
    exposure: 'Terrazza panoramica al tramonto',
    rateFromEur: 250,
    image: ASSETS.woodMasterRoom,
    objectPosition: 'object-[50%_54%]',
    gallery: [
      {
        image: ASSETS.woodMasterRoom,
        label: 'Camera padronale in noce',
        objectPosition: 'object-[50%_54%]',
      },
      {
        image: ASSETS.turquoiseRoom,
        label: 'Camera degli ospiti turchese',
        objectPosition: 'object-[50%_54%]',
      },
      {
        image: ASSETS.terraceDining,
        label: 'Terrazza sotto il pergolato',
        objectPosition: 'object-[50%_54%]',
      },
    ],
    lead: 'Calore di casa salentina e respiro aperto: due camere curate negli arredi d’epoca a pochi passi dalla grande terrazza panoramica.',
    description:
      'Ideale sia per chi desidera ampi spazi sia per famiglie, unisce la camera padronale in legno massello scuro con la luminosa camera ospiti dal letto in ferro turchese e ottone. A completare il soggiorno, la terrazza in cotto e cannicciato aperta sui tramonti di Felline.',
    architecturalNotes: [
      'Arredi classici in legno massello con grande armadiatura a tutta parete',
      'Camera ospiti con letto in ferro turchese, ottone e tessuti rigati salentini',
      'Accesso diretto alla terrazza panoramica con sedute in pietra e pergolato',
    ],
    amenities: [
      'Accesso privilegiato alla terrazza panoramica',
      'Aria condizionata e pale a soffitto',
      'Wi-Fi gratuito in tutti gli ambienti',
      'Colazione servita sotto il pergolato',
      'Adatta a famiglie e pet-friendly',
    ],
  },
];

export const RITUALS: RitualChapter[] = [
  {
    id: 'benvenuto',
    number: '01.',
    timeOfDay: 'Al vostro arrivo · Ore 16:00',
    title: 'Il Cocktail di Benvenuto nella Corte',
    subtitle: 'Oltre la soglia di Via Crocefisso, il tempo cambia misura',
    description:
      'Qui non esiste un banco reception impersonale. Antonio e Nadia vi accolgono personalmente sotto la loggia in pietra affacciata sul giardino di cactus e palme, offrendovi un cocktail di benvenuto preparato sul momento mentre vi raccontano le calette segrete, i venti del giorno e le tavole migliori del borgo.',
    image: ASSETS.courtyardLoggia,
    objectPosition: 'object-[50%_64%]',
    guestQuote:
      'Abbiamo conosciuto Antonio e Nadia che ci hanno accolti con un cocktail di benvenuto: due persone splendide che ci hanno fatto sentire davvero a casa.',
    guestAuthor: 'Fabrizio Panizza & Roberto Cristiano · Ospiti verificati',
  },
  {
    id: 'colazione',
    number: '02.',
    timeOfDay: 'Il risveglio lento · Ore 08:30 – 10:30',
    title: 'La Colazione Artigianale in Terrazza',
    subtitle: 'Sotto il pergolato in cannicciato tra agrumi, sole e pasticciotti caldi',
    description:
      'Servita nella quiete dorata della terrazza panoramica o sotto il portico della corte, la colazione è un rito celebrato da ogni viaggiatore: pasticciotti leccesi fragranti, torte fatte in casa, frutta e agrumi del giardino, accanto a una selezione salata curata ogni mattina con amore.',
    image: ASSETS.terraceBench,
    objectPosition: 'object-[50%_46%]',
    guestQuote:
      'I viaggiatori segnalano un’ottima colazione artigianale sia dolce sia salata, preparata ogni mattina con cura autentica.',
    guestAuthor: 'Sintesi recensioni ospiti · Google (4,6 / 5)',
  },
  {
    id: 'dopocena',
    number: '03.',
    timeOfDay: 'Dopo il tramonto · Corte e focolare',
    title: 'Il Dopocena d’Autore di Antonio',
    subtitle: 'Rum invecchiato, cioccolato fondente, sigari e conversazioni salentine',
    description:
      'Al rientro da una cena nei ristoranti del centro storico di Felline, la corte si accende di lanterne calde e, nelle sere più fresche, del crepitio del grande camino in pietra viva. Nasce così il momento più memorabile della casa: piacevoli chiacchierate serali in compagnia di Antonio e Nadia tra rum ricercati, cioccolato fondente e sigari d’eccellenza.',
    image: ASSETS.fireplaceHearth,
    objectPosition: 'object-[56%_44%]',
    guestQuote:
      'Eccellente l’accoglienza del proprietario Antonio, il quale ci ha riservato un dopocena con i fiocchi, servendoci rum, cioccolato e sigari di ottima qualità.',
    guestAuthor: 'Giorgio · Local Guide (182 recensioni)',
  },
];

export const GALLERY_PLATES: GalleryPlate[] = [
  {
    id: 'plate-1',
    title: 'La Scalinata delle Maioliche',
    area: 'Corte & Giardino',
    material: 'Pietra locale, maioliche dipinte a mano e anfore in tufo',
    lightHour: 'Luce del giorno · Scalinata d’accesso',
    caption:
      'Ogni alzata della scala esterna custodisce ceramiche maiolicate dai motivi mediterranei, affiancate da vasi scolpiti in pietra e ringhiere in ferro battuto verso le palme.',
    image: ASSETS.majolicaStairs,
    objectPosition: 'object-[50%_52%]',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'plate-2',
    title: 'La Terrazza Panoramica al Tramonto',
    area: 'Terrazza Alta',
    material: 'Pergolato in cannicciato, cotto e ferro battuto verde',
    lightHour: 'Ora d’oro · 19:15',
    caption:
      'Il tavolo conviviale sotto il pergolato si affaccia sui tetti bianchi di Felline e sulla campagna salentina, incorniciato da cycas, yucche e cactus scultorei.',
    image: ASSETS.terraceDining,
    objectPosition: 'object-[50%_54%]',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    id: 'plate-3',
    title: 'Il Sentiero dei Cactus',
    area: 'Giardino Botanico Privato',
    material: 'Chianche in pietra, pergolato e succulente secolari',
    lightHour: 'Mattino · 10:20',
    caption:
      'Un passaggio raccolto in pietra antica attraversa una collezione rara di cactus colonnari, cuscini di suocera e palme a ventaglio fino al cuore della casa.',
    image: ASSETS.cactusWalkway,
    objectPosition: 'object-[50%_45%]',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'plate-4',
    title: 'Pietra Viva e Lanterne Ambrate',
    area: 'Dimora in Pietra Viva',
    material: 'Blocchi di tufo, colonna scanalata e fibre naturali',
    lightHour: 'Interno · Luce calda',
    caption:
      'Tre lampade verticali dal bagliore ambrato illuminano i blocchi scolpiti in pietra viva accanto alla colonna classica e alle travi scure.',
    image: ASSETS.stoneLamps,
    objectPosition: 'object-[50%_38%]',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'plate-5',
    title: 'Anfore e Palme della Corte',
    area: 'Giardino Interno',
    material: 'Terracotta antica, tufo grezzo e basilari chianche',
    lightHour: 'Pomeriggio · 16:40',
    caption:
      'Antiche anfore in terracotta poggiano su basamenti di pietra viva all’ombra delle grandi foglie tropicali e dei muretti scaldati dal sole del Sud.',
    image: ASSETS.amphoraGarden,
    objectPosition: 'object-[50%_55%]',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'plate-6',
    title: 'La Loggia sulla Corte dei Cactus',
    area: 'Veranda Principale',
    material: 'Pietra leccese, colonne in tufo e legno massello',
    lightHour: 'Pomeriggio · 17:30',
    caption:
      'Lo spazio d’ombra prediletto dagli ospiti per la lettura, il cocktail di benvenuto e le conversazioni lente con vista sul giardino di cactus.',
    image: ASSETS.courtyardLoggia,
    objectPosition: 'object-[50%_62%]',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    id: 'plate-7',
    title: 'Il Camino in Pietra Viva',
    area: 'Veranda del Focolare',
    material: 'Tufo scolpito, cannicciato e lanterna in ferro',
    lightHour: 'Sera · Fuoco acceso',
    caption:
      'Un focolare scolpito nella pietra locale con mensola lavorata e specchio antico, affiancato da un cactus monumentale sotto la copertura in cannicciato.',
    image: ASSETS.fireplaceHearth,
    objectPosition: 'object-[56%_44%]',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'plate-8',
    title: 'Colonna in Tufo e Zagara in Fiore',
    area: 'Agrumeto della Corte',
    material: 'Pietra locale e zagara di arancio',
    lightHour: 'Mattino · 09:30',
    caption:
      'I fiori bianchi degli agrumi profumano il vialetto lastricato accanto alle colonne rustiche in pietra viva, regalando i profumi più autentici del Salento.',
    image: ASSETS.citrusPillar,
    objectPosition: 'object-[50%_38%]',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'plate-9',
    title: 'Camera Azzurra in Ferro Battuto',
    area: 'Piano Nobile',
    material: 'Ferro battuto, calce bianca e ottone',
    lightHour: 'Mattino · 10:00',
    caption:
      'Luce chiara del Salento, linee romantiche in ferro battuto e ventilatore in ottone e paglia di Vienna per un riposo silenzioso.',
    image: ASSETS.ironBedRoom,
    objectPosition: 'object-[50%_54%]',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'plate-10',
    title: 'Il Pergolato nella Quietudine Notturna',
    area: 'Veranda di Sera',
    material: 'Colonna in tufo, anfora in terracotta e cannicciato',
    lightHour: 'Notte · 22:00',
    caption:
      'Quando scende la sera su Felline, le colonne in pietra e le anfore tra gli agrumi custodiscono il silenzio profumato della corte.',
    image: ASSETS.nightPergola,
    objectPosition: 'object-[50%_54%]',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'plate-11',
    title: 'Sedute in Pietra sull’Orizzonte Salentino',
    area: 'Terrazza Panoramica',
    material: 'Sedute in tufo, cotto e pergolato ombreggiato',
    lightHour: 'Tramonto · 19:30',
    caption:
      'Le grandi panche in muratura di pietra calda invitano a fermarsi al tramonto, con lo sguardo aperto sulle palme e sulla campagna di Felline.',
    image: ASSETS.terraceBench,
    objectPosition: 'object-[50%_46%]',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'plate-12',
    title: 'Accoglienza e Dettagli d’Epoca',
    area: 'Camera degli Ospiti',
    material: 'Ferro battuto turchese, ottone e tessuti rigati',
    lightHour: 'Interno · Luce soffusa',
    caption:
      'Biancheria fresca, poltrona da lettura d’epoca e arredi scelti con gusto familiare: la cifra intima dell’ospitalità di Antonio e Nadia.',
    image: ASSETS.turquoiseChair,
    objectPosition: 'object-[50%_54%]',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]',
  },
];

export const TERRITORY_DESTINATIONS: TerritoryDestination[] = [
  {
    id: 'borgo-felline',
    name: 'Borgo Antico di Felline',
    distance: '0,1 km',
    travelTime: '2 min a piedi',
    direction: 'Centro storico · Piazza Castello',
    description:
      'Un gioiello medievale raccolto attorno al Castello Baronale, silenzioso di giorno e animato la sera da raffinate osterie salentine, vicoli in pietra chiara e luminarie d’estate.',
    hostTip:
      'Antonio e Nadia riservano per voi i tavoli migliori nei ristoranti tipici del borgo a pochi passi dal portone.',
  },
  {
    id: 'torre-san-giovanni',
    name: 'Marina di Felline & Torre San Giovanni',
    distance: '7 km',
    travelTime: '10 min in auto',
    direction: 'Costa Ionica · Ovest',
    description:
      'Acque trasparenti di turchese intenso, scogliere basse scolpite dal vento e lunghi arenili di sabbia chiara facilmente raggiungibili anche in bicicletta lungo le stradine tra gli ulivi.',
    hostTip:
      'Chiedete ogni mattina quale vento soffia: in base a tramontana o scirocco vi indicheremo la baia con il mare piatto come una tavola.',
  },
  {
    id: 'gallipoli',
    name: 'Gallipoli & Baia Verde',
    distance: '17 km',
    travelTime: '18 min in auto',
    direction: 'Costa Ionica · Nord-Ovest',
    description:
      'La città vecchia adagiata su un’isola calcarea collegata da un ponte seicentesco, tra bastioni sul mare, mercati del pesce e tramonti infuocati sullo Ionio.',
    hostTip:
      'Ideale al tramonto per una passeggiata lungo la riviera e un crudo di mare fresco sugli scogli.',
  },
  {
    id: 'maldive-salento',
    name: 'Pescoluse — Maldive del Salento',
    distance: '19 km',
    travelTime: '20 min in auto',
    direction: 'Costa Ionica · Sud',
    description:
      'Dune di sabbia finissima, gigli selvatici e fondali bassi e cristallini tra i più celebri di tutto il Mediterraneo.',
    hostTip:
      'Consigliamo l’arrivo al mattino presto per godere della luce trasparente prima della brezza pomeridiana.',
  },
  {
    id: 'leuca',
    name: 'Santa Maria di Leuca',
    distance: '27 km',
    travelTime: '28 min in auto',
    direction: 'Finibus Terrae · Estremo Sud',
    description:
      'Il promontorio dove il Mar Ionio incontra l’Adriatico, tra ville ottocentesche eclettiche, il faro monumentale e grotte marine esplorabili in barca.',
    hostTip:
      'Possiamo organizzare per voi il noleggio di un’imbarcazione privata per visitare le grotte del Capo di Leuca dal mare.',
  },
];

export const CONCIERGE_GROUPS: ConciergeServiceGroup[] = [
  {
    id: 'esperienze',
    label: 'Esperienze & Mare',
    items: [
      {
        title: 'Noleggio biciclette gratuito',
        detail: 'Biciclette a disposizione degli ospiti per esplorare le stradine rurali tra gli uliveti e raggiungere la costa.',
        note: 'Incluso nel soggiorno',
      },
      {
        title: 'Imbarcazioni e moto d’acqua',
        detail: 'Organizzazione di uscite in barca lungo la costa ionica e noleggio moto d’acqua con partner selezionati.',
      },
      {
        title: 'Immersioni e sci nautico',
        detail: 'Esperienze guidate nei fondali limpidi del Basso Salento e sport acquatici per ogni livello.',
      },
      {
        title: 'Equitazione nella campagna salentina',
        detail: 'Passeggiate a cavallo al tramonto tra muretti a secco, macchia mediterranea e pinete costiere.',
      },
    ],
  },
  {
    id: 'dimora',
    label: 'Comfort in Dimora',
    items: [
      {
        title: 'Aria condizionata in tutte le camere',
        detail: 'Climatizzazione silenziosa in ogni camera e ambiente interno per un riposo fresco anche in piena estate.',
      },
      {
        title: 'Wi-Fi gratuito e postazione lavoro',
        detail: 'Connessione Wi-Fi ad alta velocità in tutta la dimora, nelle aree comuni e postazione dedicata.',
        note: 'Gratuito',
      },
      {
        title: 'Navetta aeroportuale',
        detail: 'Servizio trasferimento privato su prenotazione da e per gli aeroporti di Brindisi (BDS) e Bari (BRI).',
      },
      {
        title: 'Cura e assistenza sul posto',
        detail: 'Servizio parrucchiere su richiesta e presidio guardia medica facilmente accessibile nelle vicinanze.',
      },
    ],
  },
  {
    id: 'ospitalita',
    label: 'Famiglie & Pet-Friendly',
    items: [
      {
        title: 'Animali domestici ammessi',
        detail: 'I vostri compagni a quattro zampe sono i benvenuti nella dimora e negli spazi aperti della corte.',
        note: 'Pet-Friendly',
      },
      {
        title: 'Adatto ai bambini & Babysitting',
        detail: 'Accoglienza dedicata alle famiglie con servizio di babysitting qualificato disponibile su prenotazione.',
      },
      {
        title: 'Nota sull’architettura storica',
        detail: 'Trattandosi di una residenza d’epoca distribuita su più livelli con scale in pietra originarie, la struttura non è adatta a ospiti con mobilità ridotta.',
        note: 'Trasparenza architettonica',
      },
    ],
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    author: 'Roberto Cristiano',
    credentials: '10 recensioni · Ospite verificato',
    rating: 5,
    timeframe: '3 mesi fa',
    category: 'ospitalita',
    excerpt:
      'Abbiamo soggiornato in questo B&B e ci siamo sentiti davvero a casa. Antonio e Nadia sono due persone splendide, attente a ogni piccolo dettaglio del soggiorno.',
  },
  {
    id: 'rev-2',
    author: 'Azzurra Clothing',
    credentials: 'Ospite verificato',
    rating: 5,
    timeframe: '6 mesi fa',
    category: 'posizione',
    excerpt:
      'Struttura unica e bellissima in un piccolo ed elegante borgo di nome Felline, a 10 minuti dal mare. Nadia e Antonio ci hanno riservato un’accoglienza indimenticabile.',
    hostReply: 'Grazie, un abbraccio — Nadia e Antonio',
  },
  {
    id: 'rev-3',
    author: 'Giorgio',
    credentials: 'Local Guide · 182 recensioni',
    rating: 5,
    timeframe: 'Recensione in evidenza',
    category: 'rituali',
    excerpt:
      'Eccellente l’accoglienza del proprietario Antonio, il quale ci ha riservato un dopocena con i fiocchi, servendoci rum, cioccolato e sigari di ottima qualità.',
  },
  {
    id: 'rev-4',
    author: 'D. dL',
    credentials: 'Local Guide · 13 recensioni',
    rating: 5,
    timeframe: '3 mesi fa',
    category: 'ospitalita',
    excerpt:
      'Grazie ad Antonio e Nadia che con semplicità e tanta cura hanno reso il nostro soggiorno spettacolare! Quando si mette passione si sente in ogni angolo della dimora.',
    hostReply: 'Grazie, siamo stati benissimo anche noi — Felline in B&B',
  },
  {
    id: 'rev-5',
    author: 'Alessandro Zaccaria',
    credentials: 'Local Guide · 36 recensioni',
    rating: 5,
    timeframe: 'Un anno fa',
    category: 'posizione',
    excerpt:
      'Posto molto bello, comodo a tutte le spiagge circostanti, nel centro di Felline: un luogo molto tranquillo di giorno che però la sera è pieno di vita con ristoranti e localini.',
  },
  {
    id: 'rev-6',
    author: 'Fabrizio Panizza',
    credentials: 'Local Guide · 31 recensioni',
    rating: 5,
    timeframe: 'Vacanza di coppia',
    category: 'rituali',
    excerpt:
      'Siamo stati in questo B&B 2 notti e 3 giorni. Abbiamo conosciuto Antonio e Nadia che ci hanno accolti con un cocktail di benvenuto: due persone davvero squisite.',
    hostReply: 'Grazie a voi, anche noi siamo stati benissimo con voi — Nadia e Antonio',
  },
];
