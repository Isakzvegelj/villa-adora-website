import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  CreditCardIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

const TRUST_BADGES = [
  {
    icon: ShieldCheckIcon,
    labelKey: 'trust.secureBooking',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: CreditCardIcon,
    labelKey: 'trust.noPrepayment',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: LockClosedIcon,
    labelKey: 'trust.ssl',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: CheckBadgeIcon,
    labelKey: 'trust.bestPrice',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
];

export default function TrustBadges() {
  const { t, language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4"
    >
      <div className="grid grid-cols-2 gap-2.5">
        {TRUST_BADGES.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.labelKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className={`${badge.bg} rounded-xl p-3 flex items-center gap-2.5`}
            >
              <Icon className={`w-5 h-5 ${badge.color} flex-shrink-0`} />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-tight">
                {t(badge.labelKey)}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Direct contact */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <PhoneIcon className="w-3.5 h-3.5" />
          <span>
            {language === 'sl' ? 'Imate vprašanja? Pokličite nas:' : 'Have questions? Call us:'}
          </span>
          <a href="tel:+38651603858" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            +386 51 603 858
          </a>
        </div>
      </div>
    </motion.div>
  );
}
