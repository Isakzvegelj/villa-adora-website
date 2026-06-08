import { motion } from 'framer-motion';
import { ShieldCheckIcon, SparklesIcon, HeartIcon, StarIcon, ClockIcon, WifiIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

const features = [
  {
    icon: ShieldCheckIcon,
    titleKey: 'whyChoose.bestPrice',
    descKey: 'whyChoose.bestPriceDesc',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: SparklesIcon,
    titleKey: 'whyChoose.heritage',
    descKey: 'whyChoose.heritageDesc',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: HeartIcon,
    titleKey: 'whyChoose.personalized',
    descKey: 'whyChoose.personalizedDesc',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: StarIcon,
    titleKey: 'whyChoose.awards',
    descKey: 'whyChoose.awardsDesc',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: ClockIcon,
    titleKey: 'whyChoose.concierge',
    descKey: 'whyChoose.conciergeDesc',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: WifiIcon,
    titleKey: 'whyChoose.location',
    descKey: 'whyChoose.locationDesc',
    color: 'from-violet-500 to-fuchsia-600',
  },
];

const WhyChooseUs = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 dark:bg-purple-900/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full mb-4 uppercase tracking-wider">
            {t('whyChoose.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('whyChoose.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('whyChoose.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-700"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(feature.descKey)}
              </p>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '4.9', label: t('whyChoose.stat.rating'), suffix: '/5' },
            { value: '500', label: t('whyChoose.stat.reviews'), suffix: '+' },
            { value: '1878', label: t('whyChoose.stat.established'), suffix: '' },
            { value: '98', label: t('whyChoose.stat.returnGuests'), suffix: '%' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stat.value}<span className="text-lg text-slate-400">{stat.suffix}</span>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
