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
        title='Book Hotel in Pratap Nagar Jaipur - Online Booking Direct'
        description='Book your stay at Hotel Rama Hindustani in Pratap Nagar Jaipur. Online booking with best price guarantee, instant WhatsApp support, and affordable family rooms near Jaipur Airport and JECC.'
        canonicalPath='/book-now'
        keywords='Book Hotel in Pratap Nagar Jaipur, Hotel Booking Jaipur, Direct Hotel Booking Jaipur, Book Hotel Near Jaipur Airport, Affordable Hotel Jaipur Booking, Budget Family Hotel Jaipur'
      />
      <StructuredData page='bookNow' />
      <TopBanner text='Book Your Stay' image={hotelImages.frontJpg} />
      <BookingSection />
      <LocalSEOSection compact={true} />
      <ContactComp />
    </>
  )
}

export default BookNow
