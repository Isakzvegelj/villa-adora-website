import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { ArrowRightIcon, CheckIcon, WifiIcon, EyeIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

interface SuiteData {
  id: string
  price: string
  image: string
  titleKey: string
  descKey: string
  size: string
  featured: boolean
  color: string
}

const SuitesPreview = () => {
  const { t, language } = useLanguage()

  const suites: SuiteData[] = [
    {
      id: 'princess',
      price: '250',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&q=80',
      titleKey: 'suites.princess.title',
      descKey: 'suites.princess.description',
      size: '55 m²',
      featured: false,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'luxury',
      price: '270',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop&q=80',
      titleKey: 'suites.luxury.title',
      descKey: 'suites.luxury.description',
      size: '55 m²',
      featured: false,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'penthouse',
      price: '300',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
      titleKey: 'suites.penthouse.title',
      descKey: 'suites.penthouse.description',
      size: '60 m²',
      featured: true,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'swan',
      price: '370',
      image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&h=400&fit=crop&q=80',
      titleKey: 'suites.swan.title',
      descKey: 'suites.swan.description',
      size: '58 m²',
      featured: false,
      color: 'from-violet-500 to-fuchsia-500',
    },
    {
      id: 'island',
      price: '380',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop',
      titleKey: 'suites.island.title',
      descKey: 'suites.island.description',
      size: '65 m²',
      featured: true,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'prestige',
      price: '420',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop&q=80',
      titleKey: 'suites.prestige.title',
      descKey: 'suites.prestige.description',
      size: '72 m²',
      featured: false,
      color: 'from-amber-500 to-orange-500',
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-4">
            {language === 'sl' ? '6 unikatnih suit' : '6 Unique Suites'}
          </span>
          <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-6">
            {t('suites.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Vsaka suite je edinstvena zgodba — od intimnega Stolpiča do razkošnega Penthousea. Vse nudijo nepozaben razgled na Blejsko jezero.'
              : 'Each suite tells a unique story — from the intimate Tower room to the lavish Penthouse. All offer unforgettable views of Lake Bled.'}
          </p>
        </motion.div>

        {/* Suites Grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suites.map((suite, index) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={suite.image}
                  alt={t(suite.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Featured badge */}
                {suite.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    ⭐ {language === 'sl' ? 'Priljubljena' : 'Popular'}
                  </div>
                )}

                {/* Price badge */}
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${suite.color} text-white px-3 py-1.5 rounded-full shadow-lg`}>
                  <span className="font-bold text-sm">€{suite.price}</span>
                  <span className="text-[10px] text-white/80 ml-0.5">/{language === 'sl' ? 'noč' : 'night'}</span>
                </div>

                {/* Size badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <ArrowsPointingOutIcon className="w-3 h-3" />
                  {suite.size}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t(suite.titleKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {t(suite.descKey)}
                </p>

                {/* Quick amenities */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-5">
                  <span className="flex items-center gap-1">
                    <WifiIcon className="w-3.5 h-3.5" />
                    WiFi
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-3.5 h-3.5" />
                    {language === 'sl' ? 'Pogled na jezero' : 'Lake View'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckIcon className="w-3.5 h-3.5 text-green-500" />
                    {language === 'sl' ? 'Klima' : 'AC'}
                  </span>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <Link to={`/suites#${suite.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
                    >
                      {language === 'sl' ? 'Podrobnosti' : 'View Details'}
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <Link to={`/reservation?roomType=${suite.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-sm font-bold bg-gradient-to-r ${suite.color} text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow`}
                    >
                      {t('common.book')}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-14"
        >
          <Link to="/suites">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center text-lg px-10 py-4"
            >
              {language === 'sl' ? 'Oglejte si vse suite' : 'View All Suites'}
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </motion.button>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">
            {language === 'sl'
              ? 'Primerjajte suite v podrobni tabeli na strani za suite.'
              : 'Compare all suites in detail on the suites page.'}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SuitesPreview
