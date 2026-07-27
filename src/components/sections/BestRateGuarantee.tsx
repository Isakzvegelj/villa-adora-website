import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Clock, Phone, MapPin, Mail, Lock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const BestRateGuarantee = () => {
  const { language } = useLanguage();
  const isSl = language === 'sl';

  const guarantees = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: isSl ? 'Najboljša cena zagotovljena' : 'Best Rate Guarantee',
      desc: isSl
        ? 'Rezervirajte neposredno pri nas in našo najboljšo ceno. Če najdete nižjo ceno drugje, vam zagotavljamo enako.'
        : 'Book directly with us for the best rate. If you find a lower rate elsewhere, we\'ll match it.',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: isSl ? 'Brezplačna odpoved' : 'Free Cancellation',
      desc: isSl
        ? 'Brezplačna odpoved do 48 ur pred prihodom. V visoki sezoni do 72 ur.'
        : 'Free cancellation up to 48 hours before arrival. Up to 72 hours in high season.',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: isSl ? 'Varna rezervacija' : 'Secure Booking',
      desc: isSl
        ? 'Vaši podatki so zaščiteni s šifriranjem SSL. Sprejemamo vse glavne kreditne kartice.'
        : 'Your data is protected with SSL encryption. We accept all major credit cards.',
    },
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: isSl ? 'Preverjen hotel' : 'Verified Hotel',
      desc: isSl
        ? 'Villa Adora je prejela oceno 4.9/5 od več kot 300 gostov na Booking.com, Google in TripAdvisor.'
        : 'Villa Adora has a 4.9/5 rating from over 300 verified guests on Booking.com, Google & TripAdvisor.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            {isSl ? 'Zaupanje gostov' : 'Guest Confidence'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {isSl ? 'Zakaj rezervirati pri nas?' : 'Why Book With Us?'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isSl
              ? 'Vaše zadovoljstvo je naša prioriteta. Zagotavljamo vam najboljšo izkušnjo od rezervacije do odhoda.'
              : 'Your satisfaction is our priority. We guarantee the best experience from booking to checkout.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                {g.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{g.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isSl ? 'Imate vprašanja? Pokličite nas:' : 'Have questions? Call us:'}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">+386 4 574 10 00</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isSl ? 'Ali nam pošljite e-pošto:' : 'Or email us:'}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">info@villa-adora-bled.si</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isSl ? 'Lokacija:' : 'Location:'}
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">Bled, Slovenia</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BestRateGuarantee;
