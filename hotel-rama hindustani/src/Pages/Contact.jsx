import React from 'react'
import Seo from '../Components/Seo'
import ContactComp from '../Components/ContactComp.jsx'
import TopBanner from '../Components/TopBanner.jsx'

const Contact = () => {
  return (
    <>
     <Seo
      title='Contact'
      description='Contact Hotel Rama Hindustani in Pratap Nagar, Jaipur for room bookings, WhatsApp support, phone assistance, and hotel information.'
     />
     <TopBanner text='Contact'/>
      <ContactComp/>
    </>
  )
}

export default Contact
