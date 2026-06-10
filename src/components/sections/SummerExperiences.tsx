'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sun, Waves, Mountain, Bike, Utensils, TreePine,
  ArrowRight, Clock, MapPin, Star, Thermometer
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SummerExperience {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'adventure';
  price: string;
  image: string;
  highlights: string[];
  category: 'outdoor' | 'culinary' | 'wellness' | 'culture';
}

const SUMMER_EXPERIENCES: SummerExperience[] = [
  {
    id: 'lake-bled-row',
    icon: <Waves className="w-6 h-6" />,
    titleKey: 'summer2026.rowing.title',
    descKey: 'summer2026.rowing.desc',
    duration: '2h',
    difficulty: 'easy',
    price: 'From €25',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&q=80',
    highlights: ['Pletna boat', 'Bled Island', 'Church visit'],
    category: 'outdoor',
  },
  {
    id: 'vrelo-bungee',
    icon: <Mountain className="w-6 h-6" />,
    titleKey: 'summer2026.vintgar.title',
    descKey: 'summer2026.vintgar.desc',
    duration: '3h',
    difficulty: 'moderate',
    price: 'From €15',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=80',
    highlights: ['Radovna Valley', 'Bridges', 'Waterfalls'],
    category: 'outdoor',
  },
  {
    id: 'culinary-bled',
    icon: <Utensils className="w-6 h-6" />,
    titleKey: 'summer2026.culinary.title',
    descKey: 'summer2026.culinary.desc',
    duration: '4h',
    difficulty: 'easy',
    price: 'From €85',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80',
    highlights: ['Kremna rezina', 'Local wines', 'Farm-to-table'],
    category: 'culinary',
  },
  {
    id: 'mountain-biking',
    icon: <Bike className="w-6 h-6" />,
    titleKey: 'summer2026.biking.title',
    descKey: 'summer2026.biking.desc',
    duration: '3h',
    difficulty: 'moderate',
    price: 'Complimentary',
    image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&h=400&fit=crop&q=80',
    highlights: ['Free bikes', 'Lake trail', 'Scenic stops'],
    category: 'outdoor',
  },
  {
    id: 'garden-retreat',
    icon: <TreePine className="w-6 h-6" />,
    titleKey: 'summer2026.garden.title',
    descKey: 'summer2026.garden.desc',
    duration: '2h',
    difficulty: 'easy',
    price: 'Complimentary',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop&q=80',
    highlights: ['Yoga session', 'Herbal tea', 'Nature walks'],
    category: 'wellness',
  },
  {
    id: 'castle-sunset',
    icon: <Sun className="w-6 h-6" />,
    titleKey: 'summer2026.castle.title',
    descKey: 'summer2026.castle.desc',
    duration: '2h',
    difficulty: 'easy',
    price: 'From €12',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop&q=80',
    highlights: ['Sunset views', 'Wine tasting', 'Castle museum'],
    category: 'culture',
  },
];

const DIFFICULTY_COLORS = {
  easy: 'bg-emerald-100 text-emerald-700',
  moderate: 'bg-amber-100 text-amber-700',
  adventure: 'bg-red-100 text-red-700',
};

const DIFFICULTY_LABELS: Record<string, Record<string, string>> = {
  en: { easy: 'Easy', moderate: 'Moderate', adventure: 'Adventure' },
  sl: { easy: 'Lahko', moderate: 'Zmerno', adventure: 'Družinsko' },
  de: { easy: 'Leicht', moderate: 'Mittel', adventure: 'Abenteuer' },
  it: { easy: 'Facile', moderate: 'Moderato', adventure: 'Avventura' },
};

const CATEGORIES = [
  { key: 'all', icon: <Star className="w-4 h-4" /> },
  { key: 'outdoor', icon: <Mountain className="w-4 h-4" /> },
  { key: 'culinary', icon: <Utensils className="w-4 h-4" /> },
  { key: 'wellness', icon: <TreePine className="w-4 h-4" /> },
  { key: 'culture', icon: <Sun className="w-4 h-4" /> },
];

const SummerExperiences = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? SUMMER_EXPERIENCES
    : SUMMER_EXPERIENCES.filter(e => e.category === activeCategory);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-sky-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-indigo-200/30 dark:from-sky-900/20 dark:to-indigo-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-700 dark:text-amber-300 text-sm font-semibold rounded-full mb-5">
            <Sun className="w-4 h-4" />
            {t('summer2026.badge') || 'Summer 2026'}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('summer2026.title') || 'Summer Experiences at Lake Bled'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('summer2026.subtitle') || 'Discover the magic of Bled in summer. From lake adventures to culinary delights, curated experiences await.'}
          </p>

          {/* Live temperature indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-slate-700"
          >
            <Thermometer className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('summer2026.avgTemp') || 'Avg. summer temp: 24°C / 75°F'}
            </span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
              }`}
            >
              {cat.icon}
              {cat.key === 'all'
                ? (language === 'sl' ? 'Vse' : language === 'de' ? 'Alle' : language === 'it' ? 'Tutti' : 'All')
                : cat.key.charAt(0).toUpperCase() + cat.key.slice(1)
              }
            </button>
          ))}
        </motion.div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-800"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exp.image}
                  alt={t(exp.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category icon */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                  {exp.icon}
                </div>

                {/* Difficulty badge */}
                <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold ${DIFFICULTY_COLORS[exp.difficulty]}`}>
                  {DIFFICULTY_LABELS[language]?.[exp.difficulty] || DIFFICULTY_LABELS['en'][exp.difficulty]}
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-900 dark:text-white font-bold px-3 py-1.5 rounded-full text-sm">
                  {exp.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {t(exp.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
                  {t(exp.descKey)}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {exp.highlights.map((h, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Bled
                    </span>
                  </div>
                  <Link
                    to={`/activities?experience=${exp.id}`}
                    className="inline-flex items-center text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    {t('summer2026.explore') || 'Explore'}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hover glow effect */}
              {hoveredId === exp.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 ring-2 ring-amber-400/50 dark:ring-amber-500/30 rounded-2xl pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/activities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('summer2026.viewAll') || 'View All Experiences'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {t('summer2026.conciergeNote') || 'Our concierge can arrange any experience — just ask!'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SummerExperiences;
