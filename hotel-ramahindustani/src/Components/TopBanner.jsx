import React from 'react'
import Reveal from './Reveal'
import { hotelImages } from '../data/siteContent'

const TopBanner = (props) => {
    return (
        <div
            className='h-[240px] sm:h-[280px] md:h-[340px] relative -mt-12 overflow-hidden banner-depth'
            style={{
                backgroundImage: `url(${hotelImages.reception})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
            <div className='inset-0 hero-overlay absolute'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-transparent'></div>
            <div className='absolute inset-0 flex items-center justify-center px-4 pt-14 sm:pt-16 md:pt-24'>
                <Reveal className='text-center max-w-4xl'>
                    <p className='mb-3 text-xs md:text-sm tracking-[0.4em] uppercase text-red-200'>Rama Hindustani</p>
                    <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]'>
                        {props.text}
                    </h1>
                </Reveal>
            </div>
        </div>
    )
}

export default TopBanner
