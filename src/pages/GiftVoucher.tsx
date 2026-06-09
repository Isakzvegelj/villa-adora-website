import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO } from '../components/ui/PageSEO';
import {
  GiftIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  CurrencyEuroIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const VOUCHER_AMOUNTS = [
  { value: 100, label: '€100' },
  { value: 200, label: '€200' },
  { value: 300, label: '€300' },
  { value: 500, label: '€500' },
  { value: 750, label: '€750' },
  { value: 1000, label: '€1,000' },
];

const VOUCHER_THEMES = [
  { id: 'birthday', emoji: '🎂' },
  { id: 'anniversary', emoji: '💕' },
  { id: 'romantic', emoji: '🌹' },
  { id: 'wellness', emoji: '🧖' },
  { id: 'general', emoji: '🎁' },
];

interface VoucherFormData {
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  theme: string;
  message: string;
  deliveryDate: string;
}

const GiftVoucher = () => {
  const { t, language } = useLanguage();
  const isSl = language === 'sl';

  const [formData, setFormData] = useState<VoucherFormData>({
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientEmail: '',
    amount: 200,
    theme: 'general',
    message: '',
    deliveryDate: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof VoucherFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof VoucherFormData, string>> = {};
    if (!formData.senderName.trim()) newErrors.senderName = isSl ? 'Ime je obvezno' : 'Name is required';
    if (!formData.senderEmail.trim() || !/\S+@\S+\.\S+/.test(formData.senderEmail))
      newErrors.senderEmail = isSl ? 'Veljaven e-naslov je obvezen' : 'Valid email required';
    if (!formData.recipientName.trim()) newErrors.recipientName = isSl ? 'Ime prejemnika je obvezno' : 'Recipient name is required';
    if (!formData.recipientEmail.trim() || !/\S+@\S+\.\S+/.test(formData.recipientEmail))
      newErrors.recipientEmail = isSl ? 'Veljaven e-naslov prejemnika je obvezen' : 'Valid recipient email required';
    if (useCustomAmount && (!customAmount || parseInt(customAmount) < 50))
      newErrors.amount = isSl ? 'Minimalni znesek je €50' : 'Minimum amount is €50';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof VoucherFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const finalAmount = useCustomAmount ? parseInt(customAmount) : formData.amount;
    const voucherData = {
      ...formData,
      amount: finalAmount,
      currency: 'EUR',
      submittedAt: new Date().toISOString(),
      voucherId: `VA-${Date.now().toString(36).toUpperCase()}`,
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('villa_adora_vouchers') || '[]');
      existing.push(voucherData);
      localStorage.setItem('villa_adora_vouchers', JSON.stringify(existing));
    } catch {
      // localStorage unavailable
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const currentAmount = useCustomAmount ? (parseInt(customAmount) || 0) : formData.amount;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-12 max-w-lg mx-auto text-center"
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
            {isSl ? 'Darilni bon je naročen!' : 'Gift Voucher Ordered!'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            {isSl
              ? `Hvala, ${formData.senderName}! Vaš darilni bon je bil uspešno naročen.`
              : `Thank you, ${formData.senderName}! Your gift voucher has been successfully ordered.`}
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
            {isSl
              ? `Potrdilo bo poslano na ${formData.senderEmail} in darilni bon bo dostavljen na ${formData.recipientEmail}.`
              : `A confirmation will be sent to ${formData.senderEmail} and the voucher will be delivered to ${formData.recipientEmail}.`}
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-left text-sm space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-slate-500">{isSl ? 'Znesek:' : 'Amount:'}</span>
              <span className="text-slate-900 dark:text-white font-bold text-lg">€{currentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isSl ? 'Prejemnik:' : 'Recipient:'}</span>
              <span className="text-slate-900 dark:text-white font-medium">{formData.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isSl ? 'Tema:' : 'Theme:'}</span>
              <span className="text-slate-900 dark:text-white font-medium">
                {VOUCHER_THEMES.find((th) => th.id === formData.theme)?.emoji}{' '}
                {formData.theme.charAt(0).toUpperCase() + formData.theme.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                senderName: '', senderEmail: '', recipientName: '', recipientEmail: '',
                amount: 200, theme: 'general', message: '', deliveryDate: '',
              });
              setCustomAmount('');
              setUseCustomAmount(false);
            }}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            {isSl ? 'Naroči še enega' : 'Order another voucher'}
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
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title={isSl ? 'Darilni bon — Villa Adora' : 'Gift Voucher — Villa Adora'}
        description={
          isSl
            ? 'Podarite nepozabno doživetje. Darilni boni za Villa Adora — luksuzni hotel ob jezeru Bled.'
            : 'Give the gift of an unforgettable experience. Gift vouchers for Villa Adora — luxury hotel on Lake Bled.'
        }
        keywords={['gift voucher Bled', 'darilni bon Bled', 'hotel gift card', 'Villa Adora gift', 'luxury experience gift']}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/gift-voucher"
      />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-rose-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <GiftIcon className="w-10 h-10 text-rose-600 dark:text-rose-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {isSl ? 'Darilni bon Villa Adora' : 'Villa Adora Gift Voucher'}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isSl
              ? 'Podarite najbližjim nepozabno doživetje ob jezeru Bled. Darilni bon je popolno za vse priložnosti.'
              : 'Give your loved ones an unforgettable experience on Lake Bled. The perfect gift for any occasion.'}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding pt-0 -mt-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">
                    <CurrencyEuroIcon className="w-4 h-4 inline mr-1.5" />
                    {isSl ? 'Izberi znesek' : 'Choose Amount'}
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {VOUCHER_AMOUNTS.map((amt) => (
                      <button
                        key={amt.value}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, amount: amt.value }));
                          setUseCustomAmount(false);
                        }}
                        className={`py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                          !useCustomAmount && formData.amount === amt.value
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {amt.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setUseCustomAmount(!useCustomAmount)}
                      className={`text-sm font-medium ${useCustomAmount ? 'text-indigo-600' : 'text-slate-500'} hover:underline`}
                    >
                      {isSl ? 'Ali vnesi znesek:' : 'Or enter custom amount:'}
                    </button>
                    <AnimatePresence>
                      {useCustomAmount && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 'auto', opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          className="flex items-center"
                        >
                          <span className="text-slate-500 mr-1">€</span>
                          <input
                            type="number"
                            min="50"
                            max="5000"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-28 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-white outline-none"
                            placeholder="50"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.amount && <span className="text-red-500 text-xs mt-1 block">{errors.amount}</span>}
                </div>

                {/* Theme Selection */}
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">
                    <SparklesIcon className="w-4 h-4 inline mr-1.5" />
                    {isSl ? 'Izberi temo bona' : 'Choose Voucher Theme'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {VOUCHER_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, theme: theme.id }))}
                        className={`py-2.5 px-5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                          formData.theme === theme.id
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-xl">{theme.emoji}</span>
                        <span className="capitalize">{theme.id === 'birthday' ? (isSl ? 'Rojstni dan' : 'Birthday') :
                          theme.id === 'anniversary' ? (isSl ? 'Obletnica' : 'Anniversary') :
                          theme.id === 'romantic' ? (isSl ? 'Romantika' : 'Romantic') :
                          theme.id === 'wellness' ? 'Wellness' :
                          (isSl ? 'Splošno' : 'General')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sender & Recipient */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {isSl ? 'Podatki o pošiljatelju' : 'Your Details'}
                    </h3>
                    <div>
                      <input
                        type="text"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        placeholder={isSl ? 'Vaše ime' : 'Your name'}
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.senderName ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                      />
                      {errors.senderName && <span className="text-red-500 text-xs">{errors.senderName}</span>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        placeholder={isSl ? 'Vaš e-naslov' : 'Your email'}
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.senderEmail ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                      />
                      {errors.senderEmail && <span className="text-red-500 text-xs">{errors.senderEmail}</span>}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {isSl ? 'Podatki o prejemniku' : 'Recipient Details'}
                    </h3>
                    <div>
                      <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        placeholder={isSl ? 'Ime prejemnika' : 'Recipient name'}
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.recipientName ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                      />
                      {errors.recipientName && <span className="text-red-500 text-xs">{errors.recipientName}</span>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="recipientEmail"
                        value={formData.recipientEmail}
                        onChange={handleChange}
                        placeholder={isSl ? 'E-naslov prejemnika' : 'Recipient email'}
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.recipientEmail ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                      />
                      {errors.recipientEmail && <span className="text-red-500 text-xs">{errors.recipientEmail}</span>}
                    </div>
                  </div>
                </div>

                {/* Personal Message */}
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 block">
                    <HeartIcon className="w-4 h-4 inline mr-1.5" />
                    {isSl ? 'Osebno sporočilo' : 'Personal Message'}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={300}
                    placeholder={isSl ? 'Vaše osebno sporočilo prejemniku...' : 'Your personal message to the recipient...'}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors resize-none"
                  />
                  <div className="text-right text-xs text-slate-400 mt-1">{formData.message.length}/300</div>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 block">
                    <EnvelopeIcon className="w-4 h-4 inline mr-1.5" />
                    {isSl ? 'Datum dostave (neobvezno)' : 'Delivery Date (optional)'}
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full md:w-64 px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {isSl ? 'Če ne izberete datuma, bo bon poslan takoj.' : 'If no date is selected, the voucher will be sent immediately.'}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-rose-200 dark:shadow-none hover:shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {isSl ? 'Obdelava...' : 'Processing...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <GiftIcon className="w-6 h-6" />
                      {isSl ? 'Naroči darilni bon' : 'Order Gift Voucher'}
                      <ArrowRightIcon className="w-5 h-5" />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-800 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  {isSl ? 'Povzetek naročila' : 'Order Summary'}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-slate-500">{isSl ? 'Znesek bona:' : 'Voucher Amount:'}</span>
                    <span className="text-slate-900 dark:text-white font-bold text-2xl">€{currentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-slate-500">{isSl ? 'Tema:' : 'Theme:'}</span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {VOUCHER_THEMES.find((th) => th.id === formData.theme)?.emoji}{' '}
                      <span className="capitalize">{formData.theme}</span>
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-slate-500">{isSl ? 'Prejemnik:' : 'Recipient:'}</span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {formData.recipientName || (isSl ? 'Ni določeno' : 'Not set')}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-slate-500">{isSl ? 'Dostava:' : 'Delivery:'}</span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {formData.deliveryDate || (isSl ? 'Takoj' : 'Immediate')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-500 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  {isSl ? 'Kako deluje?' : 'How It Works'}
                </h3>
                <ol className="space-y-3 text-rose-100 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    {isSl ? 'Izberete znesek in temo bona' : 'Choose amount and theme'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    {isSl ? 'Vnesete podatke o prejemniku' : 'Enter recipient details'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    {isSl ? 'Prejmete potrdilo, bon pa je dostavljen prejemniku' : 'You receive confirmation, voucher is delivered to recipient'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    {isSl ? 'Prejemnik rezervira bivanje z vašim bonom' : 'Recipient redeems voucher for their stay'}
                  </li>
                </ol>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-300 text-sm">
                  💡 {isSl
                    ? 'Darilni boni veljajo 12 mesecev od nakupa. Možno jih je uporabiti za vse storitve v hotelu.'
                    : 'Gift vouchers are valid for 12 months from purchase. Can be used for all hotel services.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default GiftVoucher;
