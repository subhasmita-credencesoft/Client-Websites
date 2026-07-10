import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { contactDetails } from '../data/siteContent'
import { MapPin, Train, Plane, Landmark, ShoppingBag, Building2, Hospital } from 'lucide-react'

const locations = [
  { icon: Plane, name: 'Jaipur International Airport', distance: '5 km', detail: '10-15 min drive' },
  { icon: Train, name: 'Sanganer Railway Station', distance: '3 km', detail: '5-8 min drive' },
  { icon: Train, name: 'Jaipur Railway Station', distance: '10 km', detail: '20-25 min drive' },
  { icon: Building2, name: 'JECC - Convention Centre', distance: '4 km', detail: '8-10 min drive' },
  { icon: ShoppingBag, name: 'World Trade Park', distance: '6 km', detail: '12-15 min drive' },
  { icon: Landmark, name: 'Jawahar Circle', distance: '7 km', detail: '15 min drive' },
  { icon: Landmark, name: 'Chokhi Dhani', distance: '8 km', detail: '15-20 min drive' },
  { icon: Building2, name: 'Sitapura Industrial Area', distance: '3 km', detail: '5-8 min drive' },
  { icon: Hospital, name: 'Mahatma Gandhi Hospital', distance: '2 km', detail: '5 min drive' },
  { icon: Landmark, name: 'Pratap Nagar Market', distance: '1 km', detail: '5 min walk' },
  { icon: Landmark, name: 'Hawa Mahal', distance: '12 km', detail: '25-30 min drive' },
  { icon: Landmark, name: 'Amber Fort & Palace', distance: '18 km', detail: '35-40 min drive' },
  { icon: Landmark, name: 'City Palace & Jantar Mantar', distance: '12 km', detail: '25-30 min drive' },
  { icon: Landmark, name: 'Birla Mandir', distance: '10 km', detail: '20-25 min drive' },
  { icon: Landmark, name: 'Shahnai Garden', distance: '5 km', detail: '10-12 min drive' },
  { icon: Landmark, name: 'Surbhi Sadan', distance: '4 km', detail: '8-10 min drive' },
]

const LocationSection = () => (
  <section className='py-16 md:py-24 bg-white/50' aria-label='Hotel location and nearby places'>
    <div className='section-container'>
      <Reveal className='text-center mb-12'>
        <p className='section-subtitle'>Location</p>
        <h2 className='section-title'>Conveniently Located in Pratap Nagar Jaipur</h2>
        <p className='mt-3 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
          Strategically placed near Jaipur Airport, railway stations, business hubs, and top tourist attractions — our hotel in Pratap Nagar offers easy access to everything Jaipur has to offer.
        </p>
      </Reveal>

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto'>
        {locations.map((loc, i) => {
          const Icon = loc.icon
          return (
            <Reveal key={i} delay={Math.min(i * 0.04, 0.4)}>
              <motion.div
                whileHover={{ y: -4 }}
                className='bg-white rounded-xl p-4 text-center border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 transition-all duration-300 h-full'
              >
                <Icon className='text-[#c8a84e] mx-auto mb-2' size={22} />
                <p className='text-xs font-medium leading-tight mb-0.5'>{loc.name}</p>
                <p className='text-[#c8a84e] text-xs font-bold'>{loc.distance}</p>
                <p className='text-[#9a97a8] text-[10px]'>{loc.detail}</p>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      <Reveal className='text-center mt-10'>
        <p className='text-sm text-[#6b677a]'>
          <MapPin size={14} className='inline text-[#c8a84e] mr-1' />
          {contactDetails.address}
        </p>
      </Reveal>
    </div>
  </section>
)

export default LocationSection
