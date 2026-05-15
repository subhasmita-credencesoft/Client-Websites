import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { galleryImages } from '../data/siteContent'
import { X } from 'lucide-react'

const categories = ['All', ...new Set(galleryImages.map((img) => img.category))]

const GalleryComp = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <section className='py-16 md:py-24'>
      <div className='section-container'>
        <Reveal className='text-center mb-12'>
          <p className='section-subtitle'>Gallery</p>
          <h2 className='section-title'>Moments at Rama Hindustani</h2>
        </Reveal>

        <Reveal className='flex flex-wrap justify-center gap-2 mb-10'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#c8a84e] text-white shadow-lg shadow-[#c8a84e]/20'
                  : 'bg-white text-[#6b677a] border border-[#d4b896]/20 hover:border-[#c8a84e]/40 hover:text-[#1a1923]'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
              >
                <button onClick={() => setSelectedImage(img)} className='group relative w-full overflow-hidden rounded-2xl block'>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading='lazy'
                    className='w-full object-cover transition-transform duration-700 group-hover:scale-110'
                    style={{ minHeight: '200px' }}
                  />
                  <div className='absolute inset-0 bg-[#1a1923]/0 group-hover:bg-[#1a1923]/50 transition-all duration-500 flex items-center justify-center'>
                    <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-medium translate-y-2 group-hover:translate-y-0'>
                      View Image
                    </span>
                  </div>
                  <div className='absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#1a1923]/50 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {img.category}
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-[#1a1923]/97 flex items-center justify-center p-4 cursor-pointer'
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10'
            >
              <X size={28} />
            </button>
            <motion.img
              key={selectedImage.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className='max-w-full max-h-[90vh] object-contain rounded-2xl'
              onClick={(e) => e.stopPropagation()}
            />
            <p className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm'>{selectedImage.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GalleryComp
