import { motion } from 'framer-motion'
import { ConciergeBell } from 'lucide-react'
import Reveal from './Reveal'
import { services } from '../data/siteContent'
import { serviceIcons } from '../config/featureIcons'

const ServicesGrid = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
    {services.map((s, i) => {
      const Icon = serviceIcons[s.name] || ConciergeBell
      return (
        <Reveal key={i} delay={i * 0.04}>
          <motion.div
            whileHover={{ y: -4 }}
            className='bg-white rounded-xl p-6 border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-md transition-all duration-300 text-center h-full'
          >
            <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-[#f5f0eb] to-[#fdf8f0] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
              <Icon className='text-[#c8a84e]' size={24} />
            </div>
            <h3 className='font-semibold text-[#1a1923] mb-2'>{s.name}</h3>
            <p className='text-[#6b677a] text-sm leading-relaxed'>{s.description}</p>
          </motion.div>
        </Reveal>
      )
    })}
  </div>
)

export default ServicesGrid
