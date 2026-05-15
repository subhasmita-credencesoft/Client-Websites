import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import { hotelImages } from '../data/siteContent'

const About = () => {
  return (
    <div>
      <Seo
        title='About Us'
        description='Learn more about Hotel Rama Hindustani, a welcoming Jaipur hotel offering clean rooms, homely food, and practical comfort for every guest.'
      />
      <TopBanner text='About Us' />
      <div className='max-w-7xl mx-auto my-12 px-4 md:px-6 section-shell'>
        <div className='grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start'>
          <Reveal className='reveal-left'>
            <div className='rounded-[2rem] overflow-hidden shadow-2xl'>
              <img
                src={hotelImages.receptionAlt}
                alt="Hotel Rama Hindustani"
                loading='lazy'
                decoding='async'
                className='w-full h-full object-cover min-h-[420px]'
              />
            </div>
          </Reveal>
          <Reveal className='glass-panel rounded-[2rem] p-8 border border-white/60 reveal-right'>
            <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>About Hotel Rama Hindustani</p>
            <h1 className='text-3xl md:text-5xl font-bold font-serif text-3d'>Comfortable stays with warm Indian hospitality.</h1>
            <p className='mt-6 text-slate-600 leading-8'>
              Hotel Rama Hindustani is a 3-star hotel dedicated to providing guests with a comfortable and memorable stay. Located near key attractions and transport hubs, we ensure easy accessibility and convenience.
            </p>
            <p className='mt-5 text-slate-600 leading-8'>
              Our hotel is known for clean and well-maintained rooms, friendly and professional staff, delicious homely food, and a peaceful and secure environment.
            </p>
            <p className='mt-5 text-slate-600 leading-8'>
              Whether you are visiting Jaipur for business or leisure, we aim to make your stay relaxing, practical, and enjoyable.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

export default About
