import React from 'react';
import HeroCinematic from '@/components/home/HeroCinematic';
import FeaturedRooms from '@/components/home/FeaturedRooms';
import AboutSection from '@/components/home/AboutSection';
import FacilitiesGrid from '@/components/home/FacilitiesGrid';
import DiningSpotlight from '@/components/home/DiningSpotlight';
import ExperiencesShowcase from '@/components/home/ExperiencesShowcase';
import ReviewsSlider from '@/components/home/ReviewsSlider';
import LocationSection from '@/components/home/LocationSection';
import QuickBookingBanner from '@/components/home/QuickBookingBanner';

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <FeaturedRooms />
      <AboutSection />
      <FacilitiesGrid />
      <DiningSpotlight />
      <ExperiencesShowcase />
      <ReviewsSlider />
      <LocationSection />
      <QuickBookingBanner />
    </>
  );
}
