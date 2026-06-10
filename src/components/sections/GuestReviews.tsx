import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah & James Mitchell',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    rating: 5,
    date: '2025-09-15',
    source: 'booking.com',
    textEn: 'Absolutely magical stay! The Princess Suite had the most incredible view of Lake Bled. Waking up to the sunrise over the lake was unforgettable. The staff went above and beyond to make our anniversary special.',
    textSl: 'Popolnoma čudovito bivanje! Princess Suite je imel najbolj neverjeten pogled na Blejsko jezero. Budenje ob sončnem vzhodu nad jezero je bilo nepozabno. Osebje je storilo vse, da bi našo obletnico naredili posebno.',
    suite: 'Princess Suite',
    stayType: 'anniversary',
  },
  {
    id: 2,
    name: 'Marco Rossi',
    country: 'Italy',
    countryFlag: '🇮🇹',
    rating: 5,
    date: '2025-08-22',
    source: 'google',
    textEn: 'Villa Adora exceeded all expectations. The Penthouse Suite is a masterpiece of design, and the breakfast on the terrace was divine. We will definitely return next summer!',
    textSl: 'Villa Adora je presegla vsa pričakovanja. Penthouse Suite je mojstrovina oblikovanja, zajtrk na terasi pa božansko. Zagotovo se bomo vrnili naslednje poletje!',
    suite: 'Penthouse Suite',
    stayType: 'couple',
  },
  {
    id: 3,
    name: 'Anna & Thomas Weber',
    country: 'Germany',
    countryFlag: '🇩🇪',
    rating: 5,
    date: '2025-10-03',
    source: 'tripadvisor',
    textEn: 'A perfect blend of historic charm and modern luxury. The wellness center was a highlight, and the digital concierge Luka was incredibly helpful. Best hotel experience in Slovenia!',
    textSl: 'Popolna mešanica zgodovinskega šarma in modernega luksuza. Wellness center je bil vrhunec, digitalni concierge Luka pa je bil izjemno v pomoč. Najboljša hotelska izkušnja v Sloveniji!',
    suite: 'Swan Suite',
    stayType: 'couple',
  },
  {
    id: 4,
    name: 'Yuki Tanaka',
    country: 'Japan',
    countryFlag: '🇯🇵',
    rating: 5,
    date: '2025-07-18',
    source: 'booking.com',
    textEn: 'We traveled all the way from Tokyo and Villa Adora was worth every kilometer. The attention to detail is remarkable. The cream cake at breakfast was the best we ever had!',
    textSl: 'Potovali smo vse do Tokia in Villa Adora je bila vredna vsakega kilometra. Pozornost do detajlov je izjemna. Kremna rezina pri zajtrku je bila najboljša, kar smo jo kdaj imeli!',
    suite: 'Island Suite',
    stayType: 'couple',
  },
  {
    id: 5,
    name: 'Pierre Dubois',
    country: 'France',
    countryFlag: '🇫🇷',
    rating: 5,
    date: '2025-06-30',
    source: 'google',
    textEn: 'An extraordinary boutique hotel. The Prestige Suite on the ground floor with lake views from every window was pure bliss. The restaurant 1878 serves exceptional Slovenian cuisine.',
    textSl: 'Izjemen butični hotel. Prestige Suite v pritličju s pogledom na jezero iz vsakega okna je bil čisti raj. Restavracija 1878 služi izjemno slovensko kuhinjo.',
    suite: 'Prestige Suite',
    stayType: 'gourmet',
  },
  {
    id: 6,
    name: 'Elena & Marko Kovač',
    country: 'Slovenia',
    countryFlag: '🇸🇮',
    rating: 5,
    date: '2025-11-10',
    source: 'direct',
    textEn: 'As locals, we wanted a special weekend getaway and Villa Adora delivered beyond expectations. The Luxury Suite was stunning, and the location simply cannot be beaten.',
    textSl: 'Kot domačina smo želeli poseben vikend oddih in Villa Adora je presegla pričakovanja. Luxury Suite je bila osupljiva, lokacija pa preprosto ni mogoče premagati.',
    suite: 'Luxury Suite',
    stayType: 'weekend',
  },
  {
    id: 7,
    name: 'Lisa & David Chen',
    country: 'Australia',
    countryFlag: '🇦🇺',
    rating: 5,
    date: '2025-12-01',
    source: 'tripadvisor',
    textEn: 'We stayed over Christmas and it was magical. The winter garden with mulled wine, the wellness area with sauna — everything was perfect. Already booked for summer!',
    textSl: 'Bili smo za božič in je bilo čarobno. Zimski vrt z vinom, wellness s savno — vse je bilo popolno. Že rezervirali za poletje!',
    suite: 'Deluxe Suite',
    stayType: 'christmas',
  },
  {
    id: 8,
    name: 'Petra Novak',
    country: 'Austria',
    countryFlag: '🇦🇹',
    rating: 4,
    date: '2025-09-28',
    source: 'google',
    textEn: 'Beautiful hotel with an unbeatable location. The Superior Suite was perfect for our family of four. Kids loved the breakfast buffet and the short walk to the lake.',
    textSl: 'Čudovit hotel z nepremakljivo lokacijo. Superior Suite je bila popolna za našo družino štirih. Otroci so obožali zajtrk in kratek sprehod do jezera.',
    suite: 'Superior Suite',
    stayType: 'family',
  },
  {
    id: 9,
    name: 'Michael & Julia Fischer',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    rating: 5,
    date: '2025-08-15',
    source: 'booking.com',
    textEn: 'From check-in to check-out, everything was flawless. The concierge bot Luka helped us plan amazing day trips. The Penthouse Suite views are even better than the photos!',
    textSl: 'Od prihoda do odhoda je bilo vse brezhibno. Concierge bot Luka nam je pomagal načrtovati izjemne izlete. Pogledi iz Penthouse Suite so še boljši kot na fotografijah!',
    suite: 'Penthouse Suite',
    stayType: 'summer',
  },
];

