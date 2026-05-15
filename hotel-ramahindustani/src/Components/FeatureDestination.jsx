import React from 'react'
import Reveal from './Reveal'
import RoomCards from './RoomCards'

const FeatureDestination = () => {
  return (
    <section className='w-full py-12 md:py-16 px-4 md:px-0 section-shell'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <Reveal className='text-center mb-10'>
          <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Our Rooms</p>
          <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold font-serif text-3d'>Comfortable Stays For Every Guest</h2>
          <p className='mt-4 max-w-3xl mx-auto text-slate-600 leading-7 md:leading-8 text-sm sm:text-base'>
            Choose from practical, spacious, and family-friendly room types designed for a relaxing Jaipur stay.
          </p>
        </Reveal>
        <RoomCards compact />
      </div>
    </section>
  )
}

export default FeatureDestination
