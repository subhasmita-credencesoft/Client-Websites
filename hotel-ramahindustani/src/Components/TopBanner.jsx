/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'

const TopBanner = ({ text, image, heading: Heading = 'h1' }) => (
  <section className='relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center bg-[#1a1923] overflow-hidden'>
    {image && (
      <img
        src={image}
        alt=''
        role='presentation'
        width={1920}
        height={800}
        className='absolute inset-0 w-full h-full object-cover'
        fetchPriority='high'
      />
    )}
    <div className='absolute inset-0 bg-gradient-to-br from-[#1a1923]/85 via-[#1a1923]/60 to-[#1a1923]/45' />
    <div className='absolute inset-0 bg-gradient-to-t from-[#1a1923]/60 via-transparent to-transparent' />
    <div className='absolute top-10 right-10 w-72 h-72 bg-[#c8a84e]/5 rounded-full blur-3xl' />
    <div className='absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl' />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className='relative z-10 section-container text-center w-full pt-28 md:pt-36'
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-[#c8a84e] text-xs tracking-[0.4em] uppercase mb-3 font-medium'
      >
        Hotel Rama Hindustani
      </motion.p>
      <Heading className='text-white text-4xl md:text-6xl lg:text-7xl font-bold font-display'>{text}</Heading>
    </motion.div>
  </section>
)

export default TopBanner
