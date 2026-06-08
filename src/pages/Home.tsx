import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckBadgeIcon, CurrencyEuroIcon, WifiIcon, SparklesIcon, PhoneIcon, GiftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageSEO, JsonLd } from '../components/ui/PageSEO';
import HeroSection from '../components/sections/HeroSection';
import AboutPreview from '../components/sections/AboutPreview';
import SuitesPreview from '../components/sections/SuitesPreview';
import ActivitiesPreview from '../components/sections/ActivitiesPreview';
import GalleryPreview from '../components/sections/GalleryPreview';
import ReviewsPreview from '../components/sections/ReviewsPreview';
import AwardsSection from '../components/sections/AwardsSection';
import NearbyAttractions from '../components/sections/NearbyAttractions';
import BledSeasons from '../components/sections/BledSeasons';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import SpecialOffers from '../components/sections/SpecialOffers';
import QuickPriceCalculator from '../components/sections/QuickPriceCalculator';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import SeasonalOfferBanner from '../components/ui/SeasonalOfferBanner';
import CulinarySection from '../components/sections/CulinarySection';
import NewsletterSection from '../components/sections/NewsletterSection'
import FAQSection from '../components/sections/FAQSection'
import GuestReviews from '../components/sections/GuestReviews'
import LocationMap from '../components/sections/LocationMap'
import VirtualTourSection from '../components/sections/VirtualTourSection'
const Home = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* SEO Meta Tags & Structured Data */}
      <PageSEO
        title="Villa Adora — Luxury Hotel on Lake Bled, Slovenia"
        description="Villa Adora is a luxury boutique hotel on the shores of Lake Bled, Slovenia. Enjoy lake-view suites, fine dining, spa & wellness, and unforgettable Alpine experiences."
        keywords={['Villa Adora', 'luxury hotel Bled', 'Lake Bled hotel', 'Slovenia boutique hotel', 'lake view suite Bled', 'Bled accommodation']}
        ogImage="https://villa-adora-bled.si/og-image.jpg"
        ogType="website"
        canonicalUrl="https://villa-adora-bled.si/"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Hotel',
          name: 'Villa Adora',
          description: 'Luxury boutique hotel on the shores of Lake Bled, Slovenia. Lake-view suites, fine dining, spa & wellness.',
          url: 'https://villa-adora-bled.si',
          image: 'https://villa-adora-bled.si/og-image.jpg',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Cesta svobode 17',
            addressLocality: 'Bled',
            postalCode: '4260',
            addressCountry: 'SI',
          },
          telephone: '+386 4 574 10 00',
          email: 'info@villa-adora-bled.si',
          priceRange: '€250 - €420',
          starRating: {
            '@type': 'Rating',
            ratingValue: 4,
            bestRating: 5,
          },
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi' },
            { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
            { '@type': 'LocationFeatureSpecification', name: 'Spa & Wellness' },
            { '@type': 'LocationFeatureSpecification', name: 'Lake View Suites' },
            { '@type': 'LocationFeatureSpecification', name: 'Free Parking' },
            { '@type': 'LocationFeatureSpecification', name: 'Concierge Service' },
            { '@type': 'LocationFeatureSpecification', name: 'Room Service' },
          ],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.3683,
            longitude: 14.1144,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.8,
            reviewCount: 312,
            bestRating: 5,
          },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '07:00', closes: '23:00' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Room Types',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Princess Suite', description: '55 m² luxury suite with garden view' }, priceSpecification: { '@type': 'PriceSpecification', price: '250', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Luxury Suite', description: 'Lake view suite with balcony' }, priceSpecification: { '@type': 'PriceSpecification', price: '270', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Penthouse Suite', description: '60 m² two-floor penthouse' }, priceSpecification: { '@type': 'PriceSpecification', price: '300', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Swan Suite', description: 'Premium lake view suite' }, priceSpecification: { '@type': 'PriceSpecification', price: '370', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Island Suite', description: '65 m² suite sleeping 4, lake view' }, priceSpecification: { '@type': 'PriceSpecification', price: '380', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Prestige Suite', description: '72 m² ground floor suite with terrace' }, priceSpecification: { '@type': 'PriceSpecification', price: '420', priceCurrency: 'EUR', unitText: 'NIGHT' } },
            ],
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://villa-adora-bled.si/' },
            { '@type': 'ListItem', position: 2, name: 'Suites', item: 'https://villa-adora-bled.si/suites' },
            { '@type': 'ListItem', position: 3, name: 'Reservation', item: 'https://villa-adora-bled.si/reservation' },
            { '@type': 'ListItem', position: 4, name: 'Contact', item: 'https://villa-adora-bled.si/contact' },
          ],
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* About Preview */}
      <AboutPreview />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Suites Preview */}
      <SuitesPreview />

      {/* Activities Preview */}
      <ActivitiesPreview />

      {/* Gallery Preview */}
      <GalleryPreview />

      {/* Virtual Tour */}
      <VirtualTourSection />

      {/* Reviews Preview */}
      <ReviewsPreview />

      {/* Awards & Ratings */}
      <AwardsSection />

      {/* Bled Through the Seasons */}
      <BledSeasons />

      {/* Guest Testimonials */}
      <TestimonialsSection />

      {/* Guest Reviews */}
      <GuestReviews />

      {/* Special Offers */}
      <SpecialOffers />

      {/* Culinary & Dining */}
      <CulinarySection />

      {/* Quick Price Calculator */}
      <QuickPriceCalculator />

      {/* Nearby Attractions */}
      <NearbyAttractions />

      {/* Interactive Location Map */}
      <LocationMap />

      {/* Newsletter */}
      <NewsletterSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-padding bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
      >
        <div className="container-max text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-responsive-xl font-bold text-white mb-4"
          >
            Ready for an Unforgettable Stay?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/85 mb-4 max-w-2xl mx-auto"
          >
            Book directly for the best rates. Our concierge team will ensure every detail of your stay is perfect.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-white/60 mb-8"
          >
            Best rate guarantee · Free cancellation up to 48h · Late check-out available
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-flex items-center px-10 py-4 text-lg"
              >
                {t('hero.book')}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white hover:text-indigo-600 inline-flex items-center px-10 py-4 text-lg"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Seasonal Offer Banner */}
      <SeasonalOfferBanner />

      {/* Book Direct Benefits */}
      <BookDirectBenefits />
    </motion.div>
  );
};

