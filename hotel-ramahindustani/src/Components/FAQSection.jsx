/* eslint-disable react/prop-types */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

const FAQSection = ({ title = 'Frequently Asked Questions', subtitle = 'Everything you need to know about your stay.', items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section className='py-16 md:py-24 bg-white/30'>
      <div className='section-container max-w-3xl mx-auto'>
        <Reveal className='text-center mb-12'>
          <p className='section-subtitle'>FAQ</p>
          <h2 className='section-title'>{title}</h2>
          <p className='mt-3 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>{subtitle}</p>
        </Reveal>

        <div className='space-y-3'>
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 0.04}>
              <div className='bg-white rounded-xl border border-[#d4b896]/15 shadow-sm overflow-hidden'>
                <button
                  onClick={() => toggle(index)}
                  className='w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#fdf8f0]'
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className='font-semibold text-[#1a1923] text-sm pr-4'>{item.question}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#c8a84e] shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      key='content'
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className='px-5 pb-5 text-sm text-[#6b677a] leading-relaxed border-t border-[#d4b896]/10 pt-4'>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
