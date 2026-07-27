import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const LoadingScreen = () => {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      </div>

      <div className="relative z-10 text-center w-full max-w-sm px-6">
        {/* Elegant Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs uppercase tracking-[0.3em] font-medium text-white/70 mb-6">
            {language === 'sl' ? 'Dobrodošli v' : 'Welcome to'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif tracking-wide mb-2 text-white">
            ADORA
          </h1>
          <p className="text-white/50 text-sm tracking-widest uppercase mt-2">
            Bled · Slovenia
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="relative mt-12">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-white/40 text-xs uppercase tracking-[0.2em] font-medium"
          >
            {language === 'sl' ? 'Pripravljamo vašo izkušnjo...' : 'Curating your experience...'}
          </motion.p>
        </div>

        {/* Decorative mountain silhouette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -bottom-20 left-0 right-0"
        >
          <svg viewBox="0 0 400 60" className="w-full h-12 text-white/20" preserveAspectRatio="none">
            <path d="M0,60 L0,40 L50,25 L100,35 L150,15 L200,30 L250,10 L300,28 L350,18 L400,35 L400,60 Z" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
