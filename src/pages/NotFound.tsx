import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../contexts/LanguageContext'

const NotFound = () => {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Large 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <span className="text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-b from-white/90 to-white/20 bg-clip-text text-transparent select-none">
            404
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            {language === 'sl' ? 'Stran ni najdena' : 'Page Not Found'}
          </h1>
          <p className="text-lg text-white/60 mb-2">
            {language === 'sl'
              ? 'Oprostite, stran ki jo iščete ne obstaja ali je bila premaknjena.'
              : "Sorry, the page you're looking for doesn't exist or has been moved."}
          </p>
          <p className="text-sm text-white/40 mb-10">
            {language === 'sl'
              ? 'Morda ste se izgubili v Blejskem jezeru...'
              : 'Perhaps you got lost around Lake Bled...'}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/25"
          >
            <HomeIcon className="w-5 h-5" />
            {language === 'sl' ? 'Nazaj domov' : 'Back to Home'}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors duration-200 border border-white/10"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            {language === 'sl' ? 'Nazaj' : 'Go Back'}
          </button>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"
        />
        <p className="mt-6 text-xs text-white/30 uppercase tracking-[0.3em]">
          Villa Adora · Bled, Slovenia
        </p>
      </div>
    </motion.div>
  )
}

export default NotFound
