import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import LocalSEOSection from '../Components/LocalSEOSection'
import TopBanner from '../Components/TopBanner'
import Reveal from '../Components/Reveal'
import { hotelImages, storyBlocks } from '../data/siteContent'

const About = () => (
  <div>
    <Seo
      title='About Hotel Rama Hindustani - Budget Family Hotel in Pratap Nagar Jaipur'
      description='Learn about Hotel Rama Hindustani in Pratap Nagar Jaipur — a budget family hotel near Jaipur Airport, JECC, and Sanganer Railway Station offering clean rooms, homely food, free WiFi, and warm Indian hospitality.'
      canonicalPath='/about'
      keywords='About Hotel Rama Hindustani, Hotel in Pratap Nagar Jaipur, Budget Family Hotel Jaipur, Hotel Near Jaipur Airport, Hotel Near Sanganer Railway Station'
    />
    <StructuredData page='about' />
    <TopBanner text='About Us' image={hotelImages.exteriorFront} />

    <section className='py-16 md:py-24'>
      <div className='section-container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          <Reveal direction='left'>
            <motion.div className='rounded-2xl overflow-hidden shadow-xl' whileHover={{ scale: 1.01 }}>
              <img
                src={hotelImages.frontAlt}
                alt='Hotel Rama Hindustani building exterior view in Pratap Nagar Jaipur'
                loading='lazy'
                className='w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105'
              />
            </motion.div>
          </Reveal>

          <Reveal direction='right'>
            <p className='section-subtitle'>Our Story</p>
            <h1 className='section-title mb-6'>Budget Family Hotel in Pratap Nagar Jaipur With Warm Indian Hospitality</h1>
            <p className='text-[#6b677a] leading-relaxed mb-6'>
              Hotel Rama Hindustani is a budget-friendly family hotel in Pratap Nagar Jaipur dedicated to providing guests with a comfortable
              and memorable stay. Located near Jaipur Airport, JECC, and Sanganer Railway Station, we ensure easy
              accessibility and convenience for all travelers.
            </p>
            <p className='text-[#6b677a] leading-relaxed mb-6'>
              Our hotel is known for clean and well-maintained rooms, friendly and professional staff,
              delicious homely food, and a peaceful and secure environment — making us the ideal choice for families and business travelers alike.
            </p>
            <p className='text-[#6b677a] leading-relaxed'>
              Whether you are visiting Jaipur for business or leisure, we aim to make your stay
              relaxing, practical, and enjoyable with modern amenities including free WiFi, free parking, and air-conditioned rooms.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <section className='py-16 md:py-24 bg-white/50'>
      <div className='section-container'>
        <Reveal className='text-center mb-14'>
          <p className='section-subtitle'>Our Values</p>
          <h2 className='section-title'>What Drives Us</h2>
        </Reveal>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {storyBlocks.map((block, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className='bg-white rounded-2xl p-7 border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-lg transition-all duration-300 h-full'
              >
                <p className='text-[#c8a84e] text-xs tracking-[0.3em] uppercase font-semibold mb-2'>{block.year}</p>
                <h3 className='font-display text-xl font-bold mb-3 text-[#1a1923]'>{block.title}</h3>
                <p className='text-[#6b677a] text-sm leading-relaxed'>{block.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <Reveal className='text-center py-16 md:py-24'>
      <div className='section-container'>
        <p className='section-subtitle'>Explore More</p>
        <h2 className='section-title'>Discover What We Offer</h2>
        <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
          From comfortable <Link to='/rooms' className='text-[#c8a84e] hover:underline font-medium'>rooms</Link> to delicious meals at <Link to='/restaurant' className='text-[#c8a84e] hover:underline font-medium'>Rama Rasoi</Link>, we ensure a memorable stay. Check our <Link to='/services' className='text-[#c8a84e] hover:underline font-medium'>amenities</Link> or{' '}
          <Link to='/book-now' className='text-[#c8a84e] hover:underline font-medium'>book directly</Link> for the best rates.
        </p>
        <div className='flex flex-wrap justify-center gap-3 mt-8'>
          <Link to='/rooms' className='btn-secondary'>Explore Rooms</Link>
          <Link to='/restaurant' className='btn-secondary !text-[#1a1923] !border-[#d4b896]'>Visit Rama Rasoi</Link>
          <Link to='/book-now' className='btn-primary'>Book Now</Link>
        </div>
      </div>
    </Reveal>
    <LocalSEOSection compact={true} />
  </div>
)

export default About
