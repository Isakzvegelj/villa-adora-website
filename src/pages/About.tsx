import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const About = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950"
    >
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-responsive-xl font-bold text-slate-900 dark:text-white mb-6">
                {t('about.title')}
              </h1>
              <h3 className="text-2xl font-serif italic text-indigo-600 mb-6">{t('about.subtitle')}</h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Located in the heart of Bled, Villa Adora stands as a testament to timeless elegance. 
                Our heritage dates back decades, providing a sanctuary for those who appreciate 
                the finer things in life while being surrounded by nature's masterpiece.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=1000&fit=crop" 
                alt="Villa Adora Heritage" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Our Philosophy</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Heritage', desc: 'Preserving the historical essence of Lake Bled in every corner.' },
              { title: 'Luxury', desc: 'Uncompromising quality and attention to the smallest details.' },
              { title: 'Hospitality', desc: 'A warm, personalized experience that makes you feel at home.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
