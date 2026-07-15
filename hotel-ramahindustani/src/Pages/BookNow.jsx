import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import TopBanner from '../Components/TopBanner'
import BookingSection from '../Components/BookingSection'
import ContactComp from '../Components/ContactComp'
import LocalSEOSection from '../Components/LocalSEOSection'
import { hotelImages } from '../data/siteContent'

const BookNow = () => {
  return (
    <>
      <Seo
        title='Book Now | Hotel Rama Hindustani — Best Price Guaranteed'
        description='Book direct at Hotel Rama Hindustani, Jaipur for the best price guarantee — no OTA commission, instant confirmation, WhatsApp support. AC rooms from ₹1,155/night.'
        canonicalPath='/book-now'
        keywords='Book Hotel in Pratap Nagar Jaipur, Direct Hotel Booking Jaipur Best Price, Book Hotel Near Jaipur Airport Online, Affordable Hotel Booking Pratap Nagar, Budget Family Hotel Jaipur Booking, Instant Hotel Confirmation Jaipur, Hotel Near JECC Jaipur Book Now, No Middleman Fee Hotel Jaipur'
      />
      <StructuredData page='bookNow' />
      <TopBanner text='Book Hotel in Pratap Nagar Jaipur - Direct Booking' image={hotelImages.frontJpg} />
      <BookingSection />
      <LocalSEOSection compact={true} />
      <ContactComp />
    </>
  )
}

export default BookNow
