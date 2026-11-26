import {type FormEvent, useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {AlertCircle, CheckCircle2, MessageCircle, X} from 'lucide-react';
import {buildWhatsAppUrl, PROPERTY_INFO, SUITES} from '../data/fellineData';

interface ReservationDrawerProps {
  isOpen: boolean;
  initialSuiteId?: string;
  onClose: () => void;
}

const CONCIERGE_OPTIONS = [
  {id: 'navetta', label: 'Navetta aeroporto (Brindisi / Bari)'},
  {id: 'bici', label: 'Biciclette gratuite in dimora'},
  {id: 'pet', label: 'Viaggio con animale domestico'},
  {id: 'degustazione', label: 'Dopocena in corte con rum e cioccolato'},
];

function getDefaultDates() {
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 14);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 3);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return {checkIn: fmt(checkIn), checkOut: fmt(checkOut)};
}

export function ReservationDrawer({
  isOpen,
  initialSuiteId,
  onClose,
}: ReservationDrawerProps) {
  const defaults = useMemo(() => getDefaultDates(), []);

  const [suiteId, setSuiteId] = useState(initialSuiteId || SUITES[0].id);
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['bici']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialSuiteId) {
      setSuiteId(initialSuiteId);
    }
  }, [initialSuiteId]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const selectedSuite = SUITES.find((s) => s.id === suiteId) || SUITES[0];

  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Number.isFinite(diff) && diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const estimatedTotal = nights > 0 ? nights * selectedSuite.rateFromEur : 0;

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (nights <= 0) {
      setErrorMessage('La data di check-out deve essere successiva al check-in.');
      return;
    }
    if (fullName.trim().length < 2) {
      setErrorMessage('Inserite il vostro nome e cognome per completare la richiesta.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Inserite un indirizzo email valido per ricevere risposta da Antonio e Nadia.');
      return;
    }

    const code = `FLN-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
  };

  const handleReset = () => {
    setConfirmationCode(null);
    setErrorMessage(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Richiesta di soggiorno a Felline in B&B"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0A09]/78 backdrop-blur-sm"
          />

          {/* Slide-Over Concierge Panel */}
          <motion.div
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
            className="relative z-10 w-full max-w-xl bg-[#F4F1EC] text-[#171513] h-full overflow-y-auto flex flex-col justify-between border-l border-[#171513]/15"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#F4F1EC]/95 backdrop-blur-sm px-6 md:px-9 py-6 border-b border-[#171513]/12 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.1em] text-[#8A6D3B]">
                  Conciergerie Diretta · {PROPERTY_INFO.hosts}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-[#171513] mt-0.5">
                  Richiedi il tuo Soggiorno
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi pannello prenotazione"
                className="inline-flex items-center justify-center w-10 h-10 border border-[#171513]/20 text-[#171513] hover:border-[#8A6D3B] hover:text-[#8A6D3B] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 md:px-9 py-8 flex-1">
              {confirmationCode ? (
                <div className="py-6 space-y-6">
                  <div className="flex items-start gap-3.5 text-[#171513]">
                    <CheckCircle2 className="w-6 h-6 text-[#8A6D3B] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div>
                      <p className="text-xs font-medium tracking-[0.1em] text-[#8A6D3B]">
                        Richiesta registrata · Rif. {confirmationCode}
                      </p>
                      <h3 className="font-serif text-3xl text-[#171513] mt-1">
                        Grazie, {fullName}.
                      </h3>
                      <p className="text-sm leading-relaxed text-[#4A443C] mt-3">
                        Antonio e Nadia hanno ricevuto il vostro dossier di soggiorno e vi
                        risponderanno personalmente all’indirizzo{' '}
                        <strong className="font-medium text-[#171513]">{email}</strong> con la
                        conferma della disponibilità e le tariffe stagionali dedicate.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#EAE4DA] border border-[#171513]/10 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5A534A]">Dimora scelta</span>
                      <span className="font-medium text-[#171513] text-right">
                        {selectedSuite.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5A534A]">Periodo</span>
                      <span className="font-medium text-[#171513] tabular-nums">
                        {checkIn} → {checkOut} ({nights} {nights === 1 ? 'notte' : 'notti'})
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5A534A]">Ospiti</span>
                      <span className="font-medium text-[#171513] tabular-nums">{guests}</span>
                    </div>
                    <div className="pt-3 border-t border-[#171513]/12 flex justify-between gap-4">
                      <span className="text-[#5A534A]">Stima indicativa (colazione inclusa)</span>
                      <span className="font-serif text-xl text-[#171513] tabular-nums">
                        €{estimatedTotal}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={buildWhatsAppUrl(
                        `Buongiorno Antonio e Nadia, ho inviato la richiesta ${confirmationCode} per ${selectedSuite.name} (${checkIn} - ${checkOut}, ${guests} ospiti).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#F4F1EC] bg-[#171513] hover:bg-[#8A6D3B] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                      <span>Invia anche su WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-3 text-sm font-medium text-[#171513] border-b border-[#171513]/30 hover:border-[#8A6D3B] cursor-pointer"
                    >
                      Modifica richiesta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Suite Selector */}
                  <div>
                    <label
                      htmlFor="booking-suite"
                      className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                    >
                      Dimora preferita
                    </label>
                    <select
                      id="booking-suite"
                      value={suiteId}
                      onChange={(e) => setSuiteId(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#171513]/20 text-[#171513] focus:border-[#8A6D3B] focus:outline-none"
                    >
                      {SUITES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — Da €{s.rateFromEur} / notte ({s.areaSqm} m²)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Check-in / Check-out / Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="booking-checkin"
                        className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                      >
                        Check-in
                      </label>
                      <input
                        id="booking-checkin"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] tabular-nums focus:border-[#8A6D3B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-checkout"
                        className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                      >
                        Check-out
                      </label>
                      <input
                        id="booking-checkout"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] tabular-nums focus:border-[#8A6D3B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-guests"
                        className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                      >
                        Ospiti
                      </label>
                      <select
                        id="booking-guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] tabular-nums focus:border-[#8A6D3B] focus:outline-none"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'ospite' : 'ospiti'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Estimate Summary */}
                  <div className="p-4 bg-[#EAE4DA] border border-[#171513]/10 flex items-center justify-between gap-4">
                    <div className="text-xs text-[#4A443C]">
                      <p className="font-medium text-[#171513]">
                        {nights > 0
                          ? `${nights} ${nights === 1 ? 'notte' : 'notti'} · Colazione artigianale inclusa`
                          : 'Selezionate un periodo valido'}
                      </p>
                      <p className="mt-0.5 text-[#5A534A]">
                        Nessun addebito immediato · Conferma diretta con gli host
                      </p>
                    </div>
                    <p className="font-serif text-2xl text-[#171513] tabular-nums shrink-0">
                      {nights > 0 ? `€${estimatedTotal}` : '—'}
                    </p>
                  </div>

                  {/* Concierge Preferences */}
                  <div>
                    <p className="text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2.5">
                      Attenzioni e servizi desiderati
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CONCIERGE_OPTIONS.map((opt) => {
                        const checked = selectedOptions.includes(opt.id);
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-start gap-2.5 p-3 text-xs border transition-colors cursor-pointer ${
                              checked
                                ? 'bg-white border-[#8A6D3B] text-[#171513]'
                                : 'bg-transparent border-[#171513]/15 text-[#4A443C] hover:border-[#171513]/30'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleOption(opt.id)}
                              className="mt-0.5 accent-[#8A6D3B]"
                            />
                            <span>{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#171513]/12">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                      >
                        Nome e cognome *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        placeholder="Es. Lorenzo Moretti"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] placeholder:text-[#5A534A]/50 focus:border-[#8A6D3B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                      >
                        Email *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        placeholder="nome@esempio.it"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] placeholder:text-[#5A534A]/50 focus:border-[#8A6D3B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                      >
                        Telefono / WhatsApp
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        placeholder="+39 333 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] placeholder:text-[#5A534A]/50 focus:border-[#8A6D3B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-medium tracking-[0.06em] text-[#5A534A] mb-2"
                    >
                      Note o richieste particolari
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      placeholder="Orario indicativo di arrivo, allergie alimentari per la colazione, escursioni desiderate..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-[#171513]/20 text-[#171513] placeholder:text-[#5A534A]/50 focus:border-[#8A6D3B] focus:outline-none resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 bg-[#991B1B]/10 border border-[#991B1B]/30 text-xs text-[#7F1D1D]"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-sm font-medium tracking-[0.04em] text-[#F4F1EC] bg-[#171513] hover:bg-[#8A6D3B] transition-colors duration-200 cursor-pointer"
                  >
                    Invia Richiesta ad Antonio e Nadia
                  </button>
                </form>
              )}
            </div>

            {/* Quiet Footer Note inside Drawer */}
            <div className="px-6 md:px-9 py-4 border-t border-[#171513]/12 text-xs text-[#5A534A] flex flex-wrap items-center justify-between gap-2">
              <a
                href={PROPERTY_INFO.emailHref}
                className="hover:text-[#8A6D3B] transition-colors underline underline-offset-4 decoration-[#171513]/20"
              >
                {PROPERTY_INFO.email}
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#171513] hover:text-[#8A6D3B] transition-colors tabular-nums underline underline-offset-4 decoration-[#8A6D3B]/50"
              >
                WhatsApp {PROPERTY_INFO.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
