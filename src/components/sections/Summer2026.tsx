'use client'

import { motion } from 'framer-motion'
import { Sun, Umbrella, Music, Sparkles, ArrowRight, Calendar, Wine, Mountain, Heart, ChefHat } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const content = {
  en: {
    badge: 'Summer 2026',
    title: 'Unforgettable Summer at Lake Bled',
    subtitle: 'Exclusive packages, sunset aperitivos, and curated experiences from June to September.',
    cta: 'Explore Packages',
    ctaSecondary: 'View Availability',
    packages: [
      { icon: Heart, name: 'Romance Package', desc: '2 nights, champagne, couples massage, private terrace dinner', price: 'from €950' },
      { icon: Sparkles, name: 'Wellness Retreat', desc: '3 nights, daily yoga, 2 massages, healthy brunch', price: 'from €1,200' },
      { icon: Mountain, name: 'Adventure Package', desc: 'Vintgar Gorge, kayak, bicycle rental, packed lunch', price: 'from €850' },
      { icon: ChefHat, name: 'Culinary Experience', desc: '4-course tasting menu with wine, cooking class', price: 'from €1,050' },
    ],
    events: [
      { icon: Wine, name: 'Sunset Aperitivo', schedule: 'Every evening on the terrace' },
      { icon: Music, name: 'Bled Festival', schedule: 'July — Classical music at Bled Castle' },
      { icon: Umbrella, name: 'Okarina World Music', schedule: 'July–August' },
      { icon: Calendar, name: 'Garden Evenings', schedule: 'Weekly wine & cheese gatherings' },
    ],
  },
  sl: {
    badge: 'Poletje 2026',
    title: 'Nepozabno poletje ob jezeru Bled',
    subtitle: 'Ekskluzivni paketi, aperitivi ob sončnem zahodu in kurirana doživetij od junija do septembra.',
    cta: 'Razišči pakete',
    ctaSecondary: 'Preveri razpoložljivost',
    packages: [
      { icon: Heart, name: 'Romanski paket', desc: '2 nočitvi, šampanjec, masaža za par, večerja na terasi', price: 'od €950' },
      { icon: Sparkles, name: 'Wellness umik', desc: '3 nočitve, dnevna joga, 2 masaži, zajtrk', price: 'od €1.200' },
      { icon: Mountain, name: 'Pustolovski paket', desc: 'Vintgar, kajak, izposoja koles, kosilo', price: 'od €850' },
      { icon: ChefHat, name: 'Kulinarno doživetje', desc: 'Degustacijski meni z vinom, kuharski tečaj', price: 'od €1.050' },
    ],
    events: [
      { icon: Wine, name: 'Sunset Aperitivo', schedule: 'Vsak večer na terasi' },
      { icon: Music, name: 'Blejski festival', schedule: 'Julij — Klasična glasba na Blejskem gradu' },
      { icon: Umbrella, name: 'Okarina World Music', schedule: 'Julij–avgust' },
      { icon: Calendar, name: 'Večeri v vrtu', schedule: 'Tedensko vino in sir' },
    ],
  },
  de: {
    badge: 'Sommer 2026',
    title: 'Unvergesslicher Sommer am Bleder See',
    subtitle: 'Exklusive Pakete, Sunset-Aperitivos und kuratierte Erlebnisse von Juni bis September.',
    cta: 'Pakete entdecken',
    ctaSecondary: 'Verfügbarkeit prüfen',
    packages: [
      { icon: Heart, name: 'Romantik-Paket', desc: '2 Nächte, Sekt, Paarmassagement, Terrassenessen', price: 'ab €950' },
      { icon: Sparkles, name: 'Wellness-Retreat', desc: '3 Nächte, tägliches Yoga, 2 Massagen', price: 'ab €1.200' },
      { icon: Mountain, name: 'Abenteuer-Paket', desc: 'Vintgar, Kajak, Fahrrad, Lunchpaket', price: 'ab €850' },
      { icon: ChefHat, name: 'Kulinarisches Erlebnis', desc: '4-Gänge-Menü mit Wein, Kochkurs', price: 'ab €1.050' },
    ],
    events: [
      { icon: Wine, name: 'Sunset Aperitivo', schedule: 'Jeden Abend auf der Terrasse' },
      { icon: Music, name: 'Bled Festival', schedule: 'Juli — Klassische Musik auf der Bleder Burg' },
      { icon: Umbrella, name: 'Okarina World Music', schedule: 'Juli–August' },
      { icon: Calendar, name: 'Gartenabende', schedule: 'Wöchentlich Wein & Käse' },
    ],
  },
  it: {
    badge: 'Estate 2026',
    title: 'Estate indimenticabile al Lago di Bled',
    subtitle: 'Pacchetti esclusivi, aperitivi al tramonto ed esperienze curate da giugno a settembre.',
    cta: 'Esplora pacchetti',
    ctaSecondary: 'Verifica disponibilità',
    packages: [
      { icon: Heart, name: 'Pacchetto Romantico', desc: '2 notti, champagne, coppia massaggio, cena terrazza', price: 'da €950' },
      { icon: Sparkles, name: 'Ritiro Benessere', desc: '3 notti, yoga quotidiano, 2 massaggi', price: 'da €1.200' },
      { icon: Mountain, name: 'Pacchetto Avventura', desc: 'Vintgar, kayak, biciclette, pranzo', price: 'da €850' },
      { icon: ChefHat, name: 'Esperienza Culinaria', desc: 'Menu degustazione 4 portate con vini, corso cucina', price: 'da €1.050' },
    ],
    events: [
      { icon: Wine, name: 'Sunset Aperitivo', schedule: 'Ogni sera sulla terrazza' },
      { icon: Music, name: 'Festival di Bled', schedule: 'Luglio — Musica classica al castello' },
      { icon: Umbrella, name: 'Okarina World Music', schedule: 'Luglio–agosto' },
      { icon: Calendar, name: 'Serate in Giardino', schedule: 'Settimanale vino e formaggio' },
    ],
  },
  fr: {
    badge: 'Été 2026',
    title: 'Un été inoubliable au lac de Bled',
    subtitle: 'Forfaits exclusifs, apéritifs au coucher du soleil et expériences organisées de juin à septembre.',
    cta: 'Découvrir les forfaits',
    ctaSecondary: 'Vérifier la disponibilité',
    packages: [
      { icon: Heart, name: 'Forfait Romantique', desc: '2 nuits, champagne, massage en couple, dîner terrasse', price: 'dès €950' },
      { icon: Sparkles, name: 'Retraite Bien-être', desc: '3 nuits, yoga quotidien, 2 massages', price: 'dès €1 200' },
      { icon: Mountain, name: 'Forfait Aventure', desc: 'Vintgar, kayak, vélos, déjeuner', price: 'dès €850' },
      { icon: ChefHat, name: 'Expérience Culinaire', desc: 'Menu dégustation 4 plats avec vins, cours de cuisine', price: 'dès €1 050' },
    ],
    events: [
      { icon: Wine, name: 'Sunset Aperitivo', schedule: 'Chaque soir sur la terrasse' },
      { icon: Music, name: 'Festival de Bled', schedule: 'Juillet — Musique classique au château' },
      { icon: Umbrella, name: 'Okarina World Music', schedule: 'Juillet–août' },
      { icon: Calendar, name: 'Soirées au Jardin', schedule: 'Vin et fromage hebdomadaires' },
    ],
  },
}

export default function Summer2026Section() {
  const { language } = useLanguage()
  const t = content[language] || content.en

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-amber-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-semibold rounded-full mb-4">
            <Sun className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Summer Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {t.packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group hover:border-amber-200 dark:hover:border-amber-800"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                <pkg.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{pkg.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{pkg.desc}</p>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400">{pkg.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Summer Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border border-slate-100 dark:border-slate-700 mb-10"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {language === 'sl' ? '☀️ Poletni dogodki' : language === 'de' ? '☀️ Sommer-Events' : language === 'it' ? '☀️ Eventi estivi' : '☀️ Summer Events'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.events.map((event) => (
              <div key={event.name} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <event.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{event.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{event.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/offers">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link to="/reservation">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              {t.ctaSecondary}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
