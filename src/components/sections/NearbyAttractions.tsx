import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  MapPinIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

interface Attraction {
  id: string;
  titleKey: string;
  descKey: string;
  image: string;
  distance: string;
  duration: string;
  category: string;
  categoryColor: string;
}

const NearbyAttractions = () => {
  const { t, language } = useLanguage();

  const attractions: Attraction[] = [
    {
      id: 'bled-island',
      titleKey: 'nearby.island.title',
      descKey: 'nearby.island.description',
      image: 'https://images.unsplash.com/photo-1573157513712-2e7b0e04e285?w=600&h=400&fit=crop&q=80',
      distance: '500m',
      duration: language === 'sl' ? '15 min hoje' : '15 min walk',
      category: language === 'sl' ? 'Znamenitost' : 'Landmark',
      categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      id: 'bled-castle',
      titleKey: 'nearby.castle.title',
      descKey: 'nearby.castle.description',
      image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=600&h=400&fit=crop&q=80',
      distance: '1.2 km',
      duration: language === 'sl' ? '20 min hoje' : '20 min walk',
      category: language === 'sl' ? 'Zgodovina' : 'History',
      categoryColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
    {
      id: 'vintgar-gorge',
      titleKey: 'nearby.vintgar.title',
      descKey: 'nearby.vintgar.description',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop&q=80',
      distance: '4 km',
      duration: language === 'sl' ? '10 min vožnje' : '10 min drive',
      category: language === 'sl' ? 'Narava' : 'Nature',
      categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      id: 'triglav-np',
      titleKey: 'nearby.triglav.title',
      descKey: 'nearby.triglav.description',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=80',
      distance: '35 km',
      duration: language === 'sl' ? '45 min vožnje' : '45 min drive',
      category: language === 'sl' ? 'Gore' : 'Mountains',
      categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    },
    {
      id: 'ljubljana',
      titleKey: 'nearby.ljubljana.title',
      descKey: 'nearby.ljubljana.description',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
      distance: '55 km',
      duration: language === 'sl' ? '50 min vožnje' : '50 min drive',
      category: language === 'sl' ? 'Mesto' : 'City',
      categoryColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    },
    {
      id: 'planica',
      titleKey: 'nearby.planica.title',
      descKey: 'nearby.planica.description',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop&q=80',
      distance: '25 km',
      duration: language === 'sl' ? '30 min vožnje' : '30 min drive',
      category: language === 'sl' ? 'Šport' : 'Sports',
      categoryColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4 uppercase tracking-wider">
            {language === 'sl' ? 'Okolica' : 'Explore the Area'}
          </span>
          <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Znamenitosti v okolici' : 'Nearby Attractions'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Bled je popoln izhodišče za raziskovanje Julianskih Alp in Slovenije. Odkrijte čudovite naravne znamenitosti, zgodovinske kulturne spomenike in vrhunske športne centre.'
              : 'Bled is the perfect base for exploring the Julian Alps and all of Slovenia. Discover stunning natural landmarks, historic cultural monuments, and world-class sports venues.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={attraction.image}
                  alt={t(attraction.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${attraction.categoryColor}`}>
                  {attraction.category}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  {attraction.distance}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t(attraction.titleKey)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {t(attraction.descKey)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {attraction.duration}
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'sl' ? 'Več' : 'Learn more'}
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            {language === 'sl' ? 'Ogled vseh aktivnosti in izletov' : 'View all activities & excursions'}
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NearbyAttractions;
