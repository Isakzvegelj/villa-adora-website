import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import {
  ArrowRightIcon,
  CheckIcon,
  WifiIcon,
  EyeIcon,
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import AvailabilityCalendar from './AvailabilityCalendar'

interface SuiteData {
  id: string
  price: string
  image: string
  titleKey: string
  descKey: string
  size: string
  featured: boolean
  color: string
}

const IMG = '/villa-adora-website/images/adora/real'

const SuitesPreview = () => {
  const { t, language } = useLanguage()
  const isSL = language === 'sl'

  const suites: SuiteData[] = [
    {
      id: 'princess',
      price: '250',
      image: `${IMG}/suite-classic.jpg`,
      titleKey: 'suites.princess.title',
      descKey: 'suites.princess.description',
      size: '55 m²',
      featured: false,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'luxury',
      price: '270',
      image: `${IMG}/suite-lake.jpg`,
      titleKey: 'suites.luxury.title',
      descKey: 'suites.luxury.description',
      size: '55 m²',
      featured: false,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'penthouse',
      price: '300',
      image: `${IMG}/villa-detail.jpg`,
      titleKey: 'suites.penthouse.title',
      descKey: 'suites.penthouse.description',
      size: '60 m²',
      featured: true,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'swan',
      price: '370',
      image: `${IMG}/suite-panorama.jpg`,
      titleKey: 'suites.swan.title',
      descKey: 'suites.swan.description',
      size: '58 m²',
      featured: false,
      color: 'from-violet-500 to-fuchsia-500',
    },
    {
      id: 'island',
      price: '380',
      image: `${IMG}/suite-terrace.jpg`,
      titleKey: 'suites.island.title',
      descKey: 'suites.island.description',
      size: '65 m²',
      featured: true,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'prestige',
      price: '420',
      image: `${IMG}/gallery-couple.jpg`,
      titleKey: 'suites.prestige.title',
      descKey: 'suites.prestige.description',
      size: '72 m²',
      featured: false,
      color: 'from-amber-500 to-orange-500',
    },
  ]

  const trackRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null)

  const getStep = useCallback(() => {
    const track = trackRef.current
    if (!track) return 340
    const card = track.querySelector<HTMLElement>('.suite-card')
    const gap = 24
    return card ? card.offsetWidth + gap : 340
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(index, suites.length - 1))
      track.scrollTo({ left: clamped * getStep(), behavior: 'smooth' })
    },
    [getStep, suites.length]
  )

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const step = getStep()
    if (step <= 0) return
    const idx = Math.round(track.scrollLeft / step)
    setActiveIndex(Math.max(0, Math.min(idx, suites.length - 1)))
  }, [getStep, suites.length])

  useEffect(() => {
    handleScroll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedSuite = suites.find((s) => s.id === selectedSuiteId) || null
  const calendarOpen = selectedSuiteId !== null
  const calendarTitle = selectedSuite
    ? t(selectedSuite.titleKey)
    : isSL
    ? 'vse suite'
    : 'All Suites'

  const handleCheckAvailability = (id: string) => {
    if (selectedSuiteId === id) {
      setSelectedSuiteId(null)
      return
    }
    setSelectedSuiteId(id)
    // Let the calendar render, then bring it into view right below the carousel
    setTimeout(() => {
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-4">
            {isSL ? '6 unikatnih suit' : '6 Unique Suites'}
          </span>
          <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
            {t('suites.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isSL
              ? 'Vsaka suite je edinstvena zgodba — od intimnega Stolpiča do razkošnega Penthousea. Vse nudijo nepozaben razgled na Blejsko jezero.'
              : 'Each suite tells a unique story — from the intimate Tower room to the lavish Penthouse. All offer unforgettable views of Lake Bled.'}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-3 flex items-center justify-center gap-1.5">
            <CalendarDaysIcon className="w-4 h-4" />
            {isSL
              ? 'Povlecite levo/desno za brskanje po suitah · tapnite »Preveri razpoložljivost« za koledar.'
              : 'Swipe side-to-side to browse the suites · tap “Check availability” on any suite for its live calendar.'}
          </p>
        </motion.div>

        {/* Controls row: counter + arrows */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {activeIndex + 1} / {suites.length}
          </span>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous suites"
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === suites.length - 1}
              aria-label="Next suites"
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Horizontal carousel track — scrolls left to right like an Instagram carousel */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 -mx-1 px-1"
        >
          {suites.map((suite, index) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="suite-card snap-start shrink-0 w-[300px] sm:w-[340px] group relative bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={suite.image}
                  alt={t(suite.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Featured badge */}
                {suite.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    ⭐ {isSL ? 'Priljubljena' : 'Popular'}
                  </div>
                )}

                {/* Price badge */}
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${suite.color} text-white px-3 py-1.5 rounded-full shadow-lg`}>
                  <span className="font-bold text-sm">€{suite.price}</span>
                  <span className="text-[10px] text-white/80 ml-0.5">/{isSL ? 'noč' : 'night'}</span>
                </div>

                {/* Size badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <ArrowsPointingOutIcon className="w-3 h-3" />
                  {suite.size}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t(suite.titleKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {t(suite.descKey)}
                </p>

                {/* Quick amenities */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-5">
                  <span className="flex items-center gap-1">
                    <WifiIcon className="w-3.5 h-3.5" />
                    WiFi
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-3.5 h-3.5" />
                    {isSL ? 'Pogled na jezero' : 'Lake View'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckIcon className="w-3.5 h-3.5 text-green-500" />
                    {isSL ? 'Klima' : 'AC'}
                  </span>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between mb-3">
                  <Link to={`/suites#${suite.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
                    >
                      {isSL ? 'Podrobnosti' : 'View Details'}
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <Link to={`/reservation?roomType=${suite.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-sm font-bold bg-gradient-to-r ${suite.color} text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow`}
                    >
                      {t('common.book')}
                    </motion.button>
                  </Link>
                </div>

                {/* Check Availability button — reveals this room's calendar below the carousel */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCheckAvailability(suite.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                    selectedSuiteId === suite.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                      : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                  }`}
                >
                  <CalendarDaysIcon className="w-4 h-4" />
                  {selectedSuiteId === suite.id
                    ? isSL ? 'Zapri koledar' : 'Close Calendar'
                    : isSL ? 'Preveri razpoložljivost' : 'Check Availability'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {suites.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to suite ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-7 bg-indigo-600'
                  : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Availability calendar panel — revealed below the room list when a guest taps "Check availability" */}
        <div ref={calendarRef} className="scroll-mt-24 mt-4">
          <AnimatePresence mode="wait">
            {calendarOpen ? (
              <motion.div
                key={selectedSuiteId ?? 'all'}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-indigo-100 dark:border-slate-700 shadow-xl overflow-hidden"
              >
                {/* Panel header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <div className="flex items-center gap-3">
                    <CalendarDaysIcon className="w-5 h-5" />
                    <h3 className="font-semibold">
                      {isSL ? 'Razpoložljivost —' : 'Availability —'} {calendarTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedSuiteId(null)}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close availability calendar"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <AvailabilityCalendar
                  preselectedSuite={selectedSuiteId === 'all' ? undefined : selectedSuiteId ?? undefined}
                  embedded
                />
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl py-10 px-6 text-center"
              >
                <CalendarDaysIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
                  {isSL
                    ? 'Tapnite »Preveri razpoložljivost« na katerikoli suiti zgoraj — njen koledar razpoložljivosti se prikaže tukaj.'
                    : 'Tap “Check availability” on any suite above — its live availability calendar appears right here.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedSuiteId('all')
                    setTimeout(() => {
                      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 150)
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  <CalendarDaysIcon className="w-4 h-4" />
                  {isSL ? 'Prikaži koledar za vse suite' : 'Show calendar for all suites'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10"
        >
          <Link to="/suites">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center text-lg px-10 py-4"
            >
              {isSL ? 'Oglejte si vse suite' : 'View All Suites'}
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </motion.button>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">
            {isSL
              ? 'Primerjajte suite v podrobni tabeli na strani za suite.'
              : 'Compare all suites in detail on the suites page.'}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SuitesPreview
