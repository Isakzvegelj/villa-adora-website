import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import SuiteGallery, { SUITE_GALLERY_IMAGES } from '../components/ui/SuiteGallery';
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
import PriceCalculator from '../components/ui/PriceCalculator';
import BentralEmbed from '../components/ui/BentralEmbed';
import { trackSuiteView } from '../components/ui/RecentlyViewedSuites';

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
  const [gallerySuite, setGallerySuite] = useState<string | null>(null);

  const suites: Suite[] = [
    {
      id: 'princess',
      price: '440',
      image: '/villa-adora-website/images/adora/real/suite-classic.jpg',
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
      id: 'luxury',
      price: '480',
      image: '/villa-adora-website/images/adora/real/suite-lake.jpg',
      titleKey: 'suites.luxury.title',
      descKey: 'suites.luxury.description',
      color: 'from-blue-500 to-cyan-500',
      amenities: [
        { labelKey: language === 'sl' ? 'Pogled na jezero' : 'Lake View', icon: IconView },
        { labelKey: 'King Size Bed', icon: IconBed },
        { labelKey: language === 'sl' ? 'Balkon' : 'Balcony', icon: IconSun },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: language === 'sl' ? 'Masažna kad' : 'Jacuzzi', icon: IconSparkle },
        { labelKey: '2 ' + (language === 'sl' ? 'osebi' : 'Guests'), icon: IconUsers },
      ],
    },
    {
      id: 'penthouse',
      price: '430',
      image: '/villa-adora-website/images/adora/real/villa-detail.jpg',
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
      id: 'deluxe',
      price: '570',
      image: '/villa-adora-website/images/adora/real/suite-panorama.jpg',
      titleKey: 'suites.deluxe.title',
      descKey: 'suites.deluxe.description',
      color: 'from-violet-500 to-fuchsia-500',
      amenities: [
        { labelKey: language === 'sl' ? 'Pogled na jezero' : 'Lake View', icon: IconView },
        { labelKey: 'King Size Bed', icon: IconBed },
        { labelKey: language === 'sl' ? 'Prostoren' : 'Spacious', icon: IconMaxSize },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: language === 'sl' ? 'Balkon' : 'Balcony', icon: IconSun },
        { labelKey: '2 ' + (language === 'sl' ? 'osebi' : 'Guests'), icon: IconUsers },
      ],
    },
    {
      id: 'superior',
      price: '570',
      image: '/villa-adora-website/images/adora/real/hero-full.jpg',
      titleKey: 'suites.superior.title',
      descKey: 'suites.superior.description',
      color: 'from-emerald-500 to-teal-500',
      amenities: [
        { labelKey: language === 'sl' ? '2 Spalnici' : '2 Bedrooms', icon: IconBed },
        { labelKey: '4 ' + (language === 'sl' ? 'osebe' : 'Guests'), icon: IconUsers },
        { labelKey: language === 'sl' ? 'Pogled na grad' : 'Castle View', icon: IconView },
        { labelKey: 'WiFi', icon: IconWifi },
        { labelKey: language === 'sl' ? 'Prostorna' : 'Spacious', icon: IconMaxSize },
        { labelKey: language === 'sl' ? 'Otročji prijazno' : 'Child Friendly', icon: IconSparkle },
      ],
    },
    {
      id: 'island',
      price: '620',
      image: '/villa-adora-website/images/adora/real/suite-terrace.jpg',
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
      price: '0',
      image: '/villa-adora-website/images/adora/real/gallery-couple.jpg',
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

  // Track suite views for "Recently Viewed" feature
  useEffect(() => {
    // Track all suites that are visible on this page
    suites.forEach(suite => {
      trackSuiteView({
        id: suite.id,
        name: t(suite.titleKey),
        image: suite.image,
        price: suite.price !== '0' ? `€${suite.price}/night` : 'Price on Request',
      })
    })
  }, [])

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
          src="/villa-adora-website/images/adora/rooms-banner.jpg"
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
                id={suite.id}
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
                    {suite.price !== '0' ? (
                      <>
                        <span className="font-bold text-lg">€{suite.price}</span>
                        <span className="text-xs text-white/80 ml-1 uppercase tracking-wider">
                          {t('common.perNight')}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-sm">
                        {language === 'sl' ? 'Cena na vprašanje' : 'Price on Request'}
                      </span>
                    )}
                  </div>
                  {/* Gallery button */}
                  <button
                    onClick={() => setGallerySuite(suite.id)}
                    className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <PhotoIcon className="w-4 h-4" />
                    {language === 'sl' ? 'Oglej si galerijo' : 'View gallery'}
                    <span className="text-xs text-indigo-500 font-medium">+{SUITE_GALLERY_IMAGES[suite.id]?.length || 0}</span>
                  </button>
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

                  {/* Price Calculator */}
                  <PriceCalculator
                    suitePrice={parseInt(suite.price)}
                    suiteId={suite.id}
                    suiteName={t(suite.titleKey)}
                    suiteColor={suite.color}
                    t={t}
                    language={language}
                  />
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
                  { label: language === 'sl' ? 'Velikost' : 'Size', values: ['55 m²', '55 m²', '60 m²', '58 m²', '65 m²', '65 m²', '72 m²'] },
                  { label: language === 'sl' ? 'Postelja' : 'Bed', values: ['King', 'King', 'King', 'King', '2× King', '2× King', 'King'] },
                  { label: language === 'sl' ? 'Pogled na jezero' : 'Lake View', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'WiFi' : 'WiFi', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'Klima' : 'AC', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
                  { label: language === 'sl' ? 'Masažna kad' : 'Jacuzzi', values: ['✗', '✓', '✓', '✗', '✗', '✓', '✓'] },
                  { label: language === 'sl' ? 'Balkon' : 'Balcony', values: ['✗', '✓', '✓', '✓', '✗', '2', '✓ (Terrace)'] },
                  { label: language === 'sl' ? 'Gostje' : 'Guests', values: ['2', '2', '2', '2', '4', '4', '2'] },
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

      {/* What's Included Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              {language === 'sl' ? 'Vključeno v ceno' : 'Included in Every Stay'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {language === 'sl' ? 'Kar vse doživite z nami' : 'Everything You Experience With Us'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              {language === 'sl'
                ? 'Vsaka rezervacija vključuje celo nabor premium storitev in udobja — brez skritih stroškov.'
                : 'Every reservation includes a full suite of premium services and comforts — no hidden costs.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🍳',
                title: language === 'sl' ? 'Bogat zajtrk' : 'Gourmet Breakfast',
                desc: language === 'sl'
                  ? 'Samopostrežni zajtrk na terasi s pogledom na jezero. Sveže pecivo, lokalni sirji, sezonsko sadje.'
                  : 'Buffet breakfast on the lakeside terrace. Fresh pastries, local cheeses, seasonal fruit.',
              },
              {
                icon: '📶',
                title: language === 'sl' ? 'Premium WiFi' : 'Premium WiFi',
                desc: language === 'sl'
                  ? 'Visokohitrostno omrežje po celotnem objektu in vseh suitah. Idealno za delo na daljavo.'
                  : 'High-speed fiber internet throughout the property and all suites. Perfect for remote work.',
              },
              {
                icon: '🅿️',
                title: language === 'sl' ? 'Brezplačno parkiranje' : 'Free Parking',
                desc: language === 'sl'
                  ? 'Varovano zasebno parkirišče na lokaciji. Brezplačno za vse goste.'
                  : 'Secure private parking on-site. Complimentary for all guests.',
              },
              {
                icon: '🧖',
                title: language === 'sl' ? 'Wellness & Spa' : 'Wellness & Spa',
                desc: language === 'sl'
                  ? 'Finska savna, turška kopel in masažne storitve. Brezplen dostop do savne.'
                  : 'Finnish sauna, Turkish bath, and massage treatments. Complimentary sauna access.',
              },
              {
                icon: '🚲',
                title: language === 'sl' ? 'Izposoja koles' : 'Bike Rental',
                desc: language === 'sl'
                  ? 'Brezplačna gorska kolesa za raziskovanje Bleda in okolice.'
                  : 'Complimentary mountain bikes to explore Bled and surroundings.',
              },
              {
                icon: '🍷',
                title: language === 'sl' ? 'Napitek dobrodošlice' : 'Welcome Drink',
                desc: language === 'sl'
                  ? 'Obliglasite se s kozarcem slovenskega vina ali svežega sadnega soka ob prihodu.'
                  : 'Toast your arrival with a glass of Slovenian wine or fresh fruit juice.',
              },
              {
                icon: '🗺️',
                title: language === 'sl' ? 'Lokalni nasveti' : 'Local Concierge',
                desc: language === 'sl'
                  ? 'Osebna priporočila za restavracije, izlete in skrite kotičke Bleda.'
                  : 'Personal recommendations for restaurants, excursions, and hidden gems of Bled.',
              },
              {
                icon: '🧹',
                title: language === 'sl' ? 'Dnevno čiščenje' : 'Daily Housekeeping',
                desc: language === 'sl'
                  ? 'Dnevno čiščenje in postiljanje. Večerno turno službo na zahtevo.'
                  : 'Daily cleaning and turndown service. Evening turn-down on request.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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

      {/* Gift Voucher CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border-y border-amber-100 dark:border-slate-700">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🎁
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {language === 'sl' ? 'Darilo za nepozabne trenutke' : 'Gift Unforgettable Moments'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {language === 'sl'
                    ? 'Podarite bivanje v Villi Adori — darilni vavčer za različne suite in pakete.'
                    : 'Give the gift of Villa Adora — gift vouchers for various suites and packages.'}
                </p>
              </div>
            </div>
            <Link to="/gift-voucher">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow whitespace-nowrap"
              >
                {language === 'sl' ? 'Naroči darilni vavčer' : 'Order Gift Voucher'}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Rates & Real-time Availability (Bentral) */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-4">
              💶 {language === 'sl' ? 'Cene in razpoložljivost' : 'Rates & Availability'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {language === 'sl' ? 'Rezervirajte neposredno' : 'Book Directly with Live Availability'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {language === 'sl'
                ? 'Preverite razpoložljivost vsake suite in rezervirajte neposredno za najboljšo ceno — brez provizij.'
                : 'Check real-time availability for each suite and book direct at the best rate — no booking fees.'}
            </p>
          </motion.div>

          {/* Price List */}
          <div className="mx-auto mb-16 max-w-4xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                {language === 'sl' ? 'Cenik' : 'Rate List'}
              </h3>
              <div className="bentral-widget bentral-pricelist">
                <BentralEmbed src="//www.bentral.com/service/embed/price-list.js?id=5f444d354f415f4e&key=ef32fbc68fd13b8f9e5ba7a55520e061" />
              </div>
            </div>
          </div>

          {/* Per-suite calendars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { uid: '5f5441314e44634d', label: language === 'sl' ? 'Suita 1' : 'Suite 1' },
              { uid: '5f5441314e44674d', label: language === 'sl' ? 'Suita 2' : 'Suite 2' },
              { uid: '5f5441314e446b4d', label: language === 'sl' ? 'Suita 3' : 'Suite 3' },
              { uid: '5f5441314e54494d', label: language === 'sl' ? 'Suita 4' : 'Suite 4' },
              { uid: '5f5441314e544d4d', label: language === 'sl' ? 'Suita 5' : 'Suite 5' },
              { uid: '5f5441314e54414d', label: language === 'sl' ? 'Suita 6' : 'Suite 6' },
              { uid: '5f5441314e54454d', label: language === 'sl' ? 'Suita 7' : 'Suite 7' },
              { uid: '5f5441314e54514d', label: language === 'sl' ? 'Suita 8' : 'Suite 8' },
            ].map((room) => (
              <motion.div
                key={room.uid}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden"
              >
                <div className="px-6 pt-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {room.label}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {language === 'sl' ? 'Razpoložljivost v realnem času' : 'Real-time availability'}
                  </p>
                </div>
                <div className="bentral-widget bentral-calendar px-6 pb-4">
                  <BentralEmbed src={`//www.bentral.com/service/embed/calendar.js?uid=${room.uid}&last=true&key=ef32fbc68fd13b8f9e5ba7a55520e061`} />
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to={`/reservation`}
                    className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-center transition-colors"
                  >
                    {language === 'sl' ? 'Rezerviraj zdaj' : 'Book Now'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Suite Gallery Modal */}
      {gallerySuite && SUITE_GALLERY_IMAGES[gallerySuite] && (
        <SuiteGallery
          images={SUITE_GALLERY_IMAGES[gallerySuite]}
          isOpen={!!gallerySuite}
          onClose={() => setGallerySuite(null)}
        />
      )}
    </motion.div>
  );
};

export default Suites;
