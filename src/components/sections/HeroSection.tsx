import { motion } from 'framer-motion'
import { ArrowRightIcon, PlayIcon, CalendarIcon, UserIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const HeroSection = () => {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <img
          src="/Users/isakzvegelj/.gemini/antigravity/brain/178b02bf-fb95-4720-b05a-47e064f0ded8/villa_adora_exterior_heritage_1778063780288.png"
          alt="Villa Adora Lake Bled"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-6 inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm uppercase tracking-[0.3em] font-medium"
          >
            Built 1878
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-responsive-xl font-bold mb-6 text-shadow-lg leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-responsive-md mb-12 text-blue-50 text-shadow max-w-4xl mx-auto italic font-serif"
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link to="/reservation">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center text-lg px-12 py-5"
            >
              {t('hero.book')}
              <ArrowRightIcon className="ml-2 w-6 h-6" />
            </motion.button>
          </Link>
          
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center text-lg px-12 py-5 border-2 border-white/50"
            >
              <PlayIcon className="mr-2 w-6 h-6" />
              {t('hero.learn')}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Booking Bar */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-30 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 flex items-center justify-between shadow-2xl">
          <div className="flex-1 border-r border-white/10 px-6">
            <div className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Check In
            </div>
            <div className="text-white font-semibold">Select Date</div>
          </div>
          <div className="flex-1 border-r border-white/10 px-6">
            <div className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Check Out
            </div>
            <div className="text-white font-semibold">Select Date</div>
          </div>
          <div className="flex-1 border-r border-white/10 px-6">
            <div className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-1">
              <UserIcon className="w-4 h-4 mr-2" />
              Guests
            </div>
            <div className="text-white font-semibold">2 Adults, 0 Children</div>
          </div>
          <div className="flex-1 px-6">
            <div className="flex items-center text-white/60 text-xs uppercase tracking-wider mb-1">
              <HomeIcon className="w-4 h-4 mr-2" />
              Suite Type
            </div>
            <div className="text-white font-semibold">Premium Suite</div>
          </div>
          <Link to="/reservation" className="ml-4">
            <button className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors uppercase tracking-wider text-sm">
              Check
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
