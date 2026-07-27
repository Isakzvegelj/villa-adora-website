import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

const SEASONAL_HIGHLIGHTS = [
  {
    id: 'spring-2026',
    titleKey: 'seasonal.spring.title',
    descKey: 'seasonal.spring.desc',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop&q=80',
    price: '€690',
    nights: 3,
    badgeKey: 'seasonal.spring.badge',
    badgeColor: 'bg-emerald-500',
    validUntil: '2026-06-21',
  },
  {
    id: 'summer-2026',
    titleKey: 'seasonal.summer.title',
    descKey: 'seasonal.summer.desc',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
    price: '€1,250',
    nights: 5,
    badgeKey: 'seasonal.summer.badge',
    badgeColor: 'bg-amber-500',
    validUntil: '2026-09-01',
  },
  {
    id: 'wellness-2026',
    titleKey: 'seasonal.wellness.title',
    descKey: 'seasonal.wellness.desc',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop&q=80',
    price: '€750',
    nights: 3,
    badgeKey: 'seasonal.wellness.badge',
    badgeColor: 'bg-purple-500',
    validUntil: '2026-12-31',
  },
];

const SeasonalHighlights = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-5">
            <SparklesIcon className="w-4 h-4" />
            {t('seasonal.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('seasonal.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('seasonal.subtitle')}
          </p>
        </motion.div>

        {/* Seasonal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SEASONAL_HIGHLIGHTS.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-800"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={highlight.image}
                  alt={t(highlight.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Badge */}
                <div className={`absolute top-4 left-4 ${highlight.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                  {t(highlight.badgeKey)}
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 font-bold px-3 py-1.5 rounded-full text-sm">
                  {highlight.price}
                </div>

                {/* Nights */}
                <div className="absolute bottom-4 left-4 text-white/80 text-sm flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  {highlight.nights} {t('seasonal.nights')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t(highlight.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {t(highlight.descKey)}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    {t('seasonal.validUntil')} {highlight.validUntil}
                  </span>
                  <Link
                    to={`/reservation?season=${highlight.id}`}
                    className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link"
                  >
                    {t('seasonal.bookNow')}
                    <ArrowRightIcon className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/special-offers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('seasonal.viewAllOffers')}
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalHighlights;
