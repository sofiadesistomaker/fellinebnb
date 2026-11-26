import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight, Compass} from 'lucide-react';
import {
  CONCIERGE_GROUPS,
  PROPERTY_INFO,
  TERRITORY_DESTINATIONS,
  type ConciergeServiceGroup,
} from '../data/fellineData';

interface SalentoConciergeProps {
  onOpenBooking: () => void;
}

export function SalentoConcierge({onOpenBooking}: SalentoConciergeProps) {
  const [selectedDestId, setSelectedDestId] = useState(TERRITORY_DESTINATIONS[0].id);
  const [activeServiceTab, setActiveServiceTab] =
    useState<ConciergeServiceGroup['id']>('esperienze');

  const activeDest =
    TERRITORY_DESTINATIONS.find((d) => d.id === selectedDestId) || TERRITORY_DESTINATIONS[0];
  const activeGroup =
    CONCIERGE_GROUPS.find((g) => g.id === activeServiceTab) || CONCIERGE_GROUPS[0];

  return (
    <section id="salento" className="bg-[#F4F1EC] text-[#171513] py-24 md:py-36">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-medium tracking-[0.12em] text-[#8A6D3B] mb-4">
            05. Il borgo di Felline e il Basso Salento
          </p>
          <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#171513] mb-5">
            Quiete medievale di giorno, vita gastronomica la sera, mare turchese a dieci minuti.
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#4A443C]">
            La posizione in {PROPERTY_INFO.address} consente di raggiungere con facilità le spiagge
            più celebri della costa ionica, rientrando la sera nella calma elegante di un borgo
            ricco di osterie d’eccellenza.
          </p>
        </div>

        {/* Two-Column Architectural Split: Territory Atlas + Concierge Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Interactive Proximity Atlas */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#171513]/15 mb-2">
              <h3 className="font-serif text-2xl text-[#171513]">Distanze dalla Dimora</h3>
              <span className="text-xs text-[#5A534A] tabular-nums">
                {PROPERTY_INFO.coordinates}
              </span>
            </div>

            <div className="divide-y divide-[#171513]/12" role="tablist" aria-label="Destinazioni del Salento">
              {TERRITORY_DESTINATIONS.map((dest) => {
                const isSelected = dest.id === activeDest.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedDestId(dest.id)}
                    className={`w-full text-left py-4 px-3 -mx-3 transition-colors duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected ? 'bg-[#EAE4DA]' : 'hover:bg-[#EAE4DA]/55'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-serif text-xl text-[#171513] truncate">{dest.name}</p>
                      <p className="text-xs text-[#5A534A] mt-0.5">{dest.direction}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-[#171513] tabular-nums">
                        {dest.travelTime}
                      </p>
                      <p className="text-xs text-[#8A6D3B] tabular-nums">{dest.distance}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Destination Editorial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -6}}
                transition={{duration: 0.2}}
                className="mt-6 p-6 md:p-8 bg-[#EAE4DA] border border-[#171513]/10"
              >
                <div className="flex items-center justify-between gap-4 text-xs text-[#8A6D3B] font-medium mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {activeDest.direction}
                  </span>
                  <span className="tabular-nums">
                    {activeDest.distance} · {activeDest.travelTime}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-[#171513] mb-3">{activeDest.name}</h4>
                <p className="text-sm leading-[1.7] text-[#4A443C] mb-5">
                  {activeDest.description}
                </p>
                <div className="pt-4 border-t border-[#171513]/12">
                  <p className="text-xs font-medium text-[#171513] mb-1">
                    Il consiglio di Antonio e Nadia
                  </p>
                  <p className="text-xs leading-relaxed text-[#5A534A]">{activeDest.hostTip}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Curated Concierge & Real Services */}
          <div className="lg:col-span-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171513]/15 mb-6">
              <h3 className="font-serif text-2xl text-[#171513]">Servizi &amp; Conciergerie</h3>

              {/* Interactive Service Category Tabs */}
              <div
                role="tablist"
                aria-label="Categorie di servizi"
                className="flex items-center gap-1 p-1 bg-[#EAE4DA] self-start sm:self-auto"
              >
                {CONCIERGE_GROUPS.map((group) => {
                  const isActive = group.id === activeServiceTab;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveServiceTab(group.id)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#171513] text-[#F4F1EC]'
                          : 'text-[#5A534A] hover:text-[#171513]'
                      }`}
                    >
                      {group.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.id}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -6}}
                transition={{duration: 0.2}}
                className="divide-y divide-[#171513]/12"
              >
                {activeGroup.items.map((item) => (
                  <div key={item.title} className="py-5 first:pt-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                      <h4 className="text-base font-medium text-[#171513]">{item.title}</h4>
                      {item.note && (
                        <span className="text-xs font-medium text-[#8A6D3B]">{item.note}</span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-[#4A443C]">{item.detail}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Concierge Callout */}
            <div className="mt-8 pt-6 border-t border-[#171513]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <p className="font-serif text-xl text-[#171513]">
                  Soggiorno su misura nel Salento
                </p>
                <p className="text-xs text-[#5A534A] mt-1">
                  Transfer aeroportuale, biciclette, uscite in barca o richieste speciali.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium tracking-[0.03em] text-[#F4F1EC] bg-[#171513] hover:bg-[#8A6D3B] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Organizza il Soggiorno</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
