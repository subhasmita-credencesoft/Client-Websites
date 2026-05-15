import React from 'react'
import Seo from '../Components/Seo'
import ContactComp from '../Components/ContactComp'
import TopBanner from '../Components/TopBanner'
import { hotelImages } from '../data/siteContent'

const Contact = () => {
  return (
    <>
      <Seo
        title='Contact'
        description='Contact Hotel Rama Hindustani in Pratap Nagar, Jaipur for room bookings, WhatsApp support, phone assistance, and hotel information.'
      />
      <TopBanner text='Contact Us' image={hotelImages.receptionArea} />
      <ContactComp />
    </>
  )
}

export default Contact
