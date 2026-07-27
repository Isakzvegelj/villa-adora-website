import { motion } from 'framer-motion'
import { StarIcon, TrophyIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'

const awards = [
  {
    icon: <TrophyIcon className="w-8 h-8 text-amber-500" />,
    title: "Travelers' Choice",
    org: 'TripAdvisor',
    detail: 'Top 10% of properties worldwide',
    year: '2024',
  },
  {
    icon: <StarIcon className="w-8 h-8 text-amber-400" />,
    title: '4.7 / 5 Rating',
    org: 'TripAdvisor — 275+ Reviews',
    detail: 'Exceptional guest satisfaction',
    year: '2024',
  },
  {
    icon: <CheckBadgeIcon className="w-8 h-8 text-emerald-500" />,
    title: '#4 of 71 B&Bs',
    org: 'Bled, Slovenia',
    detail: 'Ranked by travelers',
    year: '2024',
  },
]

const ratingBreakdown = [
  { label: 'Location', score: 4.9, max: 5 },
  { label: 'Cleanliness', score: 4.8, max: 5 },
  { label: 'Service', score: 4.7, max: 5 },
  { label: 'Rooms', score: 4.7, max: 5 },
  { label: 'Sleep Quality', score: 4.7, max: 5 },
]

const AwardsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Award-Winning
          </span>
          <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Villa Adora consistently ranks among the finest accommodations in Bled on TripAdvisor, with exceptional ratings from our guests.
          </p>
        </motion.div>

        {/* Award Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-850 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {award.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {award.title}
              </h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                {award.org}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {award.detail}
              </p>
              <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">
                {award.year}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Rating Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-3xl p-8 border border-indigo-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <StarIcon className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">4.7 / 5</span>
            <span className="text-slate-500 dark:text-slate-400 ml-2">Overall Rating</span>
          </div>
          <div className="space-y-3">
            {ratingBreakdown.map((item, index) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-28 text-right">
                  {item.label}
                </span>
                <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.score / item.max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white w-10">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-4">
            Based on 275+ verified guest reviews on TripAdvisor
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AwardsSection
