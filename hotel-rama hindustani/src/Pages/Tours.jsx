import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import RoomCards from '../Components/RoomCards'

const Tours = () => {
  return (
    <>
      <Seo
        title='Rooms'
        description='Explore room options at Hotel Rama Hindustani including Economy Double Room, Standard Double Room, Deluxe Room, and Superior Double Room.'
      />
      <TopBanner text='Rooms' />
      <section className='max-w-7xl mx-auto px-4 md:px-6 py-14 section-shell'>
        <Reveal className='text-center mb-10'>
          <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Our Rooms</p>
          <h1 className='text-3xl md:text-5xl font-bold font-serif text-3d'>Choose The Right Stay For You</h1>
          <p className='mt-4 max-w-3xl mx-auto text-slate-600 leading-8'>
            From practical standard rooms to spacious family options, Hotel Rama Hindustani offers comfort and affordability for every guest.
          </p>
        </Reveal>
        <RoomCards />
      </section>
    </>
  )
}

export default Tours
