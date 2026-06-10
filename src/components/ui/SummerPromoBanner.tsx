import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const SummerPromoBanner = () => {
  const { language } = useLanguage();
  const isSl = language === 'sl';
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white"
      >
        {/* Animated background shimmer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <SparklesIcon className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <p className="text-sm font-medium truncate">
                {isSl ? (
                  <>
                    <span className="hidden sm:inline">☀️ Poletje 2026: Rezervirajte zdaj in prejmite </span>
                    <span className="sm:hidden">☀️ Poletje 2026: </span>
                    <span className="font-bold">20% popust</span>
                    <span className="hidden sm:inline"> na bivanje 5+ noči!</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">☀️ Summer 2026: Book now and get </span>
                    <span className="sm:hidden">☀️ Summer 2026: </span>
                    <span className="font-bold">20% off</span>
                    <span className="hidden sm:inline"> stays of 5+ nights!</span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/offers"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold transition-all duration-200 border border-white/30"
              >
                {isSl ? 'Ogled ponudb' : 'View Offers'}
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsVisible(false)}
                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Dismiss promotion"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SummerPromoBanner;
