import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import ServicesGrid from '../Components/ServicesGrid'

const Services = () => {
  return (
    <>
      <Seo
        title='Services'
        description='See the hotel services and amenities at Hotel Rama Hindustani including room service, Wi-Fi, reception support, and guest facilities.'
      />
      <TopBanner text='Services' />
      <section className='max-w-7xl mx-auto px-4 md:px-6 py-14 section-shell'>
        <Reveal className='text-center mb-10'>
          <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Services & Amenities</p>
          <h1 className='text-3xl md:text-5xl font-bold font-serif text-3d'>Everything You Need For A Relaxed Stay</h1>
        </Reveal>
        <ServicesGrid />
      </section>
    </>
  )
}

export default Services