// Book Direct Benefits section
const BookDirectBenefits = () => {

const BookDirectBenefits = () => {
  const { t } = useLanguage()

  const benefits = [
    {
      icon: <CurrencyEuroIcon className="w-7 h-7" />,
      titleKey: 'bookDirect.bestPrice.title',
      descKey: 'bookDirect.bestPrice.description',
    },
    {
      icon: <GiftIcon className="w-7 h-7" />,
      titleKey: 'bookDirect.freeBreakfast.title',
      descKey: 'bookDirect.freeBreakfast.description',
    },
    {
      icon: <WifiIcon className="w-7 h-7" />,
      titleKey: 'bookDirect.freeWifi.title',
      descKey: 'bookDirect.freeWifi.description',
    },
    {
      icon: <SparklesIcon className="w-7 h-7" />,
      titleKey: 'bookDirect.upgrade.title',
      descKey: 'bookDirect.upgrade.description',
    },
    {
      icon: <PhoneIcon className="w-7 h-7" />,
      titleKey: 'bookDirect.directSupport.title',
      descKey: 'bookDirect.directSupport.description',
    },
    {
      icon: <CheckBadgeIcon className="w-7 h-7" />,
      titleKey: 'bookDirect.flexible.title',
      descKey: 'bookDirect.flexible.description',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-4">
            {t('bookDirect.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('bookDirect.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('bookDirect.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-indigo-200"
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t(benefit.titleKey)}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t(benefit.descKey)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/reservation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {t('bookDirect.cta')}
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Home
