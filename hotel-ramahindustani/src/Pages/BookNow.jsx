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
        title='Book Hotel in Pratap Nagar Jaipur - Direct Online Booking Best Price'
        description='Book hotel in Pratap Nagar Jaipur direct at Hotel Rama Hindustani. Online booking with best price guarantee, instant confirmation, free WiFi and parking. AC rooms near Jaipur Airport, JECC and Sanganer Railway Station. No middleman fees.'
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
