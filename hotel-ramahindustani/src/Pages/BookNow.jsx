import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import FAQSection from '../Components/FAQSection'
import TopBanner from '../Components/TopBanner'
import Breadcrumbs from '../Components/Breadcrumbs'
import BookingSection from '../Components/BookingSection'
import ContactComp from '../Components/ContactComp'
import LocalSEOSection from '../Components/LocalSEOSection'
import Reveal from '../Components/Reveal'
import { hotelImages } from '../data/siteContent'

const bookNowFaqs = [
  {
    question: 'What is the cheapest room at Hotel Rama Hindustani?',
    answer: 'The Economy Double Room starts at just ₹1,155 per night. It includes AC, free WiFi, flat-screen TV, and room service — one of the most affordable rooms near Jaipur Airport.',
  },
  {
    question: 'Is direct booking cheaper than OTAs?',
    answer: 'Yes, booking directly through our website or WhatsApp guarantees the best available rate with no commission or booking fees. You also get instant confirmation and direct support.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit cards, debit cards, and UPI payments for your convenience.',
  },
]

const BookNow = () => {
  return (
    <>
      <Seo
        title='Book Hotel in Pratap Nagar Jaipur | Direct Booking Best Price — Hotel Rama Hindustani'
        description='Book direct at Hotel Rama Hindustani, Pratap Nagar Jaipur — best price guarantee, no OTA commission, instant WhatsApp confirmation. Budget AC rooms from ₹1,155/night near Airport & JECC.'
        canonicalPath='/book-now'
        keywords='Book Hotel in Pratap Nagar Jaipur, Direct Hotel Booking Best Price Jaipur, Book Hotel Near Jaipur Airport Online, Budget Hotel Booking Pratap Nagar, Hotel Near JECC Jaipur Book Now, Instant Hotel Confirmation Jaipur, No Commission Hotel Booking Jaipur, Affordable Hotel Jaipur Online Booking, Family Hotel Booking Pratap Nagar, WhatsApp Hotel Booking Jaipur'
      />
      <StructuredData page='bookNow' />
      <TopBanner text='Book Hotel in Pratap Nagar Jaipur - Direct Booking' image={hotelImages.frontJpg} />
      <Breadcrumbs />
      <BookingSection />

      <section className='py-16 md:py-24 bg-white/50'>
        <div className='section-container text-center'>
          <Reveal>
            <p className='section-subtitle'>Why Book Direct?</p>
            <h2 className='section-title'>Best Price Guaranteed — No Middleman Fees</h2>
            <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
              When you book directly with us, you get the lowest rates, instant confirmation via WhatsApp, and a team that knows every detail of your stay. Browse our{' '}
              <Link to='/rooms' className='text-[#c8a84e] hover:underline font-medium'>room options</Link>{' '}
              or check out our{' '}
              <Link to='/restaurant' className='text-[#c8a84e] hover:underline font-medium'>on-site restaurant</Link>{' '}
              to plan your complete stay.
            </p>
            <div className='flex flex-wrap justify-center gap-3 mt-8'>
              <Link to='/rooms' className='btn-secondary'>View All Rooms</Link>
              <Link to='/gallery' className='btn-secondary'>Photo Gallery</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection
        title='Booking FAQs'
        subtitle='Common questions about booking your stay at Hotel Rama Hindustani.'
        items={bookNowFaqs}
      />
      <LocalSEOSection compact={true} />
      <ContactComp />
    </>
  )
}

export default BookNow
