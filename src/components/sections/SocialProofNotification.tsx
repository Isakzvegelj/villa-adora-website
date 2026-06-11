import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  name: string;
  location: string;
  locationSl: string;
  action: string;
  actionSl: string;
  suite: string;
  suiteSl: string;
  timeAgo: string;
  timeAgoSl: string;
  avatar: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    name: 'Sarah & James',
    location: 'London, UK',
    locationSl: 'London, VB',
    action: 'booked the',
    actionSl: 'rezervirala',
    suite: 'Penthouse Suite',
    suiteSl: 'Penthouse Suite',
    timeAgo: '2 minutes ago',
    timeAgoSl: 'pred 2 minutama',
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Marco R.',
    location: 'Milan, Italy',
    locationSl: 'Milan, Italija',
    action: 'just reserved the',
    actionSl: 'pravkar rezerviral',
    suite: 'Swan Suite',
    suiteSl: 'Swan Suite',
    timeAgo: '5 minutes ago',
    timeAgoSl: 'pred 5 minutami',
    avatar: 'MR',
  },
  {
    id: 3,
    name: 'Anna & Thomas',
    location: 'Vienna, Austria',
    locationSl: 'Dunaj, Avstrija',
    action: 'booked the',
    actionSl: 'rezervirala',
    suite: 'Prestige Suite',
    suiteSl: 'Prestige Suite',
    timeAgo: '12 minutes ago',
    timeAgoSl: 'pred 12 minutami',
    avatar: 'AT',
  },
  {
    id: 4,
    name: 'Yuki T.',
    location: 'Tokyo, Japan',
    locationSl: 'Tokio, Japonska',
    action: 'just booked the',
    actionSl: 'pravkar rezerviral',
    suite: 'Island Suite',
    suiteSl: 'Island Suite',
    timeAgo: '18 minutes ago',
    timeAgoSl: 'pred 18 minutami',
    avatar: 'YT',
  },
  {
    id: 5,
    name: 'Pierre D.',
    location: 'Paris, France',
    locationSl: 'Pariz, Francija',
    action: 'reserved the',
    actionSl: 'rezerviral',
    suite: 'Luxury Suite',
    suiteSl: 'Luxury Suite',
    timeAgo: '25 minutes ago',
    timeAgoSl: 'pred 25 minutami',
    avatar: 'PD',
  },
  {
    id: 6,
    name: 'Elena & Marko',
    location: 'Ljubljana, Slovenia',
    locationSl: 'Ljubljana, Slovenija',
    action: 'booked the',
    actionSl: 'rezervirala',
    suite: 'Princess Suite',
    suiteSl: 'Princess Suite',
    timeAgo: '32 minutes ago',
    timeAgoSl: 'pred 32 minutami',
    avatar: 'EM',
  },
  {
    id: 7,
    name: 'Hans & Greta',
    location: 'Munich, Germany',
    locationSl: 'München, Nemčija',
    action: 'just reserved the',
    actionSl: 'pravkar rezervirala',
    suite: 'Penthouse Suite',
    suiteSl: 'Penthouse Suite',
    timeAgo: '45 minutes ago',
    timeAgoSl: 'pred 45 minutami',
    avatar: 'HG',
  },
  {
    id: 8,
    name: 'Lisa M.',
    location: 'Zurich, Switzerland',
    locationSl: 'Zürich, Švica',
    action: 'booked the',
    actionSl: 'rezervirala',
    suite: 'Swan Suite',
    suiteSl: 'Swan Suite',
    timeAgo: '1 hour ago',
    timeAgoSl: 'pred 1 uro',
    avatar: 'LM',
  },
];

interface SocialProofNotificationProps {
  language: 'sl' | 'en' | 'de' | 'it' | 'fr';
}

const SocialProofNotification = ({ language }: SocialProofNotificationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const showNext = useCallback(() => {
    setIsVisible(true);
    const nextIndex = (currentIndex + 1) % NOTIFICATIONS.length;
    setCurrentIndex(nextIndex);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [currentIndex]);

  useEffect(() => {
    if (isDismissed) return;

    // Show first notification after 8 seconds
    const initialTimeout = setTimeout(() => {
      showNext();
    }, 8000);

    // Then cycle every 15-25 seconds
    const interval = setInterval(() => {
      showNext();
    }, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNext, isDismissed]);

  const notification = NOTIFICATIONS[currentIndex];
  const isSl = language === 'sl';

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 60, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 60, x: '-50%', scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3 relative overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              {notification.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-snug">
                <span className="font-semibold">{notification.name}</span>
                {' '}
                <span className="text-gray-500">
                  {isSl ? 'iz' : 'from'} {isSl ? notification.locationSl : notification.location}
                </span>
                {' — '}
                <span className="text-indigo-600 font-medium">
                  {isSl ? notification.actionSl : notification.action} {isSl ? notification.suiteSl : notification.suite}
                </span>
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">
                  {isSl ? notification.timeAgoSl : notification.timeAgo}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss"
            >
              <XMarkIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofNotification;
