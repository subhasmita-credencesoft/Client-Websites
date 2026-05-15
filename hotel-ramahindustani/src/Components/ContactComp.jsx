import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'
import { contactDetails, hotelImages } from '../data/siteContent'
import { getWhatsappShareUrl } from '../utils/booking'

const detailCards = [
  {
    title: 'Address',
    value: contactDetails.address,
  },
  {
    title: 'Phone',
    value: contactDetails.phone,
  },
  {
    title: 'Email',
    value: contactDetails.email,
  },
  {
    title: 'Reception Support',
    value: '24/7 Front Desk Assistance',
  },
  {
    title: 'Nearby Access',
    value: 'Railway Station, Airport, Tourist Areas',
  },
  {
    title: 'Best For',
    value: 'Families, Tourists, Business Travelers',
  },
]

const Contact = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <div className='flex flex-col max-w-7xl mx-auto lg:flex-row items-stretch px-4 md:px-6 py-10 md:py-12 gap-6 section-shell'>
      <Reveal className='flex-1 bg-gray-100 flex justify-center items-center rounded-[2rem] overflow-hidden shadow-2xl reveal-left'>
        <img
          src={hotelImages.receptionAlt}
          alt="Hotel Rama Hindustani reception"
          loading='lazy'
          decoding='async'
          className='w-full h-full object-cover min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]'
        />
      </Reveal>

      <Reveal className='flex-1 glass-panel w-full flex flex-col justify-center px-6 md:px-8 py-8 md:py-10 rounded-[2rem] reveal-right' delay={120}>
        <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm'>Contact Details</p>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-3d'>Hotel Rama Hindustani</h2>
        <p className='text-slate-600 leading-8 mb-8'>
          Reach us directly for room bookings, stay assistance, location guidance, and general hotel information.
        </p>

        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-8'>
          <a
            href={whatsAppUrl}
            target='_blank'
            rel='noreferrer'
            className='flex items-center justify-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full transition hover:bg-[#1ebe5b] text-center'
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
            className='rounded-full border border-slate-300 px-5 py-3 text-slate-800 text-center break-all'
          >
            Call {contactDetails.phone}
          </a>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {detailCards.map((item) => (
            <div key={item.title} className='rounded-[1.35rem] bg-white/85 border border-white/60 p-4 shadow-sm'>
              <p className='text-xs uppercase tracking-[0.28em] text-red-500'>{item.title}</p>
              <p className='mt-2 text-slate-800 font-medium leading-7'>{item.value}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

export default Contact
