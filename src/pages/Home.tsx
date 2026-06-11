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
import WellnessPreview from '../components/sections/WellnessPreview';
import ReviewsPreview from '../components/sections/ReviewsPreview';
import AwardsSection from '../components/sections/AwardsSection';
import NearbyAttractions from '../components/sections/NearbyAttractions';
import BledSeasons from '../components/sections/BledSeasons';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import GuestStories from '../components/sections/GuestStories';
import SpecialOffers from '../components/sections/SpecialOffers';
import QuickPriceCalculator from '../components/sections/QuickPriceCalculator';
import WhyChooseUs from '../components/sections/WhyChooseUs'
import CulinarySection from '../components/sections/CulinarySection'
import CulinaryExperience from '../components/sections/CulinaryExperience'
import NearbyRestaurants from '../components/sections/NearbyRestaurants'
import NewsletterSection from '../components/sections/NewsletterSection'
import FAQSection from '../components/sections/FAQSection'
import GuestReviews from '../components/sections/GuestReviews'
import BestRateGuarantee from '../components/sections/BestRateGuarantee'
import LocationMap from '../components/sections/LocationMap'
import VirtualTourSection from '../components/sections/VirtualTourSection'
import AvailabilityChecker from '../components/sections/AvailabilityChecker'
import LiveAvailability from '../components/sections/LiveAvailability'
import ConciergeCTA from '../components/sections/ConciergeCTA'
import SocialProofNotification from '../components/sections/SocialProofNotification'
import SuiteComparison from '../components/sections/SuiteComparison'
import SeasonalHighlights from '../components/sections/SeasonalHighlights'
import SummerExperiences from '../components/sections/SummerExperiences'
import SummerPackages from '../components/sections/SummerPackages'
import ItineraryPlanner from '../components/sections/ItineraryPlanner'
import LocalExperiences from '../components/sections/LocalExperiences'
import Summer2026 from '../components/sections/Summer2026'
import Winter2026 from '../components/sections/Winter2026'
import WeatherWidget from '../components/ui/WeatherWidget'
import { ReviewStructuredData } from '../components/ui/ReviewStructuredData'
import { FAQPageStructuredData } from '../components/ui/FAQStructuredData'
import { HotelSchema, BreadcrumbSchema } from '../components/ui/HotelSchema'

// FAQ data for structured data (English)
const HOME_FAQS_EN = [
  { question: 'What are the check-in and check-out times?', answer: 'Check-in is from 14:00 to 22:00. Check-out is by 11:00. Early check-in and late check-out are available on request.' },
  { question: 'What is the cancellation policy?', answer: 'Free cancellation up to 48 hours before arrival. Cancellations within 48 hours are charged for the first night. For high season (July-August), cancellation is required 72 hours in advance.' },
  { question: 'Is free parking available?', answer: 'Yes, free private parking is available on-site for all guests. The parking is secured and under camera surveillance.' },
  { question: 'Are pets allowed?', answer: 'Yes, pets are allowed on request. Please inform us in advance. An additional cleaning fee of €30 per stay applies.' },
  { question: 'Is breakfast included?', answer: 'Yes, a rich buffet breakfast is included in the room rate. Breakfast is served from 7:30 to 10:30 on the terrace with lake views. Vegan and gluten-free options are available.' },
  { question: 'How do I get from the airport to Villa Adora?', answer: 'Ljubljana Jože Pučnik Airport is 35 km away (approximately 30 minutes by car). We offer airport transfer on request (€40 one way). Klagenfurt Airport (Austria) is 70 km away.' },
  { question: 'Is free WiFi available?', answer: 'Yes, free high-speed WiFi (WiFi 6) is available throughout the hotel and in all suites. The connection is reliable on the terrace and in the garden area.' },
  { question: 'Do you have a wellness center?', answer: 'Yes, our wellness center includes a Finnish sauna, cold plunge pool, and massage services. The wellness area is complimentary for all guests. Massages must be booked in advance.' },
  { question: 'Do you offer transport or bicycle rental?', answer: 'Yes, we offer complimentary mountain bike and e-bike rental for all guests. We also provide electric vehicle transport around Bled. Airport transfer is available on request (€40 one way).' },
  { question: 'Does the suite have a minibar?', answer: 'Yes, all suites have a minibar with selected Slovenian wines, beverages, and snacks. Each suite also has coffee, tea, and hot chocolate making facilities.' },
  { question: 'What Slovenian wines do you recommend?', answer: 'We recommend Šipon (Furmint) from Podravje for a crisp dry white, Pinela for something light and aromatic, and Teran from the Karst region for a bold red. Our bar stocks a curated selection — ask our sommelier for pairing recommendations with your meal.' },
  { question: 'Are there good restaurants nearby?', answer: 'Yes! Restaurant Adora on-site serves creative Slovenian-French cuisine by Chef Domen Demšar. Within walking distance: Pletna Restaurant (traditional Slovenian), Gostilna Murka (hearty local food), and Fizz (craft beer). Fine dining at Vila Podvin (Michelin-recommended, 15 min drive) and EK Bled (8 min drive). Our concierge can make reservations.' },
  { question: 'What events happen in Bled during summer?', answer: 'Summer in Bled features the Bled Festival (classical music at the castle), the International Rowing Regatta, open-air cinema by the lake, and the Bled Cream Cake Festival in August. The Christmas Market in December is magical. Ask our concierge for specific dates during your stay.' },
  { question: 'Can I buy a gift voucher for Villa Adora?', answer: 'Yes! Gift vouchers are available for any amount and make a perfect present for loved ones. Vouchers are valid for 12 months and can be used for any suite or package. Visit our Gift Voucher page or contact us to purchase.' },
]

