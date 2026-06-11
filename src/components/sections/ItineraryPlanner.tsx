'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, ChevronRight, Sun, Mountain, Utensils, Waves, Camera, TreePine, Castle, Sparkles } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface ItineraryItem {
  time: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'nature' | 'culture' | 'dining' | 'relaxation' | 'adventure'
}

const itineraries: Record<string, { label: string; items: ItineraryItem[] }> = {
  romantic: {
    label: '💑 Romantic Getaway',
    items: [
      { time: '08:00', title: 'Sunrise Breakfast on the Terrace', description: 'Enjoy a leisurely buffet breakfast with panoramic lake views as the morning mist rises over Lake Bled.', icon: <Sun className="w-5 h-5" />, category: 'dining' },
      { time: '10:00', title: 'Pletna Boat to Bled Island', description: 'Ride the traditional wooden pletna boat to the island. Ring the wishing bell in the Church of the Assumption and explore the 17th-century chapel.', icon: <Waves className="w-5 h-5" />, category: 'culture' },
      { time: '12:30', title: 'Lakeside Walk & Photography', description: 'Stroll the 6 km lakeside path, capturing the stunning reflections of Bled Castle and the Julian Alps.', icon: <Camera className="w-5 h-5" />, category: 'nature' },
      { time: '14:00', title: 'Couples Massage', description: 'Return to the hotel for a relaxing in-room couples massage with aromatherapy oils.', icon: <Sparkles className="w-5 h-5" />, category: 'relaxation' },
      { time: '17:00', title: 'Garden Champagne', description: 'Unwind in the garden pavilion with a bottle of Slovenian sparkling wine as the afternoon light bathes the lake.', icon: <TreePine className="w-5 h-5" />, category: 'relaxation' },
      { time: '19:30', title: 'Sunset Dinner at Adora Restaurant', description: 'A curated tasting menu on the terrace with the best sunset views in Bled. Wine pairing included.', icon: <Utensils className="w-5 h-5" />, category: 'dining' },
    ],
  },
  family: {
    label: '👨‍👩‍👧‍👦 Family Adventure',
    items: [
      { time: '08:00', title: 'Family Breakfast', description: 'Hearty buffet breakfast on the terrace. Kids love the fresh pastries and local honey.', icon: <Sun className="w-5 h-5" />, category: 'dining' },
      { time: '09:30', title: 'Bled Castle Visit', description: 'Explore the medieval castle perched on the cliff. The kids will love the castle museum and the printing workshop.', icon: <Castle className="w-5 h-5" />, category: 'culture' },
      { time: '12:00', title: 'Cream Cake Tasting', description: 'Try Bled\'s famous kremšnita (cream cake) at a local café — a must-do for every visitor.', icon: <Utensils className="w-5 h-5" />, category: 'dining' },
      { time: '14:00', title: 'Kayaking on the Lake', description: 'Rent kayaks and paddle around the lake. Safe, fun, and a great way to see the island from the water.', icon: <Waves className="w-5 h-5" />, category: 'adventure' },
      { time: '16:30', title: 'Bicycle Ride Around the Lake', description: 'Take the complimentary hotel bikes for a family ride along the flat 6 km lakeside path.', icon: <Mountain className="w-5 h-5" />, category: 'adventure' },
      { time: '19:00', title: 'Family Dinner in Town', description: 'Walk to Bled town center for dinner at a family-friendly restaurant with local specialties.', icon: <Utensils className="w-5 h-5" />, category: 'dining' },
    ],
  },
  adventure: {
    label: '🏔️ Active Explorer',
    items: [
      { time: '07:00', title: 'Early Morning Swim', description: 'Start the day with a refreshing swim in the crystal-clear waters of Lake Bled from the hotel garden.', icon: <Waves className="w-5 h-5" />, category: 'adventure' },
      { time: '08:30', title: 'Power Breakfast', description: 'Fuel up with a protein-rich breakfast on the terrace before a day of adventure.', icon: <Sun className="w-5 h-5" />, category: 'dining' },
      { time: '10:00', title: 'Vintgar Gorge Hike', description: 'Drive 15 min to Vintgar Gorge for a spectacular walk along wooden walkways through the dramatic canyon.', icon: <Mountain className="w-5 h-5" />, category: 'nature' },
      { time: '13:00', title: 'Lunch at a Local Gostilna', description: 'Try traditional Slovenian hearty dishes at a local inn — štruklji, žlikrofi, and local beer.', icon: <Utensils className="w-5 h-5" />, category: 'dining' },
      { time: '15:00', title: 'Canyoning in Bohinj Valley', description: 'An adrenaline-pumping canyoning experience — jump, slide, and climb through waterfalls and rapids.', icon: <Sparkles className="w-5 h-5" />, category: 'adventure' },
      { time: '19:00', title: 'Recovery Dinner & Sauna', description: 'Return for a well-earned dinner at the Adora restaurant, followed by a relaxing sauna session.', icon: <Utensils className="w-5 h-5" />, category: 'relaxation' },
    ],
  },
  relaxation: {
    label: '🧘 Wellness Retreat',
    items: [
      { time: '08:00', title: 'Morning Yoga in the Garden', description: 'Start with a gentle yoga session in the hotel garden, surrounded by birdsong and lake views.', icon: <TreePine className="w-5 h-5" />, category: 'relaxation' },
      { time: '09:30', title: 'Healthy Breakfast', description: 'A nutritious breakfast with fresh juices, granola, and local superfoods on the terrace.', icon: <Sun className="w-5 h-5" />, category: 'dining' },
      { time: '11:00', title: 'Hot Stone Massage', description: 'A deeply relaxing hot stone massage using volcanic stones and warm aromatherapy oils.', icon: <Sparkles className="w-5 h-5" />, category: 'relaxation' },
      { time: '14:00', title: 'Lakeside Meditation Walk', description: 'A mindful walk along the lake shore, with guided meditation stops at the most scenic viewpoints.', icon: <MapPin className="w-5 h-5" />, category: 'nature' },
      { time: '16:00', title: 'Afternoon Tea Service', description: 'Complimentary afternoon tea in the garden with herbal infusions and homemade biscuits.', icon: <TreePine className="w-5 h-5" />, category: 'relaxation' },
      { time: '18:30', title: 'Light Dinner & Stargazing', description: 'A light, plant-based dinner on the terrace followed by stargazing from the garden — Bled has wonderfully clear skies.', icon: <Utensils className="w-5 h-5" />, category: 'dining' },
    ],
  },
}

