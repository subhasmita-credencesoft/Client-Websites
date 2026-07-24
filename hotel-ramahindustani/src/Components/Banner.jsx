import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { contactDetails, hotelImages } from '../data/siteContent'
import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsappShareUrl, BOOKING_ENGINE_URL } from '../utils/booking'

const Banner = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <section className='py-16 md:py-24' aria-label='Booking banner'>
      <div className='section-container'>
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className='relative rounded-3xl overflow-hidden bg-[#1a1923] p-8 md:p-16 shadow-2xl'
          >
            <img
              src={hotelImages.exteriorFront}
              alt=''
              role='presentation'
              width={1920}
              height={1080}
              className='absolute inset-0 w-full h-full object-cover'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-[#1a1923]/85 via-[#1a1923]/60 to-[#1a1923]/85' />
            <div className='absolute inset-0 bg-gradient-to-t from-[#1a1923]/90 via-transparent to-[#1a1923]/40' />

            <div className='relative z-10 text-center max-w-3xl mx-auto'>
              <p className='text-[#c8a84e] tracking-[0.4em] uppercase text-sm font-medium mb-4'>Reserve Your Stay</p>
              <h2 className='text-white text-3xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-6'>
                Book Budget Hotel Near Jaipur Airport
              </h2>
              <p className='text-white/50 md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto'>
                From royal architecture to vibrant bazaars, let Hotel Rama Hindustani be your affordable gateway to the Pink City.
              </p>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                <a
                  href={BOOKING_ENGINE_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-primary text-base px-8 py-4 animate-pulse-glow'
                >
                  Book Your Stay
                </a>
                <a href={whatsAppUrl} target='_blank' rel='noopener noreferrer' className='btn-whatsapp text-base px-8 py-4'>
                  <FaWhatsapp size={20} />
                  WhatsApp Booking
                </a>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

export default Banner
