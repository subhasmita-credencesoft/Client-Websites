import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import {
  MapPin, Clock, Navigation, ExternalLink, Star,
  Camera, Landmark, Trees, ShoppingBag, Building2,
  X, Info, CalendarRange, IndianRupee, Sparkles
} from 'lucide-react'

/* ─────────────────────────────────────────────
   TOURIST PLACES DATA WITH PREMIUM SIGHTSEEING DETAILS
───────────────────────────────────────────── */
export const touristPlaces = [
  {
    id: 'chokhi-dhani',
    name: 'Chokhi Dhani',
    category: 'Cultural Village',
    categoryIcon: Landmark,
    distance: '6.7 km',
    driveTime: '9–12 min',
    description:
      'An award-winning ethnic village resort offering an immersive Rajasthani cultural experience — folk dances, puppet shows, camel rides, elephant rides, and authentic Rajasthani thali meals.',
    highlights: ['Folk Dance Shows', 'Camel Rides', 'Rajasthani Thali', 'Puppet Shows'],
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Chokhi Dhani ethnic village Jaipur near Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Chokhi+Dhani,+Jaipur',
    badge: 'Must Visit',
    badgeClass: 'bg-amber-100 text-amber-800',
    entryFee: '₹900 - ₹1,200 per adult (includes buffet dinner)',
    timings: '5:00 PM - 11:00 PM (Every day)',
    bestTime: 'October to March (Evening time)',
    howToReach: 'Direct cab or auto-rickshaw from the hotel (takes ~10 mins via Tonk Road).',
  },
  {
    id: 'jain-mandir-sanganer',
    name: 'Jain Mandir Sanganer',
    category: 'Temple & Pilgrimage',
    categoryIcon: Star,
    distance: '5.7 km',
    driveTime: '8–10 min',
    description:
      'An ancient Digambara Jain temple in Sanganer known for its intricate stone carvings, spiritual significance, and peaceful surroundings. A sacred pilgrimage site dating back several centuries.',
    highlights: ['Ancient Architecture', 'Stone Carvings', 'Spiritual Site', 'Free Entry'],
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Jain Mandir Sanganer near Hotel Rama Hindustani Jaipur',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Jain+Mandir+Sanganer+Jaipur',
    badge: 'Spiritual',
    badgeClass: 'bg-violet-100 text-violet-800',
    entryFee: 'Free entry',
    timings: '6:00 AM - 9:00 PM (Every day)',
    bestTime: 'Early morning for peaceful prayers',
    howToReach: '5.7 km from hotel; easily accessible by auto-rickshaw or taxi.',
  },
  {
    id: 'jawahar-circle',
    name: 'Jawahar Circle & Patrika Gate',
    category: 'Garden & Park',
    categoryIcon: Trees,
    distance: '4.5 km',
    driveTime: '8–10 min',
    description:
      "One of Asia's largest roundabouts featuring beautifully manicured rose gardens, a grand musical fountain, and the iconic Patrika Gate — a masterpiece of Rajasthani architecture.",
    highlights: ['Musical Fountain', 'Patrika Gate', 'Rose Garden', 'Evening Light Show'],
    image: 'https://images.unsplash.com/photo-1477584308802-e9c3788ee12d?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Jawahar Circle Patrika Gate Jaipur near Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Jawahar+Circle+Jaipur',
    badge: 'Family Friendly',
    badgeClass: 'bg-green-100 text-green-800',
    entryFee: 'Free (Garden entry), Nominal charges for musical fountain show',
    timings: '6:00 AM - 9:00 PM (Fountain shows start at 7:00 PM)',
    bestTime: 'October to March (Sunset / Evening)',
    howToReach: 'Quick 8-minute cab ride via Haldighati Marg and Tonk Road.',
  },
  {
    id: 'jecc',
    name: 'JECC — Jaipur Exhibition Centre',
    category: 'Business & Events',
    categoryIcon: Building2,
    distance: '4.9 km',
    driveTime: '7–9 min',
    description:
      "Jaipur's premier convention and exhibition center hosting major trade fairs, business summits, and cultural events year-round — just 7 minutes from the hotel.",
    highlights: ['Trade Fairs', 'Business Events', 'Exhibition Halls', 'Easy Access'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'JECC Jaipur Exhibition Convention Centre near Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/JECC+Jaipur',
    badge: 'Business Hub',
    badgeClass: 'bg-blue-100 text-blue-800',
    entryFee: 'Varies by exhibition/event registration',
    timings: '9:00 AM - 6:00 PM (Depends on scheduled event)',
    bestTime: 'During active trade fairs and summits',
    howToReach: 'Direct drive (~8 mins) via Sitapura Industrial Area road.',
  },
  {
    id: 'sanganer-handicrafts',
    name: 'Sanganer Handicraft Market',
    category: 'Shopping & Local',
    categoryIcon: ShoppingBag,
    distance: '5 km',
    driveTime: '8–10 min',
    description:
      'Famous for hand-block printing, Sanganer paper, and Rajasthani handicrafts. Browse workshops where artisans create traditional Bagru and Sanganer prints — a must for shoppers.',
    highlights: ['Block Printing', 'Handmade Paper', 'Rajasthani Textiles', 'Artisan Workshops'],
    image: 'https://images.unsplash.com/photo-1590736969955-71cb94801758?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Sanganer handicraft market block printing near Hotel Rama Hindustani Jaipur',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Sanganer+Market+Jaipur',
    badge: 'Local Gem',
    badgeClass: 'bg-teal-100 text-teal-800',
    entryFee: 'Free to explore market',
    timings: '10:00 AM - 8:30 PM (Sundays mostly closed)',
    bestTime: 'Afternoon for shopping and seeing block printers at work',
    howToReach: 'Auto-rickshaw or taxi to Sanganer town market (~10 mins drive).',
  },
  {
    id: 'world-trade-park',
    name: 'World Trade Park',
    category: 'Shopping & Dining',
    categoryIcon: ShoppingBag,
    distance: '6 km',
    driveTime: '12–15 min',
    description:
      "Jaipur's premier luxury shopping mall with international brands, fine dining restaurants, a multiplex cinema, and entertainment zones — all under one stunning modern roof.",
    highlights: ['International Brands', 'Food Court', 'Multiplex', 'Entertainment Zone'],
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'World Trade Park Jaipur shopping mall near Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/World+Trade+Park+Jaipur',
    badge: 'Shopping',
    badgeClass: 'bg-cyan-100 text-cyan-800',
    entryFee: 'Free entry',
    timings: '11:00 AM - 10:00 PM (Every day)',
    bestTime: 'Afternoons and evenings',
    howToReach: 'Easy cab ride via JLN Marg or Tonk Road (~15 mins drive).',
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    category: 'Heritage Monument',
    categoryIcon: Camera,
    distance: '18 km',
    driveTime: '25–35 min',
    description:
      'The iconic "Palace of Winds" — a stunning 5-storey pink sandstone palace with 953 small windows (jharokhas). Built in 1799, it is the defining symbol of Jaipur.',
    highlights: ['953 Windows', 'Sunset Views', 'Museum Inside', 'Pink Sandstone'],
    image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Hawa Mahal Palace of Winds Jaipur sightseeing from Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Hawa+Mahal+Jaipur',
    badge: 'Iconic',
    badgeClass: 'bg-rose-100 text-rose-800',
    entryFee: '₹50 for Indians, ₹200 for Foreigners',
    timings: '9:00 AM - 4:30 PM (Every day)',
    bestTime: 'Early morning when the golden sun rays hit the front facade',
    howToReach: 'Cabs or metro from near Sanganer (takes ~30 mins via Tonk Road).',
  },
  {
    id: 'amber-fort',
    name: 'Amer Fort (Amber Fort)',
    category: 'Heritage Monument',
    categoryIcon: Camera,
    distance: '28 km',
    driveTime: '40–50 min',
    description:
      'A UNESCO World Heritage Site and Jaipur\'s grandest fort. Built with red sandstone and white marble, it sits on a hilltop overlooking Maota Lake. Famous for elephant rides and the Sheesh Mahal.',
    highlights: ['UNESCO Heritage', 'Elephant Rides', 'Sheesh Mahal', 'Light & Sound Show'],
    image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Amer Fort Jaipur sightseeing tour from Hotel Rama Hindustani Pratap Nagar',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Amber+Fort+Jaipur',
    badge: 'UNESCO',
    badgeClass: 'bg-orange-100 text-orange-800',
    entryFee: '₹100 for Indians, ₹500 for Foreigners',
    timings: '9:00 AM - 6:00 PM (Night entry available 7:00 PM - 10:00 PM)',
    bestTime: 'October to March (Morning / Sunset hours)',
    howToReach: 'Book a full-day taxi via our hotel front desk for hassle-free round-trip.',
  },
  {
    id: 'city-palace',
    name: 'City Palace Jaipur',
    category: 'Heritage Monument',
    categoryIcon: Landmark,
    distance: '16 km',
    driveTime: '25–30 min',
    description:
      'The magnificent royal palace complex blending Rajput, Mughal, and European architecture. Houses a museum with royal artifacts, textiles, weapons, and priceless art.',
    highlights: ['Royal Museum', 'Mubarak Mahal', 'Chandra Mahal', 'Royal Artifacts'],
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'City Palace Jaipur sightseeing tour from Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/City+Palace+Jaipur',
    badge: 'Royal Heritage',
    badgeClass: 'bg-purple-100 text-purple-800',
    entryFee: '₹200 for Indians, ₹700 for Foreigners',
    timings: '9:30 AM - 5:00 PM (Day time), 7:00 PM - 10:00 PM (Night view)',
    bestTime: 'Cooler winter months',
    howToReach: 'Direct taxi from our hotel, adjacent to Hawa Mahal in old city.',
  },
  {
    id: 'nahargarh-fort',
    name: 'Nahargarh Fort',
    category: 'Heritage & Views',
    categoryIcon: Camera,
    distance: '22 km',
    driveTime: '35–45 min',
    description:
      "A majestic fort on the Aravalli Hills offering breathtaking panoramic views of Jaipur city. Famous for sunset views and its connection to Jaipur's royal history.",
    highlights: ['Panoramic City Views', 'Sunset Point', 'Fort Restaurant', 'Royal History'],
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Nahargarh Fort Jaipur sunset views sightseeing from Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Nahargarh+Fort+Jaipur',
    badge: 'Sunset Views',
    badgeClass: 'bg-amber-100 text-amber-800',
    entryFee: '₹50 for Indians, ₹200 for Foreigners',
    timings: '10:00 AM - 5:30 PM (Sunset point is open later)',
    bestTime: '4:00 PM - 6:30 PM (Sunset)',
    howToReach: 'Best reached via private taxi/cab. We can arrange a driver for you.',
  },
  {
    id: 'birla-mandir',
    name: 'Birla Mandir',
    category: 'Temple & Pilgrimage',
    categoryIcon: Star,
    distance: '14 km',
    driveTime: '20–25 min',
    description:
      'A magnificent white marble temple dedicated to Lord Vishnu and Goddess Lakshmi. Known for its intricate carvings, serene atmosphere, and beautiful evening aarti.',
    highlights: ['White Marble', 'Intricate Carvings', 'Evening Aarti', 'Free Entry'],
    image: 'https://images.unsplash.com/photo-1609137144814-8f6916a04e54?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Birla Mandir white marble temple Jaipur near Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Birla+Mandir+Jaipur',
    badge: 'Spiritual',
    badgeClass: 'bg-yellow-100 text-yellow-800',
    entryFee: 'Free entry',
    timings: '6:00 AM - 12:00 PM, 3:00 PM - 9:00 PM (Every day)',
    bestTime: 'Sunset / Night (Beautifully illuminated marble)',
    howToReach: '14 km from hotel. Easily accessible via Tonk Road cabs.',
  },
  {
    id: 'jaipur-zoo',
    name: 'Jaipur Zoo & Ram Niwas Garden',
    category: 'Nature & Family',
    categoryIcon: Trees,
    distance: '17 km',
    driveTime: '28–35 min',
    description:
      'Located within Ram Niwas Garden, this zoo houses tigers, leopards, crocodiles, and rare birds. The garden itself has the stunning Albert Hall Museum and is perfect for family outings.',
    highlights: ['Tigers & Leopards', 'Bird Aviary', 'Ram Niwas Garden', 'Albert Hall Museum'],
    image: 'https://images.unsplash.com/photo-1475809913362-2b3d02901157?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Jaipur Zoo Ram Niwas Garden sightseeing tour from Hotel Rama Hindustani',
    mapsUrl: 'https://www.google.com/maps/dir/Hotel+Rama+Hindustani,+Pratap+Nagar,+Jaipur/Jaipur+Zoo',
    badge: 'Family',
    badgeClass: 'bg-lime-100 text-lime-800',
    entryFee: '₹15 for Indians, ₹150 for Foreigners',
    timings: '9:00 AM - 5:00 PM (Tuesdays closed)',
    bestTime: 'October to March (Sunny afternoons)',
    howToReach: 'Take a direct auto or cab towards Ram Niwas Bagh (~30 mins via Tonk Road).',
  },
]

/* eslint-disable react/prop-types */
const NearbyAttractions = ({ limit }) => {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const displayed = limit ? touristPlaces.slice(0, limit) : touristPlaces

  const closeModal = useCallback(() => setSelectedPlace(null), [])

  useEffect(() => {
    if (!selectedPlace) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [selectedPlace, closeModal])

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {displayed.map((place, i) => {
          const CatIcon = place.categoryIcon
          return (
            <Reveal key={place.id} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                className='bg-white rounded-2xl overflow-hidden border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col'
                itemScope
                itemType='https://schema.org/TouristAttraction'
              >
                {/* Premium Image Header */}
                <div className='relative h-56 overflow-hidden bg-[#faf6ef]'>
                  <img
                    src={place.image}
                    alt={place.imageAlt}
                    width={800}
                    height={500}
                    loading='lazy'
                    className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'
                    itemProp='image'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.jpg';
                    }}
                  />
                  {/* Glassy overlay for details */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
                  {/* Badge */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${place.badgeClass} shadow-sm`}>
                    {place.badge}
                  </span>
                  {/* Distance chip */}
                  <div className='absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm'>
                    <Navigation size={10} className='text-[#c8a84e]' />
                    <span className='text-[11px] font-bold text-[#1a1923]'>{place.distance}</span>
                  </div>
                </div>

                {/* Content */}
                <div className='p-5 flex flex-col flex-1'>
                  {/* Category tag */}
                  <div className='inline-flex items-center gap-1.5 mb-3'>
                    <CatIcon size={11} className='text-[#c8a84e]' />
                    <span className='text-[10px] font-semibold text-[#c8a84e] tracking-wide uppercase'>
                      {place.category}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className='font-display text-lg font-bold text-[#1a1923] mb-2 leading-snug'
                    itemProp='name'
                  >
                    {place.name}
                  </h3>

                  {/* Distance + Time */}
                  <div className='flex items-center gap-4 mb-3'>
                    <div className='flex items-center gap-1 text-xs text-[#6b677a]'>
                      <MapPin size={11} className='text-[#c8a84e]' />
                      <span>{place.distance} from hotel</span>
                    </div>
                    <div className='flex items-center gap-1 text-xs text-[#6b677a]'>
                      <Clock size={11} className='text-[#c8a84e]' />
                      <span>{place.driveTime} drive</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className='text-[#6b677a] text-sm leading-relaxed mb-4 flex-1 line-clamp-3'
                    itemProp='description'
                  >
                    {place.description}
                  </p>

                  {/* Highlights */}
                  <div className='flex flex-wrap gap-1.5 mb-5'>
                    {place.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className='text-[10px] font-medium px-2 py-0.5 bg-[#faf6ef] text-[#c8a84e] border border-[#d4b896]/30 rounded-full'
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Actions Grid */}
                  <div className='grid grid-cols-2 gap-2 mt-auto'>
                    <button
                      onClick={() => setSelectedPlace(place)}
                      className='inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#1a1923] to-[#2d2935] text-white text-xs font-semibold rounded-xl hover:from-[#c8a84e] hover:to-[#d4b063] transition-all duration-300 shadow-sm'
                      aria-label={`View more details about ${place.name}`}
                    >
                      <Info size={12} />
                      View Details
                    </button>
                    <a
                      href={place.mapsUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#faf6ef] text-[#c8a84e] border border-[#d4b896]/30 text-xs font-semibold rounded-xl hover:bg-[#c8a84e] hover:text-white hover:border-[#c8a84e] transition-all duration-300 shadow-sm'
                      aria-label={`Get directions to ${place.name}`}
                    >
                      <ExternalLink size={12} />
                      Directions
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          )
        })}
      </div>

      {/* ── INTERACTIVE DETAILED MODAL ────────────────── */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className='bg-[#fdfbf7] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-[#d4b896]/30 max-h-[90vh] flex flex-col'
              role='dialog'
              aria-modal='true'
              aria-label={selectedPlace ? `${selectedPlace.name} details` : 'Attraction details'}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image banner with close button */}
              <div className='relative h-64 sm:h-72 w-full'>
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.imageAlt}
                  width={1920}
                  height={1080}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.jpg';
                  }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                <button
                  onClick={() => setSelectedPlace(null)}
                  className='absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm transition-all duration-200'
                  aria-label='Close details window'
                >
                  <X size={18} />
                </button>
                <div className='absolute bottom-4 left-4 right-4'>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${selectedPlace.badgeClass} shadow-sm inline-block mb-2`}>
                    {selectedPlace.badge}
                  </span>
                  <h2 className='text-white font-display text-xl sm:text-2xl font-bold leading-tight'>
                    {selectedPlace.name}
                  </h2>
                </div>
              </div>

              {/* Scrollable details content */}
              <div className='p-6 overflow-y-auto flex-1 space-y-6'>
                {/* Intro summary */}
                <p className='text-[#6b677a] text-sm leading-relaxed'>
                  {selectedPlace.description}
                </p>

                {/* Details grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#d4b896]/15 shadow-sm'>
                  <div className='flex gap-3 items-start'>
                    <div className='p-2 rounded-lg bg-amber-50 text-[#c8a84e] shrink-0'>
                      <IndianRupee size={16} />
                    </div>
                    <div>
                      <h4 className='text-xs font-bold text-[#1a1923] uppercase tracking-wider mb-0.5'>Entry Fee</h4>
                      <p className='text-xs text-[#6b677a]'>{selectedPlace.entryFee}</p>
                    </div>
                  </div>

                  <div className='flex gap-3 items-start'>
                    <div className='p-2 rounded-lg bg-amber-50 text-[#c8a84e] shrink-0'>
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className='text-xs font-bold text-[#1a1923] uppercase tracking-wider mb-0.5'>Opening Hours</h4>
                      <p className='text-xs text-[#6b677a]'>{selectedPlace.timings}</p>
                    </div>
                  </div>

                  <div className='flex gap-3 items-start'>
                    <div className='p-2 rounded-lg bg-amber-50 text-[#c8a84e] shrink-0'>
                      <CalendarRange size={16} />
                    </div>
                    <div>
                      <h4 className='text-xs font-bold text-[#1a1923] uppercase tracking-wider mb-0.5'>Best Time to Visit</h4>
                      <p className='text-xs text-[#6b677a]'>{selectedPlace.bestTime}</p>
                    </div>
                  </div>

                  <div className='flex gap-3 items-start'>
                    <div className='p-2 rounded-lg bg-amber-50 text-[#c8a84e] shrink-0'>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className='text-xs font-bold text-[#1a1923] uppercase tracking-wider mb-0.5'>Distance Details</h4>
                      <p className='text-xs text-[#6b677a]'>{selectedPlace.distance} ({selectedPlace.driveTime} drive)</p>
                    </div>
                  </div>
                </div>

                {/* Highlights and How to reach */}
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-display text-sm font-bold text-[#1a1923] mb-2 flex items-center gap-1.5'>
                      <Sparkles size={14} className='text-[#c8a84e]' />
                      Key Highlights
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {selectedPlace.highlights.map((h) => (
                        <span key={h} className='text-xs px-3 py-1 bg-[#faf6ef] text-[#c8a84e] border border-[#d4b896]/20 rounded-full font-medium'>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className='font-display text-sm font-bold text-[#1a1923] mb-1.5 flex items-center gap-1.5'>
                      <Navigation size={14} className='text-[#c8a84e]' />
                      How to reach from Hotel Rama Hindustani
                    </h3>
                    <p className='text-xs text-[#6b677a] leading-relaxed'>
                      {selectedPlace.howToReach}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer action buttons */}
              <div className='bg-[#faf6ef] border-t border-[#d4b896]/20 p-4 flex flex-col sm:flex-row gap-2 justify-end'>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className='px-4 py-2 border border-[#d4b896]/30 text-xs font-semibold text-[#6b677a] rounded-xl hover:bg-white hover:text-[#1a1923] transition-all duration-200 order-2 sm:order-1'
                >
                  Close Window
                </button>
                <a
                  href={selectedPlace.mapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-5 py-2.5 bg-gradient-to-r from-[#c8a84e] to-[#d4b063] text-white text-xs font-semibold rounded-xl hover:from-[#b8963e] hover:to-[#c8a84e] transition-all duration-200 inline-flex items-center justify-center gap-1.5 order-1 sm:order-2 shadow-sm'
                >
                  <Navigation size={12} />
                  Open in Google Maps Directions
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NearbyAttractions

