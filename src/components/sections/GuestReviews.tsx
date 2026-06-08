import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah & James Mitchell',
    country: 'United Kingdom',
    rating: 5,
    date: '2025-09-15',
    textEn: 'Absolutely magical stay! The Princess Suite had the most incredible view of Lake Bled. Waking up to the sunrise over the lake was unforgettable. The staff went above and beyond to make our anniversary special.',
    textSl: 'Popolnoma čudovito bivanje! Princess Suite je imel najbolj neverjeten pogled na Blejsko jezero. Budenje ob sončnem vzhodu nad jezero je bilo nepozabno. Osebje je storilo vse, da bi našo obletnico naredili posebno.',
    suite: 'Princess Suite',
  },
  {
    id: 2,
    name: 'Marco Rossi',
    country: 'Italy',
    rating: 5,
    date: '2025-08-22',
    textEn: 'Villa Adora exceeded all expectations. The Penthouse Suite is a masterpiece of design, and the breakfast on the terrace was divine. We will definitely return next summer!',
    textSl: 'Villa Adora je presegla vsa pričakovanja. Penthouse Suite je mojstrovina oblikovanja, zajtrk na terasi pa božansko. Zagotovo se bomo vrnili naslednje poletje!',
    suite: 'Penthouse Suite',
  },
  {
    id: 3,
    name: 'Anna & Thomas Weber',
    country: 'Germany',
    rating: 5,
    date: '2025-10-03',
    textEn: 'A perfect blend of historic charm and modern luxury. The wellness center was a highlight, and the digital concierge Luka was incredibly helpful. Best hotel experience in Slovenia!',
    textSl: 'Popolna mešanica zgodovinskega šarma in modernega luksuza. Wellness center je bil vrhunec, digitalni concierge Luka pa je bil izjemno v pomoč. Najboljša hotelska izkušnja v Sloveniji!',
    suite: 'Swan Suite',
  },
  {
    id: 4,
    name: 'Yuki Tanaka',
    country: 'Japan',
    rating: 5,
    date: '2025-07-18',
    textEn: 'We traveled all the way from Tokyo and Villa Adora was worth every kilometer. The attention to detail is remarkable. The cream cake at breakfast was the best we ever had!',
    textSl: 'Potovali smo vse do Tokia in Villa Adora je bila vredna vsakega kilometra. Pozornost do detajlov je izjemna. Kremna rezina pri zajtrku je bila najboljša, kar smo jo kdaj imeli!',
    suite: 'Island Suite',
  },
  {
    id: 5,
    name: 'Pierre Dubois',
    country: 'France',
    rating: 5,
    date: '2025-06-30',
    textEn: 'An extraordinary boutique hotel. The Prestige Suite on the ground floor with lake views from every window was pure bliss. The restaurant 1878 serves exceptional Slovenian cuisine.',
    textSl: 'Izjemen butični hotel. Prestige Suite v pritličju s pogledom na jezero iz vsakega okna je bil čisti raj. Restavracija 1878 služi izjemno slovensko kuhinjo.',
    suite: 'Prestige Suite',
  },
  {
    id: 6,
    name: 'Elena & Marko Kovač',
    country: 'Slovenia',
    rating: 5,
    date: '2025-11-10',
    textEn: 'As locals, we wanted a special weekend getaway and Villa Adora delivered beyond expectations. The Luxury Suite was stunning, and the location simply cannot be beaten.',
    textSl: 'Kot domačina smo želeli poseben vikend oddih in Villa Adora je presegla pričakovanja. Luxury Suite je bila osupljiva, lokacija pa preprosto ni mogoče premagati.',
    suite: 'Luxury Suite',
  },
]

const GuestReviews = () => {
  const { language } = useLanguage()

  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            {language === 'sl' ? 'Mnenje gostov' : 'Guest Reviews'}
          </span>
          <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
            {language === 'sl' ? 'Kaj pravijo naši gostje' : 'What Our Guests Say'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'sl'
              ? 'Preberite izkušnje gostov iz vsega sveta, ki so prečkali naša vrata.'
              : 'Read experiences from guests around the world who have walked through our doors.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">
                "{language === 'sl' ? review.textSl : review.textEn}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                    {review.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {review.country} · {review.suite}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">4.9</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Average Rating</p>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">312+</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Guest Reviews</p>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">94%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Would Recommend</p>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">68%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Return Guests</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GuestReviews
