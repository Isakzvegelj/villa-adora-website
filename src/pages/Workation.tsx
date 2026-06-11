import { motion } from 'framer-motion';
import { ArrowRightIcon, WifiIcon, SunIcon, ComputerDesktopIcon, SparklesIcon, ClockIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';

const workationFeatures = [
  {
    icon: WifiIcon,
    titleKey: 'workation.fiber.title',
    descKey: 'workation.fiber.desc',
  },
  {
    icon: ComputerDesktopIcon,
    titleKey: 'workation.workspace.title',
    descKey: 'workation.workspace.desc',
  },
  {
    icon: SunIcon,
    titleKey: 'workation.terrace.title',
    descKey: 'workation.terrace.desc',
  },
  {
    icon: SparklesIcon,
    titleKey: 'workation.wellness.title',
    descKey: 'workation.wellness.desc',
  },
  {
    icon: ClockIcon,
    titleKey: 'workation.flexible.title',
    descKey: 'workation.flexible.desc',
  },
  {
    icon: CurrencyEuroIcon,
    titleKey: 'workation.value.title',
    descKey: 'workation.value.desc',
  },
];

const packages = [
  {
    nameKey: 'workation.stay5.name',
    priceKey: 'workation.stay5.price',
    perks: ['workation.stay5.perk1', 'workation.stay5.perk2', 'workation.stay5.perk3', 'workation.stay5.perk4'],
    highlight: false,
  },
  {
    nameKey: 'workation.stay7.name',
    priceKey: 'workation.stay7.price',
    perks: ['workation.stay7.perk1', 'workation.stay7.perk2', 'workation.stay7.perk3', 'workation.stay7.perk4', 'workation.stay7.perk5'],
    highlight: true,
  },
  {
    nameKey: 'workation.stay14.name',
    priceKey: 'workation.stay14.price',
    perks: ['workation.stay14.perk1', 'workation.stay14.perk2', 'workation.stay14.perk3', 'workation.stay14.perk4', 'workation.stay14.perk5'],
    highlight: false,
  },
];

export default function Workation() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title={t('workation.pageTitle')}
        description={t('workation.pageDesc')}
        keywords={['workation', 'remote work', 'Bled', 'Villa Adora', 'digital nomad', 'Slovenia']}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full mb-6 border border-amber-500/30">
              {t('workation.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('workation.heroTitle')}</h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('workation.heroDesc')}
            </p>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
            >
              {t('workation.cta')}
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('workation.featuresTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('workation.featuresDesc')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workationFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(feature.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('workation.packagesTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('workation.packagesDesc')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-8 ${
                  pkg.highlight
                    ? 'bg-indigo-900 text-white shadow-2xl shadow-indigo-200 ring-2 ring-indigo-500'
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                {pkg.highlight && (
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-4">
                    {t('workation.bestValue')}
                  </span>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${pkg.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {t(pkg.nameKey)}
                </h3>
                <p className={`text-lg mb-6 ${pkg.highlight ? 'text-indigo-200' : 'text-gray-600'}`}>
                  {t(pkg.priceKey)}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.perks.map((perk, i) => (
                    <li key={i} className={`flex items-start gap-3 ${pkg.highlight ? 'text-indigo-100' : 'text-gray-600'}`}>
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pkg.highlight ? 'text-amber-400' : 'text-indigo-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(perk)}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/reservation"
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    pkg.highlight
                      ? 'bg-amber-500 text-white hover:bg-amber-400'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  {t('workation.bookNow')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('workation.ctaTitle')}</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">{t('workation.ctaDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
            >
              {t('workation.cta')}
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              {t('workation.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
