import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon, CalendarIcon, UserIcon, HomeIcon, MapPinIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const SUITE_OPTIONS = [
  { value: 'any', labelEn: 'Any Suite', labelSl: 'Katera koli suite' },
  { value: 'princess', labelEn: 'Princess Suite', labelSl: 'Princess Suite' },
  { value: 'luxury', labelEn: 'Luxury Suite', labelSl: 'Luxury Suite' },
  { value: 'penthouse', labelEn: 'Penthouse Suite', labelSl: 'Penthouse Suite' },
  { value: 'swan', labelEn: 'Swan Suite', labelSl: 'Swan Suite' },
  { value: 'island', labelEn: 'Island Suite', labelSl: 'Island Suite' },
  { value: 'prestige', labelEn: 'Prestige Suite', labelSl: 'Prestige Suite' },
];

const HeroSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [children, setChildren] = useState(0);
  const [suiteType, setSuiteType] = useState('any');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleCheckAvailability = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('adults', guests.toString());
    params.set('children', children.toString());
    if (suiteType !== 'any') params.set('roomType', suiteType);
    navigate(`/reservation?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80"
          alt="Villa Adora - Luxury Boutique Hotel at Lake Bled, Slovenia"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm uppercase tracking-[0.3em] font-medium"
          >
            <MapPinIcon className="w-4 h-4" />
            {language === 'sl' ? 'Bled, Slovenija · Izgrađena 1878' : 'Bled, Slovenia · Est. 1878'}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-responsive-xl font-bold mb-6 text-shadow-lg leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-responsive-md mb-12 text-blue-50 text-shadow max-w-4xl mx-auto italic font-serif"
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link to="/reservation">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center text-lg px-12 py-5"
            >
              {t('hero.book')}
              <ArrowRightIcon className="ml-2 w-6 h-6" />
            </motion.button>
          </Link>
          
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center text-lg px-12 py-5 border-2 border-white/50"
            >
              <PlayIcon className="mr-2 w-6 h-6" />
              {t('hero.learn')}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Interactive Floating Booking Bar */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-30"
      >
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
            {/* Check In */}
            <div className="flex-1 bg-white/10 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors cursor-pointer">
              <label className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-0.5">
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
                {language === 'sl' ? 'Prihod' : 'Check In'}
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-white font-semibold text-sm outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>

            {/* Check Out */}
            <div className="flex-1 bg-white/10 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors cursor-pointer">
              <label className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-0.5">
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
                {language === 'sl' ? 'Odhod' : 'Check Out'}
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || tomorrow}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-white font-semibold text-sm outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div className="relative flex-1 bg-white/10 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors">
              <label className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-0.5">
                <UserIcon className="w-3.5 h-3.5 mr-1.5" />
                {language === 'sl' ? 'Gosti' : 'Guests'}
              </label>
              <button
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="w-full flex items-center justify-between bg-transparent text-white font-semibold text-sm outline-none"
              >
                <span>
                  {guests} {language === 'sl' ? (guests === 1 ? 'odrasli' : 'odraslih') : (guests === 1 ? 'Adult' : 'Adults')}
                  {children > 0 && `, ${children} ${language === 'sl' ? (children === 1 ? 'otrok' : 'otroc') : (children === 1 ? 'Child' : 'Children')}`}
                </span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showGuestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl z-50 p-4 space-y-3">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{language === 'sl' ? 'Odrasli' : 'Adults'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}
                        className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-sm font-bold"
                      >−</button>
                      <span className="text-white font-semibold w-4 text-center">{guests}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setGuests(Math.min(4, guests + 1)); }}
                        className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-sm font-bold"
                      >+</button>
                    </div>
                  </div>
                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{language === 'sl' ? 'Otroci (0-17)' : 'Children (0-17)'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setChildren(Math.max(0, children - 1)); }}
                        className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-sm font-bold"
                      >−</button>
                      <span className="text-white font-semibold w-4 text-center">{children}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setChildren(Math.min(3, children + 1)); }}
                        className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-sm font-bold"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowGuestDropdown(false); }}
                    className="w-full py-1.5 text-center text-indigo-400 text-xs font-semibold hover:text-indigo-300"
                  >
                    {language === 'sl' ? 'Končaj' : 'Done'}
                  </button>
                </div>
              )}
            </div>

            {/* Suite Type */}
            <div className="flex-1 bg-white/10 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors">
              <label className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-0.5">
                <HomeIcon className="w-3.5 h-3.5 mr-1.5" />
                {language === 'sl' ? 'Suite' : 'Suite Type'}
              </label>
              <select
                value={suiteType}
                onChange={(e) => setSuiteType(e.target.value)}
                className="w-full bg-transparent text-white font-semibold text-sm outline-none cursor-pointer appearance-none"
                style={{ colorScheme: 'dark' }}
              >
                {SUITE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                    {language === 'sl' ? opt.labelSl : opt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCheckAvailability}
              className="bg-white text-indigo-900 px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors uppercase tracking-wider text-sm whitespace-nowrap shadow-lg"
            >
              {language === 'sl' ? 'Preveri' : 'Check'}
            </button>
          </div>

          {/* Trust badges below */}
          <div className="flex items-center justify-center gap-6 mt-2 text-white/40 text-xs">
            <span>✓ {language === 'sl' ? 'Najboljša cena' : 'Best Price'}</span>
            <span>✓ {language === 'sl' ? 'Brezplačna odpoved' : 'Free Cancellation'}</span>
            <span>✓ {language === 'sl' ? 'Potrjeno takoj' : 'Instant Confirmation'}</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
