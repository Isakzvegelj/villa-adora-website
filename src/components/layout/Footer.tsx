import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeartIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center space-x-3 mb-6 inline-block">
              <span className="text-3xl font-bold font-serif text-white tracking-wide">ADORA</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/villa.adora.bled/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/villaadora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.tripadvisor.com/Hotel_Review"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all duration-300"
                aria-label="TripAdvisor"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 5.997 5.997 0 0 0 4.04-10.43L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM6 17.205a3.997 3.997 0 1 1 0-7.994 3.997 3.997 0 0 1 0 7.994zm12 0a3.997 3.997 0 1 1 0-7.994 3.997 3.997 0 0 1 0 7.994z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider">{t('footer.contact')}</h3>
            <div className="space-y-4 text-slate-400">
              <p className="hover:text-indigo-400 transition-colors">
                <a href="https://maps.google.com/?q=Cesta+svobode+35+Bled+Slovenia" target="_blank" rel="noopener noreferrer">
                  {t('contact.address')}
                </a>
              </p>
              <p>
                <a href="tel:+386****3858" className="hover:text-indigo-400 transition-colors">
                  {t('contact.phone')}
                </a>
              </p>
              <p>
                <a href="mailto:evita.vilebled@gmail.com" className="hover:text-indigo-400 transition-colors">
                  {t('contact.email')}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider">{t('footer.links')}</h3>
            <ul className="space-y-3">
              {[
                { key: 'home', path: '/' },
                { key: 'about', path: '/about' },
                { key: 'suites', path: '/suites' },
                { key: 'gallery', path: '/gallery' },
                { key: 'activities', path: '/activities' },
                { key: 'contact', path: '/contact' },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-indigo-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider">{t('footer.newsletter.title')}</h3>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-green-900/30 border border-green-700/50 rounded-xl p-4"
              >
                <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <p className="text-green-300 text-sm">Successfully subscribed! Check your inbox.</p>
              </motion.div>
            ) : (
              <>
                <p className="text-slate-400 mb-4 text-sm">
                  {t('footer.newsletter.desc')}
                </p>
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.newsletter.placeholder')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    {t('footer.newsletter.button')}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center text-slate-500 text-sm space-x-1">
            <span>&copy; {currentYear} Villa Adora.</span>
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors ml-1">Privacy Policy</Link>
            <span className="mx-1">·</span>
            <span>{t('footer.rights')}</span>
          </div>
          <div className="flex items-center text-slate-500 text-sm space-x-1">
            <span>Made with</span>
            <HeartIcon className="w-4 h-4 text-pink-500 mx-1" />
            <span>in Bled, Slovenia</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
