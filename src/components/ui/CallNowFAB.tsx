import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'

const PHONE_PRIMARY = '+38645741000'
const PHONE_DISPLAY = '+386 4 574 10 00'

export default function CallNowFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const labels: Record<string, { call: string; question: string; close: string }> = {
    sl: { call: 'Pokličite nas', question: 'Imate vprašanje?', close: 'Zapri' },
    de: { call: 'Rufen Sie uns an', question: 'Haben Sie eine Frage?', close: 'Schließen' },
    it: { call: 'Chiamaci', question: 'Ha una domanda?', close: 'Chiudi' },
    en: { call: 'Call Us Now', question: 'Have a question?', close: 'Close' },
  }

  const l = labels[language] || labels.en

  return (
    <div className="fixed bottom-6 left-6 z-40 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-56"
          >
            <p className="text-xs text-gray-500 mb-1">{l.question}</p>
            <p className="text-sm font-semibold text-gray-900 mb-3">Villa Adora</p>
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="flex items-center gap-3 w-full bg-green-50 hover:bg-green-100 rounded-xl px-3 py-2.5 transition-colors"
            >
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-green-800 font-bold text-sm">{l.call}</p>
                <p className="text-green-600 text-xs">{PHONE_DISPLAY}</p>
              </div>
            </a>
            <p className="text-[10px] text-gray-400 mt-2 text-center">{language === 'sl' ? 'Brezplačno na SI omrežjhu' : 'Toll-free in Slovenia'}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen
            ? 'bg-gray-700 text-white'
            : 'bg-green-600 text-white'
        }`}
        aria-label={isOpen ? l.close : l.call}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <>
            <PhoneIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </motion.button>
    </div>
  )
}
