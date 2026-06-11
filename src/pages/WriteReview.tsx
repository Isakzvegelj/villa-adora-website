import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, UserIcon } from '@heroicons/react/24/outline';

interface ReviewForm {
  guestName: string;
  email: string;
  suite: string;
  stayDate: string;
  rating: number;
  title: string;
  review: string;
  wouldRecommend: boolean | null;
  categories: {
    cleanliness: number;
    location: number;
    service: number;
    value: number;
    breakfast: number;
  };
}

const SUITES = [
  'Princess Suite',
  'Luxury Suite',
  'Penthouse Suite',
  'Swan Suite',
  'Island Suite',
  'Deluxe Suite',
  'Superior Suite',
  'Prestige Suite',
];

const CATEGORY_LABELS: Record<string, Partial<Record<keyof ReviewForm['categories'], string>>> = {
  en: { cleanliness: 'Cleanliness', location: 'Location', service: 'Service', value: 'Value for Money', breakfast: 'Breakfast' },
  sl: { cleanliness: 'Čistoča', location: 'Lokacija', service: 'Storitev', value: 'Vrednost', breakfast: 'Zajtrk' },
  de: { cleanliness: 'Sauberkeit', location: 'Lage', service: 'Service', value: 'Preis-Leistung', breakfast: 'Frühstück' },
  it: { cleanliness: 'Pulizia', location: 'Posizione', service: 'Servizio', value: 'Rapporto qualità-prezzo', breakfast: 'Colazione' },
};

