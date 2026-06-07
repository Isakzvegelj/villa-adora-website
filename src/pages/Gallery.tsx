import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const galleryImages = [
  { id: 1, category: 'exterior', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80', title: 'Historic Heritage Villa' },
  { id: 2, category: 'suites', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&q=80', title: 'Princess Suite' },
  { id: 3, category: 'suites', src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80', title: 'Prestige Suite Terrace' },
  { id: 4, category: 'lake', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop', title: 'Lake Bled Morning' },
  { id: 5, category: 'suites', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', title: 'Penthouse View' },
  { id: 6, category: 'exterior', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', title: 'Villa Gardens' },
  { id: 7, category: 'lake', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=1000&fit=crop', title: 'Alpine Serenity' },
  { id: 8, category: 'suites', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', title: 'Luxury Details' },
]

const categories = ['all', 'exterior', 'suites', 'lake', 'dining']

const Gallery = () => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-white dark:bg-slate-900 min-h-screen"
    >
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h1 className="text-responsive-xl font-bold mb-4 text-slate-900 dark:text-white italic font-serif">
              {t('gallery.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Capturing the soul of Villa Adora</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 capitalize ${
                  filter === cat 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group overflow-hidden rounded-2xl cursor-zoom-in"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm uppercase tracking-wider mb-1 opacity-80">{image.category}</p>
                      <h3 className="text-lg font-bold">{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen CTA */}
      <section className="bg-slate-50 dark:bg-slate-800 py-20 mt-12">
        <div className="container-max text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Follow our story on Instagram</h2>
          <a 
            href="#" 
            className="text-indigo-600 dark:text-indigo-400 font-bold text-xl hover:underline"
          >
            @villaadora_bled
          </a>
        </div>
      </section>
    </motion.div>
  )
}

export default Gallery
