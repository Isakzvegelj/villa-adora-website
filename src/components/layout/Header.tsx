import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.suites'), href: '/suites' },
    { name: t('nav.activities'), href: '/activities' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
    { name: t('nav.giftVoucher'), href: '/gift-voucher' },
    { name: t('nav.wellness'), href: '/wellness' },
    { name: t('nav.offers'), href: '/offers' },
    { name: t('nav.weddings'), href: '/weddings' },
    { name: t('nav.reviews'), href: '/reviews' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-3xl font-bold font-serif transition-colors duration-200 ${
                isScrolled
                  ? 'text-gradient'
                  : 'text-white dark:text-slate-200'
              }`}
            >
              ADORA
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : isScrolled
                    ? 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-full p-1 border border-white/30 dark:border-slate-700/30">
              <button
                onClick={() => setLanguage('sl')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === 'sl'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : isScrolled
                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
                }`}
              >
                SI
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : isScrolled
                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === 'de'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : isScrolled
                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLanguage('it')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === 'it'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : isScrolled
                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
                }`}
              >
                IT
              </button>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-colors duration-200 ${
                isScrolled
                  ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
              }`}
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Concierge Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const event = new CustomEvent('open-concierge')
                window.dispatchEvent(event)
              }}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30'
              }`}
              aria-label="Open concierge chat"
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Concierge</span>
            </motion.button>

            {/* Reservation Button */}
            <Link to="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden sm:inline-flex"
              >
                {t('nav.reservation')}
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-colors duration-200 ${
                isScrolled
                  ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  : 'text-white hover:text-indigo-200 dark:text-slate-200 dark:hover:text-indigo-400'
              }`}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl mt-4 p-6 border border-white/30 dark:border-slate-700/30"
            >
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/reservation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full mt-6"
                >
                  <button className="btn-primary w-full">
                    {t('nav.reservation')}
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setTimeout(() => {
                      const event = new CustomEvent('open-concierge')
                      window.dispatchEvent(event)
                    }, 100)
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors duration-200"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Ask Concierge
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header
