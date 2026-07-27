import React from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "United Kingdom",
    rating: 5,
    text: "An absolutely magical stay. The views of Lake Bled were breathtaking, and the service was impeccable. Waking up to the castle view from the Princess Suite was unforgettable.",
    date: "September 2024",
    source: "Booking.com"
  },
  {
    id: 2,
    name: "Marc Dubois",
    location: "France",
    rating: 5,
    text: "Luxury at its finest. The attention to detail in the rooms and the breakfast service was outstanding. The Adora Pop Up Restaurant exceeded all expectations.",
    date: "August 2024",
    source: "TripAdvisor"
  },
  {
    id: 3,
    name: "Elena Rossi",
    location: "Italy",
    rating: 5,
    text: "Perfect location, beautiful villa, and wonderful hosts. We will definitely be coming back. The terrace dining experience was the highlight of our trip.",
    date: "July 2024",
    source: "Direct"
  },
  {
    id: 4,
    name: "Tomaž Kovač",
    location: "Ljubljana, Slovenija",
    rating: 5,
    text: "Najlepši hotel v Bledu, brez izjeme. Pogledi so neverjetni, zajtrk pa je bil najbolši v Sloveniji. Toplo priporočamo! 🇸🇮",
    date: "Oktober 2024",
    source: "Booking.com"
  },
  {
    id: 5,
    name: "Anna Müller",
    location: "Germany",
    rating: 5,
    text: "Wir haben uns wie Könige gefühllt. Der Penthaus-Spektakel ist atemberaubend und das Personal ist so freundlich und zuvorkommend. Auf jeden Fall eine Wiederholung!",
    date: "Juni 2024",
    source: "TripAdvisor"
  },
  {
    id: 6,
    name: "Petra Horvat",
    location: "Maribor, Slovenija",
    rating: 5,
    text: "Adaptirali smo ob Island Suite za družinski izlet. Otroci so navdušeni, bazen pa čudovit. Gospodje zelo prijazni, prostori pa vzorčno čisti. 🌟",
    date: "December 2024",
    source: "Booking.com"
  },
]

const ReviewsPreview: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4">
            Guest Experiences
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Read what our guests have to say about their stay at Villa Adora.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">4.7 / 5</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">· 275+ reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed flex-grow">
                "{review.text}"
              </p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {review.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">{review.date}</span>
                  <span className="block text-xs text-gray-500">{review.source}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4.7/5</div>
            <div className="text-xs text-gray-500">TripAdvisor</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">9.2</div>
            <div className="text-xs text-gray-500">Booking.com</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Top 10%</div>
            <div className="text-xs text-gray-500">Travelers' Choice</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">#4</div>
            <div className="text-xs text-gray-500">of 71 B&Bs in Bled</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ReviewsPreview
