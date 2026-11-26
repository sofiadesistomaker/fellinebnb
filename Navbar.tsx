import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {PROPERTY_INFO} from '../data/fellineData';

interface NavbarProps {
  onOpenBooking: (suiteId?: string) => void;
}

const NAV_LINKS = [
  {label: 'La Dimora', href: '#dimora'},
  {label: 'Suite', href: '#suite'},
  {label: 'Rituali', href: '#rituali'},
  {label: 'Salento', href: '#salento'},
  {label: 'Contatti', href: '#contatti'},
];

export function Navbar({onOpenBooking}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#0B0A09]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-gradient-to-b from-[#0B0A09]/70 to-transparent'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single clean text wordmark */}
          <a
            href="#inizio"
            className="font-serif text-xl md:text-2xl font-medium tracking-[0.04em] text-[#F4F1EC] whitespace-nowrap shrink-0 hover:text-[#B5945B] transition-colors duration-200"
          >
            {PROPERTY_INFO.brandShort}
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Navigazione principale"
            className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-[0.04em] text-[#F4F1EC]/85"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#F4F1EC] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-[#B5945B] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single primary action (+ mobile menu trigger on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-medium tracking-[0.04em] text-[#0B0A09] bg-[#F4F1EC] hover:bg-[#B5945B] hover:text-[#0B0A09] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Prenota il Soggiorno
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F4F1EC] hover:text-[#B5945B] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{opacity: 0, y: -12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
            className="fixed inset-x-0 top-16 z-30 bg-[#0B0A09]/98 backdrop-blur-lg border-b border-white/10 px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-2xl text-[#F4F1EC] hover:text-[#B5945B] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#recensioni"
                onClick={() => setMobileOpen(false)}
                className="font-serif text-2xl text-[#F4F1EC] hover:text-[#B5945B] transition-colors"
              >
                Recensioni
              </a>
              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 px-6 text-sm font-medium tracking-[0.04em] text-[#0B0A09] bg-[#F4F1EC] hover:bg-[#B5945B] transition-colors cursor-pointer"
                >
                  Prenota il Soggiorno
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
