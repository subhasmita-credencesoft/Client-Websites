import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { experiences } from '../data/siteContent'
import { Bed, UtensilsCrossed, Palette, Sparkles, PartyPopper, Heart } from 'lucide-react'

const iconMap = { Bed, UtensilsCrossed, Palette, Sparkles, PartyPopper, Heart }

const Features = () => (
  <section className='py-20 md:py-28 bg-white/30'>
    <div className='section-container'>
      <Reveal className='text-center mb-16'>
        <p className='section-subtitle'>Experiences</p>
        <h2 className='section-title text-balance'>Crafted for the Discerning Traveller</h2>
        <p className='mt-4 text-[#6b677a] max-w-2xl mx-auto leading-relaxed'>
          Every moment at Hotel Rama Hindustani is designed to create lasting memories.
        </p>
      </Reveal>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {experiences.map((exp, i) => {
          const Icon = iconMap[exp.icon] || Heart
          return (
            <Reveal key={exp.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                className='group bg-white rounded-2xl p-7 border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-lg transition-all duration-400 h-full cursor-default'
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <Icon className='text-[#1a1923]' size={24} />
                </div>
                <h3 className='text-xl font-semibold font-display text-[#1a1923] mb-2'>{exp.title}</h3>
                <p className='text-[#6b677a] text-sm leading-relaxed'>{exp.description}</p>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </div>
  </section>
)

export default Features
