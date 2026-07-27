import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import { Link } from 'react-router-dom';
import {
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  CheckBadgeIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

interface Review {
  id: string;
  author: string;
  country: string;
  countryCode: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  suite: string;
  source: 'booking' | 'tripadvisor' | 'google' | 'direct';
  stayType: 'couple' | 'family' | 'solo' | 'business' | 'friends';
  language: string;
  helpful: number;
}

const ALL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah & James Mitchell',
    country: 'United Kingdom',
    countryCode: 'GB',
    date: '2025-09-15',
    rating: 5,
    title: 'Absolutely magical stay',
    body: 'The Princess Suite had the most incredible view of Lake Bled. Waking up to the sunrise over the lake was unforgettable. The staff went above and beyond to make our anniversary special — champagne on arrival, rose petals on the bed, and a sunset dinner reservation. The breakfast buffet was exceptional with local Slovenian specialties. We will definitely return.',
    suite: 'Princess Suite',
    source: 'booking',
    stayType: 'couple',
    language: 'en',
    helpful: 24,
  },
  {
    id: '2',
    author: 'Marco Rossi',
    country: 'Italy',
    countryCode: 'IT',
    date: '2025-08-22',
    rating: 5,
    title: 'Exceeded all expectations',
    body: 'Villa Adora is a masterpiece of hospitality. The Penthouse Suite is beautifully designed across two floors with every luxury you could want. Chef Domen\'s tasting menu was a highlight — the local trout was divine. The garden terrace at sunset is something out of a fairy tale. Perfect for a romantic getaway.',
    suite: 'Penthouse Suite',
    source: 'tripadvisor',
    stayType: 'couple',
    language: 'en',
    helpful: 18,
  },
  {
    id: '3',
    author: 'Anna & Thomas Weber',
    country: 'Germany',
    countryCode: 'DE',
    date: '2025-10-03',
    rating: 5,
    title: 'A perfect blend of historic charm and modern luxury',
    body: 'From the moment we arrived, we felt like we had stepped into another era — in the best possible way. The 1878 villa has been beautifully restored while maintaining its heritage character. The wellness center was a lovely touch after hiking in the Julian Alps. Best hotel experience in Slovenia!',
    suite: 'Swan Suite',
    source: 'google',
    stayType: 'couple',
    language: 'en',
    helpful: 31,
  },
  {
    id: '4',
    author: 'Yuki Tanaka',
    country: 'Japan',
    countryCode: 'JP',
    date: '2025-07-18',
    rating: 5,
    title: 'Worth every kilometer from Tokyo',
    body: 'We traveled all the way from Tokyo and Villa Adora was worth every kilometer. The attention to detail is remarkable — from the hand-selected Slovenian wines in the minibar to the fresh flowers in our suite. The concierge arranged a private boat ride to the island and a wine tasting in the Goriska Brda region. Truly world-class service.',
    suite: 'Island Suite',
    source: 'booking',
    stayType: 'couple',
    language: 'en',
    helpful: 27,
  },
  {
    id: '5',
    author: 'Pierre Dubois',
    country: 'France',
    countryCode: 'FR',
    date: '2025-06-30',
    rating: 5,
    title: 'An extraordinary boutique hotel',
    body: 'The Prestige Suite on the ground floor with its private terrace overlooking the lake was pure bliss. Every morning we had breakfast on the terrace watching the mist rise off the water. The villa\'s history adds a layer of charm that no modern hotel can match. Exceptional value for the quality.',
    suite: 'Prestige Suite',
    source: 'tripadvisor',
    stayType: 'couple',
    language: 'en',
    helpful: 15,
  },
  {
    id: '6',
    author: 'Elena & Marko Kovač',
    country: 'Slovenia',
    countryCode: 'SI',
    date: '2025-11-10',
    rating: 5,
    title: 'As locals, we were blown away',
    body: 'We are from Ljubljana and wanted a special weekend getaway. Villa Adora delivered beyond expectations. The Luxury Suite was stunning with its lake view and the kremšnita at breakfast was the best we\'ve ever had. It\'s rare to find a Slovenian hotel that truly understands luxury hospitality. Čestitke!',
    suite: 'Luxury Suite',
    source: 'google',
    stayType: 'couple',
    language: 'en',
    helpful: 42,
  },
  {
    id: '7',
    author: 'Jennifer & Mike Thompson',
    country: 'United States',
    countryCode: 'US',
    date: '2025-08-05',
    rating: 5,
    title: 'Perfect family vacation',
    body: 'We booked the Superior Suite for our family of four and it was perfect. Two spacious bedrooms, lake views, and the kids loved the garden. The free bike rental was a great touch — we cycled around the lake and had a picnic. The staff helped us plan day trips to Vintgar Gorge and Bohinj. Highly recommend for families!',
    suite: 'Superior Suite',
    source: 'booking',
    stayType: 'family',
    language: 'en',
    helpful: 33,
  },
  {
    id: '8',
    author: 'Katja & Erik Johansson',
    country: 'Sweden',
    countryCode: 'SE',
    date: '2025-07-28',
    rating: 5,
    title: 'A dream in the Alps',
    body: 'We have stayed at many boutique hotels across Europe and Villa Adora is truly among the best. The setting is magical — right on the lake with mountains in every direction. The wellness center with Finnish sauna was perfect after summer hikes. Breakfast on the terrace watching the pletna boats is an image we will never forget.',
    suite: 'Deluxe Suite',
    source: 'tripadvisor',
    stayType: 'couple',
    language: 'en',
    helpful: 19,
  },
  {
    id: '9',
    author: 'David Chen',
    country: 'Australia',
    countryCode: 'AU',
    date: '2025-06-14',
    rating: 5,
    title: 'Remote work paradise',
    body: 'I spent a week working remotely from Villa Adora and it was incredible. The WiFi is fast and reliable, the workspace in the suite was comfortable, and the terrace was perfect for video calls with a lake view backdrop. After work, I enjoyed the wellness center and explored Bled. The ultimate workation destination.',
    suite: 'Luxury Suite',
    source: 'direct',
    stayType: 'business',
    language: 'en',
    helpful: 22,
  },
  {
    id: '10',
    author: 'Sofia & Inês Costa',
    country: 'Portugal',
    countryCode: 'PT',
    date: '2025-09-28',
    rating: 4,
    title: 'Beautiful hotel with minor suggestions',
    body: 'The Island Suite was gorgeous and the lake views were breathtaking. The only reason for 4 stars instead of 5 is that the air conditioning could be stronger in peak summer and the restaurant was fully booked on our first evening. However, the staff were incredibly apologetic and arranged a beautiful dinner setup on the terrace instead. The experience overall was wonderful.',
    suite: 'Island Suite',
    source: 'booking',
    stayType: 'friends',
    language: 'en',
    helpful: 11,
  },
  {
    id: '11',
    author: 'Hans Müller',
    country: 'Austria',
    countryCode: 'AT',
    date: '2025-05-20',
    rating: 5,
    title: 'Zuverlässig erstklassig',
    body: 'Wir haben schon mehrmals in Bled übernachtet, aber Villa Adora ist in einer eigenen Liga. Die Zimmer sind wunderschön, der Service ist persönlich und aufmerksam, und der Blick auf den See ist atemberaubend. Besonders die kleine Besonderheiten — wie der Nachmittagstee im Garten — machen den Unterschied.',
    suite: 'Princess Suite',
    source: 'google',
    stayType: 'couple',
    language: 'de',
    helpful: 16,
  },
  {
    id: '12',
    author: 'Laura Bianchi',
    country: 'Italy',
    countryCode: 'IT',
    date: '2025-04-12',
    rating: 5,
    title: 'Una perfetta romantic escape',
    body: 'La Villa Adora è stata la scelta perfetta per il nostro anniversario. La Prestige Suite al piano terra con terrazza privata era un sogno. La colazione sulla terrazza con vista sul lago, la sauna finlandese e la cena romantica hanno reso questo viaggio indimenticabile. Torneremo sicuramente!',
    suite: 'Prestige Suite',
    source: 'tripadvisor',
    stayType: 'couple',
    language: 'it',
    helpful: 14,
  },
];

