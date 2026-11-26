import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import {ASSETS, PROPERTY_INFO} from '../data/fellineData';
import {ResilientImage} from './ResilientImage';

const PROOF_METRICS = [
  {
    value: '4,6 / 5',
    label: 'Valutazione su Google',
    detail: '62 recensioni verificate degli ospiti',
  },
  {
    value: '10 min',
    label: 'Dal Mar Ionio',
    detail: 'Comodo a tutte le spiagge del Basso Salento',
  },
  {
    value: '4 Stelle',
    label: 'Dimora di Charme',
    detail: 'Via Crocefisso, 16 · Centro storico di Felline',
  },
  {
    value: '2 Host',
    label: 'Antonio e Nadia',
    detail: 'Accoglienza privata, colazione e dopocena',
  },
];

export function ArchitectureManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Opposing compositor-only scroll parallax layers
  const mainImageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const accentCardY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section
      id="dimora"
      ref={sectionRef}
      className="relative bg-[#F4F1EC] text-[#171513] py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Asymmetric Architectural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] text-[#8A6D3B] mb-5">
                01. L’essenza architettonica · {PROPERTY_INFO.coordinates}
              </p>

              <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#171513] mb-8">
                Una casa salentina scolpita nella pietra, nel silenzio e nella luce.
              </h2>

              <div className="space-y-5 text-[15px] md:text-[16px] leading-[1.75] text-[#4A443C]">
                <p>
                  A pochi passi dal Castello Baronale di Felline, oltre un portone discreto in Via
                  Crocefisso, si schiude una residenza che custodisce il carattere più autentico del
                  Salento nobile e rurale.
                </p>
                <p>
                  Le chianche calcaree levigate dai passi, le colonne monolitiche in tufo dorato,
                  le scalinate ornate di maioliche pugliesi e il giardino di cactus monumentali
                  compongono una scenografia naturale che cambia colore con ogni ora del giorno.
                </p>
                <p>
                  Qui la perfezione architettonica non è mai fredda: vive nello sguardo attento di{' '}
                  <strong className="font-medium text-[#171513]">{PROPERTY_INFO.hosts}</strong>, che
                  trasformano ogni soggiorno in un’esperienza familiare, intima e memorabile.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#171513]/12">
              <p className="font-serif italic text-xl md:text-2xl leading-[1.45] text-[#171513]">
                “Struttura unica e bellissima in un piccolo ed elegante borgo di nome Felline, a 10
                minuti dal mare.”
              </p>
              <p className="mt-3 text-xs text-[#5A534A]">
                Azzurra Clothing · Recensione verificata su Google (5 / 5)
              </p>
            </div>
          </div>

          {/* Right Dual-Layer Parallax Diptych */}
          <div className="lg:col-span-7 relative min-h-[480px] md:min-h-[640px] flex items-center">
            {/* Primary Architectural Frame */}
            <div className="w-full lg:w-[86%] lg:ml-auto h-[460px] md:h-[620px] overflow-hidden bg-[#EAE4DA]">
              <motion.div
                style={{y: mainImageY}}
                className="w-full h-[114%] -mt-[7%] will-change-transform"
              >
                <ResilientImage
                  src={ASSETS.majolicaStairs}
                  alt="Scalinata in pietra con alzate in maiolica dipinte a mano, anfore in tufo e palme a Felline in B&B"
                  className="w-full h-full object-cover object-[50%_52%]"
                />
              </motion.div>
            </div>

            {/* Secondary Opposing-Velocity Detail Plate */}
            <motion.figure
              style={{y: accentCardY}}
              className="hidden md:block absolute left-0 bottom-6 w-[240px] lg:w-[265px] bg-[#F4F1EC] p-3 border border-[#171513]/10 will-change-transform"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#EAE4DA]">
                <ResilientImage
                  src={ASSETS.cactusWalkway}
                  alt="Sentiero in pietra viva tra cactus monumentali, palme e pergolato nella corte di Felline in B&B"
                  className="w-full h-full object-cover object-[50%_45%]"
                />
              </div>
              <figcaption className="pt-3 px-1">
                <p className="font-serif text-base text-[#171513]">Il giardino dei cactus</p>
                <p className="text-xs text-[#5A534A] mt-0.5">
                  Chianche calcaree · Pietra viva e palme
                </p>
              </figcaption>
            </motion.figure>
          </div>
        </div>

        {/* Full-Width 4-Column Claim-to-Proof Architectural Strip */}
        <div className="mt-20 md:mt-28 pt-10 border-t border-[#171513]/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PROOF_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <p className="font-serif text-3xl md:text-4xl font-normal text-[#171513] tabular-nums">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-[#171513]">{metric.label}</p>
              <p className="text-xs leading-relaxed text-[#5A534A]">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
