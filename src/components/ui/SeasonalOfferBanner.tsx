import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const SEASONAL_OFFERS = [
  {
    id: 'spring',
    gradient: 'from-emerald-500 to-teal-600',
    icon: '🌸',
  },
  {
    id: 'summer',
    gradient: 'from-amber-500 to-orange-600',
    icon: '☀️',
  },
  {
    id: 'autumn',
    gradient: 'from-orange-500 to-red-600',
    icon: '🍂',
  },
  {
    id: 'winter',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '❄️',
  },
];

const SeasonalOfferBanner = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    // Check if user has dismissed the banner recently
    const dismissed = localStorage.getItem('villa-adora-offer-dismissed');
    if (!dismissed || Date.now() - parseInt(dismissed) > 86400000) {
      // Show after 3 seconds
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % SEASONAL_OFFERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('villa-adora-offer-dismissed', Date.now().toString());
  };

  const offer = SEASONAL_OFFERS[currentOffer];
  const titleKey = `offers.${offer.id}.title` as const;
  const descKey = `offers.${offer.id}.desc` as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-40 max-w-sm"
        >
          <div className={`relative bg-gradient-to-r ${offer.gradient} rounded-2xl shadow-2xl overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative p-5">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-3">
                <span className="text-2xl">{offer.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <SparklesIcon className="w-3.5 h-3.5 text-white/80" />
                    <span className="text-xs text-white/80 uppercase tracking-wider font-medium">
                      {language === 'sl' ? 'Ponudba' : 'Limited Offer'}
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={offer.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-white font-bold text-sm mb-0.5">{t(titleKey)}</h4>
                      <p className="text-white/80 text-xs">{t(descKey)}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* CTA */}
              <Link to="/reservation" onClick={handleDismiss}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  {language === 'sl' ? 'Rezerviraj zdaj' : 'Book Now'}
                  <ArrowRightIcon className="w-3 h-3" />
                </motion.button>
              </Link>

              {/* Progress dots */}
              <div className="flex justify-center gap-1 mt-3">
                {SEASONAL_OFFERS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentOffer ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SeasonalOfferBanner;