const WriteReview = () => {
  const { language } = useLanguage();
  const lang = language || 'en';
  const labels = CATEGORY_LABELS[lang] || CATEGORY_LABELS.en;

  const [form, setForm] = useState<ReviewForm>({
    guestName: '',
    email: '',
    suite: '',
    stayDate: '',
    rating: 0,
    title: '',
    review: '',
    wouldRecommend: null,
    categories: { cleanliness: 0, location: 0, service: 0, value: 0, breakfast: 0 },
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [hoverCategories, setHoverCategories] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewForm, string>>>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.guestName.trim()) newErrors.guestName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.suite) newErrors.suite = 'Required';
    if (!form.stayDate) newErrors.stayDate = 'Required';
    if (form.rating === 0) newErrors.rating = 'Required';
    if (!form.title.trim() || form.title.trim().length < 5) newErrors.title = 'Min 5 characters';
    if (!form.review.trim() || form.review.trim().length < 30) newErrors.review = 'Min 30 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const reviewData = {
      ...form,
      submittedAt: new Date().toISOString(),
      language: lang,
    };

    // Store in localStorage for admin pickup
    try {
      const existing = JSON.parse(localStorage.getItem('villa_adora_reviews') || '[]');
      existing.push(reviewData);
      localStorage.setItem('villa_adora_reviews', JSON.stringify(existing));
    } catch {
      // localStorage unavailable
    }

    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const updateField = (field: keyof ReviewForm, value: ReviewForm[keyof ReviewForm]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setCategoryRating = (cat: keyof ReviewForm['categories'], val: number) => {
    setForm((prev) => ({
      ...prev,
      categories: { ...prev.categories, [cat]: val },
    }));
  };

  const StarRating = ({
    value,
    onChange,
    hoverVal,
    onHover,
    size = 'w-7 h-7',
  }: {
    value: number;
    onChange: (v: number) => void;
    hoverVal?: number;
    onHover?: (v: number) => void;
    size?: string;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hoverVal || value) >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            {filled ? (
              <StarIcon className={`${size} text-amber-400`} />
            ) : (
              <StarOutlineIcon className={`${size} text-gray-300`} />
            )}
          </button>
        );
      })}
    </div>
  );

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 max-w-lg mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {lang === 'sl' ? 'Hvala za vaše mnenje!' : lang === 'de' ? 'Vielen Dank für Ihre Bewertung!' : lang === 'it' ? 'Grazie per la tua recensione!' : 'Thank You for Your Review!'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            {lang === 'sl'
              ? 'Vaše mnenje nam je pomembno. Pregledali ga bomo in objavili v kratkem.'
              : lang === 'de'
              ? 'Ihre Bewertung ist uns wichtig. Wir werden sie in Kürze prüfen und veröffentlichen.'
              : lang === 'it'
              ? 'La tua recensione è importante per noi. La esamineremo e la pubblicheremo a breve.'
              : "Your review means a lot to us. We'll review it and publish it shortly."}
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
            {lang === 'sl' ? 'Poslali smo potrdilo na ' : 'A confirmation was sent to '}
            <strong>{form.email}</strong>
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setForm({
                guestName: '', email: '', suite: '', stayDate: '',
                rating: 0, title: '', review: '', wouldRecommend: null,
                categories: { cleanliness: 0, location: 0, service: 0, value: 0, breakfast: 0 },
              });
            }}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            {lang === 'sl' ? 'Napišite še eno mnenje' : 'Write another review'}
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title={lang === 'sl' ? 'Napišite mnenje — Villa Adora' : 'Write a Review — Villa Adora'}
        description="Share your experience at Villa Adora. Your feedback helps us improve and helps future guests discover Lake Bled's finest boutique hotel."
        canonicalUrl="https://villa-adora-bled.si/review"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">
            <StarIcon className="w-4 h-4" />
            {lang === 'sl' ? 'Gostinska mnenja' : lang === 'de' ? 'Gästebewertungen' : lang === 'it' ? 'Recensioni degli ospiti' : 'Guest Reviews'}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {lang === 'sl' ? 'Delite svojo izkušnjo' : lang === 'de' ? 'Teilen Sie Ihre Erfahrung' : lang === 'it' ? 'Condividi la tua esperienza' : 'Share Your Experience'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {lang === 'sl'
              ? 'Vaše mnenje nam pomaga izboljšati storitve in gostom odkriti Villa Adoro.'
              : 'Your feedback helps us improve and helps future guests discover Villa Adora.'}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 dark:border-slate-800"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Overall Rating */}
            <div className="text-center">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                {lang === 'sl' ? 'Splošna ocena' : lang === 'de' ? 'Gesamtbewertung' : lang === 'it' ? 'Valutazione complessiva' : 'Overall Rating'}
              </label>
              <div className="flex justify-center">
                <StarRating
                  value={form.rating}
                  onChange={(v) => updateField('rating', v)}
                  hoverVal={hoverRating}
                  onHover={setHoverRating}
                  size="w-10 h-10"
                />
              </div>
              {form.rating > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm font-medium text-amber-600"
                >
                  {form.rating === 5
                    ? (lang === 'sl' ? 'Odlično!' : 'Excellent!')
                    : form.rating === 4
                    ? (lang === 'sl' ? 'Zelo dobro' : 'Very Good')
                    : form.rating === 3
                    ? (lang === 'sl' ? 'Dobro' : 'Good')
                    : form.rating === 2
                    ? (lang === 'sl' ? 'Slabo' : 'Fair')
                    : (lang === 'sl' ? 'Zelo slabo' : 'Poor')}
                </motion.p>
              )}
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>

            {/* Category Ratings */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">
                {lang === 'sl' ? 'Področne ocene' : 'Rate by Category'}
              </h3>
              {(Object.keys(labels) as Array<keyof ReviewForm['categories']>).map((cat) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{labels[cat]}</span>
                  <StarRating
                    value={form.categories[cat as keyof typeof form.categories]}
                    onChange={(v) => setCategoryRating(cat, v)}
                    hoverVal={hoverCategories[cat]}
                    onHover={(v) => setHoverCategories((prev) => ({ ...prev, [cat]: v }))}
                    size="w-5 h-5"
                  />
                </div>
              ))}
            </div>

            {/* Guest Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4" />
                  {lang === 'sl' ? 'Ime in priimek' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={form.guestName}
                  onChange={(e) => updateField('guestName', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.guestName ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                  placeholder="Janez Novak"
                />
                {errors.guestName && <span className="text-red-500 text-xs">{errors.guestName}</span>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                  placeholder="janez@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {lang === 'sl' ? 'Suite' : 'Suite'}
                </label>
                <select
                  value={form.suite}
                  onChange={(e) => updateField('suite', e.target.value)}
                  className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.suite ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                >
                  <option value="">{lang === 'sl' ? 'Izberite suite' : 'Select suite'}</option>
                  {SUITES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.suite && <span className="text-red-500 text-xs">{errors.suite}</span>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {lang === 'sl' ? 'Datum bivanja' : 'Stay Date'}
                </label>
                <input
                  type="month"
                  value={form.stayDate}
                  onChange={(e) => updateField('stayDate', e.target.value)}
                  max={new Date().toISOString().slice(0, 7)}
                  className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.stayDate ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                />
                {errors.stayDate && <span className="text-red-500 text-xs">{errors.stayDate}</span>}
              </div>
            </div>

            {/* Review Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {lang === 'sl' ? 'Naslov mnenja' : 'Review Title'}
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.title ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                placeholder={lang === 'sl' ? 'Npr. Čudovit občutek ob jezeru' : 'e.g. Magical stay with lake views'}
              />
              {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
            </div>

            {/* Review Body */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {lang === 'sl' ? 'Vaše mnenja' : 'Your Review'}
              </label>
              <textarea
                value={form.review}
                onChange={(e) => updateField('review', e.target.value)}
                rows={6}
                className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.review ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors resize-none`}
                placeholder={lang === 'sl'
                  ? 'Opišite svojo izkušnjo... Kaj vam je bilo všeč? Kako so bile storitve? Ali bi priporočili Villa Adoro?'
                  : 'Describe your experience... What did you enjoy? How was the service? Would you recommend Villa Adora?'}
              />
              <div className="flex justify-between items-center">
                {errors.review && <span className="text-red-500 text-xs">{errors.review}</span>}
                <span className={`text-xs ml-auto ${form.review.length < 30 ? 'text-slate-400' : 'text-green-500'}`}>
                  {form.review.length}/30 min
                </span>
              </div>
            </div>

            {/* Would Recommend */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {lang === 'sl' ? 'Ali bi priporočili Villa Adoro?' : 'Would you recommend Villa Adora?'}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => updateField('wouldRecommend', true)}
                  className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    form.wouldRecommend === true
                      ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'border-slate-200 text-slate-500 hover:border-green-300'
                  }`}
                >
                  👍 {lang === 'sl' ? 'Da, zagotovo!' : 'Yes, definitely!'}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('wouldRecommend', false)}
                  className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    form.wouldRecommend === false
                      ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      : 'border-slate-200 text-slate-500 hover:border-red-300'
                  }`}
                >
                  👎 {lang === 'sl' ? 'Ne' : 'No'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {lang === 'sl' ? 'Pošiljanje...' : 'Submitting...'}
                </span>
              ) : (
                lang === 'sl' ? 'Pošlji mnenje ⭐' : 'Submit Review ⭐'
              )}
            </motion.button>

            <p className="text-xs text-slate-400 text-center">
              {lang === 'sl'
                ? 'Z vašim mnenjem se strinjate, da ga lahko objavimo na naši spletni strani. Vaš e-poštni naslov ne bo objavljen.'
              : 'By submitting, you agree that we may publish your review on our website. Your email will not be published.'}
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WriteReview;
