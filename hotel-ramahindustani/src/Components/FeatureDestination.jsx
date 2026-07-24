import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { hotelImages, contactDetails } from '../data/siteContent'
import { MapPin, Phone, Mail, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const FeatureDestination = () => (
  <section className='py-20 md:py-28 bg-white/50'>
    <div className='section-container'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
        <Reveal direction='left'>
          <motion.div className='relative' whileHover={{ scale: 1.01 }} transition={{ duration: 0.4 }}>
            <div className='rounded-2xl overflow-hidden shadow-xl'>
            <img
              src={hotelImages.exteriorWide}
              alt='Hotel Rama Hindustani building exterior and entrance in Pratap Nagar Jaipur'
              width={1920}
              height={1080}
              loading='lazy'
              className='w-full h-[380px] md:h-[480px] object-cover transition-transform duration-700 hover:scale-105'
            />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className='absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-5 hidden md:block'
            >
              <div className='flex items-center gap-2'>
                <Star className='text-[#c8a84e] fill-[#c8a84e]' size={20} />
                <span className='font-bold font-display text-lg'>4.6</span>
                <span className='text-[#6b677a] text-sm'>Rating</span>
              </div>
              <p className='text-xs text-[#6b677a] mt-1'>Exceptional hospitality</p>
            </motion.div>
          </motion.div>
        </Reveal>

        <Reveal direction='right'>
          <p className='section-subtitle'>Welcome to</p>
          <h2 className='section-title mb-6'>Hotel Rama Hindustani</h2>
          <p className='text-[#6b677a] leading-relaxed mb-8'>
            Nestled in the vibrant neighborhood of Pratap Nagar, our hotel offers the perfect blend
            of comfort, culture, and convenience. Whether you are exploring Jaipur&apos;s majestic forts
            or visiting for business, we ensure a memorable stay.
          </p>

          <div className='space-y-4 mb-8'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0 }}
              className='flex items-start gap-3'
            >
              <MapPin className='text-[#c8a84e] mt-1 shrink-0' size={18} />
              <div>
                <p className='font-semibold text-sm'>Location</p>
                <p className='text-sm text-[#6b677a]'>{contactDetails.address}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className='flex items-start gap-3'
            >
              <Phone className='text-[#c8a84e] mt-1 shrink-0' size={18} />
              <div>
                <p className='font-semibold text-sm'>Phone</p>
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className='text-sm text-[#6b677a] hover:text-[#c8a84e] transition-colors'>{contactDetails.phone}</a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='flex items-start gap-3'
            >
              <Mail className='text-[#c8a84e] mt-1 shrink-0' size={18} />
              <div>
                <p className='font-semibold text-sm'>Email</p>
                <a href={`mailto:${contactDetails.email}`} className='text-sm text-[#6b677a] hover:text-[#c8a84e] transition-colors'>{contactDetails.email}</a>
              </div>
            </motion.div>
          </div>

          <div className='flex flex-wrap gap-3'>
            <Link to='/rooms' className='btn-secondary'>
              Explore Rooms
            </Link>
            <Link to='/about' className='btn-secondary !text-[#1a1923] !border-[#d4b896]'>
              Learn Our Story
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

export default FeatureDestination
