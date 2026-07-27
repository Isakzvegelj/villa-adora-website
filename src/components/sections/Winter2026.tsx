'use client'

import { motion } from 'framer-motion'
import { Snowflake, TreePine, Flame, Wine, Heart, ArrowRight, Calendar, Mountain, Sparkles, ChefHat } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const content = {
  en: {
    badge: 'Winter 2026/27',
    title: 'Magical Winter at Lake Bled',
    subtitle: 'Cozy suites, festive markets, skiing, and alpine charm from December to March.',
    cta: 'Explore Winter Packages',
    ctaSecondary: 'Check Availability',
    packages: [
      { icon: Heart, name: 'Romance Under Snow', desc: '3 nights, champagne, couples massage, fireplace suite', price: 'from €790' },
      { icon: Mountain, name: 'Ski & Relax', desc: '4 nights, ski pass for Krvavec, spa access, transfer', price: 'from €980' },
      { icon: Sparkles, name: 'Christmas Market Magic', desc: '2 nights, Christmas market tour, mulled wine tasting', price: 'from €520' },
      { icon: ChefHat, name: 'Gastronomic Winter', desc: '3 nights, fondue evening, wine pairing dinner, cooking class', price: 'from €850' },
    ],
    highlights: [
      { icon: TreePine, name: 'Bled Christmas Market', schedule: 'December — January' },
      { icon: Mountain, name: 'Skiing at Krvavec', schedule: '30 min drive, 23 slopes' },
      { icon: Flame, name: 'Fireplace Evenings', schedule: 'Every evening in the lounge' },
      { icon: Wine, name: 'Mulled Wine & Fondue', schedule: 'December — February' },
    ],
  },
  sl: {
    badge: 'Zima 2026/27',
    title: 'Čarobna zima ob jezeru Bled',
    subtitle: 'Udobje suite, božične tržnice, smučanje in alpski čar od decembra do marca.',
    cta: 'Razišči zimske pakete',
    ctaSecondary: 'Preveri razpoložljivost',
    packages: [
      { icon: Heart, name: 'Romanca pod snegom', desc: '3 nočitve, šampanjec, masaža za par, suite s kaminom', price: 'od €790' },
      { icon: Mountain, name: 'Smučaj in se sprosti', desc: '4 nočitve, smučarska vozovnica Krvavec, wellness, prevoz', price: 'od €980' },
      { icon: Sparkles, name: 'Čar božične tržnice', desc: '2 nočitvi, ogled božične tržnice, degustacija kuhanega vina', price: 'od €520' },
      { icon: ChefHat, name: 'Gastronomska zima', desc: '3 nočitve, fondi večerja, večerja z vinom, kuharski tečaj', price: 'od €850' },
    ],
    highlights: [
      { icon: TreePine, name: 'Blejska božična tržnica', schedule: 'December — januar' },
      { icon: Mountain, name: 'Smučanje v Krvavcu', schedule: '30 min vožnje, 23 proge' },
      { icon: Flame, name: 'Večeri ob kamnu', schedule: 'Vsak večer v dnevni sobi' },
      { icon: Wine, name: 'Kuhano vino in fondi', schedule: 'December — februar' },
    ],
  },
  de: {
    badge: 'Winter 2026/27',
    title: 'Magischer Winter am Bleder See',
    subtitle: 'Gemütliche Suiten, Weihnachtsmärkte, Skifahren und alpine Charme von Dezember bis März.',
    cta: 'Winter-Pakete entdecken',
    ctaSecondary: 'Verfügbarkeit prüfen',
    packages: [
      { icon: Heart, name: 'Romantik im Schnee', desc: '3 Nächte, Champagner, Paarmassage, Suite mit Kamin', price: 'ab €790' },
      { icon: Mountain, name: 'Skifahren & Entspannen', desc: '4 Nächte, Skipass Krvavec, Spa-Zugang, Transfer', price: 'ab €980' },
      { icon: Sparkles, name: 'Weihnachtsmarkt-Magie', desc: '2 Nächte, Weihnachtsmarkt-Tour, Glühwein-Verkostung', price: 'ab €520' },
      { icon: ChefHat, name: 'Gastronomischer Winter', desc: '3 Nächte, Fondue-Abend, Wein-Pairing-Dinner, Kochkurs', price: 'ab €850' },
    ],
    highlights: [
      { icon: TreePine, name: 'Bleder Weihnachtsmarkt', schedule: 'Dezember — Januar' },
      { icon: Mountain, name: 'Skifahren in Krvavec', schedule: '30 Min. Fahrt, 23 Pisten' },
      { icon: Flame, name: 'Kaminabende', schedule: 'Jeden Abend in der Lounge' },
      { icon: Wine, name: 'Glühwein & Fondue', schedule: 'Dezember — Februar' },
    ],
  },
  it: {
    badge: 'Inverno 2026/27',
    title: 'Inverno Magico al Lago di Bled',
    subtitle: 'Suite accoglienti, mercati di Natale, sci e fascino alpino da dicembre a marzo.',
    cta: 'Scopri i pacchetti invernali',
    ctaSecondary: 'Verifica disponibilità',
    packages: [
      { icon: Heart, name: 'Romanticismo nella neve', desc: '3 notti, champagne, massaggio per coppia, suite con camino', price: 'da €790' },
      { icon: Mountain, name: 'Sci e relax', desc: '4 notti, skipass Krvavec, accesso spa, trasferimento', price: 'da €980' },
      { icon: Sparkles, name: 'Magia del Mercatino di Natale', desc: '2 notti, tour mercatini, degustazione vin brulè', price: 'da €520' },
      { icon: ChefHat, name: 'Inverno Gastronomico', desc: '3 notti, serata fonduta, cena con abbinamento vini, corso di cucina', price: 'da €850' },
    ],
    highlights: [
      { icon: TreePine, name: 'Mercatino di Natale di Bled', schedule: 'Dicembre — Gennaio' },
      { icon: Mountain, name: 'Sci a Krvavec', schedule: '30 min di auto, 23 piste' },
      { icon: Flame, name: 'Serate al Camino', schedule: 'Ogni sera nella lounge' },
      { icon: Wine, name: 'Vin Brulè e Fonduta', schedule: 'Dicembre — Febbraio' },
    ],
  },
}

const Winter2026 = () => {
  const { language } = useLanguage()
  const lang = (language as 'en' | 'sl' | 'de' | 'it') || 'en'
  const c = content[lang]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Snowflake decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ❄
          </motion.div>
        ))}
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <Snowflake className="w-4 h-4" />
            {c.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {c.title}
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            {c.subtitle}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {c.packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <pkg.icon className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-sm text-blue-200/70 mb-4 leading-relaxed">{pkg.desc}</p>
              <p className="text-blue-300 font-semibold text-sm">{pkg.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {c.highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-blue-200/80">
              <item.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-blue-300/60">{item.schedule}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              {c.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              <Calendar className="w-5 h-5" />
              {c.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Winter2026