const categoryColors: Record<string, string> = {
  nature: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  culture: 'bg-amber-100 text-amber-700 border-amber-200',
  dining: 'bg-orange-100 text-orange-700 border-orange-200',
  relaxation: 'bg-purple-100 text-purple-700 border-purple-200',
  adventure: 'bg-blue-100 text-blue-700 border-blue-200',
}

const categoryLabels: Record<string, Record<string, string>> = {
  en: { nature: 'Nature', culture: 'Culture', dining: 'Dining', relaxation: 'Relaxation', adventure: 'Adventure' },
  sl: { nature: 'Narava', culture: 'Kultura', dining: 'Hrana', relaxation: 'Sprostitev', adventure: 'Avantura' },
  de: { nature: 'Natur', culture: 'Kultur', dining: 'Essen', relaxation: 'Entspannung', adventure: 'Abenteuer' },
  it: { nature: 'Natura', culture: 'Cultura', dining: 'Cucina', relaxation: 'Relax', adventure: 'Avventura' },
}

export default function ItineraryPlanner() {
  const { language } = useLanguage()
  const [activeItinerary, setActiveItinerary] = useState<string>('romantic')
  const t = categoryLabels[language] || categoryLabels.en

  const current = itineraries[activeItinerary]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-4">
            {language === 'sl' ? 'Načrtovanje obiska' : language === 'de' ? 'Reiseplanung' : language === 'it' ? 'Pianificazione' : 'Trip Planning'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Idealni dan na Bledu' : language === 'de' ? 'Ihr perfekter Bled-Tag' : language === 'it' ? 'Il vostro giorno perfetto a Bled' : 'Your Perfect Day in Bled'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Izberite svoj stil potovanja in vam bomo sestavili idealen dnevni načrt po meri.'
              : language === 'de'
                ? 'Wählen Sie Ihren Reisestil und wir erstellen einen perfekten Tagesplan für Sie.'
                : language === 'it'
                  ? 'Scegliete il vostro stile di viaggio e vi creeremo un programma giornaliero perfetto.'
                  : 'Choose your travel style and we\'ll craft the perfect day plan for your Bled stay.'}
          </p>
        </motion.div>

        {/* Itinerary Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(itineraries).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveItinerary(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeItinerary === key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItinerary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800" />

            <div className="space-y-8">
              {current.items.map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative flex items-start gap-4 md:gap-8 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-indigo-500 rounded-full -translate-x-1/2 mt-6 ring-4 ring-white dark:ring-slate-900 z-10" />

                    {/* Time label (mobile: left, desktop: alternating) */}
                    <div className={`flex-shrink-0 w-12 md:w-1/2 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 ml-12 md:ml-0 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700 group">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {item.description}
                            </p>
                            <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full border ${categoryColors[item.category]}`}>
                              {t[item.category]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {language === 'sl'
              ? 'Želite personaliziran načrat? Naš concierge vam bo z veseljem pomagal.'
              : language === 'de'
                ? 'Möchten Sie einen personalisierten Plan? Unser Concierge hilft Ihnen gerne.'
                : language === 'it'
                  ? 'Desiderate un programma personalizzato? Il nostro concierge sarà felice di aiutarvi.'
                  : 'Want a personalized itinerary? Our concierge will be happy to help you plan.'}
          </p>
          <button
            onClick={() => {
              const event = new CustomEvent('open-concierge')
              window.dispatchEvent(event)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {language === 'sl' ? 'Vprašajte concierge' : language === 'de' ? 'Concierge fragen' : language === 'it' ? 'Chiedi al concierge' : 'Ask the Concierge'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
