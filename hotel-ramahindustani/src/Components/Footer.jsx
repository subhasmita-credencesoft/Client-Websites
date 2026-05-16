import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contactDetails } from '../data/siteContent'
import { getWhatsappShareUrl } from '../utils/booking'

const Footer = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <footer className='bg-[#1a1923] text-white relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a84e]/40 to-transparent pointer-events-none' />
      <div className='absolute top-20 left-1/4 w-48 h-48 bg-[#c8a84e]/3 rounded-full blur-3xl pointer-events-none' />

      {/* Main Content */}
      <div className='section-container py-16 md:py-20 relative z-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* Logo & Description */}
          <div>
            <img
              src='/hotel-ramahindustani-image/rama-hindustanilogo.avif'
              alt='Hotel Rama Hindustani'
              loading='lazy'
              className='h-12 w-auto mb-5'
            />

            <p className='text-white/60 text-sm leading-relaxed'>
              Experience comfort, affordability, and warm Indian hospitality in the heart of Jaipur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>
              Quick Links
            </h4>

            <ul className='space-y-3'>
              {[
                { to: '/', label: 'Home' },
                { to: '/rooms', label: 'Rooms' },
                { to: '/restaurant', label: 'Restaurant' },
                { to: '/services', label: 'Services' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className='text-white/70 hover:text-[#c8a84e] text-sm transition-colors duration-300'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>
              Contact
            </h4>

            <ul className='space-y-3 text-sm text-white/70'>
              <li className='flex items-start gap-2.5'>
                <MapPin
                  size={14}
                  className='text-[#c8a84e] mt-0.5 shrink-0'
                />

                <span>Pratap Nagar, Jaipur, Rajasthan</span>
              </li>

              <li className='flex items-center gap-2.5'>
                <Phone
                  size={14}
                  className='text-[#c8a84e] shrink-0'
                />

                <a
                  href={`tel:${contactDetails.phone.replace(/\s/g, '')}`}
                  className='text-white/70 hover:text-[#c8a84e] transition-colors'
                >
                  {contactDetails.phone}
                </a>
              </li>

              <li className='flex items-center gap-2.5'>
                <Mail
                  size={14}
                  className='text-[#c8a84e] shrink-0'
                />

                <a
                  href={`mailto:${contactDetails.email}`}
                  className='text-white/70 hover:text-[#c8a84e] transition-colors break-all'
                >
                  {contactDetails.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>
              Connect
            </h4>

            <div className='flex gap-3 mb-6'>
              {/* WhatsApp */}
              <a
                href={whatsAppUrl}
                target='_blank'
                rel='noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 hover:scale-110'
                aria-label='WhatsApp'
              >
                <FaWhatsapp size={16} />
              </a>

              {/* Instagram */}
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-white/8 text-center text-xs text-white/50'>
          <p>
            Designed and Developed By{' '}
            <a
              href='https://credencesoft.co.nz/'
              target='_blank'
              rel='noreferrer'
              className='text-[#c8a84e]/70 hover:text-[#c8a84e] transition-colors'
            >
              CredenceSoft
            </a>
            , Powered By{' '}
            <a
              href='https://bookonepms.com/'
              target='_blank'
              rel='noreferrer'
              className='text-[#c8a84e]/70 hover:text-[#c8a84e] transition-colors'
            >
              BookOne
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer