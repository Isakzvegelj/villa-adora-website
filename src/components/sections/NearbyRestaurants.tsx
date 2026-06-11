'use client'

import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Phone, ExternalLink, Utensils } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const getTranslation = (translations: Record<string, string>, lang: string): string =>
  translations[lang] || translations.en

const restaurants = [
  {
    name: 'Restavracija 1906',
    cuisineKey: 'restaurants.fineDining',
    distance: '3 min drive',
    rating: 4.7,
    priceRange: '€€€',
    description: {
      en: 'Fine dining in Bled\'s iconic Park Hotel with castle views. Seasonal Slovenian cuisine with modern techniques.',
      sl: 'Fina kuhinja v legendarnem Park hotelu s pogledom na grad. Sezonska slovenska kuhinja s sodobnimi tehnikami.',
      de: 'Feine Küche im legendären Park Hotel mit Blick auf die Burg. Slowenische Saisonküche mit modernen Techniken.',
      it: 'Alta cucina nel leggendario Park Hotel con vista sul castello. Cucina slovena di stagione con tecniche moderne.',
    },
    hours: '12:00–22:00',
    phone: '+386 4 579 6000',
    website: 'https://www.sava-hotels-resorts.com/en/sava-hotel-bled/restaurant-1906/',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80',
    badge: 'Fine Dining',
    badgeColor: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Rožata',
    cuisineKey: 'restaurants.traditional',
    distance: '3 min drive',
    rating: 4.5,
    priceRange: '€€',
    description: {
      en: 'Traditional Slovenian restaurant famous for Bled\'s cream slice (kremšnita) and classic regional dishes.',
      sl: 'Tradicionalna slovenska restavracija, znana po kremšniti in klasičnih regionalnih jedih.',
      de: 'Traditionelles slowenesisches Restaurant, bekannt für Bleds Cremeschnitte und klassische Gerichte.',
      it: 'Ristorante sloveno tradizionale, famoso per la crema di Bled e i piatti regionali classici.',
    },
    hours: '11:00–22:00',
    phone: '+386 4 574 1615',
    website: 'https://www.rozata-bled.si/',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop&q=80',
    badge: 'Traditional',
    badgeColor: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Sova Bled',
    cuisineKey: 'restaurants.modern',
    distance: '4 min drive',
    rating: 4.6,
    priceRange: '€€',
    description: {
      en: 'Modern wine bar with creative tapas-style Slovenian dishes. Excellent local wine selection.',
      sl: 'Moderni vinoteka s kreativnimi slovenskimi jedmi v tapas slogu. Odličen izbor lokalnih vin.',
      de: 'Moderne Weinbar mit kreativen slowenischen Gerichten im Tapas-Stil. Ausgezeichnete lokala Weinauswahl.',
      it: 'Enoteca moderna con piatti sloveni creativi in stale tapas. Eccellente selezione di vini locali.',
    },
    hours: '12:00–23:00',
    phone: '+386 4 574 2000',
    website: 'https://www.sova-bled.si/',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80',
    badge: 'Wine Bar',
    badgeColor: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'Gostilna Pri Planincu',
    cuisineKey: 'restaurants.rustic',
    distance: '5 min drive',
    rating: 4.4,
    priceRange: '€€',
    description: {
      en: 'Rustic mountain-style restaurant serving hearty Slovenian fare. Known for game dishes and local specialties.',
      sl: 'Robustna gorska restavracija s srčno slovensko hrano. Znana po divjačinskih jedih in lokalnih specialitetah.',
      de: 'Robustes Berggerichte mit herzhaft slowenischer Küche. Bekannt aus Wildgerichten und lokalen Spezialitäten.',
      it: 'Ristorante rustico di montagna con piatti sloveni sostanziosi. Conosciuto per i piatti di cacciagione.',
    },
    hours: '11:00–22:00',
    phone: '+386 4 574 1616',
    website: '',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop&q=80',
    badge: 'Rustic',
    badgeColor: 'from-amber-600 to-yellow-500',
  },
  {
    name: 'Restaurant at Grand Hotel Toplice',
    cuisineKey: 'restaurants.awardWinning',
    distance: '5 min drive',
    rating: 4.8,
    priceRange: '€€€€',
    description: {
      en: 'Award-winning lakeside fine dining in a historic grand hotel. Seasonal tasting menus with wine pairings.',
      sl: 'Nagrajena fina kuhinja ob jezeru v zgodovinskem grand hotelu. Sezonski degustacijski meniji z vinom.',
      de: 'Preisgekrönte Feinküche am See in einem historischen Grand Hotel. Saisonale Degustationsmenüs mit Weinbegleitung.',
      it: 'Alta cucina premiata sul lago in un storico grand hotel. Menù degustazione di stagione con abbinamento vini.',
    },
    hours: '18:00–22:00 (Tue–Sun)',
    phone: '+386 4 579 1000',
    website: 'https://www.sava-hotels-resorts.com/en/grand-hotel-toplice/dining/',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80',
    badge: 'Award-Winning',
    badgeColor: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Pizzeria Rustika',
    cuisineKey: 'restaurants.casual',
    distance: '3 min drive',
    rating: 4.3,
    priceRange: '€',
    description: {
      en: 'Cozy family-friendly pizzeria with garden terrace. Wood-fired pizzas and Italian classics.',
      sl: 'Prijetna družinska picerija z vrtno teraso. Pice na drveni ogenj in italijanski klasiki.',
      de: 'Gemütliche Familienpizzeria mit Gartenterasse. Holzofenpizzen und italienische Klassiker.',
      it: 'Accogliente pizzeria familiare con terrazza giardino. Pizza a legna e classici italiani.',
    },
    hours: '11:00–22:00',
    phone: '+386 4 574 1617',
    website: '',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600&h=400&fit=crop&q=80',
    badge: 'Casual',
    badgeColor: 'from-blue-500 to-cyan-500',
  },
]

