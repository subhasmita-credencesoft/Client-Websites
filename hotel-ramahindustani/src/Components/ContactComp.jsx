import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { contactDetails } from '../data/siteContent'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsappShareUrl } from '../utils/booking'

const ContactComp = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <section className='py-16 md:py-24'>
      <div className='section-container'>
        <Reveal className='text-center mb-14'>
          <p className='section-subtitle'>Get in Touch</p>
          <h2 className='section-title'>We&apos;d Love to Hear From You</h2>
        </Reveal>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          <Reveal direction='left'>
            <div className='rounded-2xl overflow-hidden shadow-lg h-[400px] border border-[#d4b896]/10'>
              <iframe
                title='Hotel Location'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4!2d75.8!3d26.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ4JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </Reveal>

          <Reveal direction='right'>
            <div className='space-y-6'>
              {[
                { icon: MapPin, label: 'Address', value: contactDetails.address },
                { icon: Phone, label: 'Phone', value: contactDetails.phone },
                { icon: Mail, label: 'Email', value: contactDetails.email },
                { icon: Clock, label: 'Manager', value: contactDetails.manager },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className='flex items-start gap-4'
                >
                  <div className='w-12 h-12 rounded-xl bg-[#f5f0eb] flex items-center justify-center shrink-0'>
                    <item.icon className='text-[#c8a84e]' size={20} />
                  </div>
                  <div>
                    <h4 className='font-semibold text-sm'>{item.label}</h4>
                    <p className='text-sm text-[#6b677a]'>{item.value}</p>
                  </div>
                </motion.div>
              ))}

              <a
                href={whatsAppUrl}
                target='_blank'
                rel='noreferrer'
                className='btn-whatsapp inline-flex mt-4'
              >
                <FaWhatsapp size={20} />
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ContactComp
