import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import { SiTripadvisor } from 'react-icons/si'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contactDetails } from '../data/siteContent'
import { getWhatsappShareUrl } from '../utils/booking'
import { footerLinks } from '../config/navigation'
import { nearbyLandmarks } from '../data/locations'

const Footer = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <footer className='bg-[#1a1923] text-white relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a84e]/40 to-transparent pointer-events-none' />
      <div className='absolute top-20 left-1/4 w-48 h-48 bg-[#c8a84e]/3 rounded-full blur-3xl pointer-events-none' />

      <div className='section-container py-16 md:py-20 relative z-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          <div>
            <img
              src='/hotel-ramahindustani-image/rama-hindustanilogo.avif'
              alt='Hotel Rama Hindustani - Best Budget Hotel in Pratap Nagar Jaipur'
              width={120}
              height={48}
              loading='lazy'
              className='h-12 w-auto mb-5'
            />

            <p className='text-white/60 text-sm leading-relaxed'>
              Experience comfort, affordability, and warm Indian hospitality in the heart of Jaipur.
            </p>
          </div>

          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>
              Quick Links
            </h4>

            <ul className='space-y-3'>
              {footerLinks.map((link) => (
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

          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>
              Nearby Locations
            </h4>

            <ul className='space-y-2 text-sm text-white/60'>
              {nearbyLandmarks.map((lm) => (
                <li key={lm.name}><span className='hover:text-[#c8a84e] transition-colors cursor-default'>{lm.name} ({lm.distance})</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-display text-base font-semibold mb-5 text-[#c8a84e]'>
              Contact
            </h4>

            <ul className='space-y-3 text-sm text-white/70'>
              <li className='flex items-start gap-2.5'>
                <MapPin size={14} className='text-[#c8a84e] mt-0.5 shrink-0' />
                <span>{contactDetails.address}</span>
              </li>

              <li className='flex items-center gap-2.5'>
                <Phone size={14} className='text-[#c8a84e] shrink-0' />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className='text-white/70 hover:text-[#c8a84e] transition-colors'>
                  {contactDetails.phone}
                </a>
              </li>

              <li className='flex items-center gap-2.5'>
                <Mail size={14} className='text-[#c8a84e] shrink-0' />
                <a href={`mailto:${contactDetails.email}`} className='text-white/70 hover:text-[#c8a84e] transition-colors break-all'>
                  {contactDetails.email}
                </a>
              </li>
            </ul>

            <div className='flex gap-3 mt-5'>
              <a
                href={whatsAppUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 hover:scale-110'
                aria-label='Contact Hotel Rama Hindustani on WhatsApp'
              >
                <FaWhatsapp size={16} />
              </a>

              <a
                href='https://www.instagram.com/rama_hindustani_jaipur_comfy'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#c8a84e] transition-all duration-300 hover:scale-110'
                aria-label='Follow Hotel Rama Hindustani on Instagram'
              >
                <FaInstagram size={16} />
              </a>

              <a
                href='https://www.facebook.com/people/Hotel-Rama-Hindustani/61566712879582/'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:scale-110'
                aria-label='Follow Hotel Rama Hindustani on Facebook'
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href='https://www.tripadvisor.com/Hotel_Review-g304555-d27804757-Reviews-Hotel_Rama_Hindustani-Jaipur_Rajasthan.html'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#34E0A1] transition-all duration-300 hover:scale-110'
                aria-label='Hotel Rama Hindustani on TripAdvisor'
              >
                <SiTripadvisor size={16} />
              </a>

              <a
                href='https://www.google.com/maps/place/Hotel+Rama+Hindustani/@26.8004,75.7890,17z'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#EA4335] transition-all duration-300 hover:scale-110'
                aria-label='Hotel Rama Hindustani on Google Maps'
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-white/8 text-center text-xs text-white/50'>
          <p>
            Designed and Developed By{' '}
            <a href='https://credencesoft.co.nz/' target='_blank' rel='noopener noreferrer' className='text-[#c8a84e]/70 hover:text-[#c8a84e] transition-colors'>
              CredenceSoft
            </a>
            , Powered By{' '}
            <a href='https://bookonepms.com/' target='_blank' rel='noopener noreferrer' className='text-[#c8a84e]/70 hover:text-[#c8a84e] transition-colors'>
              BookOne
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