// FAQ data for structured data (French) — kept for future use when French language is added
export const HOME_FAQS_FR = [
  { question: 'Quelles sont les heures d\'arrivée et de départ?', answer: 'L\'enregistrement est de 14h00 à 22h00. Le départ est à 11h00. L\'enregistrement anticipé et le départ tardif sont disponibles sur demande.' },
  { question: 'Quelle est la politique d\'annulation?', answer: 'Annulation gratuite jusqu\'à 48 heures avant l\'arrivée. Les annulations dans les 48 heures sont facturées pour la première nuit. En haute saison (juillet-août), l\'annulation est requise 72 heures à l\'avance.' },
  { question: 'Le parking est-il gratuit?', answer: 'Oui, un parking privé gratuit est disponible sur place pour tous les clients.' },
  { question: 'Les animaux sont-ils acceptés?', answer: 'Oui, les animaux sont acceptés sur demande. Des frais de nettoyage de €30 par séjour s\'appliquent.' },
  { question: 'Le petit-déjeuner est-il inclus?', answer: 'Oui, un petit-déjeuner buffet riche est inclus dans le tarif de la chambre. Servi de 7h30 à 10h30 sur la terrasse avec vue sur le lac.' },
  { question: 'Comment venir de l\'aéroport?', answer: 'L\'aéroport Jože Pučnik de Ljubljana est à 35 km. Nous proposons un transfert aéroport sur demande (€40 aller simple).' },
  { question: 'Le WiFi est-il gratuit?', answer: 'Oui, un WiFi haut débit gratuit (WiFi 6) est disponible dans tout l\'hôtel et dans toutes les suites.' },
  { question: 'Avez-vous un centre de bien-être?', answer: 'Oui, notre centre de bien-être comprend un sauna finlandais, un bassin de plongée froide et des services de massage. L\'accès au centre est gratuit pour tous les clients.' },
  { question: 'Proposez-vous des vélos?', answer: 'Oui, nous proposons la location gratuite de vélos de montagne et de vélos électriques pour tous les clients. Le transfert aéroport est disponible sur demande.' },
  { question: 'La suite a-t-elle un minibar?', answer: 'Oui, toutes les suites disposent d\'un minibar avec des vins slovènes sélectionnés, des boissons et des collations.' },
  { question: 'Quels vins slovènes recommandez-vous?', answer: 'Nous recommandons le Šipon (Furmint) du Podravje pour un blanc sec et vif, le Pinela pour quelque chose de léger et aromatique, et le Teran de la région du Karst pour un rouge corsé. Notre bar propose une sélection curatée.' },
  { question: 'Y a-t-il de bons restaurants à proximité?', answer: 'Oui ! Le Restaurant Adora sur place propose une cuisine créative slovène-française. À distance de marche : Pletna Restaurant (traditionnel), Gostilna Murka (cuisine locale), et Fizz (bière artisanale). Gastronomie à Vila Podvin (recommandé par Michelin) et EK Bled.' },
  { question: 'Quels événements ont lieu à Bled en été?', answer: 'L\'été à Bled propose le Festival de Bled (musique classique au château), le Régatta internationale de aviron, le cinéma en plein air au bord du lac, et le Festival de la crème de Bled en août. Le marché de Noël en décembre est magique.' },
]

