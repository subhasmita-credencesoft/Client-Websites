import { Suspense, lazy } from 'react'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import FAQSection from '../Components/FAQSection'
import LocalSEOSection from '../Components/LocalSEOSection'

const Hero = lazy(() => import('../Components/Hero'))
const Features = lazy(() => import('../Components/Features'))
const FeatureDestination = lazy(() => import('../Components/FeatureDestination'))
const ReviewsSection = lazy(() => import('../Components/ReviewsSection'))
const Banner = lazy(() => import('../Components/Banner'))
const Contact = lazy(() => import('../Components/ContactComp'))

const SectionLoader = () => (
  <div className='section-container py-12'>
    <div className='h-28 rounded-2xl bg-[#f5f0eb] animate-pulse' />
  </div>
)

const homeFaqs = [
  {
    question: 'Where is Hotel Rama Hindustani located?',
    answer: 'Hotel Rama Hindustani is located at 34-B1-B2, Haldighati Marg, Tonk Rd, Sector 5, Pratap Nagar, Jaipur, Rajasthan 302033. We are near Jaipur Airport (5 km), Sanganer Railway Station, JECC, and World Trade Park.',
  },
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in time is 12:00 PM and check-out time is 10:00 AM. Early check-in and late check-out may be available on request subject to availability.',
  },
  {
    question: 'Is Hotel Rama Hindustani good for families?',
    answer: 'Yes, Hotel Rama Hindustani is an excellent choice for families. We offer spacious rooms that can accommodate up to 4 guests, a safe and peaceful environment, and homely food at our on-site restaurant Rama Rasoi.',
  },
  {
    question: 'How far is Hotel Rama Hindustani from Jaipur Airport?',
    answer: 'Hotel Rama Hindustani is approximately 5 km from Jaipur International Airport, making it a convenient choice for air travelers. A taxi ride takes about 10-15 minutes.',
  },
  {
    question: 'Does the hotel offer free WiFi and parking?',
    answer: 'Yes, complimentary high-speed WiFi is available throughout the hotel, and free on-site parking is provided for all guests at no extra charge.',
  },
  {
    question: 'What dining options are available at the hotel?',
    answer: 'We have an on-site vegetarian restaurant called Rama Rasoi serving authentic Indian cuisine with vegetarian and vegan options. Room service is also available.',
  },
]

const Home = () => (
  <>
    <Seo
      title='Hotel in Pratap Nagar Jaipur - Budget Rooms Near Airport & JECC'
      description='Book budget hotel in Pratap Nagar Jaipur near Airport, JECC, and Sanganer Railway Station. Hotel Rama Hindustani offers clean AC rooms with free WiFi, parking, and vegetarian restaurant. Family-friendly with direct booking best price guarantee.'
      canonicalPath='/'
      ogType='website'
      keywords='Hotel in Pratap Nagar Jaipur, Budget Hotel Near Jaipur Airport, Hotel Near JECC Jaipur, Best Budget Hotel Pratap Nagar, Hotel Near Sanganer Railway Station, Family Hotel Jaipur, Affordable Hotel Near Airport Jaipur, Hotel Near World Trade Park Jaipur, Budget AC Rooms Jaipur, Hotel with Free WiFi Jaipur'
    />
    <StructuredData page='home' />
    <Suspense fallback={<SectionLoader />}>
      <Hero />
      <Features />
      <FeatureDestination />
      <LocalSEOSection compact={true} />
      <ReviewsSection />
      <Banner />
      <FAQSection
        title='Your Stay at Hotel Rama Hindustani'
        subtitle='Everything you need to know about our budget family hotel in Pratap Nagar Jaipur.'
        items={homeFaqs}
      />
      <Contact />
    </Suspense>
  </>
)

export default Home
