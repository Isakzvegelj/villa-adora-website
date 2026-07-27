import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import {
  HeartIcon,
  PhotoIcon,
  UsersIcon,
  CakeIcon,
  SparklesIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Weddings = () => {
  const { language } = useLanguage();
  const isSl = language === 'sl';

  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'weddings.hero.title': { en: 'Weddings & Celebrations', sl: 'Poroke in proslave', de: 'Hochzeiten & Feiern', it: 'Matrimoni e Celebrazioni' },
      'weddings.hero.subtitle': {
        en: 'Create unforgettable moments at Villa Adora — a heritage villa on the shores of Lake Bled, where Alpine elegance meets intimate celebration.',
        sl: 'Ustvarite nepozabne trenutke v Villi Adori — dediščinski vili ob jezeru Bled, kjer se alpska eleganka sreča z intimno proslavo.',
        de: 'Schaffen Sie unvergessliche Momente in der Villa Adora — einer historischen Villa am Ufer des Bleder Sees.',
        it: 'Create momenti indimenticabili a Villa Adora — una villa storica sulle rive del Lago di Bled.',
      },
      'weddings.why.title': { en: 'Why Choose Villa Adora', sl: 'Zakaj izbrati Villo Adoro', de: 'Warum Villa Adora wählen', it: 'Perché scegliere Villa Adora' },
      'weddings.why.heritage': { en: 'Heritage Villa', sl: 'Dediščinska villa', de: 'Historische Villa', it: 'Villa Storica' },
      'weddings.why.heritage.desc': { en: 'A beautifully restored 1878 villa with authentic Slovenian charm and modern luxury.', sl: 'Čudovito obnovljena villa iz leta 1878 s pristnim slovenskim čarom.', de: 'Eine wunderschön restaurierte Villa aus dem Jahr 1878.', it: 'Una villa magnificamente restaurata del 1878.' },
      'weddings.why.lakefront': { en: 'Lakefront Setting', sl: 'Lokacija ob jezeru', de: 'Seeblick-Lage', it: 'Posizione sul lago' },
      'weddings.why.lakefront.desc': { en: 'Exchange vows with panoramic views of Lake Bled, Bled Island, and the Julian Alps.', sl: 'Izmjenjajte obsege s panoramskim pogledom na jezero Bled in Julijske Alpe.', de: 'Panoramablick auf den Bleder See, die Insel und die Julischen Alpen.', it: 'Vista panoramica sul Lago di Bled, l\'isola e le Alpi Giulie.' },
      'weddings.why.intimate': { en: 'Intimate & Exclusive', sl: 'Intimno in ekskluzivno', de: 'Intim & Exklusiv', it: 'Intimo ed Esclusivo' },
      'weddings.why.intimate.desc': { en: 'With only 7 suites, your celebration feels private, personal, and truly special.', sl: 'S samo 7 suitami je vaša proslava zasebna, osebna in resnično posebna.', de: 'Mit nur 7 Suiten fühlt sich Ihre Feier privat und persönlich an.', it: 'Con solo 7 suite, la vostra celebrazione è privata e personale.' },
      'weddings.why.culinary': { en: 'Exceptional Culinary', sl: 'Izredna kulinarika', de: 'Ausgezeichnete Küche', it: 'Cucina Eccellente' },
      'weddings.why.culinary.desc': { en: 'Chef Domen Demšar creates bespoke menus using the finest local Slovenian ingredients.', sl: 'Kuhar Domen Demšar ustvarja jedilnike po meri z najboljšimi lokalnimi slovenskimi sestavinami.', de: 'Koch Domen Demšar kreiert maßgeschneiderte Menüs mit slowenischen Zutaten.', it: 'Lo Chef Domen Demšar crea menu personalizzati con ingredienti sloveni.' },
      'weddings.packages.title': { en: 'Wedding Packages', sl: 'Paketi porok', de: 'Hochzeitspakete', it: 'Pacchetti Matrimonio' },
      'weddings.packages.subtitle': { en: 'Tailored to make your special day perfect', sl: 'Prilagojeni za popoln poseben dan', de: 'Maßgeschneidert für Ihren besonderen Tag', it: 'Su misura per il vostro giorno speciale' },
      'weddings.packages.garden.title': { en: 'Garden Ceremony', sl: 'Vrtna ceremonija', de: 'Gartenzeremonie', it: 'Cerimonia nel Giardino' },
      'weddings.packages.garden.desc': { en: 'An intimate garden ceremony for up to 30 guests, surrounded by blooming flowers and lake views.', sl: 'Intimna vrtna ceremonija za do 30 gostov, obdana z cvetočimi cvetlicami in pogledom na jezero.', de: 'Intime Gartenzeremonie für bis zu 30 Gäste mit Seeblick.', it: 'Intima cerimonia nel giardino per ospiti, con fiori e vista lago.' },
      'weddings.packages.garden.price': { en: 'From €2,500', sl: 'Od €2.500', de: 'Ab €2.500', it: 'Da €2.500' },
      'weddings.packages.full.title': { en: 'Full Villa Experience', sl: 'Celotno doživetje Vile Adore', de: 'Komplettes Villa-Erlebnis', it: 'Esperienza Villa Completa' },
      'weddings.packages.full.desc': { en: 'Exclusive use of Villa Adora for your wedding weekend — all 7 suites, restaurant, and garden.', sl: 'Ekskluzivna uporaba Vile Adore za vaš vikend — vse 7 suit, restavracija in vrt.', de: 'Exklusive Nutzung der Villa Adora für Ihr Hochzeitswochenende.', it: 'Uso esclusivo di Villa Adora per il vostro weekend di nozze.' },
      'weddings.packages.full.price': { en: 'From €8,000', sl: 'Od €8.000', de: 'Ab €8.000', it: 'Da €8.000' },
      'weddings.packages.elopement.title': { en: 'Elopement Package', sl: 'Paket za pobeg', de: 'Heiratsflucht-Paket', it: 'Pacchetto Fuga' },
      'weddings.packages.elopement.desc': { en: 'A romantic escape for two — ceremony, dinner, and a luxury suite with lake views.', sl: 'Romantični pobeg za dva — ceremonija, večerja in luksuzna suite s pogledom na jezero.', de: 'Romantische Flucht für zwei — Zeremonie, Abendessen und Luxussuite.', it: 'Fuga romantica per due — cerimonia, cena e suite di lusso.' },
      'weddings.packages.elopement.price': { en: 'From €1,200', sl: 'Od €1.200', de: 'Ab €1.200', it: 'Da €1.200' },
      'weddings.includes': { en: 'Includes', sl: 'Vključuje', de: 'Enthält', it: 'Include' },
      'weddings.cta.title': { en: 'Start Planning Your Dream Wedding', sl: 'Začnite načrtovati sanjsko poroko', de: 'Beginnen Sie mit der Planung', it: 'Iniziate a pianificare' },
      'weddings.cta.subtitle': { en: 'Our concierge team will help you create a truly unforgettable celebration.', sl: 'Naš concierge vam bo pomagal ustvariti resnično nepozabno proslavo.', de: 'Unser Concierge-Team hilft Ihnen bei der Planung.', it: 'Il nostro concierge vi aiuterà a creare una celebrazione indimenticabile.' },
      'weddings.gallery.title': { en: 'Celebrations at Villa Adora', sl: 'Proslave v Villi Adori', de: 'Feiern in der Villa Adora', it: 'Celebrazioni a Villa Adora' },
      'weddings.testimonials.title': { en: 'What Couples Say', sl: 'Kaj pravijo pari', de: 'Was Paare sagen', it: 'Cosa dicono le coppie' },
      'weddings.faq.title': { en: 'Frequently Asked Questions', sl: 'Pogosta vprašanja', de: 'Häufig gestellte Fragen', it: 'Domande Frequenti' },
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const packages = [
    {
      id: 'garden',
      icon: <HeartIcon className="w-8 h-8" />,
      color: 'from-rose-500 to-pink-500',
      bgLight: 'bg-rose-50 dark:bg-rose-900/20',
      features: [
        isSl ? 'Ceremonija v vrtu do 30 gostov' : 'Garden ceremony for up to 30 guests',
        isSl ? 'Pletna ura vina' : 'Wine toast',
        isSl ? 'Aranžma za ceremonijo' : 'Ceremony arrangement',
        isSl ? 'Večerja za pare' : 'Dinner for the couple',
        isSl ? 'Suite za poročno noč' : 'Wedding night suite',
        isSl ? 'Fotograf (3 ure)' : 'Photographer (3 hours)',
      ],
    },
    {
      id: 'full',
      icon: <SparklesIcon className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500',
      bgLight: 'bg-indigo-50 dark:bg-indigo-900/20',
      features: [
        isSl ? 'Ekskluzivna uporaba vile' : 'Exclusive villa use',
        isSl ? 'Vseh 7 suit za vikend' : 'All 7 suites for the weekend',
        isSl ? 'Restavracija za zabavo' : 'Restaurant for the reception',
        isSl ? 'Polni vrt in terasa' : 'Full garden & terrace',
        isSl ? 'Chef Domen Demšar — meni po meri' : 'Chef Domen Demšar — bespoke menu',
        isSl ? 'Wellness za pare' : 'Couples wellness session',
        isSl ? 'Pletna vožnja na otok' : 'Pletna boat ride to island',
        isSl ? 'Koordinator dogodka' : 'Event coordinator',
      ],
      popular: true,
    },
    {
      id: 'elopement',
      icon: <StarIcon className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50 dark:bg-amber-900/20',
      features: [
        isSl ? 'Romantična ceremonija za dva' : 'Romantic ceremony for two',
        isSl ? 'Posebna lokacija (vrt/terasa)' : 'Special location (garden/terrace)',
        isSl ? 'Butična večerja na terasi' : 'Gourmet dinner on terrace',
        isSl ? 'Luksuzna suite s pogledom' : 'Luxury suite with view',
        isSl ? 'Masaža za pare' : 'Couples massage',
        isSl ? 'Brezplačen prevoz iz letališča' : 'Complimentary airport transfer',
      ],
    },
  ];

  const faqs = [
    {
      q: isSl ? 'Koliko gostov lahko povabimo?' : 'How many guests can we invite?',
      a: isSl ? 'Naša vrtna lokacija sprejme do 30 gostov. Za manjše zabave v restavraciji je na voljo do 20 gostov. Za večje skupine lahko organiziramo tudi zunanjih prireditev.' : 'Our garden venue accommodates up to 30 guests. For smaller receptions in the restaurant, up to 20 guests. For larger groups, we can arrange off-site events.',
    },
    {
      q: isSl ? 'Ali lahko prinesemo lastnega ponudnika hrane?' : 'Can we bring our own caterer?',
      a: isSl ? 'Priporočamo našega kuharja Domena Demšarja, ki ustvarja izredne jedi po meri. Če imate posebne prehranske zahteve ali želje, se z nami posvetujemo — z veseljem prilagodimo meni.' : 'We recommend our Chef Domen Demšar, who creates exceptional bespoke dishes. If you have specific dietary requirements or preferences, we\'re happy to customize the menu.',
    },
    {
      q: isSl ? 'Kakšna je politika odpovedi?' : 'What is the cancellation policy?',
      a: isSl ? 'Do 90 dni pred dogodkom: brezplačna odpoved. 30-90 dni: 50% povračila. Manj kot 30 dni: brez povračila. Priporačilo 30% ob rezervaciji.' : 'Up to 90 days before: free cancellation. 30-90 days: 50% refund. Less than 30 days: no refund. 30% deposit required at booking.',
    },
    {
      q: isSl ? 'Ali imate sezamske pakete?' : 'Do you have seasonal packages?',
      a: isSl ? 'Da! Poletni paketi (junij-avgust) vključujejo vrtno ceremonijo in večerjo na terasi. Zimski paketi (december-februar) vključujejo romantično večerjo ob svečah in wellness. Spomladanski/jesenski paketi so cenejši.' : 'Yes! Summer packages (June-August) include garden ceremony and terrace dinner. Winter packages (December-February) include candlelit dinner and wellness. Spring/Autumn packages offer better value.',
    },
    {
      q: isSl ? 'Ali lahko organiziramo tudi druge vrste proslav?' : 'Can we host other types of celebrations?',
      a: isSl ? 'Seveda! Villa Adora je idealna za obletnice, rojstne dneve, obnovitve zaupel in korporativne retreate. Kontaktirajte nas za ponudbo po meri.' : 'Absolutely! Villa Adora is perfect for anniversaries, birthdays, vow renewals, and corporate retreats. Contact us for a custom quote.',
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
        title={`${t('weddings.hero.title')} — Villa Adora, Lake Bled`}
        description={
          isSl
            ? 'Poroke in proslave v Villi Adori — dediščinski vili ob jezeru Bled. Intimne ceremonije, izredna kulinarika in nepozabni trenutki.'
            : 'Weddings & celebrations at Villa Adora — a heritage villa on Lake Bled. Intimate ceremonies, exceptional cuisine, and unforgettable moments.'
        }
        keywords={['wedding venue Bled', 'Lake Bled wedding', 'Slovenia wedding villa', 'intimate wedding venue', 'Villa Adora wedding', 'poroka Bled']}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/weddings"
      />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&q=80"
            alt="Wedding at Villa Adora"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20"
            >
              <HeartIcon className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t('weddings.hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto"
            >
              {t('weddings.hero.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-14"
          >
            {t('weddings.why.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MapPinIcon className="w-8 h-8" />, title: t('weddings.why.heritage'), desc: t('weddings.why.heritage.desc'), color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              { icon: <PhotoIcon className="w-8 h-8" />, title: t('weddings.why.lakefront'), desc: t('weddings.why.lakefront.desc'), color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: <UsersIcon className="w-8 h-8" />, title: t('weddings.why.intimate'), desc: t('weddings.why.intimate.desc'), color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: <CakeIcon className="w-8 h-8" />, title: t('weddings.why.culinary'), desc: t('weddings.why.culinary.desc'), color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('weddings.packages.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t('weddings.packages.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border ${pkg.popular ? 'border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-200 dark:ring-indigo-800' : 'border-slate-100 dark:border-slate-800'}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    {isSl ? 'Najbolj priljubljen' : 'Most Popular'}
                  </div>
                )}
                <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                  {pkg.icon}
                  <h3 className="text-xl font-bold mt-3">{t(`weddings.packages.${pkg.id}.title`)}</h3>
                  <p className="text-2xl font-bold mt-2">{t(`weddings.packages.${pkg.id}.price`)}</p>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    {t(`weddings.packages.${pkg.id}.desc`)}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                      {t('weddings.includes')}
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${pkg.color} shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      {isSl ? 'Poizvedite' : 'Inquire Now'}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          >
            {t('weddings.gallery.title')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80', alt: 'Wedding ceremony' },
              { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop&q=80', alt: 'Wedding dinner' },
              { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&q=80', alt: 'Couple at venue' },
              { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80', alt: 'Wedding rings' },
              { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=400&fit=crop&q=80', alt: 'Reception setup' },
              { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop&q=80', alt: 'Lake Bled view' },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          >
            {t('weddings.testimonials.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: isSl
                  ? 'Villa Adora je bila sanjska lokacija za našo poroko. Pogled na jezero, izjemna hrana in osebna pozornost — vse je bilo popolno.'
                  : 'Villa Adora was the dream location for our wedding. The lake view, exceptional food, and personal attention — everything was perfect.',
                author: 'Maja & Peter',
                date: isSl ? 'September 2024' : 'September 2024',
              },
              {
                quote: isSl
                  ? 'Naš pobeg v Bled je bil čudovit. Intimna ceremonija na terasi ob jezeru, večerja pod zvezdami — ne bi moglo biti lepše.'
                  : 'Our elopement to Bled was magical. An intimate ceremony on the terrace by the lake, dinner under the stars — it couldn\'t have been more beautiful.',
                author: 'Sarah & James',
                date: isSl ? 'Junij 2025' : 'June 2025',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{testimonial.author}</p>
                    <p className="text-xs text-slate-500">{testimonial.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          >
            {t('weddings.faq.title')}
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: activeFaq === i ? 45 : 0 }}
                    className="text-indigo-500 text-2xl flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {t('weddings.cta.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/85 mb-8 max-w-2xl mx-auto"
          >
            {t('weddings.cta.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-rose-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5" />
                {isSl ? 'Pišite nam' : 'Contact Us'}
              </motion.button>
            </Link>
            <a href="tel:+38651603858">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                +386 51 603 858
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Weddings;
