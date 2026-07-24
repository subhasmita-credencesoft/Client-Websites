import { Link } from 'react-router-dom'
import { Home, Phone, Calendar, ArrowLeft, AlertCircle } from 'lucide-react'
import Seo from '../Components/Seo'
import Reveal from '../Components/Reveal'
import { HOTEL_PHONE_RAW } from '../config/site'

const NotFound = () => {
  return (
    <>
      <Seo
        title='Page Not Found | Hotel Rama Hindustani Jaipur'
        description='The page you are looking for does not exist. Return to Hotel Rama Hindustani Jaipur homepage or explore our luxury rooms and restaurant.'
        canonicalPath='/404'
        noindex={true}
        nofollow={true}
      />
      <div className='min-h-[80vh] flex items-center justify-center bg-[#fdfbf7] py-20 px-4 md:px-6 relative overflow-hidden'>
        {/* Subtle Decorative backgrounds */}
        <div className='absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#c8a84e]/5 blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#d4b896]/10 blur-3xl' />

        <div className='max-w-2xl w-full text-center relative z-10'>
          <Reveal>
            <div className='inline-flex p-4 rounded-full bg-amber-50 border border-amber-200/50 text-[#c8a84e] mb-6 animate-bounce'>
              <AlertCircle size={48} className='stroke-[1.5]' />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className='font-display text-7xl md:text-9xl font-black text-[#1a1923] tracking-tight mb-2'>
              404
            </h1>
            <p className='text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#c8a84e] mb-6'>
              Page Not Found
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className='text-2xl md:text-3xl font-display font-bold text-[#1a1923] mb-4'>
              Lost in the Pink City?
            </h2>
            <p className='text-[#6b677a] max-w-md mx-auto leading-relaxed mb-10'>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
            </p>
          </Reveal>

          {/* Quick Nav Links */}
          <Reveal delay={0.3}>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-12'>
              <Link
                to='/'
                className='flex flex-col items-center p-4 bg-white rounded-xl border border-[#d4b896]/20 shadow-sm hover:border-[#c8a84e] hover:shadow-md transition-all duration-300 group'
              >
                <Home className='text-[#c8a84e] mb-2 group-hover:scale-110 transition-transform duration-200' size={20} />
                <span className='font-semibold text-sm text-[#1a1923]'>Homepage</span>
                <span className='text-xs text-[#6b677a] mt-0.5'>Start fresh</span>
              </Link>
              <Link
                to='/rooms'
                className='flex flex-col items-center p-4 bg-white rounded-xl border border-[#d4b896]/20 shadow-sm hover:border-[#c8a84e] hover:shadow-md transition-all duration-300 group'
              >
                <Calendar className='text-[#c8a84e] mb-2 group-hover:scale-110 transition-transform duration-200' size={20} />
                <span className='font-semibold text-sm text-[#1a1923]'>Our Rooms</span>
                <span className='text-xs text-[#6b677a] mt-0.5'>Book your stay</span>
              </Link>
              <Link
                to='/contact'
                className='flex flex-col items-center p-4 bg-white rounded-xl border border-[#d4b896]/20 shadow-sm hover:border-[#c8a84e] hover:shadow-md transition-all duration-300 group'
              >
                <Phone className='text-[#c8a84e] mb-2 group-hover:scale-110 transition-transform duration-200' size={20} />
                <span className='font-semibold text-sm text-[#1a1923]'>Contact Us</span>
                <span className='text-xs text-[#6b677a] mt-0.5'>Get in touch</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
              <Link
                to='/'
                className='btn-primary inline-flex items-center gap-2'
              >
                <ArrowLeft size={16} />
                Back to Safety
              </Link>
              <a
                href={`https://wa.me/${HOTEL_PHONE_RAW}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm font-semibold text-[#c8a84e] hover:underline'
              >
                Need Help? WhatsApp Support
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}

export default NotFound
