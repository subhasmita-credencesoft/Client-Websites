import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import GalleryComp from '../Components/GalleryComp'
import { hotelImages } from '../data/siteContent'

const Gallery = () => {
  return (
    <>
      <Seo
        title='Hotel Photos Jaipur - Hotel Rama Hindustani Gallery'
        description='View the photo gallery of Hotel Rama Hindustani in Pratap Nagar Jaipur. See rooms, restaurant, reception, exterior, gym, and amenities. Budget family hotel near Jaipur Airport.'
        canonicalPath='/gallery'
        keywords='Hotel Photos Jaipur, Hotel Rama Hindustani Gallery, Hotel Images Pratap Nagar, Budget Hotel Photos Jaipur, Hotel Rooms Gallery'
      />
      <StructuredData page='gallery' />
      <TopBanner text='Gallery' image={hotelImages.frontAlt} />
      <GalleryComp />
      <Reveal className='text-center py-16 md:py-24'>
        <div className='section-container'>
          <p className='section-subtitle'>Book Your Stay</p>
          <h2 className='section-title'>See It in Person</h2>
          <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
            Inspired by what you see? Browse our <Link to='/rooms' className='text-[#c8a84e] hover:underline font-medium'>rooms and suites</Link> or book directly for the best rates.
          </p>
          <div className='flex flex-wrap justify-center gap-3 mt-8'>
            <Link to='/rooms' className='btn-secondary'>View Rooms</Link>
            <Link to='/book-now' className='btn-primary'>Book Now</Link>
          </div>
        </div>
      </Reveal>
      <LocalSEOSection compact={true} />
    </>
  )
}

export default Gallery
