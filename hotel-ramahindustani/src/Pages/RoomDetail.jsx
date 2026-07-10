import { Link, useParams } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import LocalSEOSection from '../Components/LocalSEOSection'
import { rooms, contactDetails } from '../data/siteContent'
import { BOOKING_ENGINE_URL, getWhatsappShareUrl } from '../utils/booking'
import { Wifi, Tv, Headphones, Thermometer, Snowflake, Refrigerator, Bed, Star, Users, ChevronRight } from 'lucide-react'
import { FaWhatsapp as FaWhatsappIcon } from 'react-icons/fa'

const featureIcons = {
  WiFi: Wifi, 'Flat TV': Tv, 'Room Service': Headphones,
  Geyser: Thermometer, AC: Snowflake, 'Mini Fridge': Refrigerator,
  'Premium Bedding': Bed,
}

const RoomDetail = () => {
  const { slug } = useParams()
  const room = rooms.find(r => r.slug === slug)

  if (!room) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#FFFFF0]'>
        <div className='text-center'>
          <h1 className='text-2xl font-display font-bold text-[#1a1923] mb-4'>Room Not Found</h1>
          <p className='text-[#6b677a] mb-6'>The room you are looking for does not exist.</p>
          <Link to='/rooms' className='btn-secondary'>View All Rooms</Link>
        </div>
      </div>
    )
  }

  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)
  const canonicalPath = `/rooms/${room.slug}`
  const title = `${room.name} in Pratap Nagar Jaipur — Price, Photos & Amenities`
  const description = `Book ${room.name} at Hotel Rama Hindustani in Pratap Nagar Jaipur. ₹${room.price}/night with ${room.features.join(', ')}. ${room.description}`
  const keywords = `${room.name} Jaipur, ${room.name} Pratap Nagar, book ${room.name.toLowerCase()} Jaipur, ${room.name} price Jaipur, hotel rooms Jaipur`

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        keywords={keywords}
        ogImage={room.image}
      />
      <StructuredData page='rooms' />
      <TopBanner text={room.name} image={room.image} />

      <div className='section-container py-6'>
        <nav aria-label='Breadcrumb' className='flex items-center gap-2 text-xs text-[#6b677a]'>
          <Link to='/' className='hover:text-[#c8a84e] transition-colors'>Home</Link>
          <ChevronRight size={10} />
          <Link to='/rooms' className='hover:text-[#c8a84e] transition-colors'>Rooms</Link>
          <ChevronRight size={10} />
          <span className='text-[#1a1923] font-medium'>{room.name}</span>
        </nav>
      </div>

      <section className='py-8 md:py-16'>
        <div className='section-container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16'>
            <Reveal direction='left'>
              <div className='space-y-4'>
                <div className='rounded-2xl overflow-hidden shadow-lg'>
                  <img
                    src={room.image}
                    alt={`${room.name} at Hotel Rama Hindustani in Pratap Nagar Jaipur`}
                    className='w-full h-72 md:h-96 object-cover'
                  />
                </div>
                {room.gallery.length > 1 && (
                  <div className='grid grid-cols-3 gap-3'>
                    {room.gallery.slice(1, 4).map((img, i) => (
                      <div key={i} className='rounded-xl overflow-hidden shadow-sm'>
                        <img
                          src={img}
                          alt={`${room.name} gallery image ${i + 2}`}
                          loading='lazy'
                          className='w-full h-20 md:h-28 object-cover hover:scale-105 transition-transform duration-500'
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal direction='right'>
              <p className='section-subtitle'>{room.name}</p>
              <h1 className='section-title mb-4'>{room.name} in Pratap Nagar Jaipur</h1>
              <p className='text-[#6b677a] leading-relaxed mb-6'>{room.description}</p>

              <div className='flex items-baseline gap-2 mb-6'>
                <span className='text-3xl font-bold font-display text-[#c8a84e]'>&#8377;{room.price}</span>
                <span className='text-[#6b677a] text-sm'>/ night</span>
              </div>

              <div className='bg-[#f5f0eb]/60 rounded-2xl p-5 mb-6'>
                <h3 className='font-display font-bold text-[#1a1923] mb-3 text-sm'>Room Features</h3>
                <div className='flex flex-wrap gap-2'>
                  {room.features.map(f => {
                    const Icon = featureIcons[f] || Star
                    return (
                      <span key={f} className='inline-flex items-center gap-1.5 text-sm text-[#1a1923] bg-white px-3 py-2 rounded-xl shadow-sm border border-[#d4b896]/10'>
                        <Icon size={14} className='text-[#c8a84e]' /> {f}
                      </span>
                    )
                  })}
                </div>
              </div>

              <div className='flex items-center gap-4 text-sm text-[#6b677a] mb-6'>
                <span className='flex items-center gap-1.5'><Users size={16} /> Up to {room.maximumOccupancy} guests</span>
                <span className='w-1 h-1 rounded-full bg-[#d4b896]' />
                <span>{room.noOfRooms} room{room.noOfRooms > 1 ? 's' : ''} available</span>
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <a
                  href={BOOKING_ENGINE_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-primary flex-1 justify-center'
                >
                  Book {room.name} Now
                </a>
                <a
                  href={whatsAppUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-whatsapp flex-1 justify-center'
                >
                  <FaWhatsappIcon size={18} /> WhatsApp Inquiry
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-white/50'>
        <div className='section-container'>
          <Reveal className='text-center mb-12'>
            <p className='section-subtitle'>More Options</p>
            <h2 className='section-title'>Explore Other Rooms</h2>
          </Reveal>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {rooms.filter(r => r.slug !== room.slug).slice(0, 3).map(r => (
              <Reveal key={r.slug}>
                <Link to={`/rooms/${r.slug}`} className='group block bg-white rounded-2xl overflow-hidden border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-lg transition-all duration-300'>
                  <div className='h-44 overflow-hidden'>
                    <img src={r.image} alt={r.name} loading='lazy' className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
                  </div>
                  <div className='p-5'>
                    <p className='font-display font-bold text-[#1a1923] group-hover:text-[#c8a84e] transition-colors mb-1'>{r.name}</p>
                    <p className='text-[#c8a84e] font-bold'>&#8377;{r.price} <span className='text-[#6b677a] text-xs font-normal'>/ night</span></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className='text-center mt-8'>
            <Link to='/rooms' className='btn-secondary'>View All Rooms</Link>
          </Reveal>
        </div>
      </section>

      <section className='py-16 md:py-20'>
        <div className='section-container text-center'>
          <Reveal>
            <p className='section-subtitle'>Book Direct</p>
            <h2 className='section-title'>Why Book Directly With Us?</h2>
            <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
              Best price guarantee, instant WhatsApp support, and personalized service when you book directly with Hotel Rama Hindustani.
            </p>
            <div className='flex flex-wrap justify-center gap-3 mt-8'>
              <Link to='/book-now' className='btn-primary'>Book Direct</Link>
              <a href={whatsAppUrl} target='_blank' rel='noopener noreferrer' className='btn-whatsapp'><FaWhatsappIcon size={18} /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>

      <LocalSEOSection compact />
    </>
  )
}

export default RoomDetail
