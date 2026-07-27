'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sun, Utensils, Waves, Mountain, Sparkles, Check, Star, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

interface Package {
  id: string
  icon: React.ReactNode
  titleKey: string
  descKey: string
  price: string
  originalPrice?: string
  duration: string
  highlights: string[]
  highlightKeys: string[]
  gradient: string
  badgeKey?: string
  image: string
}

const SummerPackages = () => {
  const { t, language } = useLanguage()

  const packages: Package[] = [
    {
      id: 'lake-retreat',
      icon: <Waves className="w-7 h-7" />,
      titleKey: 'packages.lakeRetreat.title',
      descKey: 'packages.lakeRetreat.description',
      price: '€1,290',
      originalPrice: '€1,520',
      duration: language === 'sl' ? '3 nočitve' : language === 'de' ? '3 Nächte' : language === 'it' ? '3 notti' : '3 nights',
      highlights: [],
      highlightKeys: [
        'packages.lakeRetreat.highlight1',
        'packages.lakeRetreat.highlight2',
        'packages.lakeRetreat.highlight3',
        'packages.lakeRetreat.highlight4',
      ],
      gradient: 'from-cyan-500 to-blue-600',
      badgeKey: 'packages.lakeRetreat.badge',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'romantic-escape',
      icon: <Sparkles className="w-7 h-7" />,
      titleKey: 'packages.romanticEscape.title',
      descKey: 'packages.romanticEscape.description',
      price: '€1,890',
      originalPrice: '€2,200',
      duration: language === 'sl' ? '3 nočitve' : language === 'de' ? '3 Nächte' : language === 'it' ? '3 notti' : '3 nights',
      highlights: [],
      highlightKeys: [
        'packages.romanticEscape.highlight1',
        'packages.romanticEscape.highlight2',
        'packages.romanticEscape.highlight3',
        'packages.romanticEscape.highlight4',
        'packages.romanticEscape.highlight5',
      ],
      gradient: 'from-rose-500 to-pink-600',
      badgeKey: 'packages.romanticEscape.badge',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'alpine-adventure',
      icon: <Mountain className="w-7 h-7" />,
      titleKey: 'packages.alpineAdventure.title',
      descKey: 'packages.alpineAdventure.description',
      price: '€1,450',
      originalPrice: '€1,680',
      duration: language === 'sl' ? '4 nočitve' : language === 'de' ? '4 Nächte' : language === 'it' ? '4 notti' : '4 nights',
      highlights: [],
      highlightKeys: [
        'packages.alpineAdventure.highlight1',
        'packages.alpineAdventure.highlight2',
        'packages.alpineAdventure.highlight3',
        'packages.alpineAdventure.highlight4',
      ],
      gradient: 'from-emerald-500 to-teal-600',
      badgeKey: 'packages.alpineAdventure.badge',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'culinary-delight',
      icon: <Utensils className="w-7 h-7" />,
      titleKey: 'packages.culinaryDelight.title',
      descKey: 'packages.culinaryDelight.description',
      price: '€1,150',
      originalPrice: '€1,350',
      duration: language === 'sl' ? '2 nočitvi' : language === 'de' ? '2 Nächte' : language === 'it' ? '2 notti' : '2 nights',
      highlights: [],
      highlightKeys: [
        'packages.culinaryDelight.highlight1',
        'packages.culinaryDelight.highlight2',
        'packages.culinaryDelight.highlight3',
        'packages.culinaryDelight.highlight4',
      ],
      gradient: 'from-amber-500 to-orange-600',
      badgeKey: 'packages.culinaryDelight.badge',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-full mb-4">
            <Sun className="w-4 h-4" />
            {language === 'sl' ? 'Poletje 2026' : language === 'de' ? 'Sommer 2026' : language === 'it' ? 'Estate 2026' : 'Summer 2026'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'sl' ? 'Paketi po meri' : language === 'de' ? 'Maßgeschneiderte Pakete' : language === 'it' ? 'Pacchetti su misura' : 'Curated Summer Packages'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Izberite paket, ki ustreza vašemu potovanju. Vsak paket vključuje najboljše izkušnje Bleda.'
              : language === 'de'
              ? 'Wählen Sie das Paket, das zu Ihrer Reise passt. Jedes Paket enthält die besten Erlebnisse in Bled.'
              : language === 'it'
              ? 'Scegliete il pacchetto adatto al vostro viaggio. Ogni pacchetto include le migliori esperienze di Bled.'
              : 'Choose the package that suits your trip. Each package includes the best experiences Bled has to offer.'}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              {/* Image Header */}
              <div className="relative h-52 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-80`} />
                <img
                  src={pkg.image}
                  alt={t(pkg.titleKey)}
                  className="w-full h-full object-cover mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                {pkg.badgeKey && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-bold rounded-full text-gray-900 dark:text-white">
                      <Star className="w-3 h-3 text-amber-500" />
                      {t(pkg.badgeKey)}
                    </span>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/40 backdrop-blur-sm text-xs font-medium rounded-full text-white">
                    <Calendar className="w-3 h-3" />
                    {pkg.duration}
                  </span>
                </div>

                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {t(pkg.titleKey)}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  {t(pkg.descKey)}
                </p>

                {/* Highlights */}
                <ul className="space-y-2.5 mb-6">
                  {pkg.highlightKeys.map((key, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                  <div>
                    {pkg.originalPrice && (
                      <span className="text-sm text-gray-400 line-through mr-2">{pkg.originalPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.price}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      {language === 'sl' ? 'na osebo' : language === 'de' ? 'pro Person' : language === 'it' ? 'a persona' : 'per person'}
                    </span>
                  </div>
                  <Link to="/reservation">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${pkg.gradient} text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow`}
                    >
                      {language === 'sl' ? 'Rezerviraj' : language === 'de' ? 'Buchen' : language === 'it' ? 'Prenota' : 'Book Now'}
                      <ArrowRight className="w-4 h-4" />
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
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {language === 'sl'
              ? 'Želite sestaviti svoj paket? Kontaktirajte našo concierge.'
              : language === 'de'
              ? 'Möchten Sie Ihr eigenes Paket zusammenstellen? Kontaktieren Sie unseren Concierge.'
              : language === 'it'
              ? 'Volete creare il vostro pacchetto? Contattate il nostro concierge.'
              : 'Want to build your own package? Contact our concierge.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            {language === 'sl' ? 'Kontaktirajte nas' : language === 'de' ? 'Kontaktieren Sie uns' : language === 'it' ? 'Contattateci' : 'Get in Touch'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SummerPackages
