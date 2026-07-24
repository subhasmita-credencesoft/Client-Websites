import { useState, useMemo, useCallback } from 'react'
import { contactDetails } from '../data/siteContent'
import {
  buildBookingEngineUrl,
  checkAvailability,
  openExternalUrl,
  getWhatsappShareUrl,
} from '../utils/booking'

export function useBookingForm() {
  const today = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => {
    const d = new Date(today)
    d.setDate(d.getDate() + 1)
    return d
  }, [today])

  const fmt = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const parse = (v) => {
    if (!v) return null
    const [y, m, d] = v.split('-').map(Number)
    return new Date(y, m - 1, d)
  }

  const [checkIn, setCheckIn] = useState(fmt(today))
  const [checkOut, setCheckOut] = useState(fmt(tomorrow))
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const whatsAppUrl = useMemo(
    () => getWhatsappShareUrl(contactDetails, false),
    []
  )

  const handleCheck = useCallback(async () => {
    if (!checkIn || !checkOut) {
      setStatus('Select both dates.')
      return
    }
    if (checkOut < checkIn) {
      setStatus('Check-out must be after check-in.')
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

  return {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    status,
    isChecking,
    whatsAppUrl,
    handleCheck,
    today,
    tomorrow,
    fmt,
    parse,
  }
}
