'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Bot, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const content = {
  en: {
    badge: 'AI Concierge',
    title: 'Have Questions? Ask Our Concierge',
    subtitle: 'Get instant answers about suites, availability, local attractions, dining, and more — in your language.',
    cta: 'Start Chat',
    features: ['Available 24/7', 'Multilingual', 'Instant answers'],
  },
  sl: {
    badge: 'AI Concierge',
    title: 'Imate vprašanja? Vprašajte našo concierge',
    subtitle: 'Pridobite takojšnje odgovore o apartmajih, razpoložljivosti, lokalnih atrakcijah, restavracijah in več — v vašem jeziku.',
    cta: 'Začni klepet',
    features: ['Na voljo 24/7', 'Večjezičen', 'Takojšnji odgovori'],
  },
  de: {
    badge: 'AI Concierge',
    title: 'Haben Sie Fragen? Fragen Sie unseren Concierge',
    subtitle: 'Erhalten Sie sofortige Antworten zu Suiten, Verfügbarkeit, lokalen Attraktionen, Restaurants und mehr — in Ihrer Sprache.',
    cta: 'Chat starten',
    features: ['24/7 verfügbar', 'Mehrsprachig', 'Sofortige Antworten'],
  },
  it: {
    badge: 'AI Concierge',
    title: 'Ha domande? Chieda al nostro concierge',
    subtitle: 'Ottenga risposte immediate su suite, disponibilità, attrazioni locali, ristoranti e altro — nella sua lingua.',
    cta: 'Inizia chat',
    features: ['Disponibile 24/7', 'Multilingue', 'Risposte immediate'],
  },
}

export default function ConciergeCTA() {
  const { language } = useLanguage()
  const t = content[language] || content.en
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 dark:border-indigo-900">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-transparent dark:from-indigo-900/30 rounded-bl-full opacity-60" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-transparent dark:from-purple-900/20 rounded-tr-full opacity-40" />

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* Left: Icon & Badge */}
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    {t.badge}
                  </div>
                </div>
              </motion.div>

              {/* Right: Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-6 max-w-xl">
                  {t.subtitle}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                  {t.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-full border border-indigo-200 dark:border-indigo-800"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <motion.button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      // Find and click the concierge widget button
                      const event = new CustomEvent('open-concierge')
                      window.dispatchEvent(event)
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 hover:shadow-xl transition-shadow"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.cta}
                    <motion.span
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
