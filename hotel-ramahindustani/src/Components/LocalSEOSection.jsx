import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { Train, Plane, Building2, Landmark, ShoppingBag, Hospital } from 'lucide-react'
import { Link } from 'react-router-dom'

const landmarks = [
  {
    name: 'Jaipur International Airport',
    distance: '5 km',
    duration: '10-15 min drive',
    icon: Plane,
    color: 'from-blue-50 to-sky-50',
  },
  {
    name: 'Sanganer Railway Station',
    distance: '3 km',
    duration: '5-8 min drive',
    icon: Train,
    color: 'from-green-50 to-emerald-50',
  },
  {
    name: 'JECC (Jaipur Exhibition & Convention Centre)',
    distance: '4 km',
    duration: '8-10 min drive',
    icon: Building2,
    color: 'from-purple-50 to-violet-50',
  },
  {
    name: 'World Trade Park Jaipur',
    distance: '6 km',
    duration: '12-15 min drive',
    icon: ShoppingBag,
    color: 'from-amber-50 to-orange-50',
  },
  {
    name: 'Jawahar Circle',
    distance: '7 km',
    duration: '15 min drive',
    icon: Landmark,
    color: 'from-rose-50 to-pink-50',
  },
  {
    name: 'Chokhi Dhani',
    distance: '8 km',
    duration: '15-20 min drive',
    icon: Landmark,
    color: 'from-red-50 to-rose-50',
  },
  {
    name: 'Sitapura Industrial Area / RIICO',
    distance: '3 km',
    duration: '5-8 min drive',
    icon: Building2,
    color: 'from-indigo-50 to-blue-50',
  },
  {
    name: 'Mahatma Gandhi Hospital',
    distance: '2 km',
    duration: '5 min drive',
    icon: Hospital,
    color: 'from-teal-50 to-cyan-50',
  },
]

/* eslint-disable react/prop-types */
const LocalSEOSection = ({ compact = false }) => {
  const displayed = compact ? landmarks.slice(0, 4) : landmarks

  return (
    <section className='py-16 md:py-24 bg-white/50' aria-label='Nearby landmarks and locations'>
      <div className='section-container'>
        <Reveal className='text-center mb-12'>
          <p className='section-subtitle'>Prime Location</p>
          <h2 className='section-title'>Hotel Near Major Jaipur Landmarks</h2>
          <p className='mt-3 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
            Hotel Rama Hindustani in Pratap Nagar is strategically located near Jaipur Airport, railway stations, business hubs, and tourist attractions — making it the ideal base for your Jaipur visit.
          </p>
        </Reveal>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {displayed.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className='bg-white rounded-xl p-5 border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-md transition-all duration-300 h-full'
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                    <Icon className='text-[#1a1923]' size={20} />
                  </div>
                  <h3 className='font-semibold text-sm text-[#1a1923] mb-1.5 leading-snug'>{item.name}</h3>
                  <div className='flex items-baseline gap-1.5'>
                    <span className='text-[#c8a84e] font-bold text-sm'>{item.distance}</span>
                    <span className='text-[#6b677a] text-xs'>({item.duration})</span>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        {compact && (
          <Reveal className='text-center mt-8'>
            <Link to='/tours' className='btn-secondary text-sm'>
              View All Nearby Locations
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default LocalSEOSection
