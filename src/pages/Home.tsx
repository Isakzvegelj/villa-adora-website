import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import HeroSection from '../components/sections/HeroSection'
import AboutPreview from '../components/sections/AboutPreview'
import SuitesPreview from '../components/sections/SuitesPreview'
import ActivitiesPreview from '../components/sections/ActivitiesPreview'
import GalleryPreview from '../components/sections/GalleryPreview'
import ReviewsPreview from '../components/sections/ReviewsPreview'
import AwardsSection from '../components/sections/AwardsSection'

const Home = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* About Preview */}
      <AboutPreview />

      {/* Suites Preview */}
      <SuitesPreview />

      {/* Activities Preview */}
      <ActivitiesPreview />

      {/* Gallery Preview */}
      <GalleryPreview />

      {/* Reviews Preview */}
      <ReviewsPreview />

      {/* Awards & Ratings */}
      <AwardsSection />

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-padding bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
      >
        <div className="container-max text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-responsive-xl font-bold text-white mb-4"
          >
            Ready for an Unforgettable Stay?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/85 mb-4 max-w-2xl mx-auto"
          >
            Book directly for the best rates. Our concierge team will ensure every detail of your stay is perfect.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-white/60 mb-8"
          >
            Best rate guarantee · Free cancellation up to 48h · Late check-out available
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-flex items-center px-10 py-4 text-lg"
              >
                {t('hero.book')}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white hover:text-indigo-600 inline-flex items-center px-10 py-4 text-lg"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default Home
