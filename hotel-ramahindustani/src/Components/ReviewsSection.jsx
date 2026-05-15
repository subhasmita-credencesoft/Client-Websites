import React from 'react'
import Reveal from './Reveal'
import { reviews } from '../data/siteContent'

const ReviewsSection = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-6 py-16 section-shell'>
      <Reveal className='text-center mb-10'>
        <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Guest Reviews</p>
        <h2 className='text-3xl md:text-5xl font-bold font-serif text-3d'>What Our Guests Say</h2>
      </Reveal>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {reviews.map((review, index) => (
          <Reveal key={review} className='glass-panel rounded-[1.75rem] p-6 tilt-card border border-white/60' delay={index * 90}>
            <p className='text-amber-500 text-lg'>★★★★★</p>
            <p className='mt-4 text-slate-700 leading-8'>"{review}"</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default ReviewsSection
