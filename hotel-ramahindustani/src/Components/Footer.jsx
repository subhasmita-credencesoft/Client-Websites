import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { Mail, Phone, MapPin } from 'lucide-react'
import Reveal from './Reveal'
import { contactDetails } from '../data/siteContent'
import { getWhatsappShareUrl } from '../utils/booking'

const Footer = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <footer className='bg-[#1a1923] text-white relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a84e]/40 to-transparent' />
      <div className='absolute top-20 left-1/4 w-48 h-48 bg-[#c8a84e]/3 rounded-full blur-3xl' />

      <Reveal className='section-container py-16 md:py-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          <div>
            <img
              src='/hotel-ramahindustani-image/rama-hindustanilogo.avif'
              alt='Hotel Rama Hindustani'
              loading='lazy'
              className='h-12 w-auto mb-5'
            />
            <p className='text-white/45 text-sm leading-relaxed'>
              Experience comfort, affordability, and warm Indian hospitality in the heart of Jaipur.
            </p>
          </div>

          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>Quick Links</h4>
            <ul className='space-y-2.5'>
              {[
                { to: '/', label: 'Home' },
                { to: '/rooms', label: 'Rooms' },
                { to: '/restaurant', label: 'Restaurant' },
                { to: '/services', label: 'Services' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className='text-white/45 hover:text-[#c8a84e] text-sm transition-colors duration-300'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>Contact</h4>
            <ul className='space-y-3 text-sm text-white/45'>
              <li className='flex items-start gap-2.5'>
                <MapPin size={14} className='text-[#c8a84e] mt-0.5 shrink-0' />
                <span>Pratap Nagar, Jaipur, Rajasthan</span>
              </li>
              <li className='flex items-center gap-2.5'>
                <Phone size={14} className='text-[#c8a84e] shrink-0' />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className='hover:text-[#c8a84e] transition-colors'>{contactDetails.phone}</a>
              </li>
              <li className='flex items-center gap-2.5'>
                <Mail size={14} className='text-[#c8a84e] shrink-0' />
                <a href={`mailto:${contactDetails.email}`} className='hover:text-[#c8a84e] transition-colors break-all'>{contactDetails.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>Connect</h4>
            <div className='flex gap-3 mb-6'>
              <a
                href={whatsAppUrl}
                target='_blank'
                rel='noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 hover:scale-110'
                aria-label='WhatsApp'
              >
                <FaWhatsapp size={16} />
              </a>
              <a
                href='https://www.instagram.com/rama_hindustani_jaipur_comfy'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#c8a84e] transition-all duration-300 hover:scale-110'
                aria-label='Instagram'
              >
                <FaInstagram size={16} />
              </a>
            </div>
            <p className='text-sm font-medium text-white/60 mb-3'>Stay Updated</p>
            <form onSubmit={(e) => e.preventDefault()} className='flex'>
              <input
                type='email'
                placeholder='Your email'
                className='bg-white/10 border border-white/10 rounded-l-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-[#c8a84e]/50 text-white placeholder:text-white/25'
              />
              <button type='submit' className='bg-[#c8a84e] text-[#1a1923] px-4 rounded-r-xl font-semibold text-sm hover:bg-[#b8922e] transition-colors shrink-0'>
                Join
              </button>
            </form>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25'>
          <p>&copy; {new Date().getFullYear()} Hotel Rama Hindustani. All rights reserved.</p>
          <p>
            Crafted by{' '}
            <a href='https://credencesoft.co.nz/' target='_blank' rel='noreferrer' className='text-[#c8a84e]/50 hover:text-[#c8a84e] transition-colors'>CredenceSoft</a>
            , Powered by{' '}
            <a href='https://bookonepms.com/' target='_blank' rel='noreferrer' className='text-[#c8a84e]/50 hover:text-[#c8a84e] transition-colors'>BookOne</a>
          </p>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
