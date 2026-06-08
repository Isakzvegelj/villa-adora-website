import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import {
  CheckIcon,
  ArrowRightIcon,
  PhotoIcon,
  WifiIcon,
  SparklesIcon,
  EyeIcon,
  HomeIcon,
  SunIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Amenity {
  labelKey: string;
  icon: React.ReactNode;
}

interface Suite {
  id: string;
  price: string;
  image: string;
  titleKey: string;
  descKey: string;
  amenities: Amenity[];
  color: string;
}

const IconWifi = <WifiIcon className="w-5 h-5 text-indigo-500" />;
const IconView = <EyeIcon className="w-5 h-5 text-indigo-500" />;
const IconBed = <HomeIcon className="w-5 h-5 text-indigo-500" />;
const IconSparkle = <SparklesIcon className="w-5 h-5 text-indigo-500" />;
const IconUsers = <UsersIcon className="w-5 h-5 text-indigo-500" />;
const IconMaxSize = <HomeIcon className="w-5 h-5 text-indigo-500" />;
const IconSun = <SunIcon className="w-5 h-5 text-indigo-500" />;

const Suites = () => {
  const { t, language } = useLanguage();

  const suites: Suite[] = [
    {
      id: 'princess',
      price: '250',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&q=80',
      titleKey: 'suites.princess.title',
      descKey: 'suites.princess.description',
      color: 'from-pink-500 to-rose-500',
      amenities: [
        { labelKey: '55 m²', icon: IconMaxSize },
        { labelKey: 'King Size Bed', icon: IconBed },
        { labelKey: language === 'sl' ? 'Pogled na jezero' : 'Lake View', icon: IconView },
        { labelKey: language === 'sl' ? 'Stolpič' : 'Tower View', icon: IconSun },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: '2 ' + (language === 'sl' ? 'osebi' : 'Guests'), icon: IconUsers },
      ],
    },
    {
      id: 'penthouse',
      price: '300',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      titleKey: 'suites.penthouse.title',
      descKey: 'suites.penthouse.description',
      color: 'from-indigo-500 to-purple-500',
      amenities: [
        { labelKey: '60 m²', icon: IconMaxSize },
        { labelKey: '2 ' + (language === 'sl' ? 'Nadstropji' : 'Floors'), icon: IconBed },
        { labelKey: language === 'sl' ? 'Dih jemajoči razgledi' : 'Breathtaking Views', icon: IconView },
        { labelKey: language === 'sl' ? 'Domače vzdušje' : 'Cozy Atmosphere', icon: IconSparkle },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: '2 ' + (language === 'sl' ? 'osebi' : 'Guests'), icon: IconUsers },
      ],
    },
    {
      id: 'island',
      price: '380',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      titleKey: 'suites.island.title',
      descKey: 'suites.island.description',
      color: 'from-emerald-500 to-teal-500',
      amenities: [
        { labelKey: '65 m²', icon: IconMaxSize },
        { labelKey: '2 ' + (language === 'sl' ? 'Spalnici' : 'Bedrooms'), icon: IconBed },
        { labelKey: '2 ' + (language === 'sl' ? 'Balkona' : 'Balconies'), icon: IconSun },
        { labelKey: language === 'sl' ? 'Pogled na otok' : 'Island View', icon: IconView },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: '4 ' + (language === 'sl' ? 'osebe' : 'Guests'), icon: IconUsers },
      ],
    },
    {
      id: 'prestige',
      price: '420',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80',
      titleKey: 'suites.prestige.title',
      descKey: 'suites.prestige.description',
      color: 'from-amber-500 to-orange-500',
      amenities: [
        { labelKey: '72 m²', icon: IconMaxSize },
        { labelKey: language === 'sl' ? 'Velika terasa' : 'Large Terrace', icon: IconSun },
        { labelKey: language === 'sl' ? 'Umetniški dekor' : 'Artful Decor', icon: IconSparkle },
        { labelKey: language === 'sl' ? 'Pritličje' : 'Ground Floor', icon: IconBed },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: '2 ' + (language === 'sl' ? 'osebi' : 'Guests'), icon: IconUsers },
      ],
    },
  ];

  const handleBookNow = (_suiteId: string) => {
    // Scroll to top and navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title="Luxury Suites — Villa Adora, Lake Bled"
        description="Explore our 6 luxury suites at Villa Adora on Lake Bled. From the intimate Princess Suite to the grand Penthouse, each offers unique elegance and lake views."
        keywords={['Villa Adora suites', 'luxury hotel rooms Bled', 'lake view suite Slovenia', 'Princess Suite', 'Penthouse Suite', 'boutique hotel accommodation']}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/suites"
      />
      {/* Hero Banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <img
          src="https://images.unsplash.com/photo-15660737771259-6a8506099945?w=1920&h=800&fit=crop&q=80"
          alt="Villa Adora Suites"
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
              {t('suites.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            >
              {language === 'sl'
                ? 'Vsaka suite je zgodba sama zase — izberite svojo'
                : 'Each suite tells its own story — choose yours'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Suite Cards */}
      <section className="py-16 lg:py-24">
        <div className="container-max">
          <div className="grid gap-16 lg:gap-24">
            {suites.map((suite, index) => (
              <motion.div
                key={suite.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Container */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="overflow-hidden rounded-3xl shadow-2xl">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={suite.image}
                      alt={t(suite.titleKey)}
                      className="w-full h-[400px] lg:h-[500px] object-cover cursor-pointer"
                      loading="lazy"
                    />
                  </div>
                  {/* Price Badge */}
                  <div className={`absolute top-6 left-6 bg-gradient-to-r ${suite.color} text-white px-5 py-2.5 rounded-full shadow-lg`}>
                    <span className="font-bold text-lg">€{suite.price}</span>
                    <span className="text-xs text-white/80 ml-1 uppercase tracking-wider">
                      {t('common.perNight')}
                    </span>
                  </div>
                  {/* Gallery hint */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 shadow-lg"
                  >
                    <PhotoIcon className="w-4 h-4" />
                    {language === 'sl' ? 'Oglej si galerijo' : 'View gallery'}
                  </motion.div>
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                      {t(suite.titleKey)}
                    </h2>
                    <div className={`h-1 w-16 bg-gradient-to-r ${suite.color} rounded-full mb-4`} />
                  </div>

                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(suite.descKey)}
                  </p>

                  {/* Amenities Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {suite.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-slate-600 dark:text-slate-400 py-2"
                      >
                        {amenity.icon}
                        <span className="text-sm">{amenity.labelKey}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link
                      to={`/reservation?roomType=${suite.id}`}
                      onClick={() => handleBookNow(suite.id)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`btn-primary inline-flex items-center bg-gradient-to-r ${suite.color} border-0`}
                      >
                        {t('common.book')}
                        <ArrowRightIcon className="ml-2 w-5 h-5" />
                      </motion.button>
                    </Link>
                    <Link to="/gallery">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-outline inline-flex items-center"
                      >
                        {language === 'sl' ? 'Fotografije' : 'Photos'}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {language === 'sl' ? 'Primerjava suit' : 'Compare Suites'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {language === 'sl'
                ? 'Primerjajte naše suite in izberite tisto, ki najbolj ustreza vašim potrebam.'
                : 'Compare our suites and choose the one that best fits your needs.'}
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'sl' ? 'Lastnost' : 'Feature'}
                  </th>
                  {suites.map((suite) => (
                    <th key={suite.id} className="text-center py-4 px-4">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{t(suite.titleKey)}</div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">€{suite.price}/{language === 'sl' ? 'noč' : 'night'}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: language === 'sl' ? 'Velikost' : 'Size', values: ['55 m²', '60 m²', '65 m²', '72 m²'] },
                  { label: language === 'sl' ? 'Postelja' : 'Bed', values: ['King', 'King', '2× King', 'King'] },
                  { label: language === 'sl' ? 'Pogled na jezero' : 'Lake View', values: ['✓', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'WiFi' : 'WiFi', values: ['✓', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'Klima' : 'AC', values: ['✓', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'Masažna kad' : 'Jacuzzi', values: ['✗', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'Balkon' : 'Balcony', values: ['✗', '✓', '2', '✓ (Terrace)'] },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-800/30' : ''}`}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {row.label}
                    </td>
                    {row.values.map((val, j) => (
                      <td key={j} className="py-3 px-4 text-center text-sm">
                        {val === '✓' ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                        ) : val === '✗' ? (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        ) : (
                          <span className="text-slate-600 dark:text-slate-400">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link to="/reservation">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center text-lg px-10 py-4"
              >
                {language === 'sl' ? 'Rezerviraj suite' : 'Book a Suite'}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container-max relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-8">
            {language === 'sl' ? 'Nepozabna eleganca' : 'Unmatched Elegance'}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            {language === 'sl'
              ? 'Vsaka suite v Villi Adori je svetišče miru, ki združuje zgodovinski šarm in sodobni luksuz.'
              : 'Every suite at Villa Adora is a sanctuary of peace, blending historic charm with modern luxury.'}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-64">
              <div className="text-4xl font-bold mb-2">1878</div>
              <div className="text-white/70">
                {language === 'sl' ? 'Zgodovinska vila' : 'Heritage Villa'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-64">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-white/70">
                {language === 'sl' ? 'Luksuznih suit' : 'Luxury Suites'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-64">
              <div className="text-4xl font-bold mb-2">Bled</div>
              <div className="text-white/70">
                {language === 'sl' ? 'Najboljša lokacija' : 'Prime Location'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Suites;
