import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { PageSEO } from '../components/ui/PageSEO'
import Lightbox from '../components/ui/Lightbox'

const galleryImages = [
  { id: 1, category: 'exterior', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80', title: 'Villa Adora Exterior', titleKey: 'gallery.img.villa' },
  { id: 2, category: 'suites', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', title: 'Princess Suite', titleKey: 'gallery.img.princess' },
  { id: 3, category: 'suites', src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop&q=80', title: 'Prestige Suite', titleKey: 'gallery.img.prestige' },
  { id: 4, category: 'lake', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop', title: 'Lake Morning View', titleKey: 'gallery.img.lakeMorning' },
  { id: 5, category: 'suites', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop', title: 'Penthouse Suite', titleKey: 'gallery.img.penthouse' },
  { id: 6, category: 'exterior', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop', title: 'Gardens', titleKey: 'gallery.img.gardens' },
  { id: 7, category: 'lake', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=1500&fit=crop', title: 'Alpine Landscape', titleKey: 'gallery.img.alpine' },
  { id: 8, category: 'suites', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop', title: 'Luxury Suite Details', titleKey: 'gallery.img.luxuryDetails' },
  { id: 9, category: 'dining', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop', title: 'Dining Room', titleKey: 'gallery.img.dining' },
  { id: 10, category: 'dining', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop', title: 'Fine Cuisine', titleKey: 'gallery.img.cuisine' },
  { id: 11, category: 'exterior', src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop', title: 'Villa Facade', titleKey: 'gallery.img.facade' },
  { id: 12, category: 'lake', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop', title: 'Lake Sunset', titleKey: 'gallery.img.sunset' },
  { id: 13, category: 'suites', src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&h=800&fit=crop', title: 'Suite Interior', titleKey: 'gallery.img.suiteInterior' },
  { id: 14, category: 'dining', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop', title: 'Terrace View', titleKey: 'gallery.img.terrace' },
  { id: 15, category: 'lake', src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop', title: 'Lake Bled Island View', titleKey: 'gallery.img.islandView' },
  { id: 16, category: 'exterior', src: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop', title: 'Evening at Villa Adora', titleKey: 'gallery.img.evening' },
]

const categories = [
  { key: 'all', labelKey: 'gallery.filter.all' },
  { key: 'exterior', labelKey: 'gallery.filter.exterior' },
  { key: 'suites', labelKey: 'gallery.filter.suites' },
  { key: 'lake', labelKey: 'gallery.filter.lake' },
  { key: 'dining', labelKey: 'gallery.filter.dining' },
]

const fallbackTitles: Record<string, string> = {
  'gallery.img.villa': 'Historic Heritage Villa',
  'gallery.img.princess': 'Princess Suite',
  'gallery.img.prestige': 'Prestige Suite Terrace',
  'gallery.img.lakeMorning': 'Lake Bled Morning',
  'gallery.img.penthouse': 'Penthouse View',
  'gallery.img.gardens': 'Villa Gardens',
  'gallery.img.alpine': 'Alpine Serenity',
  'gallery.img.luxuryDetails': 'Luxury Details',
  'gallery.img.dining': 'Fine Dining',
  'gallery.img.cuisine': 'Local Cuisine',
  'gallery.img.facade': 'Villa Facade',
  'gallery.img.sunset': 'Lake Sunset',
  'gallery.img.suiteInterior': 'Suite Interior',
  'gallery.img.terrace': 'Lakeside Terrace',
  'gallery.img.islandView': 'Island View',
  'gallery.img.evening': 'Evening Ambiance',
}

const Gallery = () => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
  }, [lightboxIndex, filteredImages.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
  }, [lightboxIndex, filteredImages.length])

  const getImageTitle = (img: typeof galleryImages[0]) => {
    return t(img.titleKey) !== img.titleKey ? t(img.titleKey) : fallbackTitles[img.titleKey] || img.titleKey
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-white dark:bg-slate-900 min-h-screen"
    >
      <PageSEO
        title={`${t('gallery.title')} — Villa Adora`}
        description="Explore Villa Adora through our photo gallery — suites, lake views, dining, and the beauty of Bled."
        keywords={['Villa Adora gallery', 'Bled hotel photos', 'Lake Bled luxury hotel', 'Villa Adora suites']}
        ogImage="https://villa-adora-bled.si/og-image.jpg"
        canonicalUrl="https://villa-adora-bled.si/gallery"
      />

      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="container-max text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif italic"
          >
            {t('gallery.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-lg max-w-xl mx-auto"
          >
            {t('gallery.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setFilter(cat.key); setLightboxIndex(null) }}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                  filter === cat.key
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-slate-400 text-sm mb-8">
            {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
          </p>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative group overflow-hidden rounded-2xl cursor-zoom-in break-inside-avoid"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={getImageTitle(image)}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs uppercase tracking-wider mb-1 opacity-70">{t(`gallery.filter.${image.category}`)}</p>
                      <h3 className="text-lg font-bold">{getImageTitle(image)}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-slate-50 dark:bg-slate-800 py-20 mt-12">
        <div className="container-max text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">{t('gallery.followUs')}</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{t('gallery.followDesc')}</p>
          <a
            href="https://instagram.com/villaadora_bled"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl hover:underline"
          >
            @villaadora_bled
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </motion.div>
  )
}

export default Gallery
