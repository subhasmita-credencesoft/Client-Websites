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
        title='Vegetarian Restaurant Pratap Nagar Jaipur - Rama Rasoi Near Airport'
        description='Rama Rasoi — vegetarian restaurant Pratap Nagar Jaipur at Hotel Rama Hindustani. Enjoy authentic Indian thali, homely vegetarian food, and affordable meals. Open for hotel guests and outside visitors near Jaipur Airport and JECC.'
        canonicalPath='/restaurant'
        keywords='Vegetarian Restaurant Pratap Nagar Jaipur, Rama Rasoi Near Jaipur Airport, Hotel Restaurant Pratap Nagar, Best Vegetarian Food Jaipur, Indian Thali Restaurant Jaipur, Family Restaurant Near JECC Jaipur, Budget Restaurant Pratap Nagar, Homely Food Jaipur Hotel'
      />
      <StructuredData page='restaurant' />
      <TopBanner text='Vegetarian Restaurant Pratap Nagar Jaipur - Rama Rasoi' image={hotelImages.restaurant} />
      <RestaurantSection />
      <LocalSEOSection compact={true} />
    </>
  )
}

export default Restaurant
