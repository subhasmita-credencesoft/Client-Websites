import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import RestaurantSection from '../Components/RestaurantSection'
import Breadcrumbs from '../Components/Breadcrumbs'
import { hotelImages } from '../data/siteContent'

const Restaurant = () => {
  return (
    <>
      <Seo
        title='Vegetarian Restaurant | Hotel Rama Hindustani, Jaipur'
        description='On-site vegetarian Indian restaurant at Hotel Rama Hindustani serving breakfast, lunch & dinner. Homely food, budget prices, open to non-guests.'
        canonicalPath='/restaurant'
        keywords='Vegetarian Restaurant Pratap Nagar Jaipur, Rama Rasoi Near Jaipur Airport, Hotel Restaurant Pratap Nagar, Best Vegetarian Food Jaipur, Indian Thali Restaurant Jaipur, Family Restaurant Near JECC Jaipur, Budget Restaurant Pratap Nagar, Homely Food Jaipur Hotel'
      />
      <StructuredData page='restaurant' />
      <TopBanner text='Vegetarian Restaurant Pratap Nagar Jaipur - Rama Rasoi' image={hotelImages.restaurant} />
      <Breadcrumbs />
      <RestaurantSection />
      <LocalSEOSection compact={true} />
    </>
  )
}

export default Restaurant
