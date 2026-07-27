import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { SunIcon, LeafIcon, SnowflakeIcon, SparklesIcon } from 'lucide-react';

const seasons = [
  {
    id: 'spring',
    icon: <SparklesIcon className="w-7 h-7" />,
    color: 'from-pink-400 to-rose-400',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  {
    id: 'summer',
    icon: <SunIcon className="w-7 h-7" />,
    color: 'from-amber-400 to-orange-400',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    id: 'autumn',
    icon: <LeafIcon className="w-7 h-7" />,
    color: 'from-orange-500 to-red-400',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    id: 'winter',
    icon: <SnowflakeIcon className="w-7 h-7" />,
    color: 'from-blue-400 to-indigo-400',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
];

export default function BledSeasons() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('seasons.title')}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('seasons.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((season, index) => (
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className={`${season.bgLight} dark:bg-slate-800 rounded-3xl p-8 h-full border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${season.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {season.icon}
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold ${season.textColor} dark:text-white mb-3`}>
                  {t(`seasons.${season.id}.title`)}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t(`seasons.${season.id}.desc`)}
                </p>

                {/* Decorative gradient line */}
                <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${season.color} group-hover:w-full transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
