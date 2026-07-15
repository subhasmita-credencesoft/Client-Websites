import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { hotelImages } from '../data/siteContent'
import { UtensilsCrossed, Coffee, Wheat } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  { icon: UtensilsCrossed, text: 'Authentic Indian Cuisine' },
  { icon: Coffee, text: 'Freshly Prepared Daily' },
  { icon: Wheat, text: 'Vegetarian & Vegan Options' },
]

const RestaurantSection = () => (
  <section className='py-16 md:py-24'>
    <div className='section-container'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
        <Reveal direction='left'>
          <p className='section-subtitle'>Rama Rasoi</p>
          <h2 className='section-title mb-6'>The Taste of Tradition</h2>
          <p className='text-[#6b677a] leading-relaxed mb-6'>
            At our in-house restaurant, Rama Rasoi, we serve authentic Indian cuisine prepared with
            time-honored recipes and the freshest ingredients. Every meal is a celebration of flavor.
          </p>
          <div className='space-y-4 mb-8'>
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className='flex items-center gap-3'
              >
                <div className='w-10 h-10 rounded-xl bg-[#f5f0eb] flex items-center justify-center'>
                  <h.icon size={18} className='text-[#c8a84e]' />
                </div>
                <span className='text-sm text-[#6b677a]'>{h.text}</span>
              </motion.div>
            ))}
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link to='/contact' className='btn-secondary'>Visit Us</Link>
            <Link to='/rooms' className='btn-secondary !text-[#1a1923] !border-[#d4b896]'>View Our Rooms</Link>
          </div>
        </Reveal>

        <Reveal direction='right'>
          <motion.div className='rounded-2xl overflow-hidden shadow-xl' whileHover={{ scale: 1.01 }}>
            <img
              src={hotelImages.restaurant}
              alt='Rama Rasoi vegetarian restaurant at Hotel Rama Hindustani in Pratap Nagar Jaipur'
              loading='lazy'
              className='w-full h-[400px] md:h-[480px] object-cover transition-transform duration-700 hover:scale-105'
            />
          </motion.div>
        </Reveal>
      </div>
    </div>
  </section>
)

export default RestaurantSection
