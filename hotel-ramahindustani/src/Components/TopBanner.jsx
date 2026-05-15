import { motion } from 'framer-motion'

const TopBanner = ({ text, image }) => (
  <section className='relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-[#1a1923] min-h-[280px] md:min-h-[320px] flex items-center'>
    {image && (
      <img
        src={image}
        alt=''
        className='absolute inset-0 w-full h-full object-cover'
        loading='lazy'
      />
    )}
    <div className='absolute inset-0 bg-gradient-to-br from-[#1a1923]/90 via-[#1a1923]/70 to-[#1a1923]/50' />
    <div className='absolute top-10 right-10 w-72 h-72 bg-[#c8a84e]/5 rounded-full blur-3xl' />
    <div className='absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl' />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className='relative z-10 section-container text-center w-full'
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-[#c8a84e] text-xs tracking-[0.4em] uppercase mb-3 font-medium'
      >
        Hotel Rama Hindustani
      </motion.p>
      <h1 className='text-white text-4xl md:text-6xl font-bold font-display'>{text}</h1>
    </motion.div>
  </section>
)

export default TopBanner
