import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

const NewsletterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <EnvelopeIcon className="w-8 h-8 text-indigo-400" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            {t('newsletter.description')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {t('newsletter.button')}
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </form>

          {/* Success/Error Messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 text-green-400"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>{t('newsletter.success')}</span>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-400"
            >
              {t('newsletter.error')}
            </motion.div>
          )}

          <p className="text-xs text-slate-500 mt-4">
            {t('newsletter.privacy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
