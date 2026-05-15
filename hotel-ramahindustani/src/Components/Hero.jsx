import React, { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Reveal from './Reveal'
import { hotelImages } from '../data/siteContent'
import { buildBookingEngineUrl, checkAvailability, openExternalUrl } from '../utils/booking'

const Hero = () => {
  const today = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => {
    const nextDay = new Date(today)
    nextDay.setDate(nextDay.getDate() + 1)
    return nextDay
  }, [today])

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const parseDate = (value) => {
    if (!value) return null
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const [checkIn, setCheckIn] = useState(formatDate(today))
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow))
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const handleAvailabilityCheck = async () => {
    if (!checkIn || !checkOut) {
      setStatus('Please select both check-in and check-out dates.')
      return
    }

    if (checkOut < checkIn) {
      setStatus('Check-out date must be the same as or after check-in.')
      return
    }

    setIsChecking(true)
    setStatus('')

    const payload = {
      fromDate: checkIn,
      toDate: checkOut,
      noOfRooms: 1,
      noOfPersons: Number(guests),
    }

    try {
      const availability = await checkAvailability(payload)
      const availableRooms = availability?.roomList ?? []

      if (availableRooms.length > 0) {
        setStatus('Availability confirmed. Opening booking engine.')
        openExternalUrl(buildBookingEngineUrl(payload))
        return
      }

      setStatus('No rooms found for the selected dates and guest count.')
    } catch (error) {
      setStatus(error.message || 'Unable to check availability right now.')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <section className='relative -mt-12 overflow-hidden min-h-[680px] md:min-h-[720px] lg:min-h-[780px]'>
      <div className='absolute inset-0'>
        <div
          className='h-full w-full bg-cover bg-center scale-[1.02]'
          style={{ backgroundImage: `url("${hotelImages.front}")` }}
        />
        <div className='absolute inset-0 bg-[linear-gradient(120deg,rgba(10,15,30,.56),rgba(10,15,30,.18)_48%,rgba(127,29,29,.10))]'></div>
        <div className='absolute inset-0 bg-white/5'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-14 md:pt-28 md:pb-16 lg:pt-32 lg:pb-16 min-h-[680px] md:min-h-[720px] lg:min-h-[780px] flex flex-col items-center justify-center gap-8 md:gap-10'>
        <Reveal className='text-center max-w-4xl mx-auto'>
          <p className='text-red-200 tracking-[0.48em] uppercase text-sm md:text-base'>Hotel Rama Hindustani</p>
          <h1 className='mt-4 md:mt-5 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-3d'>
            Welcome to Hotel Rama Hindustani
          </h1>
          <p className='mt-3 md:mt-4 text-white/90 text-base sm:text-lg md:text-2xl font-medium'>
            Where Comfort Meets Tradition
          </p>
          <p className='mt-3 md:mt-4 text-white/85 text-sm sm:text-base md:text-lg leading-7 md:leading-8 max-w-3xl mx-auto'>
            Experience comfort, affordability, and warm Indian hospitality in the heart of Jaipur.
          </p>
        </Reveal>

        {/* <Reveal className='max-w-5xl mx-auto w-full'>
          <div className='glass-panel rounded-[1.15rem] px-3 py-3 md:px-4 md:py-3.5 border border-white/60 shadow-2xl'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 items-end'>
              <div className='flex flex-col gap-1.5'>
                <label className='font-semibold text-slate-700 text-xs'>Check In</label>
                <DatePicker
                  selected={parseDate(checkIn)}
                  onChange={(date) => {
                    if (!date) return
                    const nextCheckIn = formatDate(date)
                    setCheckIn(nextCheckIn)
                    if (checkOut < nextCheckIn) {
                      setCheckOut(nextCheckIn)
                    }
                  }}
                  dateFormat='dd-MM-yyyy'
                  minDate={today}
                  popperPlacement='bottom-start'
                  wrapperClassName='w-full'
                  className='border px-3 border-gray-300/80 rounded-lg bg-white/85 h-[40px] text-sm w-full'
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='font-semibold text-slate-700 text-xs'>Check Out</label>
                <DatePicker
                  selected={parseDate(checkOut)}
                  onChange={(date) => {
                    if (!date) return
                    setCheckOut(formatDate(date))
                  }}
                  dateFormat='dd-MM-yyyy'
                  minDate={parseDate(checkIn) ?? today}
                  popperPlacement='bottom-start'
                  wrapperClassName='w-full'
                  className='border px-3 border-gray-300/80 rounded-lg bg-white/85 h-[40px] text-sm w-full'
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='font-semibold text-slate-700 text-xs'>Guests</label>
                <select
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className='border border-gray-300/80 rounded-lg px-3 bg-white/85 h-[40px] text-sm'
                >
                  <option value='1'>1 Guest</option>
                  <option value='2'>2 Guests</option>
                  <option value='3'>3 Guests</option>
                  <option value='4'>4 Guests</option>
                </select>
              </div>

              <button
                onClick={handleAvailabilityCheck}
                disabled={isChecking}
                className='brand-button text-white px-4 py-2 rounded-lg h-[40px] text-sm disabled:opacity-70 w-full'
              >
                {isChecking ? 'Checking...' : 'Check Availability'}
              </button>
            </div>
            {status ? (
              <p className='mt-3 text-xs md:text-sm text-slate-700 text-center md:text-left'>{status}</p>
            ) : null}
          </div>
        </Reveal> */}
      </div>
    </section>
  )
}

export default Hero
