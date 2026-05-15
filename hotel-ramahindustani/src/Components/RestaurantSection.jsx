import React from 'react'
import Reveal from './Reveal'
import { hotelImages } from '../data/siteContent'
import { BOOKING_ENGINE_URL } from '../utils/booking'

const offerings = [
  'Delicious Indian cuisine',
  'Freshly prepared meals',
  'Hygienic cooking',
  'Breakfast, lunch & dinner',
]

const RestaurantSection = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-6 py-16 section-shell'>
      <div className='grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center'>
        <Reveal className='reveal-left'>
          <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Restaurant</p>
          <h2 className='text-3xl md:text-5xl font-bold font-serif text-3d'>Taste the Flavors of India</h2>
          <p className='mt-6 text-slate-600 leading-8'>
            Our in-house restaurant serves delicious Indian meals prepared with care, hygiene, and a homely touch. Guests can enjoy breakfast, lunch, and dinner in a relaxed and family-friendly setting.
          </p>
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {offerings.map((item, index) => (
              <Reveal key={item} className='glass-panel rounded-2xl p-4 border border-white/60' delay={index * 70}>
                <div className='flex items-center gap-3 text-slate-800'>
                  <span className='h-2.5 w-2.5 rounded-full bg-red-500'></span>
                  <span className='font-medium'>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal className='reveal-right'>
          <div
            className='rounded-[2rem] overflow-hidden shadow-2xl min-h-[420px] p-8 text-white flex flex-col justify-between bg-cover bg-center'
            style={{ backgroundImage: `linear-gradient(135deg, rgba(127,29,29,.82), rgba(17,24,39,.78)), url(${hotelImages.restaurant})` }}
          >
            <div>
              <p className='uppercase tracking-[0.35em] text-xs text-red-200'>Homely Dining</p>
              <h3 className='mt-4 text-3xl font-bold'>Fresh meals, warm service, affordable pricing.</h3>
            </div>
            <div className='space-y-4 text-white/90 leading-7'>
              <p>Every meal is prepared to make guests feel at home while staying in Jaipur.</p>
              <p>Perfect for families, business travelers, and tourists looking for simple, satisfying Indian food.</p>
              <a
                href={BOOKING_ENGINE_URL}
                target='_blank'
                rel='noreferrer'
                className='brand-button inline-flex items-center justify-center text-white px-5 py-3 rounded-full'
              >
                Reserve your stay
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default RestaurantSection
