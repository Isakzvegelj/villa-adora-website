'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Wifi, Car, Coffee, Waves, Check, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

interface RoomAvailability {
  id: string
  nameKey: string
  price: number
  available: boolean
  nextAvailable?: string
  image: string
  maxGuests: number
  size: string
}

const ROOMS: RoomAvailability[] = [
  {
    id: 'princess',
    nameKey: 'suites.princess.name',
    price: 440,
    available: true,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&q=80',
    maxGuests: 2,
    size: '55 m²',
  },
  {
    id: 'luxury',
    nameKey: 'suites.luxury.name',
    price: 480,
    available: true,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop&q=80',
    maxGuests: 2,
    size: 'Lake view',
  },
  {
    id: 'penthouse',
    nameKey: 'suites.penthouse.name',
    price: 430,
    available: false,
    nextAvailable: 'Jun 18',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop&q=80',
    maxGuests: 3,
    size: '60 m²',
  },
  {
    id: 'island',
    nameKey: 'suites.island.name',
    price: 620,
    available: true,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&q=80',
    maxGuests: 4,
    size: '65 m²',
  },
]

const AMENITIES = [
  { icon: <Wifi className="w-3.5 h-3.5" />, label: 'Free WiFi' },
  { icon: <Car className="w-3.5 h-3.5" />, label: 'Free Parking' },
  { icon: <Coffee className="w-3.5 h-3.5" />, label: 'Breakfast' },
  { icon: <Waves className="w-3.5 h-3.5" />, label: 'Wellness' },
]

export default function LiveAvailability() {
  const { t, language } = useLanguage()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [isChecking, setIsChecking] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  // Set default dates
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    setCheckIn(today.toISOString().split('T')[0])
    setCheckOut(tomorrow.toISOString().split('T')[0])
  }, [])

  const handleCheck = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setHasChecked(true)
    }, 1500)
  }

  const availableCount = ROOMS.filter(r => r.available).length

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold rounded-full mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            {language === 'sl' ? 'Spremljanje v realnem času' : language === 'de' ? 'Echtzeit-Verfügbarkeit' : 'Live Availability'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'sl' ? 'Preverite razpoložljivost' : language === 'de' ? 'Verfügbarkeit prüfen' : 'Check Availability'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Poiščite svoj idealni apartma in rezervirajte neposredno za najboljšo ceno.'
              : language === 'de'
                ? 'Finden Sie Ihre ideale Suite und buchen Sie direkt für den besten Preis.'
                : 'Find your ideal suite and book directly for the best rate.'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Check-in */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {language === 'sl' ? 'Prihod' : language === 'de' ? 'Anreise' : 'Check-in'}
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => { setCheckIn(e.target.value); setHasChecked(false); }}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Check-out */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {language === 'sl' ? 'Odhod' : language === 'de' ? 'Abreise' : 'Check-out'}
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => { setCheckOut(e.target.value); setHasChecked(false); }}
                  min={checkIn}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Guests */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {language === 'sl' ? 'Gosti' : language === 'de' ? 'Gäste' : 'Guests'}
                </label>
                <select
                  value={guests}
                  onChange={(e) => { setGuests(e.target.value); setHasChecked(false); }}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n} {language === 'sl' ? (n === 1 ? 'gost' : n === 2 ? 'gosta' : 'gostov') : n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {/* Check Button */}
              <div className="flex items-end">
                <button
                  onClick={handleCheck}
                  disabled={isChecking}
                  className="w-full px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isChecking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {language === 'sl' ? 'Preverjam...' : language === 'de' ? 'Prüfe...' : 'Checking...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {language === 'sl' ? 'Preveri' : language === 'de' ? 'Prüfen' : 'Check'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {hasChecked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Summary Bar */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      {availableCount} {language === 'sl' ? 'apartmajev na voljo' : language === 'de' ? 'Suiten verfügbar' : 'suites available'} — {checkIn && checkOut ? `${checkIn} → ${checkOut}` : ''}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {language === 'sl' ? 'Neposredna rezervacija' : language === 'de' ? 'Direkt buchen' : 'Book direct'} ✓
                  </span>
                </div>
              </div>

              {/* Room Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {ROOMS.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
                      room.available
                        ? 'border-emerald-200 dark:border-emerald-800 hover:shadow-xl hover:border-emerald-300'
                        : 'border-gray-200 dark:border-slate-700 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative sm:w-40 h-32 sm:h-auto flex-shrink-0">
                        <img
                          src={room.image}
                          alt={t(room.nameKey)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {room.available ? (
                          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            {language === 'sl' ? 'Na voljo' : language === 'de' ? 'Frei' : 'Available'}
                          </div>
                        ) : (
                          <div className="absolute top-2 left-2 bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {language === 'sl' ? 'Zasedeno' : language === 'de' ? 'Belegt' : 'Booked'}
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t(room.nameKey)}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{room.size} · {room.maxGuests} {language === 'sl' ? 'gostov' : language === 'de' ? 'Gäste' : 'guests'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-indigo-600 dark:text-indigo-400">€{room.price}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'sl' ? 'na noč' : language === 'de' ? 'pro Nacht' : '/night'}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {AMENITIES.map((a, i) => (
                            <span key={i} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                              {a.icon} {a.label}
                            </span>
                          ))}
                        </div>

                        {/* Action */}
                        {room.available ? (
                          <Link
                            to={`/reservation?roomType=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                          >
                            {language === 'sl' ? 'Rezerviraj zdaj' : language === 'de' ? 'Jetzt buchen' : 'Book now'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {room.nextAvailable
                              ? `${language === 'sl' ? 'Naslednji prosti:' : language === 'de' ? 'Nächstes frei:' : 'Next available:'} ${room.nextAvailable}`
                              : language === 'sl' ? 'Pošljite povpraševanje' : language === 'de' ? 'Anfrage senden' : 'Inquire for dates'}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <Link to="/suites">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {language === 'sl' ? 'Ogled vseh apartmajev' : language === 'de' ? 'Alle Suiten ansehen' : 'View All Suites'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {language === 'sl' ? 'Brezplačna odpoved do 48 ur pred prihodom' : language === 'de' ? 'Kostenlose Stornierung bis 48h vor Anreise' : 'Free cancellation up to 48h before arrival'} ✓
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial state - show room preview cards */}
        {!hasChecked && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {ROOMS.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={handleCheck}
                className="cursor-pointer group"
              >
                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={room.image}
                    alt={t(room.nameKey)}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-bold truncate">{t(room.nameKey)}</p>
                    <p className="text-white/70 text-xs">€{room.price}/{language === 'sl' ? 'noč' : language === 'de' ? 'Nacht' : 'night'}</p>
                  </div>
                  {room.available && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