const SOURCE_BADGES: Record<string, { label: string; color: string }> = {
  booking: { label: 'Booking.com', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  google: { label: 'Google', color: 'bg-green-50 text-green-700 border-green-200' },
  tripadvisor: { label: 'TripAdvisor', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  direct: { label: 'Direct Guest', color: 'bg-purple-50 text-purple-700 border-purple-200' },
};

const STAY_TYPE_LABELS: Record<string, { en: string; sl: string; emoji: string }> = {
  anniversary: { en: 'Anniversary', sl: 'Obletnica', emoji: '💍' },
  couple: { en: 'Couple', sl: 'Par', emoji: '💑' },
  gourmet: { en: 'Gourmet Stay', sl: 'Kulinarično', emoji: '🍷' },
  weekend: { en: 'Weekend', sl: 'Vikend', emoji: '🌅' },
  christmas: { en: 'Christmas', sl: 'Božič', emoji: '🎄' },
  family: { en: 'Family', sl: 'Družina', emoji: '👨‍👩‍👧‍👦' },
  summer: { en: 'Summer Holiday', sl: 'Poletje', emoji: '☀️' },
};

const GuestReviews = () => {
  const { language } = useLanguage();
  const isSl = language === 'sl';
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(REVIEWS.length / reviewsPerPage);
  const visibleReviews = REVIEWS.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            ✓ {isSl ? 'Preverjene ocene' : 'Verified Reviews'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {isSl ? 'Kaj pravijo naši gostje' : 'What Our Guests Say'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isSl
              ? 'Preberite izkušnje gostov iz vsega sveta, ki so prečkali naša vrata. Vse ocene so preverjene.'
              : 'Read experiences from guests around the world who have walked through our doors. All reviews are verified.'}
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {visibleReviews.map((review) => {
              const sourceBadge = SOURCE_BADGES[review.source];
              const stayLabel = STAY_TYPE_LABELS[review.stayType];
              return (
                <motion.div
                  key={review.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Source + Stay Type badges */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${sourceBadge.color}`}>
                      {sourceBadge.label}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {stayLabel.emoji} {isSl ? stayLabel.sl : stayLabel.en}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-600'}`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm flex-1 italic">
                    &ldquo;{isSl ? review.textSl : review.textEn}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                          {review.name}
                        </p>
                        <span className="text-base" title={review.country}>{review.countryFlag}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {review.suite} · {new Date(review.date).toLocaleDateString(isSl ? 'sl-SI' : 'en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous reviews"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentPage
                      ? 'bg-indigo-600 w-8'
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next reviews"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 md:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">4.9</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSl ? 'Povprečna ocena' : 'Average Rating'}
              </p>
              <div className="flex justify-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">312+</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSl ? 'Gostinskih mnenj' : 'Guest Reviews'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isSl ? 'na 3 platformah' : 'across 3 platforms'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">94%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSl ? 'Priporočajo' : 'Would Recommend'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isSl ? 'prijateljem' : 'to friends'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">68%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSl ? 'Gostov se vrača' : 'Return Guests'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isSl ? 'vsaj enkrat' : 'at least once'}
              </p>
            </div>
          </div>

          {/* Platform logos / names */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-indigo-100 dark:border-indigo-900/50">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {isSl ? 'Prisotni na:' : 'Featured on:'}
            </span>
            {['Booking.com', 'Google', 'TripAdvisor'].map(platform => (
              <span key={platform} className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {platform}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuestReviews;
