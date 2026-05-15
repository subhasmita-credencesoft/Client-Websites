import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt1, HiX } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { BOOKING_ENGINE_URL, getWhatsappShareUrl } from '../../utils/booking'
import { contactDetails } from '../../data/siteContent'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/restaurant', label: 'Restaurant' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setShowMenu(false) }, [location])

  const linkClass = (path) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
      location.pathname === path
        ? 'text-[#c8a84e] bg-white/10'
        : 'text-white/75 hover:text-white hover:bg-white/5'
    }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#1a1923]/95 backdrop-blur-xl shadow-lg shadow-black/10' : 'bg-transparent'
        }`}
      >
        <div className='section-container'>
          <div className='flex items-center justify-between h-20 md:h-24'>
            <Link to='/' className='flex items-center gap-3 shrink-0'>
              <img
                src='/hotel-ramahindustani-image/rama-hindustanilogo.avif'
                alt='Hotel Rama Hindustani'
                className='h-10 md:h-12 w-auto'
              />
            </Link>

            <nav className='hidden lg:flex items-center gap-1'>
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className='hidden lg:flex items-center gap-3 shrink-0'>
              <a
                href={whatsAppUrl}
                target='_blank'
                rel='noreferrer'
                className='btn-whatsapp !py-2.5 !px-4 text-sm'
              >
                <FaWhatsapp size={16} />
                <span className='hidden xl:inline'>WhatsApp</span>
              </a>
              <a
                href={BOOKING_ENGINE_URL}
                target='_blank'
                rel='noreferrer'
                className='btn-primary !py-2.5 !px-5 text-sm'
              >
                Book Now
              </a>
            </div>

            <button onClick={() => setShowMenu(!showMenu)} className='lg:hidden text-white p-2' aria-label='Menu'>
              {showMenu ? <HiX size={26} /> : <HiMenuAlt1 size={26} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-[#1a1923]/98 lg:hidden'
          >
            <div className='flex flex-col items-center justify-center h-full gap-5 px-6'>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    className={`text-2xl font-medium transition-colors ${
                      location.pathname === link.to ? 'text-[#c8a84e]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='flex flex-col gap-3 mt-6 w-full max-w-xs'
              >
                <a href={whatsAppUrl} target='_blank' rel='noreferrer' className='btn-whatsapp w-full justify-center'>
                  <FaWhatsapp size={18} /> WhatsApp Booking
                </a>
                <a href={BOOKING_ENGINE_URL} target='_blank' rel='noreferrer' className='btn-primary w-full justify-center'>
                  Book Your Stay
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
