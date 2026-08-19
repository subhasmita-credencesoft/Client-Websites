import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { About } from '@/components/sections/About';
import { RoomsGrid } from '@/components/sections/RoomsGrid';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { Gallery } from '@/components/sections/Gallery';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <About />
      <RoomsGrid />
      <Services />
      <Testimonials />
      <Gallery />
      <ContactSection />
    </>
  );
}
