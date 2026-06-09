import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, ClockIcon, StarIcon, ChevronDownIcon, ChevronUpIcon, SparklesIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

interface Experience {
  id: string;
  titleKey: string;
  descKey: string;
  durationKey: string;
  bestTimeKey: string;
  rating: number;
  priceRange: string;
  category: 'nature' | 'culture' | 'adventure' | 'culinary' | 'wellness';
  image: string;
  highlights: string[];
  icon: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: 'bled-island',
    titleKey: 'experiences.bledIsland.title',
    descKey: 'experiences.bledIsland.desc',
    durationKey: 'experiences.bledIsland.duration',
    bestTimeKey: 'experiences.bledIsland.bestTime',
    rating: 4.9,
    priceRange: '€15 – €30',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&h=500&fit=crop&q=80',
    highlights: ['600-year-old church', 'Wishing bell tradition', 'Panoramic lake views', 'Traditional pletna boat'],
    icon: '🏝️',
  },
  {
    id: 'vingrad-gorge',
    titleKey: 'experiences.vingrad.title',
    descKey: 'experiences.vingrad.desc',
    durationKey: 'experiences.vingrad.duration',
    bestTimeKey: 'experiences.vingrad.bestTime',
    rating: 4.8,
    priceRange: '€20 – €35',
    category: 'adventure',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop&q=80',
    highlights: ['1.6km wooden walkways', 'Waterfalls & pools', 'Historical wooden bridges', 'Wheelchair accessible'],
    icon: '🏞️',
  },
  {
    id: 'blejski-grad',
    titleKey: 'experiences.blejskiGrad.title',
    descKey: 'experiences.blejskiGrad.desc',
    durationKey: 'experiences.blejskiGrad.duration',
    bestTimeKey: 'experiences.blejskiGrad.bestTime',
    rating: 4.7,
    priceRange: '€13 – €20',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=800&h=500&fit=crop&q=80',
    highlights: ['Medieval castle on cliff', 'Museum & printing press', 'Stunning lake views', 'Wine tasting experience'],
    icon: '🏰',
  },
  {
    id: 'culinary-bled',
    titleKey: 'experiences.culinary.title',
    descKey: 'experiences.culinary.desc',
    durationKey: 'experiences.culinary.duration',
    bestTimeKey: 'experiences.culinary.bestTime',
    rating: 4.8,
    priceRange: '€45 – <longcat_arg_value>120',
    category: 'culinary',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&q=80',
    highlights: ['Kremšnita cream cake farm', 'Local trout & venison', 'Slovenian wine tasting', 'Organic farm-to-table'],
    icon: '🍽️',
  },
  {
    id: 'altenberg-trails',
    titleKey: 'experiences.altenberg.title',
    descKey: 'experiences.altenberg.desc',
    durationKey: 'experiences.altenberg.duration',
    bestTimeKey: 'experiences.altenberg.bestTime',
    rating: 4.6,
    priceRange: 'Free – €25',
    category: 'adventure',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop&q=80',
    highlights: ['5 marked trail options', 'Triglav National Park views', 'Mountain hut refreshments', 'Wildlife spotting'],
    icon: '⛰️',
  },
  {
    id: 'lake-wellness',
    titleKey: 'experiences.wellness.title',
    descKey: 'experiences.wellness.desc',
    durationKey: 'experiences.wellness.duration',
    bestTimeKey: 'experiences.wellness.bestTime',
    rating: 4.9,
    priceRange: '€35 – €150',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&h=500&fit=crop&q=80',
    highlights: ['Lake-view spa', 'Slovenian herbal treatments', 'Outdoor thermal pools', 'Sunrise yoga sessions'],
    icon: '🧘',
  },
];

const CATEGORY_FILTERS = [
  { key: 'all', labelKey: 'experiences.filter.all', icon: '✨' },
  { key: 'nature', labelKey: 'experiences.filter.nature', icon: '🌿' },
  { key: 'culture', labelKey: 'experiences.filter.culture', icon: '🏛️' },
  { key: 'adventure', labelKey: 'experiences.filter.adventure', icon: '🎒' },
  { key: 'culinary', labelKey: 'experiences.filter.culinary', icon: '🍷' },
  { key: 'wellness', labelKey: 'experiences.filter.wellness', icon: '🧘' },
];

