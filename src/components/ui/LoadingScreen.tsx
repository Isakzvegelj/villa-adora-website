import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white"
    >
      <div className="text-center w-full max-w-sm px-6">
        {/* Elegant Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-[0.3em] font-medium text-white/70 mb-6">
            Welcome to
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif tracking-wide mb-2">
            ADORA
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="relative mt-12">
          <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-white/50 text-xs uppercase tracking-[0.2em] font-medium"
          >
            Curating your experience...
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
