import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useSearchParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { PageSEO } from '../components/ui/PageSEO';
import TrustBadges from '../components/ui/TrustBadges';
import BentralEmbed from '../components/ui/BentralEmbed';
import SeasonalPricing from '../components/sections/SeasonalPricing';

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
  { value: 'princess', label: 'Princess Suite', price: '€440/night', size: '55 m²' },
  { value: 'luxury', label: 'Luxury Suite', price: '€480/night', size: 'Lake view' },
  { value: 'penthouse', label: 'Penthouse Suite', price: '€430/night', size: '60 m², 2 floors' },
  { value: 'deluxe', label: 'Deluxe Suite', price: '€570/night', size: 'Lake view' },
  { value: 'superior', label: 'Superior Suite', price: '€570/night', size: 'Sleeps 4, 2 bedrooms' },
  { value: 'island', label: 'Island Suite', price: '€620/night', size: '65 m², sleeps 4' },
  { value: 'prestige', label: 'Prestige Suite', price: 'Price on request', size: '72 m², ground floor' },
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

  // Pre-populate form from URL query params (from Hero booking bar)
  useEffect(() => {
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const roomType = searchParams.get('roomType');
    
    if (checkIn || checkOut || adults || children || roomType) {
      setFormData(prev => ({
        ...prev,
        checkIn: checkIn || prev.checkIn,
        checkOut: checkOut || prev.checkOut,
        adults: adults || prev.adults,
        children: children || prev.children,
        roomType: roomType || prev.roomType,
      }));
    }
  }, [searchParams]);

  const selectedRoom = ROOM_TYPES.find((r) => r.value === formData.roomType);
  const nights =
    formData.checkIn && formData.checkOut
      ? Math.max(0, Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const totalPrice = selectedRoom ? nights * parseInt(selectedRoom.price.replace(/[^0-9]/g, '')) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PageSEO
        title="Book Your Stay — Villa Adora Reservations"
        description="Reserve your luxury suite at Villa Adora on Lake Bled. Best rate guarantee, free cancellation, and personalized concierge service."
        keywords={['Villa Adora booking', 'book hotel Bled', 'luxury suite reservation', 'Lake Bled accommodation', 'hotel reservation Slovenia']}
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/reservation"
      />
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
                                {/* Bentral Direct Booking Engine — real availability + booking */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Direct booking via Villa Adora — best rate guarantee, no booking fees. Live availability.
                    </p>
                  </div>
                  <div className="bentral-widget" id="bentralBooking">
                    <BentralEmbed src="//www.bentral.com/service/embed/booking.js?id=5f444d354f415f4e&width=full&key=ef32fbc68fd13b8f9e5ba7a55520e061" />
                  </div>
                </div>
              </motion.div>

              {/* Summary Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Seasonal Pricing */}
                {selectedRoom && (
                  <SeasonalPricing
                    basePrice={parseInt(selectedRoom.price.replace(/[^0-9]/g, ''))}
                  />
                )}

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

                {/* Trust Badges */}
                <TrustBadges />

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
