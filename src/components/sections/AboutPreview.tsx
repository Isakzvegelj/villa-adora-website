import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const AboutPreview = () => {
  const { t } = useLanguage()

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="container-max">
        <div className="grid-responsive-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                {t('common.learn')}
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="card-hover">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80"
                alt="Villa Adora - Historic Heritage Villa at Lake Bled"
                className="w-full h-80 object-cover rounded-xl image-hover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutPreview
