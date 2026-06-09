import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, StarIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

interface SuiteFeature {
  name: string;
  nameSl: string;
  icon: string;
}

const SUITE_FEATURES: SuiteFeature[] = [
  { name: 'Lake View', nameSl: 'Pogled na jezero', icon: '🏞️' },
  { name: 'Balcony', nameSl: 'Balkon', icon: '🌅' },
  { name: '55+ m²', nameSl: '55+ m²', icon: '📐' },
  { name: 'King Bed', nameSl: 'King postelja', icon: '🛏️' },
  { name: 'Rain Shower', nameSl: 'Tuš', icon: '🚿' },
  { name: 'Bathtub', nameSl: 'Kad', icon: '🛁' },
  { name: 'Minibar', nameSl: 'Minibar', icon: '🍷' },
  { name: 'Nespresso', nameSl: 'Nespresso', icon: '☕' },
  { name: 'Smart TV', nameSl: 'Smart TV', icon: '📺' },
  { name: 'Fireplace', nameSl: 'Kamin', icon: '🔥' },
  { name: 'Terrace', nameSl: 'Terasa', icon: '🌿' },
  { name: 'Sleeps 4', nameSl: '4 ležišča', icon: '👨‍👩‍👧‍👦' },
];

interface SuiteData {
  id: string;
  name: string;
  nameSl: string;
  price: number;
  size: string;
  sizeSl: string;
  description: string;
  descriptionSl: string;
  features: string[];
  rating: number;
  reviewCount: number;
  popular?: boolean;
}

const SUITES: SuiteData[] = [
  {
    id: 'princess',
    name: 'Princess Suite',
    nameSl: 'Princess Suite',
    price: 250,
    size: '55 m²',
    sizeSl: '55 m²',
    description: 'Elegantly furnished with garden views and refined décor.',
    descriptionSl: 'Elegantno opremljena s pogledem na vrt in prefinjenim dekorjem.',
    features: ['Lake View', 'Balcony', '55+ m²', 'King Bed', 'Rain Shower', 'Minibar', 'Nespresso', 'Smart TV'],
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: 'luxury',
    name: 'Luxury Suite',
    nameSl: 'Luxury Suite',
    price: 270,
    size: '50 m²',
    sizeSl: '50 m²',
    description: 'Stunning lake views from every window with premium amenities.',
    descriptionSl: 'Čudovit pogled na jezero iz vsakega okna z vrhunskimi udobnostmi.',
    features: ['Lake View', 'Balcony', 'King Bed', 'Rain Shower', 'Bathtub', 'Minibar', 'Nespresso', 'Smart TV'],
    rating: 4.9,
    reviewCount: 89,
    popular: true,
  },
  {
    id: 'penthouse',
    name: 'Penthouse Suite',
    nameSl: 'Penthouse Suite',
    price: 300,
    size: '60 m²',
    sizeSl: '60 m²',
    description: 'Two-floor penthouse with breathtaking panoramic views.',
    descriptionSl: 'Dvoetažna penthouse suite z dih jemajočim panoramskim pogledom.',
    features: ['Lake View', 'Balcony', '55+ m²', 'King Bed', 'Rain Shower', 'Bathtub', 'Minibar', 'Nespresso', 'Smart TV', 'Fireplace'],
    rating: 4.9,
    reviewCount: 54,
  },
  {
    id: 'swan',
    name: 'Swan Suite',
    nameSl: 'Swan Suite',
    price: 370,
    size: '58 m²',
    sizeSl: '58 m²',
    description: 'Premium suite inspired by Lake Bled\'s iconic swan motif.',
    descriptionSl: 'Premium suite, navdihnjena z ikoničnim motivom labuda na Blejskem jezeru.',
    features: ['Lake View', 'Balcony', '55+ m²', 'King Bed', 'Rain Shower', 'Bathtub', 'Minibar', 'Nespresso', 'Smart TV', 'Fireplace'],
    rating: 5.0,
    reviewCount: 42,
  },
  {
    id: 'island',
    name: 'Island Suite',
    nameSl: 'Island Suite',
    price: 380,
    size: '65 m²',
    sizeSl: '65 m²',
    description: 'Two bedrooms, two balconies, sleeps 4 — perfect for families.',
    descriptionSl: 'Dve spalnici, dva balkona, 4 ležišča — idealno za družine.',
    features: ['Lake View', 'Balcony', '55+ m²', 'King Bed', 'Rain Shower', 'Bathtub', 'Minibar', 'Nespresso', 'Smart TV', 'Sleeps 4'],
    rating: 4.8,
    reviewCount: 38,
  },
  {
    id: 'prestige',
    name: 'Prestige Suite',
    nameSl: 'Prestige Suite',
    price: 420,
    size: '72 m²',
    sizeSl: '72 m²',
    description: 'Ground floor masterpiece with private terrace and lake views.',
    descriptionSl: 'Pritlični mojster s privatno teraso in pogledom na jezero.',
    features: ['Lake View', '55+ m²', 'King Bed', 'Rain Shower', 'Bathtub', 'Minibar', 'Nespresso', 'Smart TV', 'Fireplace', 'Terrace'],
    rating: 4.9,
    reviewCount: 31,
  },
];

