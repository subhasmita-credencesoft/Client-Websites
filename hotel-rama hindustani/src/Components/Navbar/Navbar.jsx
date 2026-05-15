import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt1 } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import ResponsiveMenu from './ResponsiveMenu';
import { BOOKING_ENGINE_URL, getWhatsappShareUrl } from '../../utils/booking';
import { contactDetails } from '../../data/siteContent';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <header className='sticky mx-auto top-0 transition-all bg-transparent z-30'>
            <div className='fixed w-full z-50 top-0'>
                <div className='w-full bg-[#400705] shadow-xl'>
                    <div className='max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center gap-4'>
                    <Link to='/'>
                        <img
                            src='/hotel-ramahindustani-image/rama-hindustanilogo.avif'
                            alt='Hotel Rama Hindustani'
                            fetchPriority='high'
                            className='h-12 sm:h-14 md:h-16 w-auto object-contain'
                        />
                    </Link>
                    <div className='flex items-center gap-3 md:gap-6'>
                        <nav className='hidden xl:flex gap-6 items-center'>
                            <ul className='flex items-center font-semibold text-white text-sm 2xl:text-base gap-5 2xl:gap-8'>
                                <Link className='transition hover:text-[#ff6b6b]' to='/'><li>Home</li></Link>
                                <Link className='transition hover:text-[#ff6b6b]' to='/about'><li>About Us</li></Link>
                                <Link className='transition hover:text-[#ff6b6b]' to='/rooms'><li>Rooms</li></Link>
                                <Link className='transition hover:text-[#ff6b6b]' to='/restaurant'><li>Restaurant</li></Link>
                                <Link className='transition hover:text-[#ff6b6b]' to='/services'><li>Services</li></Link>
                                <Link className='transition hover:text-[#ff6b6b]' to='/gallery'><li>Gallery</li></Link>
                                <Link className='transition hover:text-[#ff6b6b]' to='/contact'><li>Contact</li></Link>
                            </ul>
                            <div className='flex items-center gap-3'>
                                <a
                                    href={whatsAppUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='flex items-center gap-2 bg-[#25D366] text-white px-4 2xl:px-6 py-3 rounded-xl font-semibold transition hover:bg-[#1ebe5b] shadow-[0_10px_30px_rgba(37,211,102,0.25)] whitespace-nowrap'
                                >
                                    <FaWhatsapp size={20} />
                                    <span>WhatsApp Booking</span>
                                </a>
                                <a
                                    href={BOOKING_ENGINE_URL}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='bg-[#e3342f] text-white px-4 2xl:px-6 py-3 rounded-xl font-semibold transition hover:bg-[#bf2622] shadow-[0_10px_30px_rgba(227,52,47,0.28)] whitespace-nowrap'
                                >
                                    Book your stay
                                </a>
                            </div>
                        </nav>
                        <HiMenuAlt1
                            onClick={toggleMenu}
                            className='cursor-pointer xl:hidden text-white'
                            size={30}
                        />
                    </div>
                </div>
                </div>
                <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
        </header>
    )
}

export default Navbar
