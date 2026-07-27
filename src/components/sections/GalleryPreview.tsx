import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const GalleryPreview = () => {
  const { t } = useLanguage()

  const images = [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop&crop=center',
  ]

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
            {t('gallery.title')}
          </h2>
        </motion.div>

        <div className="grid-responsive gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card-hover overflow-hidden"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover image-hover"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/gallery">
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

export default GalleryPreview