const EXPERISSION_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'experiences.bledIsland.title': 'Bled Island & Church of the Assumption',
    'experiences.bledIsland.desc': 'Take a traditional pletna boat to the only natural island in Slovenia. Visit the 600-year-old Church of the Assumption, ring the famous wishing bell, and soak in the panoramic Alpine views.',
    'experiences.bledIsland.duration': '1 – 2 hours',
    'experiences.bledIsland.bestTime': 'Morning (less crowded)',
    'experiences.vingrad.title': 'Vintgar Gorge Walk',
    'experiences.vingrad.desc': 'Walk 1.6 km of wooden walkways along the rushing Radovna river, past waterfalls, pools, and dramatic limestone walls. A natural wonder just 4 km from Villa Adora.',
    'experiences.vingrad.duration': '1 – 2 hours',
    'experiences.vingrad.bestTime': 'Early morning or late afternoon',
    'experiences.blejskiGrad.title': 'Bled Castle & Medieval Heritage',
    'experiences.blejskiGrad.desc': 'Perched on a 130m cliff overlooking the lake, Bled Castle is the oldest in Slovenia. Explore the museum, printing press, and wine cellar with panoramic terrace.',
    'experiences.blejskiGrad.duration': '1.5 – 2.5 hours',
    'experiences.blejskiGrad.bestTime': 'Late afternoon (golden hour)',
    'experiences.culinary.title': 'Slovenian Culinary Journey',
    'experiences.culinary.desc': 'Discover authentic Slovenian cuisine — from the famous Kremšnita cream cake at its source farm, to fresh lake trout, venison, and award-winning local wines.',
    'experiences.culinary.duration': '3 – 5 hours',
    'experiences.culinary.bestTime': 'Lunch or dinner hours',
    'experiences.altenberg.title': 'Altenberg & Karawanks Hiking',
    'experiences.altenberg.desc': 'Explore mountain trails in the Karawanks range with breathtaking views of the Julian Alps. From easy walks to challenging summit hikes, there is a trail for everyone.',
    'experiences.altenberg.duration': '2 – 6 hours',
    'experiences.altenberg.bestTime': 'Morning (best weather)',
    'experiences.wellness.title': 'Lake Bled Wellness & Spa',
    'experiences.wellness.desc': 'Relax with lakeside spa treatments featuring Slovenian herbal traditions. Choose between thermal pools, massage therapies, or sunrise yoga on the terrace.',
    'experiences.wellness.duration': '1 – 3 hours',
    'experiences.wellness.bestTime': 'Morning or sunset',
    'experiences.filter.all': 'All Experiences',
    'experiences.filter.nature': 'Nature',
    'experiences.filter.culture': 'Culture',
    'experiences.filter.adventure': 'Adventure',
    'experiences.filter.culinary': 'Culinary',
    'experiences.filter.wellness': 'Wellness',
    'experiences.sectionTitle': 'Local Experiences & Day Trips',
    'experiences.sectionSubtitle': 'Discover the best of Lake Bled and its surroundings. Our concierge can arrange any of these experiences for you.',
    'experiences.duration': 'Duration',
    'experiences.bestTime': 'Best Time',
    'experiences.priceRange': 'Price Range',
    'experiences.highlights': 'Highlights',
    'experiences.bookThis': 'Request Booking',
    'experiences.perPerson': 'per person',
  },
  sl: {
    'experiences.bledIsland.title': 'Blejski otok in Cerkev Marije Vnebovzete',
    'experiences.bledIsland.desc': 'Odpeljite s tradicionalno pletno na edini naravni otok v Slovenski. Obiščite 600 let staro Cerkev Marije Vnebovzete, pozvonite priročaj željenja in uživajte v alpskem pogledu.',
    'experiences.bledIsland.duration': '1 – 2 uri',
    'experiences.bledIsland.bestTime': 'Zjutraj (manj ljudi)',
    'experiences.vingrad.title': 'Sprehod po Vintški grapi',
    'experiences.vingrad.desc': 'Sprehodite 1,6 km lesenih potez ob reki Radovni, mimo slapov, ribnikov in apnenčastih sten. Čudes narave le 4 km od Vile Adore.',
    'experiences.vingrad.duration': '1 – 2 uri',
    'experiences.vingrad.bestTime': 'Zjutraj ali pozno popoldne',
    'experiences.blejskiGrad.title': 'Blejski grad in srednjeveška dediščina',
    'experiences.blejskiGrad.desc': 'Na 130m skali nad jezerom stari grad v Sloveniji. Odkrijte muzej, tiskarno in klet z panoramsko teraso.',
    'experiences.blejskiGrad.duration': '1,5 – 2,5 ure',
    'experiences.blejskiGrad.bestTime': 'Pozno popoldne (zlata ura)',
    'experiences.culinary.title': 'Slovenska kulinarna potovanje',
    'experiences.culinary.desc': 'Odkrijte avtentično slovensko kuhinjo — od sladice Kremšnita na kmetiji izvira, do sveže postrvi, divjačine in lokalnih vin.',
    'experiences.culinary.duration': '3 – 5 ur',
    'experiences.culinary.bestTime': 'Čas kosila ali večerje',
    'experiences.altenberg.title': 'Pohodništvo v Karavanke',
    'experiences.altenberg.desc': 'Raziščite planinske poti v Karavankah z čudovitim razgledom na Julijske Alpe. Od lahkih sprehodov do zahtevnih vzponov.',
    'experiences.altenberg.duration': '2 – 6 ur',
    'experiences.altenberg.bestTime': 'Zjutraj (najboljše vreme)',
    'experiences.wellness.title': 'Wellness pri Blejskem jezeru',
    'experiences.wellness.desc': 'Sprostite se z balneoterapijami ob jezeru. Izberite med termalnimi bazeni, masažami ali jogo ob sončnem vzhodu.',
    'experiences.wellness.duration': '1 – 3 ure',
    'experiences.wellness.bestTime': 'Zjutraj ali ob sončnem zahodu',
    'experiences.filter.all': 'Vse izkušnje',
    'experiences.filter.nature': 'Narava',
    'experiences.filter.culture': 'Kultura',
    'experiences.filter.adventure': 'Pustolovščine',
    'experiences.filter.culinary': 'Kulinarika',
    'experiences.filter.wellness': 'Wellness',
    'experiences.sectionTitle': 'Lokalne izkušnje in izleti',
    'experiences.sectionSubtitle': 'Odkrijte najboljše Blejskega jezera in okolice. Naš concierge vam lahko organizira katero koli izmed teh izkušenj.',
    'experiences.duration': 'Trajanje',
    'experiences.bestTime': 'Najboljši čas',
    'experiences.priceRange': 'Razpon cen',
    'experiences.highlights': 'Poudarki',
    'experiences.bookThis': 'Zahtevaj rezervacijo',
    'experiences.perPerson': 'na osebo',
  },
};

