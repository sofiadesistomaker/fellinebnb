import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowRight, Check} from 'lucide-react';
import {SUITES} from '../data/fellineData';
import {ResilientImage} from './ResilientImage';

interface SuitesShowcaseProps {
  onSelectSuiteForBooking: (suiteId: string) => void;
}

export function SuitesShowcase({onSelectSuiteForBooking}: SuitesShowcaseProps) {
  const [activeSuiteId, setActiveSuiteId] = useState(SUITES[0].id);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const activeSuite = SUITES.find((s) => s.id === activeSuiteId) || SUITES[0];
  const activePhoto = activeSuite.gallery[activePhotoIndex] || {
    image: activeSuite.image,
    label: activeSuite.name,
    objectPosition: activeSuite.objectPosition,
  };

  const handleSelectSuite = (suiteId: string) => {
    setActiveSuiteId(suiteId);
    setActivePhotoIndex(0);
  };

  return (
    <section
      id="suite"
      className="relative bg-[#0B0A09] text-[#F4F1EC] py-24 md:py-36 border-t border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header + Interactive Suite Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.12em] text-[#B5945B] mb-4">
              02. Le dimore e le camere · Ospitalità intima
            </p>
            <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#F4F1EC]">
              Spazi raccolti, ciascuno con la propria anima salentina.
            </h2>
          </div>

          {/* Interactive Suite Selector */}
          <div
            role="tablist"
            aria-label="Seleziona la dimora da esplorare"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#151311] border border-white/10 self-start lg:self-end"
          >
            {SUITES.map((suite) => {
              const isSelected = suite.id === activeSuite.id;
              return (
                <button
                  key={suite.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectSuite(suite.id)}
                  className={`px-4 py-2.5 text-xs font-medium tracking-[0.03em] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4F1EC] text-[#0B0A09]'
                      : 'text-[#F4F1EC]/70 hover:text-[#F4F1EC]'
                  }`}
                >
                  <span className="tabular-nums mr-1.5 opacity-70">{suite.index}.</span>
                  {suite.name
                    .replace('Dimora in ', '')
                    .replace('Camera ', '')
                    .replace('Residenza ', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Suite Editorial Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSuite.id}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch"
          >
            {/* Left Large Architectural Frame + Multi-Angle Real Photo Switcher */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative overflow-hidden bg-[#151311] aspect-[4/5] sm:aspect-[4/4] lg:aspect-auto lg:flex-1 lg:min-h-[540px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto.image}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                    className="absolute inset-0"
                  >
                    <ResilientImage
                      src={activePhoto.image}
                      alt={`${activeSuite.name} — ${activePhoto.label}`}
                      className={`w-full h-full object-cover ${activePhoto.objectPosition}`}
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B0A09]/85 via-[#0B0A09]/30 to-transparent pointer-events-none"
                />
                <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#F4F1EC]/90">
                  <span>{activePhoto.label}</span>
                  <span className="tabular-nums text-[#E6D6BC]">
                    {activeSuite.areaSqm} m² · Fino a {activeSuite.maxGuests} ospiti
                  </span>
                </div>
              </div>

              {/* Architectural Photo Strip for Exploring Real Room Angles */}
              {activeSuite.gallery.length > 1 && (
                <div
                  className="grid grid-cols-3 gap-3"
                  role="tablist"
                  aria-label={`Fotografie di ${activeSuite.name}`}
                >
                  {activeSuite.gallery.map((photo, idx) => {
                    const isCurrent = idx === activePhotoIndex;
                    return (
                      <button
                        key={photo.image}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`group relative overflow-hidden aspect-[4/3] bg-[#151311] border transition-all duration-200 cursor-pointer text-left ${
                          isCurrent
                            ? 'border-[#B5945B]'
                            : 'border-white/12 opacity-70 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <ResilientImage
                          src={photo.image}
                          alt={photo.label}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${photo.objectPosition}`}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0B0A09]/85 to-transparent"
                        />
                        <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] text-[#F4F1EC]/90 truncate">
                          {photo.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Architectural Dossier */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Clean unboxed metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#E6D6BC] mb-4">
                  <span>{activeSuite.category}</span>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <span>{activeSuite.bedConfig}</span>
                </div>

                <h3 className="font-serif font-normal text-3xl md:text-4xl text-[#F4F1EC] leading-tight mb-5">
                  {activeSuite.name}
                </h3>

                <p className="font-serif italic text-lg md:text-xl text-[#F4F1EC]/90 leading-relaxed mb-5">
                  {activeSuite.lead}
                </p>

                <p className="text-[15px] leading-[1.7] text-[#F4F1EC]/75 mb-8">
                  {activeSuite.description}
                </p>

                {/* Architectural Details */}
                <div className="pt-6 border-t border-white/12 mb-7">
                  <p className="text-xs font-medium tracking-[0.08em] text-[#B5945B] mb-3.5">
                    Dettagli della dimora
                  </p>
                  <ul className="space-y-2.5 text-sm text-[#F4F1EC]/85">
                    {activeSuite.architecturalNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-px bg-[#B5945B] shrink-0"
                        />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Included Comforts */}
                <div className="pt-6 border-t border-white/12 mb-8">
                  <p className="text-xs font-medium tracking-[0.08em] text-[#B5945B] mb-3.5">
                    Comfort inclusi
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#F4F1EC]/75">
                    {activeSuite.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B5945B] shrink-0" strokeWidth={1.75} />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Transparent Rate & Action Bar */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#F4F1EC]/60">Tariffa indicativa per notte</p>
                  <p className="font-serif text-2xl text-[#F4F1EC] tabular-nums">
                    Da €{activeSuite.rateFromEur}{' '}
                    <span className="font-sans text-xs text-[#F4F1EC]/60">· colazione inclusa</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectSuiteForBooking(activeSuite.id)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-[0.03em] text-[#0B0A09] bg-[#F4F1EC] hover:bg-[#B5945B] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Richiedi questa Dimora</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quiet 3-Column Overview Strip for Fast Direct Comparison */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUITES.map((suite) => {
            const isSelected = suite.id === activeSuite.id;
            return (
              <button
                key={suite.id}
                type="button"
                onClick={() => handleSelectSuite(suite.id)}
                className={`text-left p-5 border transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#B5945B]/70 bg-[#151311]'
                    : 'border-white/10 hover:border-white/25 bg-transparent'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="font-serif text-xl text-[#F4F1EC]">{suite.name}</span>
                  <span className="text-xs text-[#E6D6BC] tabular-nums shrink-0">
                    {suite.areaSqm} m²
                  </span>
                </div>
                <p className="text-xs text-[#F4F1EC]/65 leading-relaxed">
                  {suite.exposure} · Fino a {suite.maxGuests} ospiti · Da €{suite.rateFromEur}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
