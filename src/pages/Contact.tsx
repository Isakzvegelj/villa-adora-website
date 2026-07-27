import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Store message in localStorage for admin dashboard
    try {
      const messageData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      }
      const existing = JSON.parse(localStorage.getItem('villa_adora_messages') || '[]')
      existing.push(messageData)
      localStorage.setItem('villa_adora_messages', JSON.stringify(existing))
    } catch {
      // localStorage unavailable
    }

    // Simulate API call — in production this would send to a backend
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-12 max-w-lg mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Message Sent!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Thank you, {formData.name}! We've received your message.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
            We'll get back to you at <strong>{formData.email}</strong> as soon as possible.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ name: '', email: '', subject: '', message: '' })
            }}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-responsive-xl font-bold mb-6 text-slate-900 dark:text-white"
                >
                  {t('contact.title')}
                </motion.h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  We are here to help you plan your perfect stay at Lake Bled.
                  Reach out to us for any inquiries or special requests.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                    <MapPinIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Address</h3>
                    <p className="text-slate-600 dark:text-slate-400">{t('contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-200 dark:shadow-none">
                    <PhoneIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                    <a href="tel:+38651603858" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {t('contact.phone')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-pink-600 p-4 rounded-2xl shadow-lg shadow-pink-200 dark:shadow-none">
                    <EnvelopeIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                    <a href="mailto:evita.vilebled@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {t('contact.email')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-amber-600 p-4 rounded-2xl shadow-lg shadow-amber-200 dark:shadow-none">
                    <ClockIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Working Hours</h3>
                    <p className="text-slate-600 dark:text-slate-400">{t('contact.hours')}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">24h guest support available</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <a
                  href="https://wa.me/38651603858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 hover:shadow-lg transition-all group"
                >
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-400 text-sm">WhatsApp</div>
                    <div className="text-xs text-green-600 dark:text-green-500">Quick response</div>
                  </div>
                </a>
                <a
                  href="mailto:evita.vilebled@gmail.com"
                  className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 hover:shadow-lg transition-all group"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <div className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm">Email</div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-500">Detailed inquiries</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white`}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  >
                    <option value="">Select a topic...</option>
                    <option value="reservation">Reservation Inquiry</option>
                    <option value="rooms">Room Information</option>
                    <option value="dining">Restaurant & Dining</option>
                    <option value="activities">Activities & Experiences</option>
                    <option value="events">Events & Celebrations</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.message ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-slate-200 overflow-hidden mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.2628461741517!2d14.101783577317953!3d46.36319747372957!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!5e0!3m2!1sen!2ssi!4v1714900000000!5m2!1sen!2ssi"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Villa Adora Location"
        ></iframe>
      </section>
    </motion.div>
  )
}

export default Contact