function getTranslation(key: string, language: string): string {
  return EXPERISSION_TRANSLATIONS[language]?.[key] || EXPERISSION_TRANSLATIONS['en']?.[key] || key;
}

const LocalExperiences = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeFilter === 'all'
    ? EXPERIENCES
    : EXPERIENCES.filter(e => e.category === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold rounded-full mb-4">
            <SparklesIcon className="w-4 h-4" />
            {language === 'sl' ? 'Odkrijte Bled' : 'Discover Bled'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation('experiences.sectionTitle', language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {getTranslation('experiences.sectionSubtitle', language)}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORY_FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{getTranslation(filter.labelKey, language)}</span>
            </button>
          ))}
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((experience, index) => (
              <motion.div
                key={experience.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(experience.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 ${
                  expandedId === experience.id ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={experience.image}
                    alt={getTranslation(experience.titleKey, language)}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredId === experience.id ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                      {experience.icon} {getTranslation(`experiences.filter.${experience.category}`, language)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-400/90 backdrop-blur-sm rounded-full text-xs font-bold text-amber-900">
                      <StarIcon className="w-3 h-3 fill-current" />
                      {experience.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {experience.priceRange}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {getTranslation(experience.titleKey, language)}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                    {getTranslation(experience.descKey, language)}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {getTranslation(experience.durationKey, language)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <SunIcon className="w-3.5 h-3.5" />
                      {getTranslation(experience.bestTimeKey, language)}
                    </span>
                  </div>

                  {/* Expandable Highlights */}
                  <button
                    onClick={() => toggleExpand(experience.id)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-3"
                  >
                    {expandedId === experience.id ? (
                      <>
                        <ChevronUpIcon className="w-4 h-4" />
                        {language === 'sl' ? 'Manj detajlov' : 'Less details'}
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className="w-4 h-4" />
                        {language === 'sl' ? 'Več detajlov' : 'More details'}
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedId === experience.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-3">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            {getTranslation('experiences.highlights', language)}
                          </h4>
                          <ul className="space-y-1.5">
                            {experience.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <MapPinIcon className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA Button */}
                  <button className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors duration-200">
                    <CalendarIcon className="w-4 h-4" />
                    {getTranslation('experiences.bookThis', language)}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {language === 'sl'
              ? 'Naš concierge vam lahko priporoči najboljšo izkušnjo glede na vreme in vaše želje.'
              : 'Our concierge can recommend the best experience based on the weather and your preferences.'}
          </p>
          <a
            href="mailto:concierge@villa-adora-bled.si?subject=Experience%20Booking%20Request"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <SparklesIcon className="w-5 h-5" />
            {language === 'sl' ? 'Načrtujte svoj obisk' : 'Plan Your Visit'}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalExperiences;
