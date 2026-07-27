import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  PaperAirplaneIcon, 
  MapIcon, 
  FireIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline'

const ActivitiesPreview = () => {
  const { t } = useLanguage()

  const activities = [
    {
      icon: <PaperAirplaneIcon className="w-12 h-12 text-indigo-500" />,
      title: t('activities.lake.title'),
      description: t('activities.lake.description'),
    },
    {
      icon: <MapIcon className="w-12 h-12 text-emerald-500" />,
      title: t('activities.mountain.title'),
      description: t('activities.mountain.description'),
    },
    {
      icon: <FireIcon className="w-12 h-12 text-orange-500" />,
      title: t('activities.culinary.title'),
      description: t('activities.culinary.description'),
    },
    {
      icon: <SparklesIcon className="w-12 h-12 text-purple-500" />,
      title: t('activities.spa.title'),
      description: t('activities.spa.description'),
    },
  ]

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
          <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-6">
            {t('activities.title')}
          </h2>
        </motion.div>

        <div className="grid-responsive-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="mb-6 inline-block p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                {activity.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {activity.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/activities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
            >
              {t('common.learn')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ActivitiesPreview
