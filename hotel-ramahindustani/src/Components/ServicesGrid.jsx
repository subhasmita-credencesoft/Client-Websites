import React from 'react'
import { Wifi, CarFront, BellRing, ConciergeBell, Shirt, Snowflake, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import { services } from '../data/siteContent'

const iconMap = {
  'Free Wi-Fi': Wifi,
  'Free Parking': CarFront,
  '24/7 Front Desk': BellRing,
  'Room Service': ConciergeBell,
  'Laundry Service': Shirt,
  'Air Conditioning': Snowflake,
  'Power Backup': ShieldCheck,
}

const ServicesGrid = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {services.map((service, index) => {
        const Icon = iconMap[service]

        return (
          <Reveal
            key={service}
            className='glass-panel rounded-[1.5rem] p-6 tilt-card border border-white/60'
            delay={index * 70}
          >
            <div className='mb-4 inline-flex rounded-2xl bg-red-50 p-3 text-red-500'>
              <Icon className='h-6 w-6' />
            </div>
            <h3 className='text-lg font-semibold text-slate-900'>{service}</h3>
            <p className='mt-2 text-sm leading-6 text-slate-600'>Thoughtfully managed to keep your stay smooth, comfortable, and dependable.</p>
          </Reveal>
        )
      })}
    </div>
  )
}

export default ServicesGrid
