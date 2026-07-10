import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import ContactComp from '../Components/ContactComp'
import LocalSEOSection from '../Components/LocalSEOSection'
import FAQSection from '../Components/FAQSection'
import Reveal from '../Components/Reveal'
import TopBanner from '../Components/TopBanner'
import { hotelImages, contactDetails } from '../data/siteContent'

const contactFaqs = [
  {
    question: 'How can I contact Hotel Rama Hindustani?',
    answer: `You can call us at ${contactDetails.phone}, email us at ${contactDetails.email}, or send a message on WhatsApp at ${contactDetails.whatsApp}. We are available 24/7 for inquiries.`,
  },
  {
    question: 'What is the check-in and check-out time?',
    answer: 'Check-in time is 12:00 PM and check-out time is 10:00 AM. Early check-in and late check-out may be arranged on request subject to availability.',
  },
  {
    question: 'Is Hotel Rama Hindustani near Jaipur Airport?',
    answer: 'Yes, our hotel is approximately 5 km from Jaipur International Airport, about a 10-15 minute drive. We are one of the closest budget hotels near Jaipur Airport.',
  },
  {
    question: 'How far is the hotel from Sanganer Railway Station?',
    answer: 'Sanganer Railway Station is only 3 km from Hotel Rama Hindustani, approximately a 5-8 minute drive. This makes us a convenient stay for train travelers.',
  },
  {
    question: 'Do you offer airport or railway station pickup?',
    answer: 'Please contact us directly via phone or WhatsApp to arrange transportation. Our team can help coordinate airport or railway station transfers.',
  },
]

const Contact = () => {
  return (
    <>
      <Seo
        title='Contact Hotel Rama Hindustani - Budget Hotel Near Sanganer Railway Station Jaipur'
        description='Contact Hotel Rama Hindustani in Pratap Nagar, Jaipur near Sanganer Railway Station and Airport. Call, WhatsApp, or email for room bookings, availability, and hotel information. Strategically located near Jaipur Airport, JECC, and Sitapura.'
        canonicalPath='/contact'
        keywords='Contact Hotel Rama Hindustani, Hotel Near Sanganer Railway Station, Hotel Near Jaipur Airport, Hotel Booking Jaipur, Hotel in Pratap Nagar Jaipur Contact, Hotel Near JECC Jaipur, Hotel Near Sitapura Industrial Area'
      />
      <StructuredData page='contact' />
      <TopBanner text='Contact Us' image={hotelImages.receptionArea} />
      <ContactComp />
      <FAQSection
        title='Hotel Contact & Location Questions'
        subtitle='Find answers about our location near Jaipur Airport, Sanganer Railway Station, and other landmarks.'
        items={contactFaqs}
      />
      <Reveal className='text-center py-16 md:py-24 bg-white/50'>
        <div className='section-container'>
          <p className='section-subtitle'>Book Direct</p>
          <h2 className='section-title'>Ready to Experience Jaipur?</h2>
          <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
            Browse our <Link to='/rooms' className='text-[#c8a84e] hover:underline font-medium'>rooms</Link> or explore our <Link to='/restaurant' className='text-[#c8a84e] hover:underline font-medium'>restaurant</Link> and <Link to='/services' className='text-[#c8a84e] hover:underline font-medium'>amenities</Link> before booking.
          </p>
          <div className='flex flex-wrap justify-center gap-3 mt-8'>
            <Link to='/rooms' className='btn-secondary'>View Rooms</Link>
            <Link to='/book-now' className='btn-primary'>Book Now</Link>
          </div>
        </div>
      </Reveal>
      <LocalSEOSection />
    </>
  )
}

export default Contact
