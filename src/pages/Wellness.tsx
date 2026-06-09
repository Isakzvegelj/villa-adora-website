import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import {
  SparklesIcon,
  HeartIcon,
  SunIcon,
  MoonIcon,
  FireIcon,
  BeakerIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface WellnessService {
  id: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  duration: string;
  price: string;
}

const Wellness = () => {
  const { language } = useLanguage();
  const isSl = language === 'sl';

  const services: WellnessService[] = [
    {
      id: 'sauna',
      icon: <FireIcon className="w-8 h-8" />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      duration: isSl ? '60 min' : '60 min',
      price: isSl ? 'Vključeno' : 'Included',
    },
    {
      id: 'turkishBath',
      icon: <BeakerIcon className="w-8 h-8" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      duration: isSl ? '45 min' : '45 min',
      price: isSl ? 'Vključeno' : 'Included',
    },
    {
      id: 'massage',
      icon: <SparklesIcon className="w-8 h-8" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      duration: isSl ? '60-90 min' : '60-90 min',
      price: '€80-120',
    },
    {
      id: 'couplesMassage',
      icon: <HeartIcon className="w-8 h-8" />,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      duration: isSl ? '90 min' : '90 min',
      price: '€180',
    },
    {
      id: 'yoga',
      icon: <SunIcon className="w-8 h-8" />,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      duration: isSl ? '60 min' : '60 min',
      price: isSl ? 'Vključeno' : 'Included',
    },
    {
      id: 'meditation',
      icon: <MoonIcon className="w-8 h-8" />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      duration: isSl ? '30 min' : '30 min',
      price: isSl ? 'Vključeno' : 'Included',
    },
  ];

  const packages = [
    {
      id: 'relax',
      name: isSl ? 'Relax Paket' : language === 'de' ? 'Entspannungs-Paket' : language === 'it' ? 'Pacchetto Relax' : 'Relax Package',
      services: isSl
        ? ['Finska savna', 'Turška kopel', 'Aromaterapevtska masaža']
        : language === 'de'
        ? ['Finnische Sauna', 'Türkisches Bad', 'Aromatherapie-Massage']
        : language === 'it'
        ? ['Sauna finnese', 'Bagno turco', 'Massaggio aromaterapico']
        : ['Finnish Sauna', 'Turkish Bath', 'Aromatherapy Massage'],
      price: isSl ? 'Od €80' : language === 'de' ? 'Ab €80' : language === 'it' ? 'Da €80' : 'From €80',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'romantic',
      name: isSl ? 'Romantični Wellness' : language === 'de' ? 'Romantisches Wellness' : language === 'it' ? 'Wellness Romantico' : 'Romantic Wellness',
      services: isSl
        ? ['Masaža za par', 'Šampanjec', 'Rozne na postelji', 'Večerja na terasi']
        : language === 'de'
        ? ['Paarmassage', 'Sekt', 'Rosen auf dem Bett', 'Dinner auf der Terrasse']
        : language === 'it'
        ? ['Massaggio per coppia', 'Champagne', 'Rosa sul letto', 'Cena sulla terrazza']
        : ['Couples Massage', 'Champagne', 'Rose Petals', 'Terrace Dinner'],
      price: isSl ? 'Od €220' : language === 'de' ? 'Ab €220' : language === 'it' ? 'Da €220' : 'From €220',
      color: 'from-rose-500 to-pink-500',
    },
    {
      id: 'detox',
      name: isSl ? 'Detox Paket' : language === 'de' ? 'Detox-Paket' : language === 'it' ? 'Pacchetto Detox' : 'Detox Package',
      services: isSl
        ? ['Finska savna', 'Detox čaj', 'Limfna drenaža', 'Zdrav zajtrk']
        : language === 'de'
        ? ['Finnische Sauna', 'Detox-Tee', 'Lymphdrainage', 'Gesundes Frühstück']
        : language === 'it'
        ? ['Sauna finnese', 'Tè detox', 'Drenaggio linfatico', 'Colazione sana']
        : ['Finnish Sauna', 'Detox Tea', 'Lymphatic Drainage', 'Healthy Breakfast'],
      price: isSl ? 'Od €120' : language === 'de' ? 'Ab €120' : language === 'it' ? 'Da €120' : 'From €120',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title={isSl ? 'Wellness & Spa — Villa Adora' : language === 'de' ? 'Wellness & Spa — Villa Adora' : language === 'it' ? 'Wellness & Spa — Villa Adora' : 'Wellness & Spa — Villa Adora'}
        description={
          isSl
            ? 'Odkrijte naš luksuzni wellness center s finsko savno, turško kopeljo, masažami in jogo. Popolna relaksacija ob jezeru Bled.'
            : language === 'de'
            ? 'Entdecken Sie unser Luxus-Wellnesscenter mit finnischer Sauna, türkischem Bad, Massagen und Yoga. Komplette Entspannung am Bleder See.'
            : language === 'it'
            ? 'Scopri il nostro centro wellness di lusso con sauna finnese, bagno turco, massaggi e yoga. Relassamento completo sul lago di Bled.'
            : 'Discover our luxury wellness center with Finnish sauna, Turkish bath, massages, and yoga. Complete relaxation on Lake Bled.'
        }
        keywords={['wellness Bled', 'spa Bled', 'sauna Bled', 'massage Bled', 'yoga Bled', 'wellness hotel Slovenia']}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/wellness"
      />

      {/* Hero Banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=1920&h=800&fit=crop&q=80"
          alt="Villa Adora Wellness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20"
            >
              <SparklesIcon className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {isSl ? 'Wellness & Spa' : language === 'de' ? 'Wellness & Spa' : language === 'it' ? 'Wellness & Spa' : 'Wellness & Spa'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            >
              {isSl
                ? 'Popolna harmonija telesa in duha v našem ekskluzivnem wellness centru.'
                : language === 'de'
                ? 'Perfekte Harmonie von Körper und Geist in unserem exklusiven Wellnesscenter.'
                : language === 'it'
                ? 'Perfetta armonia di corpo e spirito nel nostro esclusivo centro wellness.'
                : 'Perfect harmony of body and mind in our exclusive wellness center.'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              {isSl ? 'Naše storitve' : language === 'de' ? 'Unsere Services' : language === 'it' ? 'I nostri servizi' : 'Our Services'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {isSl ? 'Wellness storitve' : language === 'de' ? 'Wellness-Angebote' : language === 'it' ? 'Servizi wellness' : 'Wellness Services'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              {isSl
                ? 'Vsaka storitev je zasnovana za vaše popolno sproščenje in regeneracijo.'
                : language === 'de'
                ? 'Jeder Service ist auf Ihre vollständige Entspannung und Regeneration ausgerichtet.'
                : language === 'it'
                ? 'Ogni servizio è progettato per il vostro completo relax e rigenerazione.'
                : 'Each service is designed for your complete relaxation and rejuvenation.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {isSl
                    ? service.id === 'sauna' ? 'Finska savna'
                    : service.id === 'turkishBath' ? 'Turška kopel'
                    : service.id === 'massage' ? 'Masaža'
                    : service.id === 'couplesMassage' ? 'Masaža za par'
                    : service.id === 'yoga' ? 'Joga'
                    : 'Meditacija'
                    : language === 'de'
                    ? service.id === 'sauna' ? 'Finnische Sauna'
                    : service.id === 'turkishBath' ? 'Türkisches Bad'
                    : service.id === 'massage' ? 'Massage'
                    : service.id === 'couplesMassage' ? 'Paarmassage'
                    : service.id === 'yoga' ? 'Yoga'
                    : 'Meditation'
                    : language === 'it'
                    ? service.id === 'sauna' ? 'Sauna finnese'
                    : service.id === 'turkishBath' ? 'Bagno turco'
                    : service.id === 'massage' ? 'Massaggio'
                    : service.id === 'couplesMassage' ? 'Massaggio per coppia'
                    : service.id === 'yoga' ? 'Yoga'
                    : 'Meditazione'
                    : service.id === 'sauna' ? 'Finnish Sauna'
                    : service.id === 'turkishBath' ? 'Turkish Bath'
                    : service.id === 'massage' ? 'Massage'
                    : service.id === 'couplesMassage' ? 'Couples Massage'
                    : service.id === 'yoga' ? 'Yoga'
                    : 'Meditation'}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {service.duration}
                  </span>
                  <span className={`font-semibold ${service.price === 'Included' || service.price === 'Vključeno' ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                    {service.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Packages */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
              {isSl ? 'Wellness paketi' : language === 'de' ? 'Wellness-Pakete' : language === 'it' ? 'Pacchetti wellness' : 'Wellness Packages'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {isSl ? 'Pripravljeni paketi za vas' : language === 'de' ? 'Kuratierte Pakete für Sie' : language === 'it' ? 'Pacchetti curati per voi' : 'Curated Packages for You'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{pkg.name}</h3>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent mb-6`}>
                    {pkg.price}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {pkg.services.map((service, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link to="/reservation">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 bg-gradient-to-r ${pkg.color} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                    >
                      {isSl ? 'Rezerviraj' : language === 'de' ? 'Buchen' : language === 'it' ? 'Prenota' : 'Book Now'}
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours & Info */}
      <section className="py-16 lg:py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                {isSl ? 'Ure in informacije' : language === 'de' ? 'Öffnungszeiten & Infos' : language === 'it' ? 'Orari e informazioni' : 'Hours & Information'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <ClockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {isSl ? 'Wellness center' : language === 'de' ? 'Wellnesscenter' : language === 'it' ? 'Centro wellness' : 'Wellness Center'}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {isSl ? 'Dnevno: 7:00 – 21:00' : language === 'de' ? 'Täglich: 7:00 – 21:00' : language === 'it' ? 'Quotidianamente: 7:00 – 21:00' : 'Daily: 7:00 – 21:00'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0">
                    <HeartIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {isSl ? 'Masaže' : language === 'de' ? 'Massagen' : language === 'it' ? 'Massaggi' : 'Massages'}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {isSl ? 'Po predhodni rezervaciji: 9:00 – 20:00' : language === 'de' ? 'Nach Voranmeldung: 9:00 – 20:00' : language === 'it' ? 'Su prenotazione: 9:00 – 20:00' : 'By appointment: 9:00 – 20:00'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <SunIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {isSl ? 'Joga' : language === 'de' ? 'Yoga' : language === 'it' ? 'Yoga' : 'Yoga'}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {isSl ? 'Dnevno ob 8:00 in 17:00' : language === 'de' ? 'Täglich um 8:00 und 17:00' : language === 'it' ? 'Quotidianamente alle 8:00 e 17:00' : 'Daily at 8:00 and 17:00'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=600&fit=crop&q=80"
                  alt="Wellness at Villa Adora"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 max-w-[240px]">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">100%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isSl
                    ? 'Brezplačen dostop za goste'
                    : language === 'de'
                    ? 'Kostenloser Zugang für Gäste'
                    : language === 'it'
                    ? 'Accesso gratuito per gli ospiti'
                    : 'Complimentary access for guests'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isSl ? 'Pripravljeni na popolno sprostitev?' : language === 'de' ? 'Bereit für vollständige Entspannung?' : language === 'it' ? 'Pronti per il relax totale?' : 'Ready for Complete Relaxation?'}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              {isSl
                ? 'Rezervirajte svoj wellness doživetje in pustite, da se začarani svet popolnega sproščanja.'
                : language === 'de'
                ? 'Buchen Sie Ihr Wellness-Erlebnis und lassen Sie sich in die Welt vollständiger Entspannung verzaubern.'
                : language === 'it'
                ? 'Prenota la tua esperienza wellness e lasciati incantare dal mondo del relax totale.'
                : 'Book your wellness experience and let yourself be enchanted by a world of complete relaxation.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/reservation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                >
                  {isSl ? 'Rezerviraj bivanje' : language === 'de' ? 'Aufenthalt buchen' : language === 'it' ? 'Prenota soggiorno' : 'Book Your Stay'}
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
                >
                  {isSl ? 'Več informacij' : language === 'de' ? 'Mehr Infos' : language === 'it' ? 'Più info' : 'More Info'}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Wellness;
