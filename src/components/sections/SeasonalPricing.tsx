import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

interface Season {
  id: string;
  nameKey: string;
  months: string;
  priceMultiplier: number;
  color: string;
  bgColor: string;
  icon: string;
  highlight?: boolean;
}

const SEASONS: Season[] = [
  {
    id: 'winter',
    nameKey: 'season.winter',
    months: 'Dec – Feb',
    priceMultiplier: 0.85,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    icon: '❄️',
  },
  {
    id: 'spring',
    nameKey: 'season.spring',
    months: 'Mar – May',
    priceMultiplier: 1.0,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    icon: '🌸',
  },
  {
    id: 'summer',
    nameKey: 'season.summer',
    months: 'Jun – Aug',
    priceMultiplier: 1.25,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    icon: '☀️',
    highlight: true,
  },
  {
    id: 'autumn',
    nameKey: 'season.autumn',
    months: 'Sep – Nov',
    priceMultiplier: 0.95,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    icon: '🍂',
  },
];

interface SeasonalPricingProps {
  basePrice: number;
}

export default function SeasonalPricing({ basePrice }: SeasonalPricingProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeasonalPrice = (multiplier: number) => Math.round(basePrice * multiplier);
  const lowestPrice = getSeasonalPrice(0.85);
  const highestPrice = getSeasonalPrice(1.25);

  // Determine current season
  const month = new Date().getMonth();
  const currentSeasonIndex = month >= 11 || month <= 1 ? 0 : month >= 2 && month <= 4 ? 1 : month >= 5 && month <= 7 ? 2 : 3;
  const currentSeason = SEASONS[currentSeasonIndex];

  const seasonNames: Record<string, Record<string, string>> = {
    winter: { sl: 'Zima', en: 'Winter' },
    spring: { sl: 'Pomlad', en: 'Spring' },
    summer: { sl: 'Poletje', en: 'Summer' },
    autumn: { sl: 'Jesen', en: 'Autumn' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {language === 'sl' ? 'Sezonske cene' : 'Seasonal Pricing'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'sl'
                ? `Od €${lowestPrice} do €${highestPrice} na noč`
                : `From €${lowestPrice} to €${highestPrice} per night`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${currentSeason.bgColor} ${currentSeason.color}`}>
            {currentSeason.icon} {language === 'sl' ? 'Trenutno' : 'Now'}
          </span>
          <svg className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              {/* Current season highlight */}
              <div className={`${currentSeason.bgColor} rounded-xl p-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currentSeason.icon}</span>
                  <div>
                    <div className={`text-sm font-semibold ${currentSeason.color}`}>
                      {language === 'sl' ? 'Trenutna sezona' : 'Current Season'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {currentSeason.months}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${currentSeason.color}`}>
                    €{getSeasonalPrice(currentSeason.priceMultiplier)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'sl' ? 'na noč' : 'per night'}
                  </div>
                </div>
              </div>

              {/* All seasons */}
              <div className="space-y-2">
                {SEASONS.filter(s => s.id !== currentSeason.id).map((season) => (
                  <div
                    key={season.id}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{season.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {seasonNames[season.id][language]}
                        </div>
                        <div className="text-xs text-slate-400">{season.months}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        €{getSeasonalPrice(season.priceMultiplier)}
                      </span>
                      {season.priceMultiplier > 1 ? (
                        <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-amber-500" />
                      ) : season.priceMultiplier < 1 ? (
                        <ArrowTrendingDownIcon className="w-3.5 h-3.5 text-green-500" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Savings tip */}
              {currentSeason.priceMultiplier > 1 && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 flex items-start gap-2">
                  <SparklesIcon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-700 dark:text-green-300">
                    {language === 'sl'
                      ? `Prihranite do €${getSeasonalPrice(currentSeason.priceMultiplier) - lowestPrice}/noč, če rezervirate pozimi ali jeseni!`
                      : `Save up to €${getSeasonalPrice(currentSeason.priceMultiplier) - lowestPrice}/night by booking in winter or autumn!`}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
