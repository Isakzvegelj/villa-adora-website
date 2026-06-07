import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const SuitesPreview = () => {
  const { t } = useLanguage()

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding bg-slate-50 dark:bg-slate-800"
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
            {t('suites.title')}
          </h2>
        </motion.div>

        <div className="grid-responsive-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-hover"
          >
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&crop=center"
              alt="Premium Suite"
              className="w-full h-64 object-cover rounded-xl mb-6 image-hover"
            />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {t('suites.premium.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {t('suites.premium.description')}
            </p>
            <Link to="/suites">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
              >
                {t('common.book')}
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card-hover"
          >
            <img
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop&crop=center"
              alt="Lake View Suite"
              className="w-full h-64 object-cover rounded-xl mb-6 image-hover"
            />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {t('suites.lakeview.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {t('suites.lakeview.description')}
            </p>
            <Link to="/suites">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
              >
                {t('common.book')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default SuitesPreview
