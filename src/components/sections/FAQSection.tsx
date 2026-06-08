import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../contexts/LanguageContext';

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const FAQSection = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      questionKey: 'faq.checkin.question',
      answerKey: 'faq.checkin.answer',
    },
    {
      questionKey: 'faq.cancellation.question',
      answerKey: 'faq.cancellation.answer',
    },
    {
      questionKey: 'faq.parking.question',
      answerKey: 'faq.parking.answer',
    },
    {
      questionKey: 'faq.pets.question',
      answerKey: 'faq.pets.answer',
    },
    {
      questionKey: 'faq.breakfast.question',
      answerKey: 'faq.breakfast.answer',
    },
    {
      questionKey: 'faq.airport.question',
      answerKey: 'faq.airport.answer',
    },
    {
      questionKey: 'faq.wifi.question',
      answerKey: 'faq.wifi.answer',
    },
    {
      questionKey: 'faq.spa.question',
      answerKey: 'faq.spa.answer',
    },
    {
      questionKey: 'faq.transport.question',
      answerKey: 'faq.transport.answer',
    },
    {
      questionKey: 'faq.miniBar.question',
      answerKey: 'faq.miniBar.answer',
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-full mb-4 uppercase tracking-wider">
              {language === 'sl' ? 'Pogosta vprašanja' : 'FAQ'}
            </span>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {language === 'sl' ? 'Pogosto zastavljena vprašanja' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {language === 'sl'
                ? 'Odgovori na najpogostejša vprašanja o vašem bivanju v Villi Adori.'
                : 'Answers to the most common questions about your stay at Villa Adora.'}
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-4">
                    {t(faq.questionKey)}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-indigo-500' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                        {t(faq.answerKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              {language === 'sl' ? 'Še vedno imate vprašanja?' : 'Still have questions?'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+38651603858"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                📞 {language === 'sl' ? 'Pokličite nas' : 'Call Us'}
              </a>
              <a
                href="mailto:evita.vilebled@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                ✉️ {language === 'sl' ? 'Pošljite e-pošto' : 'Send Email'}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
