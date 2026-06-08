import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  CakeIcon,
  FireIcon,
  SunIcon,
  SparklesIcon,
  ArrowRightIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const CulinarySection = () => {
  const { t } = useLanguage();

  const culinaryItems = [
    {
      icon: <CakeIcon className="w-8 h-8" />,
      titleKey: 'culinary.breakfast.title',
      descKey: 'culinary.breakfast.description',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&q=80',
    },
    {
      icon: <FireIcon className="w-8 h-8" />,
      titleKey: 'culinary.restaurant.title',
      descKey: 'culinary.restaurant.description',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80',
    },
    {
      icon: <SunIcon className="w-8 h-8" />,
      titleKey: 'culinary.terrace.title',
      descKey: 'culinary.terrace.description',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80',
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      titleKey: 'culinary.experiences.title',
      descKey: 'culinary.experiences.description',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm uppercase tracking-wider mb-4">
            <MapPinIcon className="w-4 h-4" />
            {t('culinary.subtitle')}
          </span>
          <h2 className="text-responsive-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            {t('culinary.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('culinary.description')}
          </p>
        </motion.div>

        {/* Culinary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {culinaryItems.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {t(item.titleKey)}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/25"
          >
            {t('culinary.cta')}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CulinarySection;
