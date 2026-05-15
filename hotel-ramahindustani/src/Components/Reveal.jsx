import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 36 : direction === 'down' ? -36 : 0,
      x: direction === 'left' ? -36 : direction === 'right' ? 36 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
