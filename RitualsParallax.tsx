import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import {RITUALS, type RitualChapter} from '../data/fellineData';
import {ResilientImage} from './ResilientImage';

function ParallaxRitualRow({
  ritual,
  reversed,
}: {
  ritual: RitualChapter;
  reversed: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-14 md:py-20 border-t border-[#171513]/12"
    >
      {/* Parallax Image Frame */}
      <div
        className={`lg:col-span-7 overflow-hidden bg-[#EAE4DA] aspect-[4/3] ${
          reversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <motion.div
          style={{y: imageY}}
          className="w-full h-[112%] -mt-[6%] will-change-transform"
        >
          <ResilientImage
            src={ritual.image}
            alt={ritual.title}
            className={`w-full h-full object-cover ${ritual.objectPosition}`}
          />
        </motion.div>
      </div>

      {/* Editorial Narrative + Adjacent Substantiating Guest Quote */}
      <div
        className={`lg:col-span-5 flex flex-col justify-center ${
          reversed ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div className="flex items-center gap-2.5 text-xs text-[#8A6D3B] font-medium mb-4">
          <span className="tabular-nums">{ritual.number}</span>
          <span aria-hidden="true">·</span>
          <span>{ritual.timeOfDay}</span>
        </div>

        <h3 className="font-serif font-normal text-3xl md:text-4xl text-[#171513] leading-[1.12] mb-3">
          {ritual.title}
        </h3>

        <p className="font-serif italic text-lg text-[#5A534A] mb-5">{ritual.subtitle}</p>

        <p className="text-[15px] leading-[1.75] text-[#4A443C] mb-8">{ritual.description}</p>

        <div className="pt-6 border-t border-[#171513]/12">
          <p className="font-serif italic text-lg leading-relaxed text-[#171513]">
            “{ritual.guestQuote}”
          </p>
          <p className="mt-2.5 text-xs text-[#5A534A]">{ritual.guestAuthor}</p>
        </div>
      </div>
    </div>
  );
}

export function RitualsParallax() {
  return (
    <section id="rituali" className="bg-[#F4F1EC] text-[#171513] py-24 md:py-36">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs font-medium tracking-[0.12em] text-[#8A6D3B] mb-4">
            03. I rituali della casa · L’anima di Antonio e Nadia
          </p>
          <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#171513] mb-5">
            Il lusso più raro non è l’ostentazione, ma il tempo condiviso.
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#4A443C] max-w-2xl">
            Ogni recensione di Felline in B&amp;B racconta lo stesso incanto: tre momenti quotidiani
            che trasformano una bella struttura in pietra in un ricordo indelebile del Salento.
          </p>
        </div>

        <div>
          {RITUALS.map((ritual, idx) => (
            <ParallaxRitualRow key={ritual.id} ritual={ritual} reversed={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
