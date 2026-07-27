import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, UserGroupIcon, ChevronDownIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface RoomAvailability {
  id: string;
  titleKey: string;
  price: string;
  available: boolean;
}

const AVAILABILITY_ROOMS: RoomAvailability[] = [
  { id: 'princess', titleKey: 'suites.princess.title', price: '250', available: true },
  { id: 'luxury', titleKey: 'suites.luxury.title', price: '270', available: true },
  { id: 'penthouse', titleKey: 'suites.penthouse.title', price: '300', available: true },
  { id: 'swan', titleKey: 'suites.swan.title', price: '370', available: false },
  { id: 'island', titleKey: 'suites.island.title', price: '380', available: true },
  { id: 'prestige', titleKey: 'suites.prestige.title', price: '420', available: true },
];

const AvailabilityChecker = () => {
  const { t, language } = useLanguage();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [hasChecked, setHasChecked] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleCheck = () => {
    if (checkIn && checkOut && checkIn < checkOut) {
      setHasChecked(true);
    }
  };

  const availableCount = AVAILABILITY_ROOMS.filter(r => r.available).length;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-4">
            <CalendarIcon className="w-4 h-4" />
            {language === 'sl' ? 'Preveri razpoložljivost' : 'Check Availability'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Ali so naše suite na voljo?' : 'Are Our Suites Available?'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {language === 'sl'
              ? 'Vnesite datume in preverite, katere suite so na voljo za vaše bivanje.'
              : 'Enter your dates to see which suites are available for your stay.'}
          </p>
        </motion.div>

        {/* Check Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Check-in */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                {language === 'sl' ? 'Prihod' : 'Check-in'}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => { setCheckIn(e.target.value); setHasChecked(false); }}
                min={today}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors text-sm"
              />
            </div>

            {/* Check-out */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                {language === 'sl' ? 'Odhod' : 'Check-out'}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => { setCheckOut(e.target.value); setHasChecked(false); }}
                min={checkIn || today}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors text-sm"
              />
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <UserGroupIcon className="w-4 h-4" />
                {language === 'sl' ? 'Gostje' : 'Guests'}
              </label>
              <div className="flex gap-2">
                <select
                  value={adults}
                  onChange={(e) => { setAdults(e.target.value); setHasChecked(false); }}
                  className="flex-1 px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors text-sm"
                >
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n} {language === 'sl' ? (n === 1 ? 'odrasli' : 'odraslih') : (n === 1 ? 'Adult' : 'Adults')}</option>
                  ))}
                </select>
                <select
                  value={children}
                  onChange={(e) => { setChildren(e.target.value); setHasChecked(false); }}
                  className="flex-1 px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors text-sm"
                >
                  {[0, 1, 2, 3].map(n => (
                    <option key={n} value={n}>{n} {language === 'sl' ? (n === 1 ? 'otrok' : n < 3 ? 'otroka' : 'otrok') : (n === 1 ? 'Child' : 'Children')}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Check Button */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheck}
                disabled={!checkIn || !checkOut || checkIn >= checkOut}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                {language === 'sl' ? 'Preveri' : 'Check'}
              </motion.button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {hasChecked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-100 dark:border-slate-700 pt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'sl' ? 'Rezultati preverjanja' : 'Availability Results'}
                  </h3>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                    {availableCount} {language === 'sl' ? 'na voljo' : 'available'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {AVAILABILITY_ROOMS.map((room) => (
                    <div
                      key={room.id}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                        room.available
                          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {t(room.titleKey)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          €{room.price} {t('common.perNight')}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-3">
                        {room.available ? (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckIcon className="w-5 h-5" />
                            <span className="text-xs font-semibold hidden sm:inline">
                              {language === 'sl' ? 'Prosto' : 'Open'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-500 dark:text-red-400">
                            <XMarkIcon className="w-5 h-5" />
                            <span className="text-xs font-semibold hidden sm:inline">
                              {language === 'sl' ? 'Zasedeno' : 'Booked'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-center">
                  <Link to={`/reservation${checkIn && checkOut ? `?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}` : ''}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
                    >
                      {language === 'sl' ? 'Rezderviraj zdaj' : 'Book Now'}
                      <ChevronDownIcon className="w-4 h-4 rotate-[-90deg]" />
                    </motion.button>
                  </Link>
                  <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                    {language === 'sl'
                      ? 'Brezplačna odpoved do 48 ur pred prihodom'
                      : 'Free cancellation up to 48 hours before arrival'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AvailabilityChecker;
