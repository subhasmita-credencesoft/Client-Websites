import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import RoomsGrid from '@/components/sections/RoomsGrid';
import AmenitiesGrid from '@/components/sections/AmenitiesGrid';
import DiningPreview from '@/components/sections/DiningPreview';
import EventsPreview from '@/components/sections/EventsPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NearbyAttractionsGrid from '@/components/sections/NearbyAttractionsGrid';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <RoomsGrid />
        <AmenitiesGrid />
        <DiningPreview />
        <EventsPreview />
        <TestimonialsSection />
        <NearbyAttractionsGrid />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
