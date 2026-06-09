import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function StickyBookNow() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 60% of viewport
      const scrollY = window.scrollY
      const triggerPoint = window.innerHeight * 0.6
      setIsVisible(scrollY > triggerPoint)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
        >
          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors z-10"
            aria-label="Dismiss"
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </button>

          <Link
            to="/reservation"
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white pl-5 pr-6 py-3.5 rounded-full shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 group"
          >
            <CalendarIcon className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight">Book Now</span>
              <span className="text-xs text-white/70 leading-tight">Best rate guaranteed</span>
            </div>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
