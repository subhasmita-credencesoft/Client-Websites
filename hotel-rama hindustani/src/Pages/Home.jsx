import React, { Suspense, lazy } from 'react'
import Seo from '../Components/Seo'

const Hero = lazy(() => import('../Components/Hero'))
const FeatureDestination = lazy(() => import('../Components/FeatureDestination'))
const Banner = lazy(() => import('../Components/Banner'))
const Contact = lazy(() => import('../Components/ContactComp'))

const SectionLoader = () => (
  <div className='max-w-7xl mx-auto px-4 md:px-6 py-8'>
    <div className='glass-panel rounded-3xl h-28 animate-pulse'></div>
  </div>
)

const Home = () => {
  return (
    <>
      <Seo
        title='Home'
        description='Book Hotel Rama Hindustani in Jaipur for comfortable rooms, direct WhatsApp support, and easy online booking in Pratap Nagar.'
      />
      <Suspense fallback={<SectionLoader />}>
        <Hero />
        <FeatureDestination />
        <Banner />
        <Contact />
      </Suspense>
    </>
  )
}

export default Home
