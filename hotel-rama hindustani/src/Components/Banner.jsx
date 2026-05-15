import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'
import { contactDetails, hotelImages } from '../data/siteContent'
import { BOOKING_ENGINE_URL, getWhatsappShareUrl } from '../utils/booking'

const Banner = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <section
      className='relative overflow-hidden section-shell py-14 md:py-16'
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(127, 29, 29, 0.68)), url("${hotelImages.frontAlt}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.16),transparent_34%)]'></div>

      <Reveal className='relative max-w-5xl mx-auto px-4 md:px-6'>
        <div className='rounded-[1.75rem] border border-white/15 bg-white/10 backdrop-blur-md px-5 py-7 md:px-10 md:py-10 text-center shadow-2xl'>
          <p className='text-red-200 tracking-[0.38em] uppercase text-xs md:text-sm'>Quick Contact</p>
          <h2 className='mt-4 text-2xl sm:text-3xl md:text-5xl font-bold text-white text-3d'>Reach us fast on WhatsApp or reserve instantly.</h2>
          <p className='mt-4 max-w-2xl mx-auto text-white/85 text-sm sm:text-base md:text-lg leading-7 md:leading-8'>
            For quick replies, room enquiries, and direct help, message Hotel Rama Hindustani on WhatsApp or open the booking engine right away.
          </p>
          <div className='mt-7 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4'>
            <a
              href={whatsAppUrl}
              target='_blank'
              rel='noreferrer'
              className='flex items-center justify-center gap-3 bg-[#25D366] px-5 py-3 rounded-full text-white shadow-[0_12px_30px_rgba(37,211,102,0.25)] transition hover:bg-[#1ebe5b]'
            >
              <FaWhatsapp size={20} />
              WhatsApp Booking
            </a>
            <a
              href={BOOKING_ENGINE_URL}
              target='_blank'
              rel='noreferrer'
              className='brand-button px-5 py-3 rounded-full text-white text-center'
            >
              Direct Booking
            </a>
            <a
              href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
              className='rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white backdrop-blur-sm text-center break-all'
            >
              {contactDetails.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default Banner
