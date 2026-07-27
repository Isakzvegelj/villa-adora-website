import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalculatorIcon, CalendarDaysIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const SUITES = [
  { id: 'princess', price: 250 },
  { id: 'luxury', price: 270 },
  { id: 'penthouse', price: 300 },
  { id: 'swan', price: 370 },
  { id: 'island', price: 380 },
  { id: 'prestige', price: 420 },
];

const QuickPriceCalculator = () => {
  const { t, language } = useLanguage();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedSuite, setSelectedSuite] = useState('princess');

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const suitePrice = SUITES.find(s => s.id === selectedSuite)?.price || 250;
  const total = nights * suitePrice;

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-700 dark:text-indigo-400 text-sm font-semibold mb-4">
            <CalculatorIcon className="w-4 h-4" />
            {language === 'sl' ? 'Hitra ocena cene' : 'Quick Price Estimate'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Izračunajte ceno bivanja' : 'Calculate Your Stay'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {language === 'sl'
              ? 'Ocenite ceno vašega bivanja v nekaj sekundah. Brezplačna odpoved do 48 ur.'
              : 'Get an instant price estimate for your stay. Free cancellation up to 48 hours.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Check-in */}
            <div>
              <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-indigo-500" />
                {language === 'sl' ? 'Prihod' : 'Check-in'}
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-indigo-500" />
                {language === 'sl' ? 'Odhod' : 'Check-out'}
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Suite selector */}
          <div className="mb-6">
            <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              <SparklesIcon className="w-4 h-4 mr-1.5 text-indigo-500" />
              {language === 'sl' ? 'Izberite suite' : 'Choose Suite'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUITES.map((suite) => (
                <button
                  key={suite.id}
                  onClick={() => setSelectedSuite(suite.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedSuite === suite.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t(`suites.${suite.id}.title`)}
                  </div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
                    €{suite.price}/{language === 'sl' ? 'noč' : 'night'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Result */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {nights > 0
                    ? `${nights} ${language === 'sl' ? 'nočitev' : 'nights'} × €${suitePrice}`
                    : (language === 'sl' ? 'Izberite datume' : 'Select dates')}
                </div>
                <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                  {total > 0 ? `€${total.toLocaleString()}` : '—'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {language === 'sl' ? '* Približna cena. DDV vključen.' : '* Approximate price. VAT included.'}
                </div>
              </div>
              <Link to={`/reservation?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${selectedSuite}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
                >
                  {language === 'sl' ? 'Rezerviraj zdaj' : 'Book Now'}
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickPriceCalculator;
