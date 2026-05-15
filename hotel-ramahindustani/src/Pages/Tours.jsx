import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import RoomCards from '../Components/RoomCards'
import { hotelImages } from '../data/siteContent'

const Tours = () => {
  return (
    <>
      <Seo
        title='Rooms'
        description='Explore room options at Hotel Rama Hindustani including Economy Double Room, Standard Double Room, Deluxe Room, and Superior Double Room.'
      />
      <TopBanner text='Our Rooms' image={hotelImages.superiorRoom} />

      <section className='py-16 md:py-24'>
        <div className='section-container'>
          <Reveal className='text-center mb-14'>
            <p className='section-subtitle'>Accommodations</p>
            <h2 className='section-title'>Choose The Right Stay For You</h2>
            <p className='mt-4 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
              From practical standard rooms to spacious family options, we offer comfort and
              affordability for every guest.
            </p>
          </Reveal>
          <RoomCards />
        </div>
      </section>
    </>
  )
}

export default Tours
