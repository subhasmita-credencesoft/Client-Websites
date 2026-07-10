import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import RestaurantSection from '../Components/RestaurantSection'
import { hotelImages } from '../data/siteContent'

const Restaurant = () => {
  return (
    <>
      <Seo
        title='Vegetarian Restaurant in Pratap Nagar Jaipur - Rama Rasoi'
        description='Discover Rama Rasoi, the in-house vegetarian restaurant at Hotel Rama Hindustani in Pratap Nagar Jaipur. Enjoy authentic Indian cuisine, homely food, and affordable meals near Jaipur Airport and JECC.'
        canonicalPath='/restaurant'
        keywords='Vegetarian Restaurant Pratap Nagar Jaipur, Hotel with Restaurant Jaipur, Rama Rasoi Jaipur, Family Restaurant Pratap Nagar, Best Vegetarian Food Jaipur, Hotel with Homely Food Jaipur'
      />
      <StructuredData page='restaurant' />
      <TopBanner text='Rama Rasoi' image={hotelImages.restaurant} />
      <RestaurantSection />
      <LocalSEOSection compact={true} />
    </>
  )
}

export default Restaurant
