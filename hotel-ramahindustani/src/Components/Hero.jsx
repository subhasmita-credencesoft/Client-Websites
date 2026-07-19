import { useState, useMemo, useCallback } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaChevronDown, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { hotelImages, contactDetails } from '../data/siteContent'
import { buildBookingEngineUrl, checkAvailability, openExternalUrl, getWhatsappShareUrl, BOOKING_ENGINE_URL } from '../utils/booking'

const Hero = () => {
  const today = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => {
    const d = new Date(today)
    d.setDate(d.getDate() + 1)
    return d
  }, [today])

  const formatDate = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const parseDate = (v) => {
    if (!v) return null
    const [y, m, d] = v.split('-').map(Number)
    return new Date(y, m - 1, d)
  }

  const [checkIn, setCheckIn] = useState(formatDate(today))
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow))
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const whatsAppUrl = useMemo(() => getWhatsappShareUrl(contactDetails, false), [])

  const handleCheck = useCallback(async () => {
    if (!checkIn || !checkOut) { setStatus('Select both dates.'); return }
    if (checkOut < checkIn) { setStatus('Check-out must be after check-in.'); return }
    setIsChecking(true)
    setStatus('')
    const payload = { fromDate: checkIn, toDate: checkOut, noOfRooms: 1, noOfPersons: Number(guests) }
    try {
      const availability = await checkAvailability(payload)
      if (availability?.roomList?.length > 0) {
        setStatus('Rooms available! Opening booking engine.')
        openExternalUrl(buildBookingEngineUrl(payload))
        return
      }
      setStatus('No rooms found for selected dates.')
    } catch {
      setStatus('Unable to check availability.')
    } finally {
      setIsChecking(false)
    }
  }, [checkIn, checkOut, guests])

  return (
    <section className='relative min-h-screen flex items-center justify-center bg-[#1a1923]'>
      <img
        src={hotelImages.frontJpg}
        alt='Hotel Rama Hindustani exterior building in Pratap Nagar Jaipur — budget hotel near airport'
        className='absolute inset-0 w-full h-full object-cover'
        fetchPriority='high'
      />

      <div className='absolute inset-0 bg-gradient-to-r from-[#1a1923]/50 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-t from-[#1a1923]/30 via-transparent to-transparent' />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='relative z-20 section-container text-center max-w-5xl mx-auto px-4 pt-24'
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className='text-[#c8a84e] tracking-[0.4em] uppercase text-sm md:text-base font-medium mb-4'
        >
          Hotel in Pratap Nagar Jaipur
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] mb-6 text-balance'
        >
          Budget Hotel in
          <br />
          <span className='text-[#c8a84e]'>Pratap Nagar Jaipur</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className='text-white/75 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed'
        >
          Experience comfort, affordability, and warm Indian hospitality
          near Jaipur Airport, JECC & Sanganer Railway Station.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className='flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10'
        >
          <a href={BOOKING_ENGINE_URL} target='_blank' rel='noopener noreferrer' className='btn-primary text-base px-8 py-4' aria-label='Book your stay online'>
            Book Your Experience
          </a>
          <Link to='/rooms' className='btn-secondary !text-white !border-white/30 hover:!border-white/50 text-base px-8 py-4' aria-label='View our rooms'>
            Explore Stay
          </Link>
          <a href={whatsAppUrl} target='_blank' rel='noopener noreferrer' className='btn-whatsapp text-base px-8 py-4' aria-label='Contact via WhatsApp'>
            <FaWhatsapp size={20} />
            WhatsApp
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          onClick={() => setShowBooking(!showBooking)}
          className='text-white/50 hover:text-[#c8a84e] flex items-center gap-2 mx-auto text-sm transition-colors'
          aria-expanded={showBooking}
          aria-controls='booking-form'
        >
          <FaCalendarAlt size={14} />
          <span>Check Availability</span>
          <FaChevronDown className={`transition-transform duration-300 ${showBooking ? 'rotate-180' : ''}`} size={12} />
        </motion.button>

        <AnimatePresence>
          {showBooking && (
            <motion.div
              id='booking-form'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className='mt-4'
            >
              <div className='glass rounded-2xl p-4 md:p-6 max-w-2xl mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  <div>
                    <label htmlFor='hero-checkin' className='block text-xs font-semibold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                      <FaCalendarAlt size={10} className='text-[#c8a84e]' /> Check In
                    </label>
                    <DatePicker
                      id='hero-checkin'
                      selected={parseDate(checkIn)}
                      onChange={(d) => { if (d) { const n = formatDate(d); setCheckIn(n); if (checkOut < n) setCheckOut(n) }}}
                      dateFormat='dd-MM-yyyy'
                      minDate={today}
                      wrapperClassName='w-full'
                      className='w-full border border-[#d4b896]/30 rounded-xl bg-[#fdf8f0] px-3 h-12 text-sm cursor-pointer focus:outline-none focus:border-[#c8a84e] focus:ring-1 focus:ring-[#c8a84e]/20'
                    />
                  </div>
                  <div>
                    <label htmlFor='hero-checkout' className='block text-xs font-semibold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                      <FaCalendarAlt size={10} className='text-[#c8a84e]' /> Check Out
                    </label>
                    <DatePicker
                      id='hero-checkout'
                      selected={parseDate(checkOut)}
                      onChange={(d) => { if (d) setCheckOut(formatDate(d)) }}
                      dateFormat='dd-MM-yyyy'
                      minDate={parseDate(checkIn) ?? today}
                      wrapperClassName='w-full'
                      className='w-full border border-[#d4b896]/30 rounded-xl bg-[#fdf8f0] px-3 h-12 text-sm cursor-pointer focus:outline-none focus:border-[#c8a84e] focus:ring-1 focus:ring-[#c8a84e]/20'
                    />
                  </div>
                  <div>
                    <label htmlFor='hero-guests' className='block text-xs font-semibold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                      <FaUsers size={10} className='text-[#c8a84e]' /> Guests
                    </label>
                    <select
                      id='hero-guests'
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className='w-full border border-[#d4b896]/30 rounded-xl bg-[#fdf8f0] px-3 h-12 text-sm focus:outline-none focus:border-[#c8a84e] focus:ring-1 focus:ring-[#c8a84e]/20'
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={handleCheck} disabled={isChecking} className='btn-primary w-full mt-3 justify-center text-sm' aria-label='Check room availability'>
                  {isChecking ? 'Checking...' : 'Check Availability'}
                </button>
                {status && <p className='mt-2 text-xs text-center text-[#6b677a]' role='status'>{status}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className='absolute bottom-20 left-1/2 -translate-x-1/2 z-10'
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className='text-white/20'
        >
          <FaChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
