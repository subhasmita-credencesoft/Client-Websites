import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import ServicesGrid from '../Components/ServicesGrid'
import { hotelImages } from '../data/siteContent'

const Services = () => {
  return (
    <>
      <Seo
        title='Services'
        description='See the hotel services and amenities at Hotel Rama Hindustani including room service, Wi-Fi, reception support, and guest facilities.'
      />
      <TopBanner text='Services' image={hotelImages.reception} />

      <section className='py-16 md:py-24'>
        <div className='section-container'>
          <Reveal className='text-center mb-14'>
            <p className='section-subtitle'>Amenities</p>
            <h2 className='section-title'>Everything You Need For A Relaxed Stay</h2>
            <p className='mt-4 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
              We provide all the modern amenities to ensure your stay is comfortable and hassle-free.
            </p>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>
    </>
  )
}

export default Services
