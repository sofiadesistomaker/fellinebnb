import {useState} from 'react';
import {ArrowRight, Star} from 'lucide-react';
import {ASSETS, GUEST_REVIEWS, PROPERTY_INFO, type GuestReview} from '../data/fellineData';
import {ResilientImage} from './ResilientImage';

interface ReviewsSectionProps {
  onOpenBooking: () => void;
}

type ReviewFilter = 'all' | GuestReview['category'];

const FILTER_OPTIONS: {id: ReviewFilter; label: string}[] = [
  {id: 'all', label: 'Tutte'},
  {id: 'ospitalita', label: 'Ospitalità'},
  {id: 'posizione', label: 'Posizione'},
  {id: 'rituali', label: 'Rituali & Dopocena'},
];

export function ReviewsSection({onOpenBooking}: ReviewsSectionProps) {
  const [filter, setFilter] = useState<ReviewFilter>('all');

  const filteredReviews =
    filter === 'all' ? GUEST_REVIEWS : GUEST_REVIEWS.filter((r) => r.category === filter);

  return (
    <section
      id="recensioni"
      className="bg-[#0B0A09] text-[#F4F1EC] pt-24 md:pt-36 border-t border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/12">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-[#B5945B] mb-4">
              06. Le voci degli ospiti · Google
            </p>
            <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#F4F1EC]">
              Un’accoglienza che rimane nella memoria.
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#E6D6BC]">
              <span className="font-serif text-2xl text-[#F4F1EC] tabular-nums">
                {PROPERTY_INFO.rating} / 5
              </span>
              <span className="inline-flex items-center gap-0.5 text-[#B5945B]" aria-label="4,6 su 5 stelle">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
                ))}
              </span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <span className="text-xs text-[#F4F1EC]/70 tabular-nums">
                Basato su {PROPERTY_INFO.reviewCount} recensioni pubbliche su Google
              </span>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Filtra recensioni per tema"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#151311] border border-white/10 self-start lg:self-end"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = option.id === filter;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(option.id)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4F1EC] text-[#0B0A09]'
                      : 'text-[#F4F1EC]/70 hover:text-[#F4F1EC]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between p-7 bg-[#151311] border border-white/10"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="inline-flex items-center gap-0.5 text-[#B5945B]" aria-label={`${review.rating} su 5 stelle`}>
                    {Array.from({length: review.rating}).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="text-xs text-[#F4F1EC]/50">{review.timeframe}</span>
                </div>

                <p className="font-serif text-xl leading-[1.5] text-[#F4F1EC] mb-6">
                  “{review.excerpt}”
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm font-medium text-[#F4F1EC]">{review.author}</p>
                  <p className="text-xs text-[#F4F1EC]/55 mt-0.5">{review.credentials}</p>
                </div>

                {review.hostReply && (
                  <p className="mt-4 pt-3 border-t border-white/8 text-xs italic text-[#E6D6BC]/85">
                    Risposta della dimora: “{review.hostReply}”
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Panoramic Twilight Conversion Finale */}
      <div className="relative mt-24 md:mt-32 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0">
          <ResilientImage
            src={ASSETS.terraceBench}
            alt="Terrazza panoramica al tramonto — Felline in B&B"
            className="w-full h-full object-cover object-[50%_46%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#0B0A09]/72 to-[#0B0A09]/65"
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <p className="text-xs font-medium tracking-[0.14em] text-[#E6D6BC] mb-5">
            Prenotazione diretta · {PROPERTY_INFO.hosts}
          </p>
          <h2 className="font-serif font-normal text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.06] text-[#F4F1EC] max-w-3xl mx-auto mb-6">
            Riservate la vostra dimora nel cuore del Salento.
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#F4F1EC]/80 max-w-xl mx-auto mb-10">
            Contattate direttamente Antonio e Nadia per conoscere le disponibilità stagionali,
            organizzare la navetta aeroportuale e personalizzare il vostro soggiorno a Felline.
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.04em] text-[#0B0A09] bg-[#F4F1EC] hover:bg-[#B5945B] transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <span>Richiedi Disponibilità &amp; Tariffe</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
