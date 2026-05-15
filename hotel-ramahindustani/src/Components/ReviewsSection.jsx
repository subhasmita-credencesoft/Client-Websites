import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { testimonials } from '../data/siteContent'
import { Star } from 'lucide-react'

const ReviewsSection = () => (
  <section className='py-20 md:py-28 bg-white/30'>
    <div className='section-container'>
      <Reveal className='text-center mb-16'>
        <p className='section-subtitle'>Testimonials</p>
        <h2 className='section-title'>What Our Guests Say</h2>
      </Reveal>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className='bg-white rounded-2xl p-6 border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/25 hover:shadow-md transition-all duration-300 h-full flex flex-col'
            >
              <div className='flex items-center gap-1 mb-4'>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className={idx < t.rating ? 'text-[#c8a84e] fill-[#c8a84e]' : 'text-[#d4b896]/30'}
                  />
                ))}
              </div>
              <p className='text-[#6b677a] text-sm leading-relaxed mb-5 italic flex-1'>&ldquo;{t.text}&rdquo;</p>
              <div className='flex items-center gap-3 pt-4 border-t border-[#d4b896]/10'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#c8a84e] to-[#a8882e] flex items-center justify-center text-white font-bold text-sm shrink-0'>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className='font-semibold text-sm'>{t.name}</p>
                  <p className='text-xs text-[#6b677a]'>{t.location}</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default ReviewsSection
