import React from 'react'
import Reveal from './Reveal'
import { rooms } from '../data/siteContent'
import { BOOKING_ENGINE_URL } from '../utils/booking'

const RoomCards = ({ compact = false }) => {
  const gridClass = compact ? 'lg:grid-cols-2' : 'lg:grid-cols-2'

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridClass} gap-6 md:gap-8`}>
      {rooms.map((room, index) => (
        <Reveal
          key={room.id}
          className='glass-panel rounded-[1.75rem] overflow-hidden border border-white/60 h-full'
          delay={index * 90}
        >
          <div className='h-full flex flex-col'>
            <div
              className='h-56 sm:h-60 md:h-64 bg-cover bg-center p-5 md:p-7 text-white flex flex-col justify-end'
              style={{ backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.82)), url("${room.image}")` }}
            >
              <p className='uppercase tracking-[0.35em] text-xs text-white/85'>Room Type</p>
              <h3 className='text-2xl md:text-4xl font-bold mt-2 text-3d leading-tight max-w-[18rem] break-words'>{room.name}</h3>
            </div>

            <div className='p-5 md:p-7 flex flex-col flex-1'>
              <p className='text-slate-600 leading-7 md:leading-8 text-sm sm:text-base'>{room.description}</p>

              <ul className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm text-slate-700'>
                {room.features.map((feature) => (
                  <li key={`${room.id}-${feature}`} className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-red-500 shrink-0'></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
{/* 
              <div className='mt-6 flex flex-wrap gap-3 text-sm text-slate-700'>
                <span className='rounded-full bg-red-50 px-3 py-1.5'>Min {room.minimumOccupancy} guests</span>
                <span className='rounded-full bg-red-50 px-3 py-1.5'>Max {room.maximumOccupancy} guests</span>
                <span className='rounded-full bg-red-50 px-3 py-1.5'>{room.noOfRooms} rooms</span>
              </div> */}

              <div className='mt-auto pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                {/* <p className='font-semibold text-slate-900 text-lg sm:text-xl'>{room.price}</p> */}
                <a
                  href={BOOKING_ENGINE_URL}
                  target='_blank'
                  rel='noreferrer'
                  className='brand-button text-white px-5 py-3 rounded-full text-center min-w-[140px] w-full sm:w-auto'
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default RoomCards
