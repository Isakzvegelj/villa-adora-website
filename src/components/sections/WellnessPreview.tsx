import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon, HeartIcon, FireIcon, CloudIcon, SunIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const WellnessPreview = () => {
  const { t, language } = useLanguage()

  const wellnessFacilities = [
    {
      icon: <FireIcon className="w-6 h-6" />,
      titleKey: 'wellness.sauna.title',
      descKey: 'wellness.sauna.desc',
      gradient: 'from-orange-500 to-red-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      icon: <CloudIcon className="w-6 h-6" />,
      titleKey: 'wellness.turkish.title',
      descKey: 'wellness.turkish.desc',
      gradient: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      titleKey: 'wellness.massage.title',
      descKey: 'wellness.massage.desc',
      gradient: 'from-pink-500 to-rose-500',
      bgLight: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      titleKey: 'wellness.relaxation.title',
      descKey: 'wellness.relaxation.desc',
      gradient: 'from-purple-500 to-indigo-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: <SunIcon className="w-6 h-6" />,
      titleKey: 'wellness.infinity.title',
      descKey: 'wellness.infinity.desc',
      gradient: 'from-amber-500 to-yellow-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-50 dark:from-indigo-900/50 dark:to-purple-800/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-4 border border-indigo-200 dark:border-indigo-700/50">
            <SparklesIcon className="w-4 h-4" />
            {language === 'sl' ? 'Wellness & Spa' : language === 'de' ? 'Wellness & Spa' : language === 'it' ? 'Wellness & Spa' : 'Wellness & Spa'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Prenovite duha in telo' : language === 'de' ? 'Erneuern Sie Geist und Körper' : language === 'it' ? 'Rinnova la mente e il corpo' : 'Renew Your Mind & Body'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Naš ekskluzivni wellness center vključuje finsko savno, turško kopel, masažne storitve in bazen z neskončnim pogledom na jezero.'
              : language === 'de'
              ? 'Unser exklusives Wellness-Center umfasst eine finnische Sauna, ein türkisches Bad, Massagedienstleistungen und einen Infinity-Blick auf den See.'
              : language === 'it'
              ? 'Il nostro esclusivo centro benessere include sauna finlandese, bagno turco, servizi di massaggio e piscina a sfioro con vista sul lago.'
              : 'Our exclusive wellness center features a Finnish sauna, Turkish bath, massage services, and an infinity pool overlooking the lake.'}
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {wellnessFacilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 relative overflow-hidden"
            >
              {/* Decorative gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
              <div className={`w-12 h-12 ${facility.bgLight} dark:bg-slate-700 rounded-xl flex items-center justify-center ${facility.textColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {facility.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {t(facility.titleKey)}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t(facility.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/wellness"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {language === 'sl' ? 'Odkrijte več' : language === 'de' ? 'Mehr erfahren' : language === 'it' ? 'Scopri di più' : 'Discover More'}
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">
            {language === 'sl' ? 'Wellness je brezplačen za vse goste' : language === 'de' ? 'Wellness ist für alle Gäste kostenlos' : language === 'it' ? 'Il benessere è gratuito per tutti gli ospiti' : 'Wellness is complimentary for all guests'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default WellnessPreview
