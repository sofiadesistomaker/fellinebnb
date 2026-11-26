import {useCallback, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronLeft, ChevronRight, Expand, X} from 'lucide-react';
import {GALLERY_PLATES} from '../data/fellineData';
import {ResilientImage} from './ResilientImage';

export function EditorialGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PLATES.length) % GALLERY_PLATES.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_PLATES.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activePlate = lightboxIndex !== null ? GALLERY_PLATES[lightboxIndex] : null;

  return (
    <section
      id="galleria"
      className="bg-[#0B0A09] text-[#F4F1EC] py-24 md:py-36 border-t border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.12em] text-[#B5945B] mb-4">
              04. Atlante fotografico · Luce e materia
            </p>
            <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#F4F1EC]">
              Ogni dettaglio architettonico cambia voce dal mattino alla sera.
            </h2>
          </div>
          <p className="text-xs text-[#F4F1EC]/65 max-w-xs leading-relaxed">
            Selezionate qualsiasi tavola per aprirla a schermo intero e leggerne le note materiche.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {GALLERY_PLATES.map((plate, index) => (
            <button
              key={plate.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className={`group relative text-left overflow-hidden bg-[#151311] border border-white/10 cursor-pointer ${plate.spanClass} ${plate.aspectClass}`}
            >
              <ResilientImage
                src={plate.image}
                alt={plate.title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform ${plate.objectPosition}`}
              />

              {/* Subtle scrim for guaranteed metadata legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/88 via-[#0B0A09]/18 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300"
              />

              <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-[#0B0A09]/65 border border-white/20 text-[#F4F1EC] opacity-80 group-hover:opacity-100 group-hover:border-[#B5945B] transition-all duration-200">
                <Expand className="w-3.5 h-3.5" strokeWidth={1.5} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#E6D6BC] mb-1.5">
                  <span>{plate.area}</span>
                  <span aria-hidden="true" className="text-white/35">
                    ·
                  </span>
                  <span>{plate.lightHour}</span>
                </div>
                <h3 className="font-serif font-normal text-xl md:text-2xl text-[#F4F1EC] leading-snug">
                  {plate.title}
                </h3>
                <p className="text-xs text-[#F4F1EC]/70 mt-1 line-clamp-1">{plate.material}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Architectural Lightbox */}
      <AnimatePresence>
        {activePlate && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePlate.title}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-50 bg-[#0B0A09]/96 backdrop-blur-md flex flex-col justify-between p-5 md:p-10"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between gap-6 max-w-[1360px] w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs text-[#E6D6BC] tabular-nums">
                Tavola {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(GALLERY_PLATES.length).padStart(2, '0')}
                <span aria-hidden="true" className="mx-2 text-white/35">
                  ·
                </span>
                <span className="text-[#F4F1EC]/75">{activePlate.area}</span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Chiudi galleria"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#F4F1EC] border border-white/20 hover:border-[#B5945B] hover:text-[#B5945B] transition-colors cursor-pointer"
              >
                <span>Chiudi</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Center High-Resolution Media + Controls */}
            <div
              className="relative flex-1 flex items-center justify-center my-6 max-w-[1280px] w-full mx-auto min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Fotografia precedente"
                className="hidden md:inline-flex items-center justify-center w-12 h-12 border border-white/20 text-[#F4F1EC] hover:border-[#B5945B] hover:text-[#B5945B] transition-colors mr-6 shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-full h-full max-h-[68vh] flex items-center justify-center overflow-hidden">
                <ResilientImage
                  src={activePlate.image}
                  alt={activePlate.title}
                  className="max-h-[68vh] max-w-full w-auto h-auto object-contain"
                />
              </div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Fotografia successiva"
                className="hidden md:inline-flex items-center justify-center w-12 h-12 border border-white/20 text-[#F4F1EC] hover:border-[#B5945B] hover:text-[#B5945B] transition-colors ml-6 shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption & Mobile Navigation */}
            <div
              className="max-w-[1360px] w-full mx-auto pt-5 border-t border-white/12 flex flex-col md:flex-row md:items-end justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-2xl">
                <h3 className="font-serif text-2xl md:text-3xl text-[#F4F1EC]">
                  {activePlate.title}
                </h3>
                <p className="text-sm text-[#F4F1EC]/75 mt-1.5 leading-relaxed">
                  {activePlate.caption}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="text-xs text-[#E6D6BC]">
                  {activePlate.material} · {activePlate.lightHour}
                </span>
                <div className="flex md:hidden items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Precedente"
                    className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-[#F4F1EC] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Successiva"
                    className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-[#F4F1EC] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
