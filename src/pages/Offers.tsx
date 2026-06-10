import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import {
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon,
  SunIcon,
  MoonIcon,
  GiftIcon,
  ClockIcon,
  LeafIcon,
  SnowflakeIcon,
  CheckCircleIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface Offer {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  priceNoteKey: string;
  tagKey: string;
  tagColor: string;
  image: string;
  includes: string[];
  includesKeys: string[];
  validUntil?: string;
  validKey?: string;
}

const Offers = () => {
  const { t, language } = useLanguage();
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

  const offers: Offer[] = [
    {
      id: 'early-bird',
      icon: <SunIcon className="w-7 h-7" />,
      titleKey: 'offers.earlyBird.title',
      descKey: 'offers.earlyBird.description',
      priceNoteKey: 'offers.earlyBird.price',
      tagKey: 'offers.earlyBird.tag',
      tagColor: 'from-amber-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&q=80',
      includesKeys: ['offers.includes.breakfast', 'offers.includes.wifi', 'offers.includes.parking', 'offers.includes.latecheckout'],
      includes: [],
    },
    {
      id: 'romantic',
      icon: <HeartIcon className="w-7 h-7" />,
      titleKey: 'offers.romantic.title',
      descKey: 'offers.romantic.description',
      priceNoteKey: 'offers.romantic.price',
      tagKey: 'offers.romantic.tag',
      tagColor: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=500&fit=crop&q=80',
      includesKeys: ['offers.includes.breakfast', 'offers.includes.champagne', 'offers.includes.massage', 'offers.includes.dinner', 'offers.includes.latecheckout'],
      includes: [],
      validKey: 'offers.romantic.valid',
    },
    {
      id: 'wellness',
      icon: <SparklesIcon className="w-7 h-7" />,
      titleKey: 'offers.wellness.title',
      descKey: 'offers.wellness.description',
      priceNoteKey: 'offers.wellness.price',
      tagKey: 'offers.wellness.tag',
      tagColor: 'from-emerald-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=500&fit=crop&q=80',
      includesKeys: ['offers.includes.breakfast', 'offers.includes.sauna', 'offers.includes.massage', 'offers.includes.yoga', 'offers.includes.tea'],
      includes: [],
    },
    {
      id: 'stay5',
      icon: <MoonIcon className="w-7 h-7" />,
      titleKey: 'offers.stay5.title',
      descKey: 'offers.stay5.description',
      priceNoteKey: 'offers.stay5.price',
      tagKey: 'offers.stay5.tag',
      tagColor: 'from-indigo-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=500&fit=crop&q=80',
      includesKeys: ['offers.includes.breakfast', 'offers.includes.wifi', 'offers.includes.parking', 'offers.includes.sauna', 'offers.includes.bikes'],
      includes: [],
      validKey: 'offers.stay5.valid',
    },
    {
      id: 'direct',
      icon: <GiftIcon className="w-7 h-7" />,
      titleKey: 'offers.direct.title',
      descKey: 'offers.direct.description',
      priceNoteKey: 'offers.direct.price',
      tagKey: 'offers.direct.tag',
      tagColor: 'from-cyan-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop&q=80',
      includesKeys: ['offers.includes.upgrade', 'offers.includes.welcome', 'offers.includes.breakfast', 'offers.includes.latecheckout'],
      includes: [],
    },
    {
      id: 'lastminute',
      icon: <ClockIcon className="w-7 h-7" />,
      titleKey: 'offers.lastMinute.title',
      descKey: 'offers.lastMinute.description',
      priceNoteKey: 'offers.lastMinute.price',
      tagKey: 'offers.lastMinute.tag',
      tagColor: 'from-red-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop&q=80',
      includesKeys: ['offers.includes.breakfast', 'offers.includes.wifi', 'offers.includes.parking'],
      includes: [],
      validKey: 'offers.lastMinute.valid',
    },
  ];

  const springOffer: Offer = {
    id: 'spring',
    icon: <LeafIcon className="w-7 h-7" />,
    titleKey: 'offers.spring.title',
    descKey: 'offers.spring.desc',
    priceNoteKey: '',
    tagKey: '',
    tagColor: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=500&fit=crop&q=80',
    includesKeys: [],
    includes: [],
  };

  const winterOffer: Offer = {
    id: 'winter',
    icon: <SnowflakeIcon className="w-7 h-7" />,
    titleKey: 'offers.winter.title',
    descKey: 'offers.winter.desc',
    priceNoteKey: '',
    tagKey: '',
    tagColor: 'from-blue-400 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&h=500&fit=crop&q=80',
    includesKeys: [],
    includes: [],
  };

  const allOffers = [springOffer, winterOffer, ...offers];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title="Special Offers — Villa Adora, Lake Bled"
        description="Exclusive packages and deals at Villa Adora. Early bird discounts, romantic getaways, wellness retreats, and more on Lake Bled."
        keywords={['Villa Adora offers', 'Bled hotel deals', 'Lake Bled packages', 'romantic getaway Slovenia', 'wellness retreat Bled']}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/offers"
      />

      {/* Hero */}
      <div className="relative h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=800&fit=crop&q=80"
          alt="Villa Adora Special Offers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4 border border-white/30"
            >
              <SparklesIcon className="w-4 h-4" />
              {language === 'sl' ? 'Omejene ponudbe' : 'Limited Time Offers'}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {language === 'sl' ? 'Posebne ponudbe' : 'Special Offers'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            >
              {language === 'sl'
                ? 'Izberite eno naših ekskluzivnih ponudb in naredite svoje bivanje še bolj posebno.'
                : 'Choose one of our exclusive offers and make your stay even more memorable.'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={t(offer.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {offer.tagKey && (
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${offer.tagColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                      {t(offer.tagKey)}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                    {offer.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {t(offer.titleKey)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {t(offer.descKey)}
                  </p>

                  {/* Expandable includes */}
                  {offer.includesKeys.length > 0 && (
                    <>
                      <button
                        onClick={() => setExpandedOffer(expandedOffer === offer.id ? null : offer.id)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 mb-3 flex items-center gap-1"
                      >
                        {language === 'sl' ? 'Kaj je vključeno' : "What's included"}
                        <motion.span
                          animate={{ rotate: expandedOffer === offer.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▾
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {expandedOffer === offer.id && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-4 space-y-1.5"
                          >
                            {offer.includesKeys.map((key) => (
                              <li key={key} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {t(key)}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    {offer.priceNoteKey && (
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {t(offer.priceNoteKey)}
                      </span>
                    )}
                    <Link to={`/reservation?offer=${offer.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
                      >
                        {language === 'sl' ? 'Rezerviraj' : 'Book Now'}
                        <ArrowRightIcon className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {language === 'sl' ? 'Ponudbe veljajo za omejeno časno obdobje' : 'Offers Available for a Limited Time'}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {language === 'sl'
              ? 'Za več informacij o ponudbah in razpoložljivosti nas kontaktirajte direktno.'
              : 'For more information on offers and availability, contact us directly.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                {language === 'sl' ? 'Rezerviraj zdaj' : 'Book Now'}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </Link>
            <a href="tel:+38645741000">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white hover:text-indigo-600 transition-all inline-flex items-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                +386 4 574 10 00
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Offers;
