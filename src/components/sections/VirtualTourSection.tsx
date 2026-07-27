import { motion } from 'framer-motion';
import { Play, Maximize2, Eye, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TOUR_SPOTS = [
  {
    id: 'lobby',
    titleKey: 'virtualTour.lobby.title',
    descKey: 'virtualTour.lobby.description',
    image: 'https://images.unsplash.com/photo-15660737771259-6a8506099945?w=800&h=500&fit=crop&q=80',
    duration: '2:30',
  },
  {
    id: 'suite',
    titleKey: 'virtualTour.suite.title',
    descKey: 'virtualTour.suite.description',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&q=80',
    duration: '3:15',
  },
  {
    id: 'lake',
    titleKey: 'virtualTour.lake.title',
    descKey: 'virtualTour.lake.description',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop&q=80',
    duration: '1:45',
  },
  {
    id: 'dining',
    titleKey: 'virtualTour.dining.title',
    descKey: 'virtualTour.dining.description',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&q=80',
    duration: '2:00',
  },
];

export default function VirtualTourSection() {
  const { t, language } = useLanguage()

  const TOUR_TITLE = language === 'sl' ? 'Virtualni ogled' : 'Virtual Tour'
  const TOUR_SUBTITLE = language === 'sl'
    ? 'Raziskujte Villa Adora od doma'
    : 'Explore Villa Adora from Home'
  const TOUR_DESC = language === 'sl'
    ? 'Oglejte si naše luksuzne sobe, restavracijo in čudovit pogled na jezero Bled. Virtualni ogled vam omogoča, da doživite v kar najbolj realnem videzu.'
    : 'Take a peek into our luxurious suites, restaurant, and stunning Lake Bled views. Our virtual tour lets you experience the villa in the most realistic way possible.'
  const COMING_SOON = language === 'sl' ? 'Kmalu na voljo' : 'Coming Soon'
  const WATCH_TOUR = language === 'sl' ? 'Ogled virtualnega ogleda' : 'Watch Virtual Tour'
  const COMING_SOON_NOTE = language === 'sl'
    ? '360° virtualni ogled bo na voljo kmalu. Prijavite se na novice za obvestilo.'
    : '360° virtual tour coming soon. Sign up for our newsletter to be notified.'

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Eye className="w-4 h-4" />
            {TOUR_TITLE}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {TOUR_SUBTITLE}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {TOUR_DESC}
          </p>
        </motion.div>

        {/* Featured Tour Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-12 group cursor-pointer"
        >
          <div className="aspect-[21/9] relative">
            <img
              src="https://images.unsplash.com/photo-15660737771259-6a8506099945?w=1600&h=700&fit=crop&q=80"
              alt="Villa Adora Virtual Tour"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 group-hover:bg-white/30 transition-colors"
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {language === 'sl' ? 'Celostni ogled vile' : 'Full Villa Tour'}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {language === 'sl' ? '8 minut · 360° pogled' : '8 minutes · 360° view'}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
                  <Maximize2 className="w-4 h-4" />
                  {language === 'sl' ? 'Celozaslonski način' : 'Fullscreen'}
                </div>
              </div>
            </div>

            {/* Coming Soon Overlay */}
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
              {COMING_SOON}
            </div>
          </div>
        </motion.div>

        {/* Tour Spot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOUR_SPOTS.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden mb-3">
                <div className="aspect-[4/3]">
                  <img
                    src={spot.image}
                    alt={spot.titleKey}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  {spot.duration}
                </div>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {t(spot.titleKey)}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {t(spot.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:shadow-xl">
            {WATCH_TOUR}
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
            {COMING_SOON_NOTE}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
