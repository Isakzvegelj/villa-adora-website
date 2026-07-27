import { motion } from 'framer-motion';
import { ArrowRightIcon, ClockIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const diningExperiences = [
  {
    id: 'terrace',
    title: 'Lakeside Terrace Breakfast',
    subtitle: 'Daily · 7:30 – 10:30',
    description: 'A rich buffet breakfast served on our panoramic terrace with uninterrupted views of Lake Bled and the Julian Alps. Fresh pastries, local cheeses, seasonal fruits, and Slovenian honey.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop&q=80',
    price: 'Included',
    included: true,
  },
  {
    id: 'tasting',
    title: 'Slovenian Wine Tasting',
    subtitle: 'Evenings · 18:00 – 20:00',
    description: 'Discover Slovenia\'s finest wines with our sommelier. A curated selection of 6 wines from the Goriška Brda and Štajerska regions, paired with local artisanal cheeses and charcuterie.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop&q=80',
    price: '€45 per person',
    included: false,
  },
  {
    id: 'private',
    title: 'Private Chef\'s Table',
    subtitle: 'By Reservation',
    description: 'An intimate dining experience prepared by our private chef in the villa\'s historic kitchen. A 7-course tasting menu featuring seasonal Slovenian ingredients, paired with premium local wines.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80',
    price: '€120 per person',
    included: false,
  },
];

const CulinaryExperience = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            <SparklesIcon className="w-4 h-4" />
            Culinary Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            A Taste of Slovenia
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From sunrise breakfasts on the terrace to intimate wine tastings at sunset, every meal at Villa Adora is a celebration of Slovenian terroir.
          </p>
        </motion.div>

        {/* Dining Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {diningExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Price Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${
                  exp.included
                    ? 'bg-green-500 text-white'
                    : 'bg-white/90 text-slate-900'
                }`}>
                  {exp.price}
                </div>

                {/* Subtitle */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-sm">
                  <ClockIcon className="w-4 h-4" />
                  {exp.subtitle}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                >
                  Reserve a table
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=500&fit=crop&q=80"
              alt="Fine dining"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-900/70 to-transparent" />
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-3">
              <MapPinIcon className="w-4 h-4" />
              <span className="uppercase tracking-wider">Farm to Table</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ingredients from Our Garden & Local Producers
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Our kitchen sources herbs from our own garden, vegetables from local organic farms, and the finest Slovenian wines. Every dish tells the story of this land.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl shadow-lg transition-colors inline-flex items-center gap-2"
              >
                Request a Custom Menu
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CulinaryExperience;
