import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

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
              {/* Social Icons Placeholders */}
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
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
              <p className="hover:text-indigo-400 transition-colors cursor-pointer">
                {t('contact.address')}
              </p>
              <p className="hover:text-indigo-400 transition-colors cursor-pointer">
                {t('contact.phone')}
              </p>
              <p className="hover:text-indigo-400 transition-colors cursor-pointer">
                {t('contact.email')}
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
              {['home', 'about', 'suites', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'home' ? '/' : `/${item}`} 
                    className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-indigo-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {t(`nav.${item}`)}
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
            <p className="text-slate-400 mb-4 text-sm">
              {t('footer.newsletter.desc')}
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.newsletter.placeholder')} 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button 
                type="submit"
                className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                {t('footer.newsletter.button')}
              </button>
            </form>
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
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Villa Adora. {t('footer.rights')}
          </p>
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
