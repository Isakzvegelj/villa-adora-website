import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  BeakerIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { PageSEO } from '../components/ui/PageSEO';

const IMG = '/villa-adora-website/images/adora/real';

const TIME_SLOTS = ['12:00', '13:00', '18:00', '19:00', '20:00', '21:00'];
const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8+'];
const OCCASIONS = ['Dinner', 'Lunch', 'Wine Tasting', 'Celebration', 'Business Dinner', 'Other'];

interface RestaurantForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  note: string;
}

const Restaurant = () => {
  const { language } = useLanguage();
  const isSL = language === 'sl';

  const [form, setForm] = useState<RestaurantForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: TIME_SLOTS[2],
    guests: '2',
    occasion: OCCASIONS[0],
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (field: keyof RestaurantForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.date) return;

    const subject = `${isSL ? 'Rezervacija mize' : 'Restaurant reservation'} — ${form.firstName} ${form.lastName} · ${form.date} ${form.time} · ${form.guests} ${isSL ? 'oseb' : 'guest(s)'}`;
    const body = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '-'}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Guests: ${form.guests}`,
      `Occasion: ${form.occasion}`,
      `Note: ${form.note || '-'}`,
    ].join('\n');

    window.location.href = `mailto:evita.vilebled@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm';

  const labelClass = 'block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title="Adora Pop Up Restaurant — Book a Table | Villa Adora Bled"
        description="Reserve a table at Adora Pop Up Restaurant at Villa Adora on Lake Bled. Tasting menu by Chef Domen Demšar with Slovenian wines, served on the lakeside terrace."
        keywords={['Adora restaurant Bled', 'restaurant Lake Bled', 'book table Bled', 'Villa Adora restaurant', 'fine dining Bled']}
        ogImage={`https://villa-adora-bled.si/images/adora/real/restaurant-adora.jpg`}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/restaurant"
      />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={`${IMG}/restaurant-adora.jpg`}
          alt="Adora Pop Up Restaurant terrace at Villa Adora"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-900/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-max px-4 sm:px-6 lg:px-8 pb-14">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/90 text-white text-sm font-semibold rounded-full mb-4 backdrop-blur-sm"
            >
              <SparklesIcon className="w-4 h-4" />
              {isSL ? 'Restavracija z okusom Slovenije' : 'A Taste of Slovenia'}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-4xl md:text-6xl font-bold text-white font-serif mb-3"
            >
              Adora Pop Up Restaurant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/85 max-w-2xl"
            >
              {isSL
                ? 'Intimna kulinarična izkušnja na bregu Blejskega jezera — Chef Domen Demšar.'
                : 'An intimate dining experience on the shore of Lake Bled — Chef Domen Demšar.'}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Info + facts */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-semibold rounded-full mb-4">
                  {isSL ? 'O restavraciji' : 'About the Restaurant'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-5 font-serif">
                  {isSL ? 'Skriti kulinarični biser ob jezeru' : 'A Hidden Culinary Gem on Lake Bled'}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {isSL
                    ? 'Adora Pop Up Restaurant se skriva v steni luksuznega butičnega hotela Villa Adora, neposredno na obali Blejskega jezera. Naša kuhinja pod vodstvom chefa Domena Demšara združuje najboljše slovenske sestavine s francosko tehniko — vsaka jed pripoveduje zgodbo naše dežele.'
                    : 'Adora Pop Up Restaurant is tucked inside the stunning Adora Luxury Hotel, right on the shore of Lake Bled. Our kitchen, led by Chef Domen Demšar, blends the finest Slovenian ingredients with French technique — every plate tells the story of our land.'}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {isSL
                    ? 'Večerja poteka na naši panoramski terasi s pogledom na jezero in grad Bled, ob sončnem zahodu pa se spremeni v eno najromantičnejših izkušenj ob jezeru. Na voljo so tudi veganske, vegetarijanske in brezglutenske možnosti.'
                    : 'Dinner is served on our panoramic terrace overlooking the lake and Bled Castle — as the sun sets it becomes one of the most romantic experiences by the lake. Vegan, vegetarian and gluten-free options are always available.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  {[
                    {
                      icon: <BeakerIcon className="w-6 h-6" />,
                      title: isSL ? 'Degustacijski meni' : 'Tasting Menu',
                      value: isSL ? '~€65 na osebo' : '~€65 per person',
                    },
                    {
                      icon: <SunIcon className="w-6 h-6" />,
                      title: isSL ? 'Vinska spremljava' : 'Wine Pairing',
                      value: isSL ? '~€35 na osebo' : '~€35 per person',
                    },
                    {
                      icon: <ClockIcon className="w-6 h-6" />,
                      title: isSL ? 'Zajtrk' : 'Breakfast',
                      value: isSL ? 'Dnevno · 7:30–10:30' : 'Daily · 7:30–10:30',
                    },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/40 rounded-2xl p-5"
                    >
                      <div className="text-amber-600 dark:text-amber-400 mb-3">{f.icon}</div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{f.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{f.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery strip */}
              <div className="grid grid-cols-3 gap-3 mt-10">
                {[
                  { src: `${IMG}/restaurant-adora.jpg`, alt: 'Adora Pop Up Restaurant' },
                  { src: `${IMG}/breakfast-real.jpg`, alt: 'Chef Domen Demšar cuisine' },
                  { src: `${IMG}/hero-full.jpg`, alt: 'Lake Bled panorama from the terrace' },
                ].map((img, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
                  />
                ))}
              </div>
            </div>

            {/* Reservation form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 lg:p-8 sticky top-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <CalendarDaysIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {isSL ? 'Rezervirajte mizo' : 'Book a Table'}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {isSL
                        ? 'Izpolnite obrazec — pošljemo vam potrditev.'
                        : 'Fill in the form — we will confirm your booking.'}
                    </p>
                  </div>
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-sm text-emerald-700 dark:text-emerald-300 flex gap-2"
                  >
                    <CheckCircleIcon className="w-5 h-5 shrink-0" />
                    <span>
                      {isSL
                        ? 'Vaš e-poštni odjemalec se je odprl z izpolnjeno rezervacijo. Prejeli boste potrditev po e-pošti ali telefonu.'
                        : 'Your email app has opened with your reservation pre-filled. You will receive a confirmation by email or phone.'}
                    </span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>{isSL ? 'Ime' : 'First Name'} *</label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className={inputClass}
                        placeholder={isSL ? 'Ana' : 'Anna'}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{isSL ? 'Priimek' : 'Last Name'}</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className={inputClass}
                        placeholder={isSL ? 'Kovač' : 'Novak'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>{isSL ? 'Telefon' : 'Phone'}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={inputClass}
                      placeholder="+386 ..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>{isSL ? 'Datum' : 'Date'} *</label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{isSL ? 'Ura' : 'Time'}</label>
                      <select
                        value={form.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        className={inputClass}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>{isSL ? 'Št. oseb' : 'Guests'}</label>
                      <div className="relative">
                        <select
                          value={form.guests}
                          onChange={(e) => handleChange('guests', e.target.value)}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          {GUEST_OPTIONS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        <UserGroupIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{isSL ? 'Priložnost' : 'Occasion'}</label>
                      <select
                        value={form.occasion}
                        onChange={(e) => handleChange('occasion', e.target.value)}
                        className={inputClass}
                      >
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o}>
                            {isSL
                              ? { Dinner: 'Večerja', Lunch: 'Kosilo', 'Wine Tasting': 'Degustacija vin', Celebration: 'Praznovanje', 'Business Dinner': 'Poslovna večerja', Other: 'Drugo' }[o] ?? o
                              : o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{isSL ? 'Sporočilo' : 'Special Requests'}</label>
                    <textarea
                      rows={3}
                      value={form.note}
                      onChange={(e) => handleChange('note', e.target.value)}
                      className={inputClass}
                      placeholder={
                        isSL
                          ? 'Alergije, prehranske zahteve, posebne želje ...'
                          : 'Allergies, dietary requirements, special wishes ...'
                      }
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    {isSL ? 'Pošlji rezervacijo' : 'Send Reservation'}
                  </motion.button>

                  <div className="text-xs text-slate-400 dark:text-slate-500 text-center">
                    {isSL
                      ? 'Rezervacija se odpre v vašem e-poštnem odjemalcu, naslovljena na recepcijo.'
                      : 'Your request opens in your email app, addressed to our reception.'}
                  </div>
                </form>

                {/* Contact quick actions */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                  <a
                    href="tel:+38651603858"
                    className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <PhoneIcon className="w-4 h-4" />
                    </span>
                    {isSL ? 'Pokličite nas' : 'Call us'} — +386 51 603 858
                  </a>
                  <a
                    href="mailto:evita.vilebled@gmail.com"
                    className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <EnvelopeIcon className="w-4 h-4" />
                    </span>
                    evita.vilebled@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-9 h-9 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <MapPinIcon className="w-4 h-4" />
                    </span>
                    {isSL
                      ? 'Villa Adora, Cesta svobode 35, Bled'
                      : 'Villa Adora, Cesta svobode 35, Bled'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Restaurant;
