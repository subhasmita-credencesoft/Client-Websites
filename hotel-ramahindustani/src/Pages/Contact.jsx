import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import ContactComp from '../Components/ContactComp'
import LocalSEOSection from '../Components/LocalSEOSection'
import FAQSection from '../Components/FAQSection'
import Breadcrumbs from '../Components/Breadcrumbs'
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
        title='Contact Us | Hotel Rama Hindustani, Pratap Nagar Jaipur'
        description='Contact Hotel Rama Hindustani in Pratap Nagar, Jaipur. Call, WhatsApp or email us for room bookings, rates, and inquiries. Near Sanganer Railway Station & Jaipur Airport.'
        canonicalPath='/contact'
        keywords='Contact Hotel Near Sanganer Railway Station Jaipur, Hotel Near Jaipur Airport Contact, Hotel Near JECC Jaipur, Hotel Booking Pratap Nagar Jaipur, Hotel Near Sitapura Industrial Area, Budget Hotel Near Railway Station Jaipur, Call Hotel Rama Hindustani, WhatsApp Hotel Booking Jaipur'
      />
      <StructuredData page='contact' />
      <TopBanner text='Contact Hotel Near Sanganer Railway Station Jaipur' image={hotelImages.receptionArea} />
      <Breadcrumbs />
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

      {/* Google Maps Embed — Local SEO Signal */}
      <section className='py-16 md:py-24 bg-white/50'>
        <div className='section-container'>
          <Reveal className='text-center mb-10'>
            <p className='section-subtitle'>Find Us</p>
            <h2 className='section-title'>Hotel Location — Pratap Nagar, Jaipur</h2>
            <p className='mt-3 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
              34-B1-B2, Haldighati Marg, Tonk Road, Pratap Nagar, Jaipur, Rajasthan 302033.
              5 km from Jaipur International Airport &amp; Sanganer Railway Station.
            </p>
          </Reveal>
          <Reveal>
            <div className='rounded-2xl overflow-hidden shadow-xl border border-[#d4b896]/20'>
              <iframe
                id='hotel-google-map'
                title='Hotel Rama Hindustani Location on Google Maps — Pratap Nagar Jaipur'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.7609338440937!2d75.78899217534213!3d26.800396976700283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b5df1efb7f3%3A0x58b5ac4b44e31ef7!2sHotel%20Rama%20Hindustani!5e0!3m2!1sen!2sin!4v1736900000000!5m2!1sen!2sin'
                width='100%'
                height='400'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                aria-label='Google Maps showing Hotel Rama Hindustani in Pratap Nagar, Jaipur'
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact
