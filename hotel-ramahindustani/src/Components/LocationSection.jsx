import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { locationPoints } from '../data/siteContent'
import { MapPin, Train, Plane, Landmark, ShoppingBag } from 'lucide-react'

const iconMap = { 'Railway Station': Train, 'Airport': Plane, 'Tourist attractions': Landmark, 'Shopping areas': ShoppingBag }

const LocationSection = () => (
  <section className='py-16 md:py-24 bg-white/50'>
    <div className='section-container'>
      <Reveal className='text-center mb-12'>
        <p className='section-subtitle'>Location</p>
        <h2 className='section-title'>Conveniently Located</h2>
        <p className='mt-3 text-[#6b677a] max-w-xl mx-auto'>Strategically placed near all key destinations in Jaipur.</p>
      </Reveal>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto'>
        {locationPoints.map((point, i) => {
          const Icon = iconMap[point] || MapPin
          return (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} className='bg-white rounded-xl p-5 text-center border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 transition-all duration-300'>
                <Icon className='text-[#c8a84e] mx-auto mb-2' size={24} />
                <p className='text-sm font-medium'>{point}</p>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </div>
  </section>
)

export default LocationSection
