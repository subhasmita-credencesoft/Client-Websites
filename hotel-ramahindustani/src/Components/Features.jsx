import React from 'react'
import Reveal from './Reveal'
import ServicesGrid from './ServicesGrid'

const Features = () => {
  return (
    <section className='py-16 section-shell'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <Reveal className='text-center mb-12'>
          <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Services & Amenities</p>
          <h2 className='text-3xl md:text-5xl font-bold font-serif text-3d'>Hotel Facilities</h2>
          <p className='mt-4 text-slate-600 md:text-xl max-w-3xl mx-auto'>
            Everything you need for a smooth, secure, and affordable stay at Hotel Rama Hindustani.
          </p>
        </Reveal>
        <ServicesGrid />
      </div>
    </section>
  )
}

export default Features
