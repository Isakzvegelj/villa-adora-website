import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { SparklesIcon, SunIcon, CakeIcon, BeakerIcon } from '@heroicons/react/24/outline'

const activities = [
  {
    id: 'lake',
    icon: <SunIcon className="w-12 h-12" />,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop'
  },
  {
    id: 'mountain',
    icon: <SparklesIcon className="w-12 h-12" />,
    color: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop'
  },
  {
    id: 'culinary',
    icon: <CakeIcon className="w-12 h-12" />,
    color: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1550966841-3ee4ad00aed0?w=800&h=600&fit=crop'
  },
  {
    id: 'spa',
    icon: <BeakerIcon className="w-12 h-12" />,
    color: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=800&h=600&fit=crop'
  }
]

const Activities = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-responsive-xl font-bold mb-6 text-slate-900 dark:text-white"
            >
              {t('activities.title')}
            </motion.h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Bled and its surroundings offer a wealth of experiences. 
              Whether you seek adventure or relaxation, we have something for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl h-[400px]"
              >
                {/* Background Image */}
                <img 
                  src={activity.image} 
                  alt={t(`activities.${activity.id}.title`)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <div className={`mb-4 w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {activity.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {t(`activities.${activity.id}.title`)}
                  </h2>
                  <p className="text-white/80 text-lg line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {t(`activities.${activity.id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Ready for your adventure?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Ask our Concierge
          </motion.button>
        </div>
      </section>
    </motion.div>
  )
}

export default Activities
