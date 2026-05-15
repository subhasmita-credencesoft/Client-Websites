import React, { Suspense, lazy } from 'react'
import Seo from '../Components/Seo'

const Hero = lazy(() => import('../Components/Hero'))
const Features = lazy(() => import('../Components/Features'))
const FeatureDestination = lazy(() => import('../Components/FeatureDestination'))
const ReviewsSection = lazy(() => import('../Components/ReviewsSection'))
const Banner = lazy(() => import('../Components/Banner'))
const Contact = lazy(() => import('../Components/ContactComp'))

const SectionLoader = () => (
  <div className='section-container py-12'>
    <div className='h-28 rounded-2xl bg-[#f5f0eb] animate-pulse' />
  </div>
)

const Home = () => (
  <>
    <Seo
      title='Home'
      description='Book Hotel Rama Hindustani in Jaipur for comfortable rooms, direct WhatsApp support, and easy online booking in Pratap Nagar.'
    />
    <Suspense fallback={<SectionLoader />}>
      <Hero />
      <Features />
      <FeatureDestination />
      <ReviewsSection />
      <Banner />
      <Contact />
    </Suspense>
  </>
)

export default Home
