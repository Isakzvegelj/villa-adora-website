import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const suites = [
  {
    id: 'princess',
    price: '250',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&q=80',
    amenities: ['Tower View', 'King Size Bed', 'Lake View', '55 sqm', 'Romantic Decor']
  },
  {
    id: 'penthouse',
    price: '300',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    amenities: ['Two Floors', '60 sqm', 'Breathtaking Views', 'King Bed', 'Cozy Atmosphere']
  },
  {
    id: 'island',
    price: '380',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    amenities: ['65 sqm', 'Two Bedrooms', 'Two Balconies', 'Island View', 'Family Choice']
  },
  {
    id: 'prestige',
    price: '420',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80',
    amenities: ['72 sqm', 'Large Terrace', 'Artful Decor', 'Ground Floor', 'Panoramic View']
  }
]

const Suites = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-responsive-xl font-bold mb-6 text-slate-900 dark:text-white"
            >
              {t('suites.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            >
              Indulge in pure luxury and comfort with our carefully designed suites, 
              each offering a unique experience of Lake Bled.
            </motion.p>
          </div>

          <div className="grid gap-12 lg:gap-16">
            {suites.map((suite, index) => (
              <motion.div
                key={suite.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Container */}
                <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl shadow-2xl group relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={suite.image}
                    alt={t(`suites.${suite.id}.title`)}
                    className="w-full h-[450px] object-cover cursor-pointer"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                      {t('common.from')} €{suite.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">
                      {t('common.perNight')}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    {t(`suites.${suite.id}.title`)}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(`suites.${suite.id}.description`)}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {suite.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                        <CheckIcon className="w-5 h-5 text-indigo-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link to="/reservation">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary inline-flex items-center"
                      >
                        {t('common.book')}
                        <ArrowRightIcon className="ml-2 w-5 h-5" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-indigo-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container-max relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-8">Unmatched Elegance</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12">
            Every room at Villa Adora is a sanctuary of peace, blending historic charm with modern luxury.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-64">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-200">Concierge Service</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-64">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-indigo-200">Premium Cotton</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-64">
              <div className="text-4xl font-bold mb-2">Bled</div>
              <div className="text-indigo-200">Best Location</div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Suites
