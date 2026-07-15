import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import FAQSection from '../Components/FAQSection'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import NearbyAttractions, { touristPlaces } from '../Components/NearbyAttractions'
import { hotelImages } from '../data/siteContent'
import { MapPin, Phone, Clock } from 'lucide-react'

const tourFaqs = [
  {
    question: 'What tourist places are near Hotel Rama Hindustani in Pratap Nagar, Jaipur?',
    answer:
      'Hotel Rama Hindustani is close to Chokhi Dhani (6.7 km), Jain Mandir Sanganer (5.7 km), Jawahar Circle & Patrika Gate (4.5 km), JECC (4.9 km), Sanganer Handicraft Market (5 km), and World Trade Park (6 km). Major landmarks like Hawa Mahal and City Palace are 16–18 km away.',
  },
  {
    question: 'How far is Hotel Rama Hindustani from Hawa Mahal and Amer Fort?',
    answer:
      'Hawa Mahal is approximately 18 km from the hotel (25–35 minutes drive). Amer Fort is approximately 28 km away (40–50 minutes drive). We can help you arrange a local taxi or auto-rickshaw for sightseeing.',
  },
  {
    question: 'Can Hotel Rama Hindustani arrange local sightseeing tours?',
    answer:
      'Yes! Our front desk can help you arrange local taxis, private drivers, and city sightseeing tours to all major Jaipur attractions. WhatsApp us at +91 63767 07091 for tour assistance.',
  },
  {
    question: 'Is Chokhi Dhani near Hotel Rama Hindustani?',
    answer:
      'Yes, Chokhi Dhani is just 6.7 km from Hotel Rama Hindustani — approximately 9–12 minutes by car. It is one of the closest major cultural attractions to our hotel.',
  },
  {
    question: 'What is the best way to travel from the hotel to Jaipur tourist attractions?',
    answer:
      'Nearby places (within 7 km) are easily accessible by auto-rickshaw or cab (Ola/Uber). For major attractions like Hawa Mahal, City Palace, or Amer Fort, we recommend booking a private taxi for the day (typically ₹800–₹1,200 for a half-day tour).',
  },
  {
    question: 'Is Jaipur Airport close to the hotel?',
    answer:
      'Yes, Jaipur International Airport (JAI) is just 5 km from Hotel Rama Hindustani — approximately 10–15 minutes drive. We are one of the closest budget hotels to the airport in Pratap Nagar.',
  },
]

// Quick-access distance summary for the intro section
const nearbyQuickList = [
  { name: 'Chokhi Dhani', km: '6.7 km', time: '9 min' },
  { name: 'Jain Mandir Sanganer', km: '5.7 km', time: '8 min' },
  { name: 'Jawahar Circle & Patrika Gate', km: '4.5 km', time: '8 min' },
  { name: 'JECC Exhibition Centre', km: '4.9 km', time: '7 min' },
  { name: 'Hawa Mahal', km: '18 km', time: '30 min' },
  { name: 'Amer Fort', km: '28 km', time: '45 min' },
]

const Tours = () => {
  return (
    <>
      <Seo
        title='Tourist Places Near Hotel Rama Hindustani, Pratap Nagar Jaipur'
        description='Explore tourist places near Hotel Rama Hindustani in Pratap Nagar, Jaipur — Chokhi Dhani (6.7 km), Patrika Gate (4.5 km), Hawa Mahal (18 km), Amer Fort (28 km) & more. Local sightseeing guide with distances & directions.'
        canonicalPath='/tours'
        keywords='tourist places near Hotel Rama Hindustani Jaipur, places to visit near Pratap Nagar Jaipur, Chokhi Dhani near hotel Jaipur, Patrika Gate near Pratap Nagar, Jaipur sightseeing from Pratap Nagar, tourist attractions near Jaipur Airport hotel, Hawa Mahal distance from Pratap Nagar, Amer Fort tour from Pratap Nagar, Jaipur local tour hotel, nearby places Hotel Rama Hindustani'
      />
      <StructuredData page='tours' />
      <TopBanner
        text='Tourist Places Near Our Hotel'
        image={hotelImages.superiorRoom}
        heading='div'
      />

      {/* ── INTRO SECTION ─────────────────────────── */}
      <section className='py-16 md:py-24'>
        <div className='section-container'>
          <Reveal className='text-center mb-12'>
            <p className='section-subtitle'>Local Sightseeing Guide</p>
            <h1 className='section-title'>
              Tourist Places Near Hotel Rama Hindustani, Pratap Nagar Jaipur
            </h1>
            <p className='mt-4 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
              Perfectly located in Pratap Nagar, Hotel Rama Hindustani gives you easy access to
              Jaipur's top tourist attractions — from the nearby Chokhi Dhani cultural village to
              the iconic Hawa Mahal and UNESCO-listed Amer Fort. Here is your complete guide to
              nearby sightseeing with distances and directions.
            </p>
          </Reveal>

          {/* Quick distance grid */}
          <Reveal>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14'>
              {nearbyQuickList.map((item) => (
                <div
                  key={item.name}
                  className='bg-white border border-[#d4b896]/20 rounded-xl p-3 text-center shadow-sm hover:border-[#c8a84e]/40 hover:shadow-md transition-all duration-200'
                >
                  <div className='flex items-center justify-center gap-1 mb-1'>
                    <MapPin size={11} className='text-[#c8a84e]' />
                    <span className='text-[#c8a84e] font-bold text-sm'>{item.km}</span>
                  </div>
                  <p className='text-[#1a1923] text-[11px] font-semibold leading-tight'>{item.name}</p>
                  <p className='text-[#6b677a] text-[10px] mt-0.5'>{item.time} drive</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Attractions Grid */}
          <NearbyAttractions />
        </div>
      </section>

      {/* ── TOUR ASSISTANCE BANNER ─────────────────── */}
      <section className='py-16 md:py-20 bg-gradient-to-br from-[#1a1923] to-[#2d2935]'>
        <div className='section-container'>
          <Reveal className='text-center'>
            <p className='section-subtitle !text-[#c8a84e]'>We Help You Explore</p>
            <h2 className='section-title !text-white mb-4'>
              Need Help Planning Your Jaipur Sightseeing?
            </h2>
            <p className='text-[#9d99a8] max-w-xl mx-auto leading-relaxed mb-8'>
              Our front desk team can arrange local taxis, private drivers, and guided city tours
              to all major Jaipur attractions. WhatsApp us for instant assistance.
            </p>
            <div className='flex flex-wrap justify-center gap-4 mb-8'>
              <div className='flex items-center gap-2 text-white/80 text-sm'>
                <Clock size={16} className='text-[#c8a84e]' />
                <span>Front desk open 24 hours</span>
              </div>
              <div className='flex items-center gap-2 text-white/80 text-sm'>
                <Phone size={16} className='text-[#c8a84e]' />
                <span>Instant WhatsApp assistance</span>
              </div>
            </div>
            <div className='flex flex-wrap justify-center gap-3'>
              <a
                href='https://wa.me/916376707091?text=Hi%2C%20I%20need%20help%20with%20Jaipur%20sightseeing%20tours'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-primary'
              >
                WhatsApp for Tour Help
              </a>
              <Link to='/book-now' className='btn-secondary !text-white !border-white/30 hover:!border-[#c8a84e]'>
                Book Your Stay
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <FAQSection
        title='Tourist Places & Sightseeing FAQs'
        subtitle='Common questions about places to visit near Hotel Rama Hindustani in Pratap Nagar, Jaipur.'
        items={tourFaqs}
      />

      <LocalSEOSection compact={true} />
    </>
  )
}

export default Tours