export default function NearbyRestaurants() {
  const { language } = useLanguage()
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        subtitle: 'Dining in Bled',
        title: 'Restaurants Near Villa Adora',
        description: 'Bled offers exceptional dining — from award-winning fine dining to cozy traditional taverns. Our concierge can make reservations for you.',
        viewAll: 'View All Restaurants',
        bookTable: 'Book a Table',
        perNight: '/night',
      },
      sl: {
        subtitle: 'Prehrana v Bledu',
        title: 'Restavracije blizu Villa Adore',
        description: 'Bled ponuja izjemno prehrano — od nagrajene fine kudilne do prijetnih tradicionalnih gostiln. Naša concierge vam lahko rezervira mizo.',
        viewAll: 'Ogled vseh restavracij',
        bookTable: 'Rezerviraj mizo',
        perNight: '/noč',
      },
      de: {
        subtitle: 'Essen in Bled',
        title: 'Restaurants in der Nähe der Villa Adora',
        description: 'Bled bietet außergewöhnliches Essen — von preisgekrönter Feinküche bis hin zu gemütlichen traditionellen Gaststuben.',
        viewAll: 'Alle Restaurants anzeigen',
        bookTable: 'Tisch reservieren',
        perNight: '/Nacht',
      },
      it: {
        subtitle: 'Ristorazione a Bled',
        title: 'Ristoranti vicino a Villa Adora',
        description: 'Bled offre una cucina eccezionale — dall\'alta cucina premiata alle accogliente taverne tradizionali.',
        viewAll: 'Visualizza tutti i ristoranti',
        bookTable: 'Prenota un tavolo',
        perNight: '/notte',
      },
    }
    return translations[language]?.[key] || translations.en[key] || key
  }

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
            <Utensils className="w-4 h-4" />
            {t('subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transactive" />
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${restaurant.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  {restaurant.badge}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{restaurant.rating}</span>
                  </div>
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{restaurant.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-serif">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {getTranslation(restaurant.description, language)}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {restaurant.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {restaurant.hours}
                  </span>
                  {restaurant.phone && (
                    <a href={`tel:${restaurant.phone}`} className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      {restaurant.phone}
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {restaurant.website && (
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                  <a
                    href={`/contact?subject=restaurant&restaurant=${encodeURIComponent(restaurant.name)}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    {t('bookTable')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
