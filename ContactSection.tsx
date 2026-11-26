import {useState} from 'react';
import {ArrowUpRight, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {buildWhatsAppUrl, PROPERTY_INFO} from '../data/fellineData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

const WHATSAPP_TOPICS = [
  {
    id: 'disponibilita',
    label: 'Disponibilità & Tariffe',
    message:
      'Buongiorno Antonio e Nadia, vorrei conoscere disponibilità e tariffe per un soggiorno presso Felline in B&B.',
  },
  {
    id: 'suite',
    label: 'Consiglio sulla Suite',
    message:
      'Buongiorno Antonio e Nadia, vorrei un consiglio sulla suite più adatta alle nostre esigenze a Felline in B&B.',
  },
  {
    id: 'navetta',
    label: 'Navetta & Esperienze',
    message:
      'Buongiorno Antonio e Nadia, vorrei informazioni sulla navetta aeroportuale e le esperienze nel Salento.',
  },
];

export function ContactSection({onOpenBooking}: ContactSectionProps) {
  const [activeTopicId, setActiveTopicId] = useState(WHATSAPP_TOPICS[0].id);
  const activeTopic =
    WHATSAPP_TOPICS.find((t) => t.id === activeTopicId) || WHATSAPP_TOPICS[0];

  const whatsappUrl = buildWhatsAppUrl(activeTopic.message);

  return (
    <section
      id="contatti"
      className="bg-[#F4F1EC] text-[#171513] py-24 md:py-32 border-t border-[#171513]/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Direct Hospitality Narrative & Address */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] text-[#8A6D3B] mb-4">
                07. Contatti diretti · Linea con gli host
              </p>
              <h2 className="font-serif font-normal text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[#171513] mb-6">
                Parlate direttamente con Antonio e Nadia.
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#4A443C] max-w-xl">
                Nessun intermediario né centralini automatici. Per conoscere le tariffe stagionali,
                chiedere un consiglio sul periodo migliore o organizzare il vostro arrivo nel
                Salento, potete scriverci su WhatsApp con un solo click o telefonare direttamente in
                dimora.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#171513]/12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs font-medium tracking-[0.08em] text-[#8A6D3B] mb-1.5">
                  Indirizzo della dimora
                </p>
                <p className="text-[#171513] font-medium">{PROPERTY_INFO.address}</p>
                <p className="text-xs text-[#5A534A] mt-1">{PROPERTY_INFO.region}</p>
              </div>

              <div>
                <p className="text-xs font-medium tracking-[0.08em] text-[#8A6D3B] mb-1.5">
                  Email &amp; Sito web
                </p>
                <a
                  href={PROPERTY_INFO.emailHref}
                  className="inline-flex items-center gap-1.5 text-[#171513] font-medium hover:text-[#8A6D3B] transition-colors underline underline-offset-4 decoration-[#171513]/25 hover:decoration-[#8A6D3B]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8A6D3B] shrink-0" strokeWidth={1.75} />
                  <span>{PROPERTY_INFO.email}</span>
                </a>
                <p className="text-xs text-[#5A534A] mt-1 tabular-nums">
                  {PROPERTY_INFO.website} · {PROPERTY_INFO.coordinates}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp & Phone Dossier */}
          <div className="lg:col-span-6 bg-[#EAE4DA] border border-[#171513]/12 p-7 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.1em] text-[#8A6D3B] mb-3">
                Telefono &amp; WhatsApp Diretto
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-3 font-serif text-4xl sm:text-5xl text-[#171513] hover:text-[#8A6D3B] transition-colors duration-200 tabular-nums"
              >
                <span>{PROPERTY_INFO.phoneDisplay}</span>
                <ArrowUpRight className="w-6 h-6 text-[#8A6D3B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </a>

              <p className="text-xs text-[#5A534A] mt-2">
                Risposta rapida su WhatsApp · Tutti i giorni per informazioni e prenotazioni dirette
              </p>

              {/* Quick Topic Selector to pre-fill the WhatsApp message */}
              <div className="mt-8 pt-6 border-t border-[#171513]/12">
                <p className="text-xs font-medium text-[#171513] mb-3">
                  Scegliete l’argomento del messaggio WhatsApp
                </p>
                <div
                  role="tablist"
                  aria-label="Argomento messaggio WhatsApp"
                  className="flex flex-wrap gap-1.5"
                >
                  {WHATSAPP_TOPICS.map((topic) => {
                    const isSelected = topic.id === activeTopic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveTopicId(topic.id)}
                        className={`px-3.5 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#171513] text-[#F4F1EC]'
                            : 'bg-[#F4F1EC] text-[#4A443C] hover:text-[#171513]'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs italic text-[#5A534A] leading-relaxed">
                  “{activeTopic.message}”
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#171513]/12 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-[0.03em] text-[#F4F1EC] bg-[#171513] hover:bg-[#8A6D3B] transition-colors duration-200 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                <span>Apri Chat su WhatsApp</span>
              </a>

              <a
                href={PROPERTY_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#171513] border border-[#171513]/25 hover:border-[#8A6D3B] hover:text-[#8A6D3B] transition-colors duration-200 whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4" strokeWidth={1.75} />
                <span>Chiama Ora</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-1.5 sm:ml-auto py-2 text-xs font-medium text-[#5A534A] hover:text-[#171513] border-b border-transparent hover:border-[#8A6D3B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Modulo Soggiorno</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
