import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useSearchParams } from 'react-router-dom';
import { CalendarIcon, UserGroupIcon, HomeIcon, CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  roomType: string;
  requests: string;
}

const ROOM_TYPES = [
  { value: 'princess', label: 'Princess Suite', price: '€250/night', size: '55 m²' },
  { value: 'luxury', label: 'Luxury Suite', price: '€270/night', size: 'Lake view' },
  { value: 'penthouse', label: 'Penthouse Suite', price: '€300/night', size: '60 m², 2 floors' },
  { value: 'swan', label: 'Swan Suite', price: '€370/night', size: 'Lake view' },
  { value: 'island', label: 'Island Suite', price: '€380/night', size: '65 m², sleeps 4' },
  { value: 'prestige', label: 'Prestige Suite', price: '€420/night', size: '72 m², ground floor' },
];

const Reservation = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    roomType: 'princess',
    requests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Pre-populate form from URL query params (from Hero booking bar)
  useEffect(() => {
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const roomType = searchParams.get('roomType');
    
    if (checkIn || checkOut || adults || roomType) {
      setFormData(prev => ({
        ...prev,
        checkIn: checkIn || prev.checkIn,
        checkOut: checkOut || prev.checkOut,
        adults: adults || prev.adults,
        roomType: roomType || prev.roomType,
      }));
    }
  }, [searchParams]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.checkIn) newErrors.checkIn = 'Required';
    if (!formData.checkOut) newErrors.checkOut = 'Required';
    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      newErrors.checkOut = 'Must be after check-in';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedRoom = ROOM_TYPES.find((r) => r.value === formData.roomType);
  const nights =
    formData.checkIn && formData.checkOut
      ? Math.max(0, Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const totalPrice = selectedRoom ? nights * parseInt(selectedRoom.price.replace(/[^0-9]/g, '')) : 0;

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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Request Received!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Thank you, {formData.firstName}! We've received your reservation request.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
            A confirmation email will be sent to <strong>{formData.email}</strong> shortly.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-left text-sm space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-slate-500">Guest:</span>
              <span className="text-slate-900 dark:text-white font-medium">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Suite:</span>
              <span className="text-slate-900 dark:text-white font-medium">{selectedRoom?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Guests:</span>
              <span className="text-slate-900 dark:text-white font-medium">
                {formData.adults} {Number(formData.adults) === 1 ? 'Adult' : 'Adults'}
                {Number(formData.children) > 0 && `, ${formData.children} ${Number(formData.children) === 1 ? 'Child' : 'Children'}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Dates:</span>
              <span className="text-slate-900 dark:text-white font-medium">{formData.checkIn} → {formData.checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nights:</span>
              <span className="text-slate-900 dark:text-white font-medium">{nights}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Estimated Total:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">€{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                firstName: '', lastName: '', email: '', phone: '',
                checkIn: '', checkOut: '', adults: '2', children: '0', roomType: 'princess', requests: '',
              });
            }}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Make another reservation
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
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-responsive-xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('reservation.title')}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Book your stay at Villa Adora and prepare for an unforgettable experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {t('reservation.firstName')}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.firstName ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                        placeholder="John"
                      />
                      {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {t('reservation.lastName')}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.lastName ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <EnvelopeIcon className="w-4 h-4" />
                        {t('reservation.email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {t('reservation.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                        placeholder="+386 51 603 858"
                      />
                      {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        {t('reservation.checkIn')}
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.checkIn ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                      />
                      {errors.checkIn && <span className="text-red-500 text-xs">{errors.checkIn}</span>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        {t('reservation.checkOut')}
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 ${errors.checkOut ? 'border-red-400' : 'border-transparent'} focus:border-indigo-500 dark:text-white outline-none transition-colors`}
                      />
                      {errors.checkOut && <span className="text-red-500 text-xs">{errors.checkOut}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <UserGroupIcon className="w-4 h-4" />
                        {t('reservation.adults')}
                      </label>
                      <select
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <UserGroupIcon className="w-4 h-4" />
                        Children (0-17)
                      </label>
                      <select
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors"
                      >
                        {[0, 1, 2, 3].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <HomeIcon className="w-4 h-4" />
                        {t('reservation.roomType')}
                      </label>
                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors"
                      >
                        {ROOM_TYPES.map((room) => (
                          <option key={room.value} value={room.value}>
                            {room.label} — {room.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Room Preview */}
                  <AnimatePresence mode="wait">
                    {selectedRoom && (
                      <motion.div
                        key={selectedRoom.value}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-indigo-900 dark:text-indigo-300">{selectedRoom.label}</h4>
                            <p className="text-sm text-indigo-600 dark:text-indigo-400">{selectedRoom.size}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{selectedRoom.price}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {t('reservation.requests')}
                    </label>
                    <textarea
                      name="requests"
                      value={formData.requests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:text-white outline-none transition-colors resize-none"
                      placeholder="Special requests (dietary needs, late check-in, celebrations...)"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      t('reservation.submit')
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Summary Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-800 sticky top-24">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
                    Your Stay
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Location</span>
                      <span className="text-slate-900 dark:text-white font-medium">Bled, Slovenia</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Property</span>
                      <span className="text-slate-900 dark:text-white font-medium">Villa Adora</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Guests</span>
                      <span className="text-slate-900 dark:text-white font-medium">
                        {formData.adults} {Number(formData.adults) === 1 ? 'Adult' : 'Adults'}
                        {Number(formData.children) > 0 && `, ${formData.children} ${Number(formData.children) === 1 ? 'Child' : 'Children'}`}
                      </span>
                    </div>
                    {selectedRoom && (
                      <>
                        <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">Suite</span>
                          <span className="text-slate-900 dark:text-white font-medium">{selectedRoom.label}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">Rate</span>
                          <span className="text-slate-900 dark:text-white font-medium">{selectedRoom.price}</span>
                        </div>
                      </>
                    )}
                    {nights > 0 && (
                      <>
                        <div className="flex justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400">Nights</span>
                          <span className="text-slate-900 dark:text-white font-medium">{nights}</span>
                        </div>
                        <div className="flex justify-between py-3 bg-indigo-50 dark:bg-indigo-900/20 -mx-4 px-4 rounded-lg">
                          <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Estimated Total</span>
                          <span className="text-indigo-700 dark:text-indigo-300 font-bold text-lg">€{totalPrice.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <div className="pt-4">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Need Help?</div>
                      <a href="tel:+38651603858" className="text-indigo-600 dark:text-indigo-400 font-bold block hover:underline">
                        +386 51 603 858
                      </a>
                      <a href="mailto:evita.vilebled@gmail.com" className="text-slate-500 dark:text-slate-400 text-sm block hover:underline">
                        evita.vilebled@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-600 rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Why Book Direct?</h3>
                  <ul className="space-y-3 text-indigo-100 text-sm">
                    <li className="flex items-center"><span className="mr-2">✓</span> Best Price Guarantee</li>
                    <li className="flex items-center"><span className="mr-2">✓</span> Flexible Cancellation</li>
                    <li className="flex items-center"><span className="mr-2">✓</span> Complimentary Welcome Drink</li>
                    <li className="flex items-center"><span className="mr-2">✓</span> Free Room Upgrade (subject to availability)</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Reservation;
