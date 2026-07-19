import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { contactDetails } from '../data/siteContent'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsappShareUrl } from '../utils/booking'

const ContactComp = () => {
  const whatsAppUrl = getWhatsappShareUrl(contactDetails, false)

  return (
    <section className='py-16 md:py-24' aria-label='Contact information'>
      <div className='section-container'>
        <Reveal className='text-center mb-14'>
          <p className='section-subtitle'>Get in Touch</p>
          <h2 className='section-title'>We&apos;d Love to Hear From You</h2>
        </Reveal>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          <Reveal direction='left'>
            <div className='rounded-2xl overflow-hidden shadow-lg h-[400px] border border-[#d4b896]/10'>
              <iframe
                title='Hotel Rama Hindustani location map in Pratap Nagar Jaipur'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.7609338440937!2d75.78899217534213!3d26.800396976700283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b5df1efb7f3%3A0x58b5ac4b44e31ef7!2sHotel%20Rama%20Hindustani!5e0!3m2!1sen!2sin!4v1736900000000!5m2!1sen!2sin'
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
                    <h3 className='font-semibold text-sm'>{item.label}</h3>
                    {item.label === 'Phone' ? (
                      <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className='text-sm text-[#6b677a] hover:text-[#c8a84e] transition-colors'>
                        {item.value}
                      </a>
                    ) : item.label === 'Email' ? (
                      <a href={`mailto:${contactDetails.email}`} className='text-sm text-[#6b677a] hover:text-[#c8a84e] transition-colors break-all'>
                        {item.value}
                      </a>
                    ) : (
                      <p className='text-sm text-[#6b677a]'>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <a
                href={whatsAppUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-whatsapp inline-flex mt-4'
                aria-label='Send us a message on WhatsApp'
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
