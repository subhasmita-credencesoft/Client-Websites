import { useState, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaWhatsapp, FaShieldAlt, FaLock, FaCreditCard, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { contactDetails } from '../data/siteContent'
import { BOOKING_ENGINE_URL, getWhatsappShareUrl, buildBookingEngineUrl, checkAvailability, openExternalUrl } from '../utils/booking'

const BookingSection = () => {
  const today = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + 1); return d }, [today])

  const fmt = (d) => { const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, '0'); const day = String(d.getDate()).padStart(2, '0'); return `${y}-${m}-${day}` }
  const parse = (v) => { if (!v) return null; const [y, m, d] = v.split('-').map(Number); return new Date(y, m - 1, d) }

  const [checkIn, setCheckIn] = useState(fmt(today))
  const [checkOut, setCheckOut] = useState(fmt(tomorrow))
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const whatsAppUrl = useMemo(() => getWhatsappShareUrl(contactDetails, false), [])

  const handleCheck = async () => {
    if (!checkIn || !checkOut) { setStatus('Select both dates.'); return }
    if (checkOut < checkIn) { setStatus('Check-out must be after check-in.'); return }
    setIsChecking(true); setStatus('')
    const payload = { fromDate: checkIn, toDate: checkOut, noOfRooms: 1, noOfPersons: Number(guests) }
    try {
      const availability = await checkAvailability(payload)
      if (availability?.roomList?.length > 0) { setStatus('Rooms available! Redirecting...'); openExternalUrl(buildBookingEngineUrl(payload)); return }
      setStatus('No rooms found.')
    } catch { setStatus('Unable to check availability.') }
    finally { setIsChecking(false) }
  }

  return (
    <section className='py-16 md:py-24' aria-label='Online booking form'>
      <div className='section-container'>
        <Reveal className='text-center mb-14'>
          <p className='section-subtitle'>Book Your Stay</p>
          <h2 className='section-title'>Reserve Your Room Today</h2>
        </Reveal>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 items-start'>
          <Reveal direction='left' className='lg:col-span-3'>
            <div className='bg-white rounded-2xl p-6 md:p-8 border border-[#d4b896]/15 shadow-sm'>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5'>
                <div>
                  <label htmlFor='booking-checkin' className='block text-xs font-semibold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                    <FaCalendarAlt size={10} className='text-[#c8a84e]' /> Check In
                  </label>
                  <DatePicker
                    id='booking-checkin'
                    selected={parse(checkIn)}
                    onChange={(d) => { if (d) { const n = fmt(d); setCheckIn(n); if (checkOut < n) setCheckOut(n) }}}
                    dateFormat='dd-MM-yyyy'
                    minDate={today}
                    wrapperClassName='w-full'
                    className='w-full border border-[#d4b896]/30 rounded-xl bg-[#fdf8f0] px-3 h-12 text-sm cursor-pointer focus:outline-none focus:border-[#c8a84e] focus:ring-1 focus:ring-[#c8a84e]/20'
                  />
                </div>
                <div>
                  <label htmlFor='booking-checkout' className='block text-xs font-semibold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                    <FaCalendarAlt size={10} className='text-[#c8a84e]' /> Check Out
                  </label>
                  <DatePicker
                    id='booking-checkout'
                    selected={parse(checkOut)}
                    onChange={(d) => { if (d) setCheckOut(fmt(d)) }}
                    dateFormat='dd-MM-yyyy'
                    minDate={parse(checkIn) ?? today}
                    wrapperClassName='w-full'
                    className='w-full border border-[#d4b896]/30 rounded-xl bg-[#fdf8f0] px-3 h-12 text-sm focus:outline-none focus:border-[#c8a84e] focus:ring-1 focus:ring-[#c8a84e]/20'
                  />
                </div>
                <div>
                  <label htmlFor='booking-guests' className='block text-xs font-semibold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                    <FaUsers size={10} className='text-[#c8a84e]' /> Guests
                  </label>
                  <select
                    id='booking-guests'
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className='w-full border border-[#d4b896]/30 rounded-xl bg-[#fdf8f0] px-3 h-12 text-sm focus:outline-none focus:border-[#c8a84e] focus:ring-1 focus:ring-[#c8a84e]/20'
                  >
                    {[1, 2, 3, 4].map((n) => (<option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>))}
                  </select>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <button onClick={handleCheck} disabled={isChecking} className='btn-primary flex-1 justify-center' aria-label='Check room availability'>
                  {isChecking ? 'Checking...' : 'Check Availability'}
                </button>
                <a href={BOOKING_ENGINE_URL} target='_blank' rel='noopener noreferrer' className='btn-secondary flex-1 justify-center' aria-label='Book directly online'>
                  Book Direct
                </a>
              </div>
              {status && <p className='mt-3 text-sm text-center text-[#6b677a]' role='status'>{status}</p>}
            </div>
          </Reveal>

          <Reveal direction='right' className='lg:col-span-2'>
            <div className='bg-gradient-to-br from-[#1a1923] to-[#2a2738] rounded-2xl p-6 md:p-8 text-white h-full'>
              <h3 className='font-display text-xl font-bold mb-5 text-[#c8a84e]'>Why Book With Us?</h3>
              <div className='space-y-4'>
                {[
                  { icon: FaWhatsapp, text: 'Instant WhatsApp support', color: '#25D366' },
                  { icon: FaShieldAlt, text: 'Best price guarantee', color: '#c8a84e' },
                  { icon: FaLock, text: 'Secure booking & payments', color: '#c8a84e' },
                  { icon: FaCreditCard, text: 'Multiple payment options', color: '#c8a84e' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className='flex items-center gap-3'
                  >
                    <div className='w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center'>
                      <item.icon style={{ color: item.color }} size={16} />
                    </div>
                    <span className='text-sm text-white/75'>{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <a href={whatsAppUrl} target='_blank' rel='noopener noreferrer' className='btn-whatsapp w-full justify-center mt-6' aria-label='Send booking inquiry on WhatsApp'>
                <FaWhatsapp size={18} />
                WhatsApp Inquiry
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default BookingSection