// FAQ data for structured data (Slovenian)
const HOME_FAQS_SL = [
  { question: 'Kateri so časi prihoda in odhoda?', answer: 'Prihod (check-in) je od 14:00 do 22:00. Odhod (check-out) je do 11:00. Pozen prihod in pozen odhod sta na voljo na zahtevo.' },
  { question: 'Kakšna je politika odpovedi?', answer: 'Brezplačna odpoved je možna do 48 ur pred prihodom. Odpovedi v roku 48 ur pred prihodom se zaračuna prva nočitev. V visoki sezoni (julij-avgust) velja odpoved do 72 ur.' },
  { question: 'Ali je na voljo brezplačno parkiranje?', answer: 'Da, brezplačno zasebno parkirišče je na voljo na lokaciji za vse goste. Parkiranje je varovano in pod nadzorom kamere.' },
  { question: 'Ali so dovoljeni hišni ljubljenčki?', answer: 'Da, hišni ljubljenčki so dovoljeni na zahtevo. Dodatna pristojbina za čiščenje znaša €30 na bivanje.' },
  { question: 'Ali je zajtrk vključen v ceno?', answer: 'Da, bogat samopostrežni zajtrk je vključen v ceno nočitve. Zajtrk je serviran od 7:30 do 10:30 na terasi s pogledom na jezero.' },
  { question: 'Kako prletim iz letališča do Villa Adore?', answer: 'Letališče Jože Pučnik Ljubljana je oddaljeno 35 km. Ponujamo prevoz iz letališča po naroku (€40 enosmerno).' },
  { question: 'Ali je na voljo brezplačen WiFi?', answer: 'Da, brezplačen visokohitrostni WiFi je na voljo v celotnem hotelu in vseh suitah.' },
  { question: 'Ali imate wellness center?', answer: 'Da, naš wellness center vključuje finsko savno, turško kopel in masažne storitve. Wellness je na voljo brezplačno vsem gostom.' },
  { question: 'Ali ponujate prevoz ali izposojo koles?', answer: 'Da, ponujamo brezplačno izposojo gorskih koles za vse goste. Ponujamo tudi prevoz z električnim vozilom po Bledu.' },
  { question: 'Ali ima suite minibar?', answer: 'Da, vsa suite imajo minibar z izbranimi slovenskimi vinami, pijačami in prigrizki.' },
  { question: 'Katera slovenska vina priporočate?', answer: 'Priporočamo Šipon (Furmint) iz Podravja za suho belo vino, Pinelo za lahko in aromatično vino, ter Teran iz Krasa za močno rdeče vino. Naš bar ponuja kurirano izbiro — vprašajte someljera za priporočila.' },
  { question: 'Ali so v bližini dobri restorani?', answer: 'Da! Restoran Adora v objektu ponuja kreativno slovensko-francosko kuhinjo. V bližini: Restoran Pletna (tradicionalna slovenska), Gostilna Murka (domača hrana) in Fizz (craft beer). Fine dining: Vila Podvin (Michelin, 15 min vožnje) in EK Bled (8 min). Naš concierge lahko rezervira mize.' },
  { question: 'Kateri dogodki potekajo v Bledu poleti?', answer: 'Poleti v Bledu: Bled Festival (klasična glasba na gradu), Mednarodno veslačko regato, kinematograf na prostem in Festival kremšnite avgusta. Božični trg v decembru je čudežen. Vprašajte našega concierga za točne datume.' },
]
const HOME_REVIEWS = [
  { author: 'Sarah & James Mitchell', datePublished: '2025-09-15', reviewRating: 5, reviewBody: 'Absolutely magical stay! The Princess Suite had the most incredible view of Lake Bled. Waking up to the sunrise over the lake was unforgettable.' },
  { author: 'Marco Rossi', datePublished: '2025-08-22', reviewRating: 5, reviewBody: 'Villa Adora exceeded all expectations. The Penthouse Suite is a masterpiece of design, and the breakfast on the terrace was divine.' },
  { author: 'Anna & Thomas Weber', datePublished: '2025-10-03', reviewRating: 5, reviewBody: 'A perfect blend of historic charm and modern luxury. The wellness center was a highlight. Best hotel experience in Slovenia!' },
  { author: 'Yuki Tanaka', datePublished: '2025-07-18', reviewRating: 5, reviewBody: 'We traveled all the way from Tokyo and Villa Adora was worth every kilometer. The attention to detail is remarkable.' },
  { author: 'Pierre Dubois', datePublished: '2025-06-30', reviewRating: 5, reviewBody: 'An extraordinary boutique hotel. The Prestige Suite with lake views from every window was pure bliss.' },
  { author: 'Elena & Marko Kovač', datePublished: '2025-11-10', reviewRating: 5, reviewBody: 'As locals, we wanted a special weekend getaway and Villa Adora delivered beyond expectations. The Luxury Suite was stunning.' },
]

