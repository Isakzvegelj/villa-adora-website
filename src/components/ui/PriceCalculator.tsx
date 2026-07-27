import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDaysIcon, SparklesIcon, XMarkIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface PriceCalculatorProps {
  suitePrice: number;
  suiteId: string;
  suiteName: string;
  suiteColor: string;
  t: (key: string) => string;
  language: string;
}

const SEASONAL_MULTIPLIERS: Record<string, number> = {
  '2025-01': 0.85, '2025-02': 0.85, '2025-03': 0.90, '2025-04': 1.0,
  '2025-05': 1.1, '2025-06': 1.15, '2025-07': 1.25, '2025-08': 1.25,
  '2025-09': 1.1, '2025-10': 1.0, '2025-11': 0.85, '2025-12': 0.90,
  '2026-01': 0.85, '2026-02': 0.85, '2026-03': 0.90, '2026-04': 1.0,
  '2026-05': 1.1, '2026-06': 1.15, '2026-07': 1.25, '2026-08': 1.25,
  '2026-09': 1.1, '2026-10': 1.0, '2026-11': 0.85, '2026-12': 0.90,
};

function getSeasonalMultiplier(dateStr: string): number {
  const month = dateStr.slice(0, 7);
  return SEASONAL_MULTIPLIERS[month] || 1.0;
}

function getSeasonLabel(dateStr: string, lang: string): string {
  const mult = getSeasonalMultiplier(dateStr);
  if (mult >= 1.2) return lang === 'sl' ? 'Visoka sezona' : 'Peak Season';
  if (mult >= 1.05) return lang === 'sl' ? 'Srednja sezona' : 'High Season';
  if (mult <= 0.85) return lang === 'sl' ? 'Nizka sezona' : 'Low Season';
  return lang === 'sl' ? 'Standardna sezona' : 'Standard Season';
}

function getSeasonColor(mult: number): string {
  if (mult >= 1.2) return 'text-red-500 bg-red-50 dark:bg-red-900/20';
  if (mult >= 1.05) return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
  if (mult <= 0.85) return 'text-green-500 bg-green-50 dark:bg-green-900/20';
  return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
}

export default function PriceCalculator({ suitePrice, suiteId, suiteName, suiteColor, t: _t, language }: PriceCalculatorProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Calculate average seasonal multiplier across the stay
  let avgMultiplier = 1.0;
  if (nights > 0 && checkIn) {
    let totalMult = 0;
    const start = new Date(checkIn);
    for (let i = 0; i < nights; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      totalMult += getSeasonalMultiplier(d.toISOString().split('T')[0]);
    }
    avgMultiplier = totalMult / nights;
  }

  const adjustedNightly = Math.round(suitePrice * avgMultiplier);
  const subtotal = nights * adjustedNightly;
  const cleaningFee = nights > 0 ? 50 : 0;
  const cityTax = nights * 3.13 * adults; // Slovenian tourist tax per person per night
  const total = subtotal + cleaningFee + cityTax;
  const perNightAvg = nights > 0 ? Math.round(total / nights) : adjustedNightly;

  const perks = language === 'sl'
    ? ['Bogat zajtrk vključen', 'Brezplačno parkiranje', 'Wellness dostop', 'WiFi', 'Brezplačna izposoja koles']
    : ['Gourmet breakfast included', 'Free parking', 'Wellness access', 'High-speed WiFi', 'Complimentary bike rental'];

  return (
    <div className="mt-6">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(true)}
        className={`w-full flex items-center justify-between px-5 py-3.5 bg-gradient-to-r ${suiteColor} text-white rounded-2xl shadow-lg cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <CalendarDaysIcon className="w-5 h-5" />
          <span className="font-semibold text-sm">
            {language === 'sl' ? 'Izračunaj ceno' : 'Calculate Price'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/80">{language === 'sl' ? 'od' : 'from'}</span>
          <span className="font-bold">€{Math.round(suitePrice * 0.85)}<span className="text-xs font-normal text-white/70">/{language === 'sl' ? 'noč' : 'night'}</span></span>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${suiteColor} text-white rounded-t-3xl relative`}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold">{suiteName}</h3>
                <p className="text-white/80 text-sm mt-1">
                  {language === 'sl' ? 'Ocenjeni za vaše datume' : 'Estimated for your dates'}
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                      {language === 'sl' ? 'Prihod' : 'Check-in'}
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (checkOut && e.target.value >= checkOut) {
                          const next = new Date(e.target.value);
                          next.setDate(next.getDate() + 1);
                          setCheckOut(next.toISOString().split('T')[0]);
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                      {language === 'sl' ? 'Odhod' : 'Check-out'}
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || tomorrow}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                      {language === 'sl' ? 'Odrasli' : 'Adults'}
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                    >
                      {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
                      {language === 'sl' ? 'Otroci' : 'Children'}
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                    >
                      {[0, 1, 2].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                {/* Season indicator */}
                {checkIn && (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${getSeasonColor(avgMultiplier)}`}>
                    <SparklesIcon className="w-4 h-4" />
                    <span>{getSeasonLabel(checkIn, language)}</span>
                    {avgMultiplier !== 1.0 && (
                      <span className="ml-auto text-xs">
                        {avgMultiplier > 1 ? '+' : ''}{Math.round((avgMultiplier - 1) * 100)}%
                      </span>
                    )}
                  </div>
                )}

                {/* Price Breakdown */}
                {nights > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-2"
                  >
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          €{adjustedNightly} × {nights} {language === 'sl' ? 'noči' : 'nights'}
                        </span>
                        <span className="text-slate-900 dark:text-white font-medium">€{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {language === 'sl' ? 'Pristojbina za čiščenje' : 'Cleaning fee'}
                        </span>
                        <span className="text-slate-900 dark:text-white font-medium">€{cleaningFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {language === 'sl' ? 'Turistična taksa' : 'City tax'} ({adults} × €3.13 × {nights})
                        </span>
                        <span className="text-slate-900 dark:text-white font-medium">€{cityTax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-2.5 flex justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {language === 'sl' ? 'Skupaj' : 'Total'}
                        </span>
                        <div className="text-right">
                          <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">€{Math.round(total).toLocaleString()}</span>
                          <span className="text-xs text-slate-500 block">~€{perNightAvg}/{language === 'sl' ? 'noč' : 'night'} {language === 'sl' ? 'povprečno' : 'avg'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Perks */}
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {language === 'sl' ? 'Vključeno' : 'Included'}
                      </p>
                      {perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <Link
                  to={`/reservation?roomType=${suiteId}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r ${suiteColor} text-white rounded-2xl font-semibold shadow-lg cursor-pointer`}
                  >
                    {language === 'sl' ? 'Rezerviraj ta suite' : 'Book This Suite'}
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.button>
                </Link>

                <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                  {language === 'sl'
                    ? 'Brezplačna odpoved do 48 ur pred prihodom'
                    : 'Free cancellation up to 48 hours before arrival'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
