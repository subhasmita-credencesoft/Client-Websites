import { X } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import { BOOKING_ENGINE_URL, getWhatsappShareUrl } from '../../utils/booking';
import { contactDetails } from '../../data/siteContent';

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
    const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

    return (
        <div className={`${showMenu ? 'right-0' : "-right-[100%]"} fixed bottom-0 top-0 z-[60] flex h-screen w-[82%] max-w-[340px] flex-col bg-white/95 backdrop-blur-xl px-6 pb-6 pt-16 text-black transition-all duration-300 xl:hidden rounded-r-3xl shadow-2xl border-l border-white/60 overflow-y-auto`}>
            <div className='flex-1'>
                <button className='border border-black/20 rounded-xl absolute top-4 right-9 p-1 bg-white/80' onClick={() => setShowMenu(false)}><X /></button>
                <nav className='mt-6'>
                    <ul className='space-y-4 text-xl text-black flex flex-col'>
                        <Link to='/'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>Home</li></Link>
                        <Link to='/about'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>About Us</li></Link>
                        <Link to='/rooms'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>Rooms</li></Link>
                        <Link to='/restaurant'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>Restaurant</li></Link>
                        <Link to='/services'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>Services</li></Link>
                        <Link to='/gallery'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>Gallery</li></Link>
                        <Link to='/contact'><li className='rounded-2xl px-4 py-3 transition hover:bg-red-50' onClick={() => setShowMenu(false)}>Contact</li></Link>
                    </ul>
                </nav>
            </div>

            <div className='pt-6 mt-6 border-t border-slate-200 space-y-3'>
                <a
                    href={whatsAppUrl}
                    target='_blank'
                    rel='noreferrer'
                    onClick={() => setShowMenu(false)}
                    className='border border-green-500 text-green-600 px-4 py-3 rounded-full font-semibold w-full text-center block'
                >
                    WhatsApp Booking
                </a>
                <a
                    href={BOOKING_ENGINE_URL}
                    target='_blank'
                    rel='noreferrer'
                    onClick={() => setShowMenu(false)}
                    className='brand-button text-white px-4 py-3 rounded-full font-semibold w-full text-center block'
                >
                    Book Now
                </a>
            </div>
        </div>
    )
}

export default ResponsiveMenu
