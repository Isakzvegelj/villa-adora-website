import { motion } from 'framer-motion';
import { MapPinIcon, ClockIcon, CameraIcon, MountainIcon, WavesIcon, CastleIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

const ATTRACTIONS = [
  {
    id: 'lake',
    nameEn: 'Lake Bled',
    nameSl: 'Blejsko jezero',
    distanceEn: '3 min walk',
    distanceSl: '3 min hoje',
    icon: WavesIcon,
    color: 'from-blue-500 to-cyan-400',
    coords: { top: '45%', left: '35%' },
  },
  {
    id: 'island',
    nameEn: 'Bled Island',
    nameSl: 'Blejski otok',
    distanceEn: '5 min by boat',
    distanceSl: '5 min z barco',
    icon: WavesIcon,
    color: 'from-teal-500 to-emerald-400',
    coords: { top: '50%', left: '25%' },
  },
  {
    id: 'castle',
    nameEn: 'Bled Castle',
    nameSl: 'Blejski grad',
    distanceEn: '30 min walk',
    distanceSl: '30 min hoje',
    icon: CastleIcon,
    color: 'from-amber-500 to-orange-400',
    coords: { top: '25%', left: '20%' },
  },
  {
    id: 'vintgar',
    nameEn: 'Vintgar Gorge',
    nameSl: 'Soteska Vintgar',
    distanceEn: '2.4 km',
    distanceSl: '2,4 km',
    icon: MountainIcon,
    color: 'from-green-500 to-emerald-400',
    coords: { top: '70%', left: '60%' },
  },
  {
    id: 'straza',
    nameEn: 'Straža Cable Car',
    nameSl: 'Žičnica Straža',
    distanceEn: '1 min walk',
    distanceSl: '1 min hoje',
    icon: MountainIcon,
    color: 'from-purple-500 to-pink-400',
    coords: { top: '35%', left: '55%' },
  },
  {
    id: 'center',
    nameEn: 'Bled Town Center',
    nameSl: 'Center Bleda',
    distanceEn: '15 min walk',
    distanceSl: '15 min hoje',
    icon: MapPinIcon,
    color: 'from-rose-500 to-red-400',
    coords: { top: '55%', left: '50%' },
  },
];

export default function LocationMap() {
  const { language } = useLanguage();
  const isSl = language === 'sl';

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-indigo-500 mb-3 block">
            {isSl ? 'Lokacija' : 'Location'}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
            {isSl ? 'V srcu Bleda' : 'In the Heart of Bled'}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            {isSl
              ? 'Villa Adora se nahaja neposredno na obali Blejskega jezera, v bližini najlepših znamenitosti.'
              : 'Villa Adora is located directly on the shores of Lake Bled, within easy reach of the finest attractions.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 via-emerald-50 to-amber-50">
              {/* Stylized map background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Lake shape */}
                  <ellipse cx="120" cy="150" rx="80" ry="60" fill="#60a5fa" opacity="0.4" />
                  {/* Island */}
                  <circle cx="80" cy="140" r="15" fill="#34d399" opacity="0.5" />
                  {/* Castle hill */}
                  <ellipse cx="60" cy="60" rx="30" ry="20" fill="#fbbf24" opacity="0.3" />
                  {/* Roads */}
                  <path d="M 60 80 Q 120 100 180 120 Q 240 140 300 160" stroke="#a8a29e" strokeWidth="2" fill="none" opacity="0.3" />
                  <path d="M 120 90 Q 150 130 180 170 Q 210 210 250 250" stroke="#a8a29e" strokeWidth="1.5" fill="none" opacity="0.2" />
                  {/* Forest areas */}
                  <circle cx="250" cy="200" r="40" fill="#22c55e" opacity="0.1" />
                  <circle cx="300" cy="100" r="30" fill="#22c55e" opacity="0.08" />
                </svg>
              </div>

              {/* Hotel marker */}
              <div className="absolute" style={{ top: '48%', left: '42%' }}>
                <div className="relative">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full border-3 border-white shadow-lg animate-pulse" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-semibold text-indigo-700 whitespace-nowrap">
                    Villa Adora
                  </div>
                </div>
              </div>

              {/* Attraction markers */}
              {ATTRACTIONS.map((attraction) => (
                <div
                  key={attraction.id}
                  className="absolute group cursor-pointer"
                  style={{ top: attraction.coords.top, left: attraction.coords.left }}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${attraction.color} border-2 border-white shadow-md group-hover:scale-150 transition-transform`} />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded shadow text-[10px] font-medium text-stone-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {isSl ? attraction.nameSl : attraction.nameEn}
                  </div>
                </div>
              ))}

              {/* Distance rings */}
              <div className="absolute" style={{ top: '48%', left: '42%' }}>
                <div className="absolute w-24 h-24 -top-12 -left-12 border border-indigo-200 rounded-full opacity-30" />
                <div className="absolute w-48 h-48 -top-24 -left-24 border border-indigo-100 rounded-full opacity-20" />
              </div>
            </div>
          </motion.div>

          {/* Attractions List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {ATTRACTIONS.map((attraction, index) => {
              const Icon = attraction.icon;
              return (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-stone-100"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${attraction.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-stone-800">
                      {isSl ? attraction.nameSl : attraction.nameEn}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-stone-400">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      <span>{isSl ? attraction.distanceSl : attraction.distanceEn}</span>
                    </div>
                  </div>
                  <ClockIcon className="w-4 h-4 text-stone-300 flex-shrink-0" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
