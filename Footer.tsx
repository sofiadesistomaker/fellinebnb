import {buildWhatsAppUrl, PROPERTY_INFO} from '../data/fellineData';

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({onOpenBooking}: FooterProps) {
  return (
    <footer className="bg-[#070605] text-[#F4F1EC] border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Address */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#inizio"
              className="font-serif text-3xl font-normal tracking-[0.03em] text-[#F4F1EC] inline-block"
            >
              {PROPERTY_INFO.brandShort}
            </a>
            <p className="text-sm text-[#F4F1EC]/70 leading-relaxed max-w-sm">
              {PROPERTY_INFO.brandFull}. Ospitalità privata curata da {PROPERTY_INFO.hosts} nel
              borgo antico di Felline, a dieci minuti dalle acque del Mar Ionio.
            </p>
            <div className="text-xs text-[#E6D6BC] pt-1 space-y-1.5">
              <p>
                {PROPERTY_INFO.address} · {PROPERTY_INFO.website}
              </p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tabular-nums hover:text-[#F4F1EC] transition-colors underline underline-offset-4 decoration-[#B5945B]/60"
                >
                  WhatsApp: {PROPERTY_INFO.phoneDisplay}
                </a>
                <span aria-hidden="true" className="text-white/25">
                  ·
                </span>
                <a
                  href={PROPERTY_INFO.emailHref}
                  className="hover:text-[#F4F1EC] transition-colors underline underline-offset-4 decoration-[#B5945B]/60"
                >
                  {PROPERTY_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-medium tracking-[0.1em] text-[#B5945B]">Esplora</p>
            <ul className="space-y-2.5 text-sm text-[#F4F1EC]/75">
              <li>
                <a href="#dimora" className="hover:text-[#F4F1EC] transition-colors">
                  La Dimora
                </a>
              </li>
              <li>
                <a href="#suite" className="hover:text-[#F4F1EC] transition-colors">
                  Dimore e Suite
                </a>
              </li>
              <li>
                <a href="#rituali" className="hover:text-[#F4F1EC] transition-colors">
                  I Rituali della Casa
                </a>
              </li>
              <li>
                <a href="#galleria" className="hover:text-[#F4F1EC] transition-colors">
                  Atlante Fotografico
                </a>
              </li>
              <li>
                <a href="#salento" className="hover:text-[#F4F1EC] transition-colors">
                  Felline &amp; Conciergerie
                </a>
              </li>
              <li>
                <a href="#contatti" className="hover:text-[#F4F1EC] transition-colors">
                  Contatti &amp; WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Practical Notes & Direct Action */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-medium tracking-[0.1em] text-[#B5945B]">Informazioni</p>
            <p className="text-xs leading-relaxed text-[#F4F1EC]/65">
              Wi-Fi gratuito · Aria condizionata in tutte le camere · Noleggio biciclette gratuito ·
              Navetta aeroporto · Animali domestici ammessi · Adatto ai bambini.
            </p>
            <p className="text-xs leading-relaxed text-[#F4F1EC]/50">
              Nota di accessibilità: dimora storica distribuita su più livelli con scale in pietra,
              non adatta a ospiti con mobilità ridotta.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-xs font-medium tracking-[0.04em] text-[#E6D6BC] border-b border-[#B5945B]/70 pb-1 hover:text-[#F4F1EC] hover:border-[#F4F1EC] transition-colors cursor-pointer"
              >
                Richiedi disponibilità diretta
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-[0.04em] text-[#F4F1EC]/80 border-b border-white/25 pb-1 hover:text-[#B5945B] hover:border-[#B5945B] transition-colors"
              >
                Scrivi su WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#F4F1EC]/45">
          <p>
            © {new Date().getFullYear()} {PROPERTY_INFO.brandFull}. Tutti i diritti riservati.
          </p>
          <p className="tabular-nums">{PROPERTY_INFO.coordinates}</p>
        </div>
      </div>
    </footer>
  );
}
