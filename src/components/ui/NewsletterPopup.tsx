'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Mail, Check, Sparkles } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const NEWSLETTER_STORAGE_KEY = 'villa-adora-newsletter-dismissed'
const NEWSLETTER_SUBMITTED_KEY = 'villa-adora-newsletter-submitted'

export default function NewsletterPopup() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const dismissed = localStorage.getItem(NEWSLETTER_STORAGE_KEY)
    const submitted = localStorage.getItem(NEWSLETTER_SUBMITTED_KEY)

    if (dismissed || submitted) return

    // Show popup after 15 seconds or on scroll past 50%
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 15000)

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 40) {
        setIsVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, 'true')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(language === 'sl' ? 'Vnesite veljaven e-poštni naslov' : 'Please enter a valid email address')
      return
    }

    // Store in localStorage for now (would connect to API in production)
    try {
      const existing = JSON.parse(localStorage.getItem('villa-adora-newsletter') || '[]')
      existing.push({ email, subscribedAt: new Date().toISOString(), language })
      localStorage.setItem('villa-adora-newsletter', JSON.stringify(existing))
      localStorage.setItem(NEWSLETTER_SUBMITTED_KEY, 'true')
    } catch {
      // ignore storage errors
    }

    setIsSubmitted(true)
  }

  const incentiveText: Record<string, { title: string; subtitle: string; cta: string; placeholder: string; success: string }> = {
    sl: {
      title: 'Prejmite 10% popust',
      subtitle: 'Prijavite se na naše novice in prejmite ekskluziven 10% popust na vašo prvo rezervacijo.',
      cta: 'Prijavi se',
      placeholder: 'Vaš e-poštni naslov',
      success: 'Hvala! Preverite vaš e-poštni naslov za potrditev.',
    },
    de: {
      title: 'Erhalten Sie 10% Rabatt',
      subtitle: 'Melden Sie Sie für unseren Newsletter an und erhalten Sie einen exklusiven 10% Rabatt auf Ihre erste Buchung.',
      cta: 'Anmelden',
      placeholder: 'Ihre E-Mail-Adresse',
      success: 'Danke! Bitte überprüfen Sie Ihre E-Mail für die Bestätigung.',
    },
    it: {
      title: 'Ricevi il 10% di sconto',
      subtitle: 'Iscriviti alla nostra newsletter e ricevi uno sconto esclusivo del 10% sulla tua prima prenotazione.',
      cta: 'Iscriviti',
      placeholder: 'Il tuo indirizzo email',
      success: 'Grazie! Controlla la tua email per la conferma.',
    },
  }

  const text = incentiveText[language] || {
    title: 'Get 10% Off',
    subtitle: 'Subscribe to our newsletter and receive an exclusive 10% discount on your first booking.',
    cta: 'Subscribe',
    placeholder: 'Your email address',
    success: 'Thank you! Please check your email for confirmation.',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with gradient */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-8 pt-8 pb-12 text-center">
              <div className="absolute top-4 left-4 opacity-20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-8 right-8 opacity-20">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{text.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{text.subtitle}</p>
            </div>

            {/* Content */}
            <div className="px-8 pb-8 -mt-6">
              <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{text.success}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                        placeholder={text.placeholder}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs">{error}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      {text.cta}
                    </button>
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                      {language === 'sl'
                        ? 'Vaš e-poštni naslov bo uporabljen samo za naše novice.'
                        : 'Your email will only be used for our newsletter.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
