import React from 'react'
import footer from '../assets/footer-pattern.jpg'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-10 relative overflow-hidden'
    style={{
        backgroundImage: `url(${footer})`,
        backgroundPosition:'bottom',
        backgroundSize: 'cover'
        }}>
      <div className='absolute inset-0 bg-slate-950/80'></div>
      <Reveal className='max-w-7xl mx-auto px-4 relative'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div>
                <img
                    src='/hotel-ramahindustani-image/rama-hindustanilogo.avif'
                    alt='Hotel Rama Hindustani'
                    loading='lazy'
                    decoding='async'
                    className='h-16 md:h-20 w-auto object-contain mb-4'
                />
                <p className='text-sm text-slate-200'>Experience comfort, affordability, and warm Indian hospitality in the heart of Jaipur.</p>
            </div>
            <div className='flex flex-col lg:items-center'>
                <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
                <ul className='space-y-2 text-sm'>
                    <li><Link to='/' className='hover:text-red-300'>Home</Link></li>
                    <li><Link to='/rooms' className='hover:text-red-300'>Rooms</Link></li>
                    <li><Link to='/restaurant' className='hover:text-red-300'>Restaurant</Link></li>
                    <li><Link to='/services' className='hover:text-red-300'>Services</Link></li>
                    <li><Link to='/about' className='hover:text-red-300'>About Us</Link></li>
                    <li><Link to='/contact' className='hover:text-red-300'>Contact</Link></li>
                </ul>
            </div>
            <div>
                <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
                <ul className='space-y-2 text-sm text-slate-200'>
                    <li>Pratap Nagar, Jaipur, Rajasthan</li>
                    <li>Phone: +91 63767 07091</li>
                    <li className='break-all'>Email: info@hotelramahindustani.com</li>
                </ul>
            </div>
            <div>
                <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
                <div className='flex space-x-4'>
                    {/* <FaFacebook className='hover:text-red-400 transition' /> */}
                  <a
  href="https://www.instagram.com/rama_hindustani_jaipur_comfy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaInstagram className="hover:text-red-400 transition cursor-pointer" />
</a>
                    {/* <FaTwitter className='hover:text-red-400 transition' /> */}
                </div>
            </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-700 text-center justify-end text-xs sm:text-sm'>
            <p>
              Designed and Developed By{' '}
              <a
                href='https://credencesoft.co.nz/'
                target='_blank'
                rel='noreferrer'
                className='text-red-300 hover:text-red-200 transition'
              >
                CredenceSoft
              </a>
              , Powered By{' '}
              <a
                href='https://bookonepms.com/'
                target='_blank'
                rel='noreferrer'
                className='text-red-300 hover:text-red-200 transition'
              >
                BookOne
              </a>
              .
            </p>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
