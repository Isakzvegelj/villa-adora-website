'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const COOKIE_KEY = 'villa-adora-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY)
      if (!stored) {
        // Delay slightly so it doesn't pop up during loading screen
        const timer = setTimeout(() => setVisible(true), 2000)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const acceptAll = useCallback(() => {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({ analytics: true, marketing: true, timestamp: Date.now() }))
    } catch { /* ignore */ }
    setVisible(false)
  }, [])

  const acceptNecessary = useCallback(() => {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({ analytics: false, marketing: false, timestamp: Date.now() }))
    } catch { /* ignore */ }
    setVisible(false)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 md:px-6 md:pb-6"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Main banner */}
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        We Value Your Privacy
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.{' '}
                        <button
                          onClick={() => setShowDetails(!showDetails)}
                          className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline font-medium"
                        >
                          {showDetails ? 'Show less' : 'Learn more'}
                        </button>
                      </p>
                    </div>
                    <button
                      onClick={acceptNecessary}
                      className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
                      aria-label="Close"
                    >
                      <XMarkIcon className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked
                              readOnly
                              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Necessary Cookies</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Essential for the website to function properly. These cannot be disabled.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              defaultChecked
                              id="cookie-analytics"
                              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Analytics Cookies</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Help us understand how visitors interact with our website by collecting anonymous data.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              defaultChecked
                              id="cookie-marketing"
                              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Marketing Cookies</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Used to deliver relevant advertisements and track campaign effectiveness.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-5 pb-5 md:px-6 md:pb-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptNecessary}
                className="flex-1 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Utility to check if user has consented
export function hasCookieConsent(): boolean {
  try {
    return localStorage.getItem(COOKIE_KEY) !== null
  } catch {
    return false
  }
}

// Utility to check analytics consent
export function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) return false
    const data = JSON.parse(stored)
    return data.analytics === true
  } catch {
    return false
  }
}
