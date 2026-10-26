import { About } from '@/components/sections/About';
import { CtaBand } from '@/components/sections/CtaBand';
import { Hero } from '@/components/sections/Hero';
import { Properties } from '@/components/sections/Properties';
import { Services } from '@/components/sections/Services';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Properties />
      <CtaBand />
    </>
  );
}