const Home = () => {
  const { t, language } = useLanguage()

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
          name: 'Villa Adora Bled',
          description: 'Luxury boutique hotel on the shores of Lake Bled, Slovenia. 8 lake-view suites, fine dining, spa & wellness, heritage villa from 1878.',
          url: 'https://villa-adora-bled.si',
          image: 'https://villa-adora-bled.si/og-image.jpg',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Cesta svobode 35',
            addressLocality: 'Bled',
            postalCode: '4260',
            addressCountry: 'SI',
          },
          telephone: '+386 51 603 858',
          email: 'evita.vilebled@gmail.com',
          priceRange: '€430 - €480',
          starRating: {
            '@type': 'Rating',
            ratingValue: 4,
            bestRating: 5,
          },
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi' },
            { '@type': 'LocationFeatureSpecification', name: 'Spa & Wellness' },
            { '@type': 'LocationFeatureSpecification', name: 'Lake View Suites' },
            { '@type': 'LocationFeatureSpecification', name: 'Free Parking' },
            { '@type': 'LocationFeatureSpecification', name: 'Concierge Service' },
            { '@type': 'LocationFeatureSpecification', name: 'Room Service' },
            { '@type': 'LocationFeatureSpecification', name: 'Airport Shuttle' },
            { '@type': 'LocationFeatureSpecification', name: 'Bicycle Rental' },
          ],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.3683,
            longitude: 14.1144,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.7,
            reviewCount: 973,
            bestRating: 5,
          },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '07:00', closes: '23:00' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Room Types',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Princess Suite', description: '55 m² suite with lake view from tower, queen bed, living area' }, priceSpecification: { '@type': 'PriceSpecification', price: '440', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Luxury Suite', description: 'Lake view suite with elegant decor and comfortable bedding' }, priceSpecification: { '@type': 'PriceSpecification', price: '480', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Penthouse Suite', description: '60 m² two-floor penthouse with king-sized bed and breathtaking lake views' }, priceSpecification: { '@type': 'PriceSpecification', price: '430', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Swan Suite', description: 'Premium lake view suite' }, priceSpecification: { '@type': 'PriceSpecification', price: '450', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Island Suite', description: '65 m² suite sleeping 4 guests with lake view' }, priceSpecification: { '@type': 'PriceSpecification', price: '460', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Deluxe Suite', description: 'Spacious suite with lake view, seating area and flat-screen TV' }, priceSpecification: { '@type': 'PriceSpecification', price: '420', priceCurrency: 'EUR', unitText: 'NIGHT' } },
              { '@type': 'Offer', itemOffered: { '@type': 'HotelRoom', name: 'Superior Suite', description: 'Two-bedroom suite for families, sleeps 4, lake and castle views' }, priceSpecification: { '@type': 'PriceSpecification', price: '470', priceCurrency: 'EUR', unitText: 'NIGHT' } },
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

      {/* Review Structured Data for Rich Snippets */}
      <ReviewStructuredData reviews={HOME_REVIEWS} />

      {/* FAQ Structured Data for Google Rich Snippets */}
      <FAQPageStructuredData faqs={language === 'sl' ? HOME_FAQS_SL : HOME_FAQS_EN} />

      {/* HotelSchema: LodgingBusiness + Room Offers for Rich Snippets */}
      <HotelSchema />

      {/* BreadcrumbList for site navigation */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://villa-adora-bled.si/' },
          { name: 'Suites', url: 'https://villa-adora-bled.si/suites' },
          { name: 'Reservation', url: 'https://villa-adora-bled.si/reservation' },
          { name: 'Contact', url: 'https://villa-adora-bled.si/contact' },
        ]}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Summer 2026 Experiences */}
      <SummerExperiences />

      {/* Summer 2026 Curated Packages */}
      <SummerPackages />

      {/* Seasonal Highlights */}
      <SeasonalHighlights />

      {/* Summer 2026 Events & Packages */}
      <Summer2026 />

      {/* Winter 2026/27 Season */}
      <Winter2026 />

      {/* Itinerary Planner */}
      <ItineraryPlanner />

      {/* About Preview */}
      <AboutPreview />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Suites Preview */}
      <SuitesPreview />

      {/* Suite Comparison Tool */}
      <SuiteComparison />

      {/* Activities Preview */}
      <ActivitiesPreview />

      {/* Gallery Preview */}
      <GalleryPreview />

      {/* Wellness & Spa Preview */}
      <WellnessPreview />

      {/* Virtual Tour */}
      <VirtualTourSection />

      {/* Live Weather Widget */}
      <section className="py-8 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <WeatherWidget />
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                {language === 'sl' ? '🍽️ Dan prijaznih obrokov' : language === 'de' ? '🍽️ Tagesplan der Mahlzeiten' : language === 'it' ? '🍽️ Programma pasti del giorno' : '🍽️ Today\'s Meal Schedule'}
              </h3>
              <div className="space-y-3">
                {[
                  { time: '7:30 – 10:30', label: language === 'sl' ? 'Zajtrk' : language === 'de' ? 'Frühstück' : language === 'it' ? 'Colazione' : 'Breakfast', desc: language === 'sl' ? 'Samopostrežni zajtrk na terasi' : 'Buffet on the terrace', icon: '🌅' },
                  { time: '12:00 – 14:00', label: language === 'sl' ? 'Kosilo' : language === 'de' ? 'Mittagessen' : language === 'it' ? 'Pranzo' : 'Lunch', desc: language === 'sl' ? 'Priporočila gostiln v bližini' : 'Nearby restaurant recommendations', icon: '☀️' },
                  { time: '16:00 – 17:00', label: language === 'sl' ? 'Popoldanski čaj' : language === 'de' ? 'Nachmittagstee' : language === 'it' ? 'Tè del pomeriggio' : 'Afternoon Tea', desc: language === 'sl' ? 'Brezplačen čaj v vrtu' : 'Complimentary tea in the garden', icon: '🍵' },
                  { time: '18:00 – 21:00', label: language === 'sl' ? 'Večerja' : language === 'de' ? 'Abendessen' : language === 'it' ? 'Cena' : 'Dinner', desc: language === 'sl' ? 'Reervacije restavracij na zahtevo' : 'Restaurant reservations on request', icon: '🌙' },
                ].map((meal) => (
                  <div key={meal.time} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-2xl">{meal.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{meal.time}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{meal.label}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{meal.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Checker */}
      <AvailabilityChecker />

      {/* Live Room Availability */}
      <LiveAvailability />

      {/* Concierge CTA */}
      <ConciergeCTA />

      {/* Reviews Preview */}
      <ReviewsPreview />

      {/* Awards & Ratings */}
      <AwardsSection />

      {/* Bled Through the Seasons */}
      <BledSeasons />

      {/* Local Experiences & Day Trips */}
      <LocalExperiences />

      {/* Guest Testimonials */}
      <TestimonialsSection />

      {/* Guest Reviews */}
      <GuestReviews />

      {/* Best Rate Guarantee */}
      <BestRateGuarantee />

      {/* Guest Stories - Immersive Testimonials */}
      <GuestStories />

      {/* Special Offers */}
      <SpecialOffers />

      {/* Culinary & Dining */}
      <CulinarySection />

      {/* Culinary Experience - Immersive Dining */}
      <CulinaryExperience />

      {/* Nearby Restaurants */}
      <NearbyRestaurants />

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

      {/* Book Direct Benefits */}
      <BookDirectBenefits />

      {/* Social Proof - Live Booking Notifications */}
      <SocialProofNotification language={language} />
    </motion.div>
  );
};

// Book Direct Benefits section
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
