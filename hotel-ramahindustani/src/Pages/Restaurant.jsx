import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import FAQSection from '../Components/FAQSection'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import RestaurantSection from '../Components/RestaurantSection'
import Breadcrumbs from '../Components/Breadcrumbs'
import Reveal from '../Components/Reveal'
import { hotelImages } from '../data/siteContent'

const restaurantFaqs = [
  {
    question: 'What type of food is served at Rama Rasoi?',
    answer: 'Rama Rasoi is our on-site pure vegetarian restaurant serving authentic Indian cuisine prepared with fresh ingredients and time-honored recipes. We offer North Indian thali, Rajasthani dishes, and everyday home-style meals.',
  },
  {
    question: 'Is the restaurant open to non-guests?',
    answer: 'Yes, Rama Rasoi is open to walk-in guests and non-hotel visitors. Anyone can enjoy our homely vegetarian food at budget-friendly prices.',
  },
  {
    question: 'What are the restaurant timings?',
    answer: 'Our restaurant serves breakfast, lunch, and dinner daily. Room service is also available for hotel guests who prefer to dine in their rooms.',
  },
  {
    question: 'Is there a restaurant near JECC Jaipur?',
    answer: 'Yes, Rama Rasoi at Hotel Rama Hindustani is just 4 km from JECC (Jaipur Exhibition & Convention Centre). We serve pure vegetarian Indian food at affordable prices for event attendees and exhibitors.',
  },
]

const Restaurant = () => {
  return (
    <>
      <Seo
        title='Vegetarian Restaurant in Pratap Nagar Jaipur | Rama Rasoi — Hotel Rama Hindustani'
        description='Rama Rasoi — pure vegetarian restaurant at Hotel Rama Hindustani, Pratap Nagar Jaipur. Authentic Indian thali, North Indian food & homely meals. Open to non-guests. Near JECC & Airport.'
        canonicalPath='/restaurant'
        keywords='Vegetarian Restaurant Pratap Nagar Jaipur, Rama Rasoi Jaipur, Pure Veg Restaurant Near Jaipur Airport, Indian Thali Restaurant Pratap Nagar, Hotel Restaurant Near JECC Jaipur, Budget Restaurant Pratap Nagar, Homely Food Jaipur, North Indian Food Pratap Nagar, Rajasthani Thali Jaipur, Veg Restaurant Near Sanganer'
      />
      <StructuredData page='restaurant' />
      <TopBanner text='Vegetarian Restaurant Pratap Nagar Jaipur - Rama Rasoi' image={hotelImages.restaurant} />
      <Breadcrumbs />
      <RestaurantSection />

      <section className='py-16 md:py-24 bg-white/50'>
        <div className='section-container text-center'>
          <Reveal>
            <p className='section-subtitle'>Stay & Dine</p>
            <h2 className='section-title'>Combine Your Meal With a Comfortable Stay</h2>
            <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
              Book a room at Hotel Rama Hindustani and enjoy complimentary breakfast with your stay. Our{' '}
              <Link to='/rooms' className='text-[#c8a84e] hover:underline font-medium'>budget AC rooms</Link>{' '}
              start from just ₹1,155/night — perfect for families, business travelers, and pilgrims visiting Jaipur.
            </p>
            <div className='flex flex-wrap justify-center gap-3 mt-8'>
              <Link to='/rooms' className='btn-secondary'>View Rooms</Link>
              <Link to='/book-now' className='btn-primary'>Book Your Stay</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection
        title='Restaurant FAQs'
        subtitle='Common questions about dining at Rama Rasoi, Hotel Rama Hindustani.'
        items={restaurantFaqs}
      />
      <LocalSEOSection compact={true} />
    </>
  )
}

export default Restaurant
