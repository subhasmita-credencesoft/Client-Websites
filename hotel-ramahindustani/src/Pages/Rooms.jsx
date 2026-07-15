import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import FAQSection from '../Components/FAQSection'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import RoomCards from '../Components/RoomCards'
import { hotelImages, rooms } from '../data/siteContent'

const roomFaqs = [
  {
    question: 'What room types are available at Hotel Rama Hindustani?',
    answer: `We offer ${rooms.map((r) => r.name).join(', ')}. Each room is equipped with AC, free WiFi, flat-screen TV, and room service. Prices start from ₹${Math.min(...rooms.map((r) => parseInt(r.price.replace(/,/g, ''))))} per night.`,
  },
  {
    question: 'Can I book a room online at Hotel Rama Hindustani?',
    answer:
      'Yes, you can book rooms online through our booking page or contact us directly via WhatsApp at +91 63767 07091 for instant assistance and room availability.',
  },
  {
    question: 'Are there family-friendly rooms at this Pratap Nagar hotel?',
    answer:
      'Yes, all our rooms can accommodate up to 4 guests, making them ideal for families visiting Jaipur. We recommend the Deluxe Room or Superior Double Room for family stays.',
  },
  {
    question: 'What amenities are included in the room price?',
    answer:
      'All rooms include free WiFi, air conditioning, flat-screen TV, room service, geyser for hot water, and daily housekeeping. The Superior room also includes a mini fridge.',
  },
  {
    question: 'Do you offer discounts for direct bookings?',
    answer:
      'Yes, booking directly through our website or WhatsApp ensures you get the best available rates with no OTA commission or booking fees.',
  },
  {
    question: 'What tourist places are near the hotel?',
    answer:
      'Hotel Rama Hindustani is close to Chokhi Dhani (6.7 km), Jawahar Circle & Patrika Gate (4.5 km), JECC (4.9 km), and Sanganer Handicraft Market (5 km). Major landmarks like Hawa Mahal are 18 km away. See our tourist places guide.',
  },
]

const Rooms = () => (
  <>
    <Seo
      title='Hotel Rooms in Pratap Nagar Jaipur | Hotel Rama Hindustani'
      description='Browse AC hotel rooms at Hotel Rama Hindustani, Pratap Nagar Jaipur — Economy, Standard, Deluxe & Superior Double Rooms with free WiFi, free parking & room service. Book direct for best rates.'
      canonicalPath='/rooms'
      keywords='Hotel Rooms in Pratap Nagar Jaipur, Budget AC Rooms Near Jaipur Airport, Deluxe Room Pratap Nagar, Economy Double Room Jaipur, Standard Double Room Jaipur, Superior Double Room Jaipur, Family Room Jaipur Hotel, Book Room Near JECC Jaipur'
    />
    <StructuredData page='rooms' />
    <TopBanner text='Our Rooms' image={hotelImages.deluxeRoom || hotelImages.superiorRoom} heading='div' />

    <section className='py-16 md:py-24'>
      <div className='section-container'>
        <Reveal className='text-center mb-14'>
          <p className='section-subtitle'>Accommodations</p>
          <h1 className='section-title'>Budget Hotel Rooms in Pratap Nagar Jaipur For Every Traveler</h1>
          <p className='mt-4 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
            From practical economy rooms to spacious family options, we offer comfort and
            affordability for every guest at our hotel in Pratap Nagar Jaipur — near the Airport,
            JECC, and Sanganer Railway Station.
          </p>
        </Reveal>
        <RoomCards />
      </div>
    </section>

    <FAQSection
      title='Room Questions'
      subtitle='Common questions about our hotel rooms in Pratap Nagar Jaipur.'
      items={roomFaqs}
    />

    <Reveal className='text-center py-16 md:py-24 bg-white/50'>
      <div className='section-container'>
        <p className='section-subtitle'>Complete Your Stay</p>
        <h2 className='section-title'>More Than Just a Room</h2>
        <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
          Enjoy delicious meals at{' '}
          <Link to='/restaurant' className='text-[#c8a84e] hover:underline font-medium'>
            Rama Rasoi Restaurant
          </Link>{' '}
          and explore{' '}
          <Link to='/tours' className='text-[#c8a84e] hover:underline font-medium'>
            tourist places nearby
          </Link>{' '}
          during your stay.
        </p>
        <div className='flex flex-wrap justify-center gap-3 mt-8'>
          <Link to='/tours' className='btn-secondary'>
            Nearby Tourist Places
          </Link>
          <Link to='/book-now' className='btn-primary'>
            Book Now
          </Link>
        </div>
      </div>
    </Reveal>
    <LocalSEOSection compact={true} />
  </>
)

export default Rooms
