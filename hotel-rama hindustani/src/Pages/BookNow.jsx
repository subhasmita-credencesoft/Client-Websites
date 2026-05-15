import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import BookingSection from '../Components/BookingSection'
import ContactComp from '../Components/ContactComp'

const BookNow = () => {
  return (
    <>
      <Seo
        title='Book Now'
        description='Book your stay at Hotel Rama Hindustani with quick online booking, direct WhatsApp support, and instant stay assistance.'
      />
      <TopBanner text='Book Now' />
      <BookingSection />
      <ContactComp />
    </>
  )
}

export default BookNow