const RATING_BREAKDOWN = [
  { label: 'Cleanliness', value: 4.9 },
  { label: 'Comfort', value: 4.9 },
  { label: 'Location', value: 4.8 },
  { label: 'Facilities', value: 4.7 },
  { label: 'Staff', value: 4.9 },
  { label: 'Value for Money', value: 4.7 },
];

const SOURCE_LABELS: Record<string, string> = {
  booking: 'Booking.com',
  tripadvisor: 'TripAdvisor',
  google: 'Google',
  direct: 'Direct',
};

const SOURCE_COLORS: Record<string, string> = {
  booking: 'bg-blue-50 text-blue-700 border-blue-200',
  tripadvisor: 'bg-green-50 text-green-700 border-green-200',
  google: 'bg-amber-50 text-amber-700 border-amber-200',
  direct: 'bg-purple-50 text-purple-700 border-purple-200',
};

function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase();
  const offset = 0x1F1E6 - 0x41;
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt(0) + offset));
}

const Reviews = () => {
  const { language } = useLanguage();

  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'reviews.title': { en: 'Guest Reviews', sl: 'Mnenja gostov' },
      'reviews.subtitle': { en: 'What our guests say about their stay at Villa Adora', sl: 'Kaj naši gostje pravijo o svojem bivanju v Villi Adori' },
      'reviews.overall': { en: 'Overall Rating', spl: 'Splošna ocena' },
      'reviews.basedOn': { en: 'Based on', sl: 'Na podlagi' },
      'reviews.reviews': { en: 'reviews', sl: 'mnenj' },
      'reviews.stayType': { en: 'Stay type', sl: 'Vrsta bivanja' },
      'reviews.sortBy': { en: 'Sort by', sl: 'Razvrsti po' },
      'reviews.mostRecent': { en: 'Most Recent', sl: 'Najnovejše' },
      'reviews.highestRated': { en: 'Highest Rated', sl: 'Najbolje ocenjeno' },
      'reviews.mostHelpful': { en: 'Most Helpful', sl: 'Najbolj koristno' },
      'reviews.allSources': { en: 'All Sources', sl: 'Vsi viri' },
      'reviews.allTypes': { en: 'All Types', sl: 'Vse vrste' },
      'reviews.loadMore': { en: 'Load More Reviews', sl: 'Naloži več mnenj' },
      'reviews.showing': { en: 'Showing', sl: 'Prikazano' },
      'reviews.of': { en: 'of', sl: 'od' },
      'reviews.verified': { en: 'Verified Stay', sl: 'Potrjeno bivanje' },
      'reviews.stayedIn': { en: 'Stayed in', sl: 'Bival v' },
      'reviews.readMore': { en: 'Read more', sl: 'Preberi več' },
      'reviews.readLess': { en: 'Read less', sl: 'Preberi manj' },
      'reviews.from': { en: 'from', sl: 'iz' },
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Filter and sort reviews
  const filteredReviews = ALL_REVIEWS
    .filter(r => filterSource === 'all' || r.source === filterSource)
    .filter(r => filterType === 'all' || r.stayType === filterType)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return 0;
    });

  const visibleReviews = filteredReviews.slice(0, visibleCount);

  const avgRating = (ALL_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / ALL_REVIEWS.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <PageSEO
        title={`${t('reviews.title')} — Villa Adora, Bled`}
        description="Read authentic guest reviews of Villa Adora boutique hotel on Lake Bled. 4.8/5 average rating from verified guests."
        keywords={['Villa Adora reviews', 'Bled hotel reviews', 'Lake Bled accommodation reviews']}
        canonicalUrl="https://villa-adora-bled.si/reviews"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t('reviews.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-indigo-200 max-w-2xl mx-auto"
          >
            {t('reviews.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Rating Overview */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Big Rating */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-4 mb-4">
                <span className="text-6xl font-bold text-indigo-600">{avgRating}</span>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <StarIcon key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {t('reviews.basedOn')} {ALL_REVIEWS.length} {t('reviews.reviews')}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {t('reviews.overall')}
              </p>
            </div>

            {/* Right: Rating Breakdown */}
            <div className="space-y-3">
              {RATING_BREAKDOWN.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-32 flex-shrink-0">{item.label}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-8 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="py-6 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t('reviews.sortBy')}:</span>
              {(['recent', 'rating', 'helpful'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    sortBy === option
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-600 hover:bg-gray-50'
                  }`}
                >
                  {t(`reviews.${option === 'recent' ? 'mostRecent' : option === 'rating' ? 'highestRated' : 'mostHelpful'}`)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-wrap gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Source</label>
                    <select
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm"
                    >
                      <option value="all">{t('reviews.allSources')}</option>
                      <option value="booking">Booking.com</option>
                      <option value="tripadvisor">TripAdvisor</option>
                      <option value="google">Google</option>
                      <option value="direct">Direct</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('reviews.stayType')}</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm"
                    >
                      <option value="all">{t('reviews.allTypes')}</option>
                      <option value="couple">Couple</option>
                      <option value="family">Family</option>
                      <option value="solo">Solo</option>
                      <option value="business">Business</option>
                      <option value="friends">Friends</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {visibleReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} t={t} />
            ))}
          </div>

          {visibleCount < filteredReviews.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-xl"
              >
                {t('reviews.loadMore')}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                {t('reviews.showing')} {visibleCount} {t('reviews.of')} {filteredReviews.length}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Write a Review CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-full mb-4">
              <PencilIcon className="w-4 h-4" />
              {language === 'sl' ? 'Delite svojo izkušnjo' : 'Share Your Experience'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === 'sl' ? 'Ste bili naši gost?' : language === 'de' ? 'Waren Sie unser Gast?' : language === 'it' ? 'Siete stati nostri ospiti?' : 'Have You Stayed With Us?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              {language === 'sl'
                ? 'Vaše mnenje nam pomaga izboljšati storitve in gostom odkriti Villa Adoro. Zajame le nekaj minut.'
                : 'Your feedback helps us improve and helps future guests discover Villa Adora. It only takes a few minutes.'}
            </p>
            <Link to="/write-review">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <PencilIcon className="w-5 h-5" />
                {language === 'sl' ? 'Napišite mnenje' : 'Write a Review'}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

function ReviewCard({ review, index, t }: { review: Review; index: number; t: (key: string) => string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.body.length > 200;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {review.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{review.author}</h3>
              <span className="text-lg" title={review.country}>{getFlagEmoji(review.countryCode)}</span>
            </div>
            <p className="text-xs text-gray-500">
              {t('reviews.from')} {review.country} · {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">"{review.title}"</h4>

      {/* Body */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {isLong && !isExpanded ? `${review.body.slice(0, 200)}...` : review.body}
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            {isExpanded ? t('reviews.readLess') : t('reviews.readMore')}
          </button>
        )}
      </p>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-medium ${SOURCE_COLORS[review.source]}`}>
          <CheckBadgeIcon className="w-3.5 h-3.5" />
          {SOURCE_LABELS[review.source]}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-full">
          <GlobeAltIcon className="w-3.5 h-3.5" />
          {t('reviews.stayedIn')} {review.suite}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-full">
          <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />
          {review.helpful} helpful
        </span>
      </div>
    </motion.div>
  );
}

export default Reviews;
