import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface SuiteAvailability {
  id: string;
  titleKey: string;
  price: string;
  availableDates: Set<string>; // YYYY-MM-DD strings
}

// Generate mock availability for the next 6 months
function generateAvailability(): SuiteAvailability[] {
  const suiteIds = ['princess', 'luxury', 'penthouse', 'swan', 'island', 'prestige'];
  const titleKeys = ['suites.princess.title', 'suites.luxury.title', 'suites.penthouse.title', 'suites.swan.title', 'suites.island.title', 'suites.prestige.title'];
  const prices = ['250', '270', '300', '370', '380', '420'];

  return suiteIds.map((id, i) => {
    const availableDates = new Set<string>();
    const today = new Date();
    for (let d = 0; d < 180; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() + d);
      // Randomly mark ~70% of dates as available
      if (Math.random() > 0.3) {
        availableDates.add(date.toISOString().split('T')[0]);
      }
    }
    return { id, titleKey: titleKeys[i], price: prices[i], availableDates };
  });
}

const SUITES = generateAvailability();

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const DAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_SL = ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'];
const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAMES_SL = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'];

export default function AvailabilityCalendar() {
  const { t, language } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedSuite, setSelectedSuite] = useState<string>('all');
  const [selectedCheckIn, setSelectedCheckIn] = useState<string>('');
  const [selectedCheckOut, setSelectedCheckOut] = useState<string>('');
  const [showCheckInPicker, setShowCheckInPicker] = useState(true);

  const isSL = language === 'sl';
  const dayNames = isSL ? DAY_NAMES_SL : DAY_NAMES_EN;
  const monthNames = isSL ? MONTH_NAMES_SL : MONTH_NAMES_EN;

  const { year, month } = currentMonth;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date().toISOString().split('T')[0];

  const prevMonth = () => {
    if (month === 0) {
      setCurrentMonth({ year: year - 1, month: 11 });
    } else {
      setCurrentMonth({ year, month: month - 1 });
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setCurrentMonth({ year: year + 1, month: 0 });
    } else {
      setCurrentMonth({ year, month: month + 1 });
    }
  };

  const getDateStatus = (dateStr: string) => {
    if (dateStr < today) return 'past';
    if (selectedSuite === 'all') {
      // Show if ANY suite is available
      const anyAvailable = SUITES.some(s => s.availableDates.has(dateStr));
      return anyAvailable ? 'available' : 'booked';
    }
    const suite = SUITES.find(s => s.id === selectedSuite);
    if (!suite) return 'unavailable';
    return suite.availableDates.has(dateStr) ? 'available' : 'booked';
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (dateStr < today) return;
    if (getDateStatus(dateStr) !== 'available') return;

    if (showCheckInPicker || selectedCheckIn >= dateStr) {
      setSelectedCheckIn(dateStr);
      setSelectedCheckOut('');
      setShowCheckInPicker(false);
    } else {
      setSelectedCheckOut(dateStr);
      setShowCheckInPicker(true);
    }
  };

  const getSelectedDates = useMemo(() => {
    if (!selectedCheckIn || !selectedCheckOut) return new Set<string>();
    const dates = new Set<string>();
    const start = new Date(selectedCheckIn);
    const end = new Date(selectedCheckOut);
    const current = new Date(start);
    while (current <= end) {
      dates.add(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, [selectedCheckIn, selectedCheckOut]);

  const nightCount = getSelectedDates.size - 1;

  const availableSuiteCount = (dateStr: string) => {
    return SUITES.filter(s => s.availableDates.has(dateStr)).length;
  };

  const isNavDisabled = month === new Date().getMonth() && year === new Date().getFullYear();

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-semibold rounded-full mb-4">
            <CalendarIcon className="w-4 h-4" />
            {isSL ? 'Koledar razpoložljivosti' : 'Availability Calendar'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {isSL ? 'Poglejte razpoložljivost v realnem času' : 'See Real-Time Availability'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {isSL
              ? 'Izberite suite in si oglejte, kdaj so na voljo. Kliknite na začetni in končni datum za rezervacijo.'
              : 'Select a suite and see when it\'s available. Click start and end dates to book.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Suite Selector */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <button
              onClick={() => setSelectedSuite('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSuite === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isSL ? 'Vse suite' : 'All Suites'} ({isSL ? 'Katerikoli na voljo' : 'Any Available'})
            </button>
            {SUITES.map((suite) => (
              <button
                key={suite.id}
                onClick={() => setSelectedSuite(suite.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSuite === suite.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(suite.titleKey)}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-400" />
              {isSL ? 'Na voljo' : 'Available'}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-300 dark:bg-slate-600" />
              {isSL ? 'Zasedeno' : 'Booked'}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-indigo-500" />
              {isSL ? 'Izbrano' : 'Selected'}
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-slate-700">
              <button
                onClick={prevMonth}
                disabled={isNavDisabled}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {monthNames[month]} {year}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Next month"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-700">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-2 md:p-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-700">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: firstDay === 0 ? 0 : firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-white dark:bg-slate-800 p-2 md:p-3 min-h-[48px] md:min-h-[64px]" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const status = getDateStatus(dateStr);
                const isSelected = getSelectedDates.has(dateStr);
                const isCheckIn = dateStr === selectedCheckIn;
                const isCheckOut = dateStr === selectedCheckOut;
                const count = availableSuiteCount(dateStr);

                return (
                  <motion.button
                    key={day}
                    whileHover={status === 'available' ? { scale: 1.05 } : {}}
                    whileTap={status === 'available' ? { scale: 0.95 } : {}}
                    onClick={() => handleDateClick(day)}
                    disabled={status === 'past'}
                    className={`relative p-2 md:p-3 min-h-[48px] md:min-h-[64px] text-left transition-all ${
                      status === 'past'
                        ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                        : isSelected
                        ? 'bg-indigo-500 text-white font-bold'
                        : status === 'available'
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 cursor-pointer font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    } ${isCheckIn || isCheckOut ? 'ring-2 ring-indigo-600 ring-inset' : ''}`}
                  >
                    <span className="text-sm">{day}</span>
                    {status === 'available' && selectedSuite === 'all' && (
                      <span className="absolute bottom-1 right-1 text-[10px] font-medium opacity-70">
                        {count}
                      </span>
                    )}
                    {isCheckIn && (
                      <span className="absolute top-0.5 left-1 text-[9px] font-bold uppercase">
                        {isSL ? 'Prihod' : 'In'}
                      </span>
                    )}
                    {isCheckOut && (
                      <span className="absolute top-0.5 left-1 text-[9px] font-bold uppercase">
                        {isSL ? 'Odhod' : 'Out'}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selection Summary */}
          <AnimatePresence>
            {selectedCheckIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {new Date(selectedCheckIn).toLocaleDateString(isSL ? 'sl-SI' : 'en-US', { weekday: 'short', day: 'numeric', month: 'long' })}
                        {selectedCheckOut && (
                          <>
                            {' → '}
                            {new Date(selectedCheckOut).toLocaleDateString(isSL ? 'sl-SI' : 'en-US', { weekday: 'short', day: 'numeric', month: 'long' })}
                          </>
                        )}
                      </span>
                    </div>
                    {nightCount > 0 && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 ml-8">
                        {nightCount} {isSL ? 'nočitev' : 'night'}{nightCount !== 1 && !isSL ? 's' : ''}
                        {selectedSuite !== 'all' && (
                          <span className="ml-2">
                            · {t(SUITES.find(s => s.id === selectedSuite)?.titleKey || '')}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedCheckIn('');
                        setSelectedCheckOut('');
                        setShowCheckInPicker(true);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      aria-label="Clear selection"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                    <Link
                      to={`/reservation?checkIn=${selectedCheckIn}${selectedCheckOut ? `&checkOut=${selectedCheckOut}` : ''}${selectedSuite !== 'all' ? `&roomType=${selectedSuite}` : ''}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                    >
                      {isSL ? 'Rezerviraj' : 'Book Now'}
                      <CheckIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
