import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon, HeartIcon, SunIcon, MoonIcon, GiftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface Offer {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  price?: string;
  priceKey?: string;
  tagKey: string;
  tagColor: string;
  image: string;
}

const SpecialOffers = () => {
  const { t, language } = useLanguage();

  const offers: Offer[] = [
    {
      id: 'early-bird',
      icon: <SunIcon className="w-7 h-7" />,
      titleKey: 'offers.earlyBird.title',
      descKey: 'offers.earlyBird.description',
      price: '10%',
      priceKey: 'offers.earlyBird.price',
      tagKey: 'offers.earlyBird.tag',
      tagColor: 'from-amber-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'romantic',
      icon: <HeartIcon className="w-7 h-7" />,
      titleKey: 'offers.romantic.title',
      descKey: 'offers.romantic.description',
      price: '€890',
      priceKey: 'offers.romantic.price',
      tagKey: 'offers.romantic.tag',
      tagColor: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'wellness',
      icon: <SparklesIcon className="w-7 h-7" />,
      titleKey: 'offers.wellness.title',
      descKey: 'offers.wellness.description',
      price: '€750',
      priceKey: 'offers.wellness.price',
      tagKey: 'offers.wellness.tag',
      tagColor: 'from-emerald-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'stay5',
      icon: <MoonIcon className="w-7 h-7" />,
      titleKey: 'offers.stay5.title',
      descKey: 'offers.stay5.description',
      priceKey: 'offers.stay5.price',
      tagKey: 'offers.stay5.tag',
      tagColor: 'from-indigo-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'direct',
      icon: <GiftIcon className="w-7 h-7" />,
      titleKey: 'offers.direct.title',
      descKey: 'offers.direct.description',
      priceKey: 'offers.direct.price',
      tagKey: 'offers.direct.tag',
      tagColor: 'from-cyan-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 'lastminute',
      icon: <ClockIcon className="w-7 h-7" />,
      titleKey: 'offers.lastMinute.title',
      descKey: 'offers.lastMinute.description',
      price: '15%',
      priceKey: 'offers.lastMinute.price',
      tagKey: 'offers.lastMinute.tag',
      tagColor: 'from-red-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-semibold mb-4">
            <SparklesIcon className="w-4 h-4" />
            {language === 'sl' ? 'Posebne ponudbe' : 'Special Offers'}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Ekskluzivne ponudbe za vas' : 'Exclusive Offers for You'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Izberite eno naših posebnih ponudb in naredite svoje bivanje še bolj posebno.'
              : 'Choose one of our special offers and make your stay even more memorable.'}
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={t(offer.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Tag */}
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${offer.tagColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                  {t(offer.tagKey)}
                </div>

                {/* Price badge */}
                {offer.price && (
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {offer.price}
                  </div>
                )}

                {/* Icon */}
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
                <div className="flex items-center justify-between">
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {t(offer.priceKey || '')}
                  </span>
                  <Link to="/reservation">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
                    >
                      {language === 'sl' ? 'Rezerviraj' : 'Book'}
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            {language === 'sl'
              ? 'Vse ponudbe veljajo za omejeno časno obdobjo. Kontaktirajte nas za več informacij.'
              : 'All offers are available for a limited time. Contact us for more details.'}
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline inline-flex items-center text-sm"
            >
              {language === 'sl' ? 'Vprašaj o ponudbah' : 'Ask About Offers'}
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
