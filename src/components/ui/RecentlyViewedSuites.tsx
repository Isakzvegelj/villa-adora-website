'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClockIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'villa-adora-recently-viewed'
const MAX_ITEMS = 4

export interface ViewedSuite {
  id: string
  name: string
  image: string
  price: string
  viewedAt: number
}

// Utility functions for other components to use
export function trackSuiteView(suite: Omit<ViewedSuite, 'viewedAt'>) {
  try {
    const existing = getViewedSuites()
    // Remove if already exists (to re-add at top)
    const filtered = existing.filter(s => s.id !== suite.id)
    const updated = [{ ...suite, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('recently-viewed-updated'))
  } catch {
    // localStorage unavailable
  }
}

export function getViewedSuites(): ViewedSuite[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function clearViewedSuites() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('recently-viewed-updated'))
  } catch {
    // ignore
  }
}

export default function RecentlyViewedSuites() {
  const [suites, setSuites] = useState<ViewedSuite[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const refresh = useCallback(() => {
    setSuites(getViewedSuites())
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener('recently-viewed-updated', refresh)
    return () => window.removeEventListener('recently-viewed-updated', refresh)
  }, [refresh])

  // Don't show if no suites viewed
  if (suites.length === 0) return null

  return (
    <>
      {/* Collapsed floating pill */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            onClick={() => setIsExpanded(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 border-r-0 rounded-l-xl px-3 py-4 flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
            aria-label="View recently viewed suites"
          >
            <ClockIcon className="w-4 h-4 text-indigo-500" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
              Recent
            </span>
            <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {suites.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Recently Viewed</h3>
                </div>
                <div className="flex items-center gap-1">
                  {suites.length > 0 && (
                    <button
                      onClick={() => { clearViewedSuites(); refresh() }}
                      className="text-xs text-slate-400 hover:text-red-500 px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
                    aria-label="Close recently viewed"
                  >
                    <XMarkIcon className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Suite list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {suites.map((suite, index) => (
                  <motion.div
                    key={suite.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/suites#${suite.id}`}
                      onClick={() => setIsExpanded(false)}
                      className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                        <img
                          src={suite.image}
                          alt={suite.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {suite.name}
                        </p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                          {suite.price}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {getTimeAgo(suite.viewedAt)}
                        </p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 self-center flex-shrink-0 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
                <Link
                  to="/suites"
                  onClick={() => setIsExpanded(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  View All Suites
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
