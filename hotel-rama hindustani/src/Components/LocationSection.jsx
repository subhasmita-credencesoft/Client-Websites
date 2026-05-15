import React from 'react'
import Reveal from './Reveal'
import { contactDetails, locationPoints } from '../data/siteContent'

const LocationSection = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-6 py-16 section-shell'>
      <div className='grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center'>
        <Reveal className='glass-panel rounded-[2rem] p-8 border border-white/60 reveal-left'>
          <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Location</p>
          <h2 className='text-3xl md:text-5xl font-bold font-serif text-3d'>Conveniently Located</h2>
          <p className='mt-6 text-slate-600 leading-8'>
            Hotel Rama Hindustani is situated in a prime area of Jaipur with easy access to transport hubs, tourist attractions, and shopping areas.
          </p>
          <p className='mt-4 text-slate-800 font-medium'>{contactDetails.address}</p>
        </Reveal>
        <Reveal className='grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-right'>
          {locationPoints.map((point, index) => (
            <Reveal key={point} className='rounded-[1.5rem] bg-slate-900 text-white p-6 shadow-xl' delay={index * 70}>
              <p className='text-red-300 uppercase tracking-[0.28em] text-xs'>Nearby Access</p>
              <h3 className='mt-3 text-2xl font-semibold'>{point}</h3>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default LocationSection
