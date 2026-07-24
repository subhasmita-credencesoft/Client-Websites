import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { rooms } from '../data/siteContent'
import { BOOKING_ENGINE_URL } from '../utils/booking'
import { featureIcons } from '../config/featureIcons'
import { Star, ChevronRight } from 'lucide-react'

const RoomCards = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
    {rooms.map((room, i) => (
      <Reveal key={room.id} delay={i * 0.08}>
        <motion.div
          whileHover={{ y: -8 }}
          className='group bg-white rounded-2xl overflow-hidden border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-xl transition-all duration-400 h-full flex flex-col'
        >
          <div className='relative h-48 sm:h-52 overflow-hidden'>
            <img
              src={room.image}
              alt={`${room.name} at Hotel Rama Hindustani in Pratap Nagar Jaipur`}
              width={1200}
              height={800}
              loading='lazy'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#1a1923]/70 via-transparent to-transparent' />
            <div className='absolute bottom-3 left-5 right-5'>
              <p className='text-[#c8a84e] text-xs tracking-[0.3em] uppercase font-medium'>From</p>
              <p className='text-white text-2xl font-bold font-display'>
                &#8377;{room.price}
                <span className='text-white/50 text-sm font-normal font-body'> / night</span>
              </p>
            </div>
          </div>

          <div className='p-5 flex flex-col flex-1'>
            <Link to={`/rooms/${room.slug}`}>
              <h3 className='text-base font-bold font-display text-[#1a1923] hover:text-[#c8a84e] transition-colors mb-2'>{room.name}</h3>
            </Link>
            <p className='text-[#6b677a] text-sm leading-relaxed mb-4 flex-1 line-clamp-2'>{room.description}</p>

            <div className='flex flex-wrap gap-1.5 mb-5'>
              {room.features.map((f) => {
                const Icon = featureIcons[f] || Star
                return (
                  <span key={f} className='inline-flex items-center gap-1 text-xs text-[#6b677a] bg-[#f5f0eb] px-2.5 py-1.5 rounded-lg'>
                    <Icon size={11} /> {f}
                  </span>
                )
              })}
            </div>

            <div className='flex flex-col gap-2'>
              <Link
                to={`/rooms/${room.slug}`}
                className='btn-secondary w-full justify-center text-sm !py-3'
              >
                View Details <ChevronRight size={14} />
              </Link>
              <a
                href={BOOKING_ENGINE_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-primary w-full justify-center text-sm !py-3'
              >
                Book Now
              </a>
            </div>
          </div>
        </motion.div>
      </Reveal>
    ))}
  </div>
)

export default RoomCards
