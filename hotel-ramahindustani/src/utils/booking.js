export const BOOKING_ENGINE_URL = 'https://bookone.io/rama-hindustani?bookingEngine=true'

const AVAILABILITY_BASE_URL = 'https://api.thehotelmate.co/api/thm/checkAvailability/3529'

export const buildAvailabilityUrl = ({
  fromDate,
  toDate,
  noOfRooms = 1,
  noOfPersons = 1,
}) => {
  const params = new URLSearchParams({
    fromDate,
    toDate,
    noOfRooms: String(noOfRooms),
    noOfPersons: String(noOfPersons),
  })

  return `${AVAILABILITY_BASE_URL}?${params.toString()}`
}

export const buildBookingEngineUrl = ({
  fromDate,
  toDate,
  noOfRooms = 1,
  noOfPersons = 1,
}) => {
  const bookingUrl = new URL(BOOKING_ENGINE_URL)
  const checkInDate = new Date(`${fromDate}T00:00:00`)
  const checkOutDate = new Date(`${toDate}T00:00:00`)
  const nights = Math.max(
    1,
    Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000),
  )

  bookingUrl.searchParams.set('fromDate', fromDate)
  bookingUrl.searchParams.set('toDate', toDate)
  bookingUrl.searchParams.set('noOfRooms', String(noOfRooms))
  bookingUrl.searchParams.set('noOfPersons', String(noOfPersons))
  bookingUrl.searchParams.set('checkinDay', String(checkInDate.getDate()))
  bookingUrl.searchParams.set('checkinMonth', String(checkInDate.getMonth() + 1))
  bookingUrl.searchParams.set('checkinYear', String(checkInDate.getFullYear()))
  bookingUrl.searchParams.set('checkoutDay', String(checkOutDate.getDate()))
  bookingUrl.searchParams.set('checkoutMonth', String(checkOutDate.getMonth() + 1))
  bookingUrl.searchParams.set('checkoutYear', String(checkOutDate.getFullYear()))
  bookingUrl.searchParams.set('checkOut', toDate)
  bookingUrl.searchParams.set('date_to', toDate)
  bookingUrl.searchParams.set('nights', String(nights))
  bookingUrl.searchParams.set('numGuests', String(noOfPersons))
  bookingUrl.searchParams.set('numAdults', String(noOfPersons))
  bookingUrl.searchParams.set('Children', '0')
  bookingUrl.searchParams.set('rooms', String(noOfRooms))

  return bookingUrl.toString()
}

export const checkAvailability = async (payload) => {
  const response = await fetch(buildAvailabilityUrl(payload), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to check availability right now.')
  }

  return response.json()
}

export const openExternalUrl = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export const getWhatsappShareUrl = (businessUser, useDefaultNumber = true) => {
  const baseUrl = 'https://api.whatsapp.com/send'

  const phoneNumber = useDefaultNumber
    ? '916376707091'
    : (businessUser?.whatsApp || businessUser?.phone || businessUser?.mobile || '').replace(/\D/g, '')

  const message = `*This is an Enquiry from :* The HotelMate Website
Hotel Name: ${businessUser?.name || ''},
Property Id: ${businessUser?.id || ''},
externalSite: WebSite,
Address: ${businessUser?.addressParts?.streetNumber || ''},${businessUser?.addressParts?.streetName || ''},${businessUser?.addressParts?.locality || ''},${businessUser?.addressParts?.city || ''},${businessUser?.addressParts?.country || ''}`

  return `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
}
