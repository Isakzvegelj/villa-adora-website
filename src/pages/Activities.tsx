import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  SunIcon,
  SparklesIcon,
  CakeIcon,
  BeakerIcon,
  CameraIcon,
  HeartIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Activity {
  id: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  duration: string;
  season: string;
}

const activities: Activity[] = [
  {
    id: 'lake',
    icon: <SunIcon className="w-10 h-10" />,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
    duration: '2-4 hours',
    season: 'spring,summer,autumn',
  },
  {
    id: 'mountain',
    icon: <SparklesIcon className="w-10 h-10" />,
    color: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    duration: '3-6 hours',
    season: 'spring,summer,autumn',
  },
  {
    id: 'culinary',
    icon: <CakeIcon className="w-10 h-10" />,
    color: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1550966841-3ee4ad00aed0?w=800&h=600&fit=crop',
    duration: '1-3 hours',
    season: 'all',
  },
  {
    id: 'spa',
    icon: <BeakerIcon className="w-10 h-10" />,
    color: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=800&h=600&fit=crop',
    duration: '1-2 hours',
    season: 'all',
  },
  {
    id: 'culture',
    icon: <CameraIcon className="w-10 h-10" />,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&h=600&fit=crop',
    duration: '2-5 hours',
    season: 'all',
  },
  {
    id: 'romantic',
    icon: <HeartIcon className="w-10 h-10" />,
    color: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop',
    duration: '2-4 hours',
    season: 'all',
  },
  {
    id: 'winter',
    icon: <AcademicCapIcon className="w-10 h-10" />,
    color: 'bg-cyan-500',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop',
    duration: '2-6 hours',
    season: 'winter',
  },
  {
    id: 'adventure',
    icon: <GlobeAltIcon className="w-10 h-10" />,
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&h=600&fit=crop',
    duration: '3-8 hours',
    season: 'spring,summer,autumn',
  },
];

const Activities = () => {
  const { t, language } = useLanguage();

  const seasonLabel = (season: string) => {
    if (season === 'all') return language === 'sl' ? 'Vse leto' : 'All Year';
    const parts = season.split(',').map(s => {
      const key = `seasons.${s}.title`;
      return t(key);
    });
    return parts.join(', ');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      {/* Hero Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=800&fit=crop&q=80"
          alt="Lake Bled Activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {t('activities.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            >
              {language === 'sl'
                ? 'Bled in njegova okolica ponujajo bogastvo doživetj — od pustolovščin do popolne relaksacije.'
                : 'Bled and its surroundings offer a wealth of experiences — from adventure to complete relaxation.'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-slate-900"
              >
                {/* Image */}
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={t(`activities.${activity.id}.title`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className={`absolute top-4 left-4 w-14 h-14 ${activity.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {activity.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {t(`activities.${activity.id}.title`)}
                    </h2>
                    <div className="flex items-center gap-3 text-white/70 text-xs">
                      <span>⏱ {activity.duration}</span>
                      <span>•</span>
                      <span>{seasonLabel(activity.season)}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {t(`activities.${activity.id}.description`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {language === 'sl' ? 'Sezona' : 'Season'}: {seasonLabel(activity.season)}
                    </span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      ⏱ {activity.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'sl' ? 'Potrebujete priporočilo?' : 'Need a Recommendation?'}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              {language === 'sl'
                ? 'Naš digitalni concierge Luka vam bo pomogel najti popolno doživetje za vaše bivanje.'
                : 'Our digital concierge Luka will help you find the perfect experience for your stay.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                >
                  {language === 'sl' ? 'Kontaktirajte nas' : 'Contact Us'}
                </motion.button>
              </Link>
              <Link to="/reservation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
                >
                  {language === 'sl' ? 'Rezerviraj bivanje' : 'Book Your Stay'}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Activities;