const SuiteComparison = () => {
  const { language } = useLanguage();
  const [selectedSuites, setSelectedSuites] = useState<string[]>(['luxury', 'swan']);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const isSl = language === 'sl';

  const toggleSuite = (suiteId: string) => {
    setSelectedSuites(prev => {
      if (prev.includes(suiteId)) {
        if (prev.length <= 1) return prev; // Keep at least 1
        return prev.filter(id => id !== suiteId);
      }
      if (prev.length >= 3) return prev; // Max 3
      return [...prev, suiteId];
    });
  };

  const selectedData = selectedSuites.map(id => SUITES.find(s => s.id === id)!);
  const featuresToShow = showAllFeatures ? SUITE_FEATURES : SUITE_FEATURES.slice(0, 8);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-4">
            <ArrowsRightLeftIcon className="w-4 h-4" />
            {isSl ? 'Primerjava suit' : 'Suite Comparison'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isSl ? 'Primerjajte suite' : 'Compare Our Suites'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isSl
              ? 'Izberite do 3 suite in jih primerjajte stran ob strani, da najdete popolno sobo za vaše bivanje.'
              : 'Select up to 3 suites to compare side by side and find the perfect room for your stay.'}
          </p>
        </motion.div>

        {/* Suite Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SUITES.map(suite => (
            <button
              key={suite.id}
              onClick={() => toggleSuite(suite.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedSuites.includes(suite.id)
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {isSl ? suite.nameSl : suite.name}
              {suite.popular && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  ★
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Suite Headers */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `180px repeat(${selectedData.length}, 1fr)` }}>
              <div /> {/* Empty corner */}
              {selectedData.map(suite => (
                <motion.div
                  key={suite.id}
                  layout
                  className={`relative bg-white rounded-2xl p-5 text-center shadow-md border-2 ${
                    suite.popular ? 'border-indigo-300' : 'border-gray-100'
                  }`}
                >
                  {suite.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded-full">
                      {isSl ? 'Priljubljena' : 'Most Popular'}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {isSl ? suite.nameSl : suite.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-gray-700">{suite.rating}</span>
                    <span className="text-xs text-gray-400">({suite.reviewCount})</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">€{suite.price}</div>
                  <div className="text-xs text-gray-500">{isSl ? 'na noč' : 'per night'}</div>
                  <div className="mt-2 text-sm text-gray-500">{isSl ? suite.sizeSl : suite.size}</div>
                </motion.div>
              ))}
            </div>

            {/* Feature Rows */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {featuresToShow.map((feature, idx) => (
                <div
                  key={feature.name}
                  className={`grid items-center ${
                    idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                  }`}
                  style={{ gridTemplateColumns: `180px repeat(${selectedData.length}, 1fr)` }}
                >
                  <div className="px-4 py-3 text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span>{feature.icon}</span>
                    {isSl ? feature.nameSl : feature.name}
                  </div>
                  {selectedData.map(suite => (
                    <div key={suite.id} className="px-4 py-3 flex justify-center">
                      {suite.features.includes(feature.name) ? (
                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                          <XMarkIcon className="w-4 h-4 text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Show More/Less */}
            {SUITE_FEATURES.length > 8 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  {showAllFeatures
                    ? (isSl ? 'Prikaži manj' : 'Show less')
                    : `${isSl ? 'Prikaži vse' : 'Show all'} ${SUITE_FEATURES.length} ${isSl ? 'lastnosti' : 'features'}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuiteComparison;
