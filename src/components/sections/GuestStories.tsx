import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

interface GuestStory {
  id: string;
  name: string;
  location: string;
  avatar: string;
  suite: string;
  rating: number;
  date: string;
  title: string;
  story: string;
  highlight: string;
  photos: string[];
  stayType: string;
}

const guestStories: GuestStory[] = [
  {
    id: '1',
    name: 'Sarah & James Mitchell',
    location: 'London, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    suite: 'Princess Suite',
    rating: 5,
    date: 'September 2025',
    title: 'A Fairytale Anniversary',
    story: 'From the moment we arrived, we knew this would be a special stay. The Princess Suite exceeded every expectation — the tower view of Lake Bled at sunrise brought tears to our eyes. The staff arranged a private boat trip to the island for our anniversary dinner, and it was pure magic. We\'ve stayed at luxury hotels across Europe, but Villa Adora has something truly unique: soul.',
    highlight: 'The tower view of Lake Bled at sunrise brought tears to our eyes',
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop&q=80',
    ],
    stayType: 'Anniversary',
  },
  {
    id: '2',
    name: 'Marco & Giulia Rossi',
    location: 'Milan, Italy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    suite: 'Penthouse Suite',
    rating: 5,
    date: 'August 2025',
    title: 'La Dolce Vita at Lake Bled',
    story: 'We wanted a romantic escape from Milan and found paradise. The Penthouse Suite\'s two floors gave us space to breathe, and the views from every window were postcard-perfect. Breakfast on the terrace overlooking the lake became our daily ritual. The concierge recommended a hidden vineyard tour that was the highlight of our trip. Villa Adora isn\'t just a hotel — it\'s an experience.',
    highlight: 'Breakfast on the terrace overlooking the lake became our daily ritual',
    photos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80',
    ],
    stayType: 'Romantic Getaway',
  },
  {
    id: '3',
    name: 'Anna & Thomas Weber',
    location: 'Munich, Germany',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
    suite: 'Swan Suite',
    rating: 5,
    date: 'October 2025',
    title: 'Wellness Paradise in the Alps',
    story: 'As a couple who values wellness, Villa Adora was a dream. The Finnish sauna after a day of hiking in the Julian Alps was heavenly. Our suite was immaculate, with thoughtful touches like local chocolates and a handwritten welcome note. The staff remembered our names from day one. We\'re already planning our return for winter.',
    highlight: 'The Finnish sauna after a day of hiking in the Julian Alps was heavenly',
    photos: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop&q=80',
    ],
    stayType: 'Wellness Retreat',
  },
  {
    id: '4',
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
    suite: 'Island Suite',
    rating: 5,
    date: 'July 2025',
    title: 'A Japanese Traveler\'s Dream',
    story: 'I traveled 9,000 km from Tokyo and Villa Adora was worth every kilometer. The attention to detail rivals the best ryokans in Japan. Waking up to Lake Bled from the Island Suite felt like living inside a painting. The staff helped me arrange a traditional pletna boat ride and recommended the most incredible local restaurant. This is what hospitality should be.',
    highlight: 'Waking up to Lake Bled from the Island Suite felt like living inside a painting',
    photos: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&q=80',
    ],
    stayType: 'Cultural Experience',
  },
  {
    id: '5',
    name: 'Pierre & Claire Dubois',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    suite: 'Prestige Suite',
    rating: 5,
    date: 'June 2025',
    title: 'Art, Wine & Alpine Beauty',
    story: 'We came for the beauty of Bled and stayed for the warmth of Villa Adora. The Prestige Suite\'s artful decor and ground-floor terrace were perfect for our family. Our children loved the garden and the complimentary bikes. The welcome glass of Slovenian wine was a lovely touch. We felt like honored guests, not just customers. Magnifique!',
    highlight: 'We felt like honored guests, not just customers',
    photos: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80',
    ],
    stayType: 'Family Holiday',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      star <= rating ? (
        <StarIcon key={star} className="w-4 h-4 text-amber-400" />
      ) : (
        <StarOutline key={star} className="w-4 h-4 text-amber-400" />
      )
    ))}
  </div>
);

const GuestStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % guestStories.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % guestStories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + guestStories.length) % guestStories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const story = guestStories[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            Guest Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Moments That Stay Forever
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real stories from real guests. Discover why Villa Adora creates memories that last a lifetime.
          </p>
        </motion.div>

        {/* Main Story Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative min-h-[480px] md:min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={story.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    {/* Photo Side */}
                    <div className="lg:col-span-2 relative h-64 lg:h-auto">
                      <img
                        src={story.photos[0]}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-l" />
                      {/* Guest Avatar Overlay */}
                      <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                        <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full pr-4 py-1.5 shadow-lg">
                          <img
                            src={story.avatar}
                            alt={story.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{story.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <MapPinIcon className="w-3 h-3" />
                              {story.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Stay Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full shadow-lg">
                          {story.stayType}
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-4">
                        <StarRating rating={story.rating} />
                        <span className="text-sm text-slate-400">{story.date}</span>
                      </div>

                      <div className="mb-2">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          {story.suite}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        "{story.title}"
                      </h3>

                      {/* Highlight Quote */}
                      <div className="relative mb-4 pl-4 border-l-4 border-amber-400">
                        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
                          "{story.highlight}"
                        </p>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                        {story.story}
                      </p>

                      {/* Photo Thumbnails */}
                      <div className="flex gap-2">
                        {story.photos.map((photo, idx) => (
                          <div key={idx} className="w-16 h-12 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-600 hover:border-amber-400 transition-colors cursor-pointer">
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-16 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                          +3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {guestStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-500'
                      : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to story ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm"
                aria-label="Previous story"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm"
                aria-label="Next story"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini Story Cards Row */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {guestStories.map((s, idx) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => goTo(idx)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 shadow-lg'
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{s.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.suite}</p>
                </div>
              </div>
              <StarRating rating={s.rating} />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">"{s.highlight}"</p>
            </motion.button>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-white dark:bg-slate-800 rounded-2xl px-8 py-5 shadow-lg border border-slate-100 dark:border-slate-700">
            <div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white">4.9</div>
              <StarRating rating={5} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white">312</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Guest Reviews</p>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-4xl font-bold text-amber-500">98%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Would Recommend</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuestStories;
