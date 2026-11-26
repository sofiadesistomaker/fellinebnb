import {useState} from 'react';
import {MotionConfig} from 'motion/react';
import {ArchitectureManifesto} from './components/ArchitectureManifesto';
import {CinemaHero} from './components/CinemaHero';
import {ContactSection} from './components/ContactSection';
import {EditorialGallery} from './components/EditorialGallery';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {ReservationDrawer} from './components/ReservationDrawer';
import {ReviewsSection} from './components/ReviewsSection';
import {RitualsParallax} from './components/RitualsParallax';
import {SalentoConcierge} from './components/SalentoConcierge';
import {SuitesShowcase} from './components/SuitesShowcase';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (suiteId?: string) => {
    setSelectedSuiteId(suiteId);
    setBookingOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0B0A09] text-[#F4F1EC]">
        <Navbar onOpenBooking={handleOpenBooking} />

        <main>
          <CinemaHero onOpenBooking={handleOpenBooking} />
          <ArchitectureManifesto />
          <SuitesShowcase onSelectSuiteForBooking={(id) => handleOpenBooking(id)} />
          <RitualsParallax />
          <EditorialGallery />
          <SalentoConcierge onOpenBooking={() => handleOpenBooking()} />
          <ReviewsSection onOpenBooking={() => handleOpenBooking()} />
          <ContactSection onOpenBooking={() => handleOpenBooking()} />
        </main>

        <Footer onOpenBooking={() => handleOpenBooking()} />

        <ReservationDrawer
          isOpen={bookingOpen}
          initialSuiteId={selectedSuiteId}
          onClose={() => setBookingOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
