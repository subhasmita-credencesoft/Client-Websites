import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import Breadcrumbs from '../Components/Breadcrumbs'
import Reveal from '../Components/Reveal'
import ServicesGrid from '../Components/ServicesGrid'
import { hotelImages } from '../data/siteContent'

const Services = () => {
  return (
    <>
      <Seo
        title='Hotel Services & Amenities | Hotel Rama Hindustani'
        description='Free WiFi, free parking, 24-hr front desk, laundry, airport transfer & more at Hotel Rama Hindustani, Jaipur. All amenities included for a comfortable stay.'
        canonicalPath='/services'
        keywords='Hotel Amenities Pratap Nagar Jaipur, Free WiFi Hotel Jaipur Near Airport, Free Parking Hotel Jaipur, AC Rooms Pratap Nagar, Hotel with Lift Jaipur, Room Service Near Jaipur Airport, Budget Hotel Amenities Jaipur, Family Hotel Services Pratap Nagar, Power Backup Hotel Jaipur, Laundry Service Hotel Jaipur'
      />
      <StructuredData page='services' />
      <TopBanner text='Services' image={hotelImages.reception} heading='div' />
      <Breadcrumbs />

      <section className='py-16 md:py-24'>
        <div className='section-container'>
          <Reveal className='text-center mb-14'>
            <p className='section-subtitle'>Amenities</p>
            <h1 className='section-title'>Hotel Amenities in Pratap Nagar Jaipur For a Comfortable Stay</h1>
            <p className='mt-4 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
              We provide all the modern amenities to ensure your stay at our budget hotel in Pratap Nagar Jaipur is comfortable and hassle-free.
            </p>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>
      <section className='py-16 md:py-24 bg-white/50'>
        <div className='section-container text-center'>
          <Reveal>
            <p className='section-subtitle'>Ready to Stay?</p>
            <h2 className='section-title'>Experience Our Amenities Firsthand</h2>
            <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
              Book your room at Hotel Rama Hindustani and enjoy all our amenities. We also offer delicious vegetarian meals at <Link to='/restaurant' className='text-[#c8a84e] hover:underline font-medium'>Rama Rasoi</Link>.
            </p>
            <div className='flex flex-wrap justify-center gap-3 mt-8'>
              <Link to='/rooms' className='btn-secondary'>View Rooms</Link>
              <Link to='/book-now' className='btn-primary'>Book Now</Link>
            </div>
          </Reveal>
        </div>
      </section>
      <LocalSEOSection compact={true} />
    </>
  )
}

export default Services
