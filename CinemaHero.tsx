import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useScroll, useTransform} from 'motion/react';
import {ArrowDown, ArrowRight, Pause, Play} from 'lucide-react';
import {CINEMA_SCENES, PROPERTY_INFO} from '../data/fellineData';
import {ResilientImage} from './ResilientImage';

interface CinemaHeroProps {
  onOpenBooking: (suiteId?: string) => void;
}

const SCENE_DURATION_MS = 9000;

export function CinemaHero({onOpenBooking}: CinemaHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // GPU-composited scroll parallax transforms
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CINEMA_SCENES.length);
    }, SCENE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeIndex]);

  const currentScene = CINEMA_SCENES[activeIndex];

  return (
    <section
      id="inizio"
      ref={containerRef}
      aria-label="Presentazione cinematografica della dimora"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0B0A09] flex flex-col justify-between"
    >
      {/* Full-Screen 4K Cinema Reel Background with Scroll Parallax */}
      <motion.div
        style={{y: mediaY, scale: mediaScale}}
        className="absolute inset-0 will-change-transform"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentScene.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1]}}
            className="absolute inset-0"
          >
            <div
              className={`w-full h-full will-change-transform ${currentScene.motionClass} ${
                isPlaying ? '' : 'cinema-paused'
              }`}
            >
              <ResilientImage
                src={currentScene.image}
                alt={`${currentScene.title} — ${PROPERTY_INFO.brandFull}`}
                loading="eager"
                className={`w-full h-full object-cover ${currentScene.objectPosition}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Measured multi-stop cinema vignette ensuring >7:1 text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/92 via-[#0B0A09]/40 to-[#0B0A09]/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0B0A09]/74 via-[#0B0A09]/28 to-transparent"
        />
      </motion.div>

      {/* Top Spacer for Fixed Header */}
      <div className="h-20 md:h-24 shrink-0" />

      {/* Center-Left Editorial Focal Statement */}
      <motion.div
        style={{y: contentY, opacity: contentOpacity}}
        className="relative z-10 max-w-[1360px] w-full mx-auto px-6 md:px-10 py-10 md:py-16"
      >
        <div className="max-w-3xl">
          <p className="text-[13px] tracking-[0.08em] text-[#E6D6BC] mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>{PROPERTY_INFO.address}</span>
            <span aria-hidden="true" className="text-[#B5945B]">
              ·
            </span>
            <span>Dimora di Charme {PROPERTY_INFO.stars}</span>
            <span aria-hidden="true" className="text-[#B5945B]">
              ·
            </span>
            <span className="tabular-nums">
              {PROPERTY_INFO.rating} / 5 ({PROPERTY_INFO.reviewCount} recensioni)
            </span>
          </p>

          <h1 className="font-serif font-normal text-[#F4F1EC] text-[clamp(2.65rem,5.4vw,4.9rem)] leading-[1.03] tracking-[-0.015em] mb-6">
            Pietra viva, luce del Salento e l’arte rara dell’accoglienza.
          </h1>

          <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#F4F1EC]/85 max-w-xl mb-9">
            Nel cuore del borgo medievale di Felline, a dieci minuti dal Mar Ionio, una dimora
            autentica tra giardini di cactus monumentali, maioliche dipinte a mano, terrazze al
            tramonto e le serate d’autore curate da Antonio e Nadia.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#suite"
              className="inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium tracking-[0.03em] text-[#0B0A09] bg-[#F4F1EC] hover:bg-[#B5945B] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <span>Esplora le Suite</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 py-3 px-1 text-sm font-medium tracking-[0.03em] text-[#F4F1EC] border-b border-[#B5945B]/70 hover:border-[#F4F1EC] hover:text-[#E6D6BC] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Richiedi Disponibilità Privata
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Cinema Reel Director Controls */}
      <div className="relative z-10 w-full border-t border-white/15 bg-[#0B0A09]/45 backdrop-blur-sm">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-4 md:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Active Scene Architectural Caption */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Metti in pausa la sequenza cinematografica' : 'Riprendi la sequenza cinematografica'}
              className="inline-flex items-center justify-center w-10 h-10 border border-white/25 text-[#F4F1EC] hover:border-[#B5945B] hover:text-[#B5945B] transition-colors duration-200 shrink-0 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-[#E6D6BC]">
                <span className="font-serif italic text-sm">{currentScene.roman}.</span>
                <span className="font-medium text-[#F4F1EC] truncate">{currentScene.title}</span>
                <span aria-hidden="true" className="hidden sm:inline text-white/35">
                  ·
                </span>
                <span className="hidden sm:inline text-[#F4F1EC]/70 truncate">
                  {currentScene.locationNote}
                </span>
              </div>
              <p className="text-xs text-[#F4F1EC]/65 truncate mt-0.5">{currentScene.subtitle}</p>
            </div>
          </div>

          {/* 4-Chapter Interactive Reel Switcher */}
          <div className="flex items-center justify-between lg:justify-end gap-5">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full sm:w-auto" role="tablist" aria-label="Capitoli della dimora">
              {CINEMA_SCENES.map((scene, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(index)}
                    className="group text-left py-1.5 min-w-[56px] sm:min-w-[88px] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span
                        className={`font-serif transition-colors ${
                          isActive ? 'text-[#E6D6BC]' : 'text-[#F4F1EC]/50 group-hover:text-[#F4F1EC]/80'
                        }`}
                      >
                        {scene.roman}
                      </span>
                      <span
                        className={`hidden sm:inline truncate ml-2 transition-colors ${
                          isActive ? 'text-[#F4F1EC]' : 'text-[#F4F1EC]/45 group-hover:text-[#F4F1EC]/75'
                        }`}
                      >
                        {scene.title.split(' ').slice(-1)[0]}
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-white/15 overflow-hidden">
                      {isActive && (
                        <motion.div
                          key={`${scene.id}-${isPlaying ? 'play' : 'pause'}`}
                          initial={{scaleX: 0}}
                          animate={{scaleX: isPlaying ? 1 : 0.35}}
                          transition={{
                            duration: isPlaying ? SCENE_DURATION_MS / 1000 : 0.2,
                            ease: 'linear',
                          }}
                          className="h-full w-full bg-[#B5945B] origin-left"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <a
              href="#dimora"
              aria-label="Scorri alla storia della dimora"
              className="hidden xl:inline-flex items-center justify-center w-10 h-10 text-[#F4F1EC]/70 hover:text-[#B5945B] transition-colors shrink-0"
            >
              <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
