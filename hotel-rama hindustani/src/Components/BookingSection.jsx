import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'
import { contactDetails } from '../data/siteContent'
import { BOOKING_ENGINE_URL, getWhatsappShareUrl } from '../utils/booking'

const BookingSection = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <section className='max-w-7xl mx-auto px-4 md:px-6 py-16'>
      <Reveal className='rounded-[2rem] overflow-hidden bg-[linear-gradient(135deg,rgba(127,29,29,.98),rgba(17,24,39,.98))] text-white p-8 md:p-12 shadow-2xl'>
        <p className='text-red-200 tracking-[0.4em] uppercase text-sm'>Booking</p>
        <h2 className='mt-4 text-3xl md:text-5xl font-bold font-serif text-3d'>Book Your Stay Now</h2>
        <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90'>
          <div className='rounded-2xl bg-white/10 p-4'>Easy online booking</div>
          <div className='rounded-2xl bg-white/10 p-4'>Best price guarantee</div>
          <div className='rounded-2xl bg-white/10 p-4'>Instant confirmation</div>
        </div>
        <p className='mt-8 text-lg text-white/90'>Reserve your room today and enjoy a comfortable stay at Hotel Rama Hindustani.</p>
        <div className='mt-8 flex flex-wrap gap-4'>
          <a
            href={whatsAppUrl}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full transition hover:bg-[#1ebe5b]'
          >
            <FaWhatsapp size={20} />
            WhatsApp Booking
          </a>
          <a
            href={BOOKING_ENGINE_URL}
            target='_blank'
            rel='noreferrer'
            className='brand-button text-white px-5 py-3 rounded-full'
          >
            Open Booking Engine
          </a>
          <a
            href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
            className='border border-white/40 px-5 py-3 rounded-full text-white'
          >
            Call Reception
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export default BookingSection
