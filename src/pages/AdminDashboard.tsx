import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import {
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  TrashIcon,
  EnvelopeIcon,
  GiftIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

interface Reservation {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  roomType?: string;
  selectedRoom?: string;
  adults?: string;
  children?: string;
  nights?: number;
  totalPrice?: number;
  requests?: string;
  submittedAt?: string;
  id?: string;
}

interface Voucher {
  senderName?: string;
  senderEmail?: string;
  recipientName?: string;
  recipientEmail?: string;
  amount?: number;
  theme?: string;
  message?: string;
  deliveryDate?: string;
  submittedAt?: string;
  voucherId?: string;
}

interface ContactMessage {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  submittedAt?: string;
}

const AdminDashboard = () => {
  const { language } = useLanguage()
  const isSl = language === 'sl'
  const [activeTab, setActiveTab] = useState<'reservations' | 'vouchers' | 'messages'>('reservations')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Read data from localStorage
  let reservations: Reservation[] = []
  try {
    reservations = JSON.parse(localStorage.getItem('villa_adora_reservations') || '[]')
  } catch { reservations = [] }

  let vouchers: Voucher[] = []
  try {
    vouchers = JSON.parse(localStorage.getItem('villa_adora_vouchers') || '[]')
  } catch { vouchers = [] }

  let messages: ContactMessage[] = []
  try {
    messages = JSON.parse(localStorage.getItem('villa_adora_messages') || '[]')
  } catch { messages = [] }

  // Compute stats from real data
  const totalReservationValue = reservations.reduce((sum, r) => sum + (r.totalPrice || 0), 0)
  const totalVoucherValue = vouchers.reduce((sum, v) => sum + (v.amount || 0), 0)
  const totalItems = reservations.length + vouchers.length + messages.length

  const stats = [
    {
      name: isSl ? 'Rezervacije' : 'Reservations',
      value: reservations.length.toString(),
      sub: `€${totalReservationValue.toLocaleString()} ${isSl ? 'skupaj' : 'total'}`,
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      color: 'indigo',
    },
    {
      name: isSl ? 'Darilni boni' : 'Gift Vouchers',
      value: vouchers.length.toString(),
      sub: `€${totalVoucherValue.toLocaleString()} ${isSl ? 'skupaj' : 'total'}`,
      icon: <GiftIcon className="w-6 h-6" />,
      color: 'rose',
    },
    {
      name: isSl ? 'Sporočila' : 'Messages',
      value: messages.length.toString(),
      sub: isSl ? 's kontaktnega obrazca' : 'from contact form',
      icon: <EnvelopeIcon className="w-6 h-6" />,
      color: 'amber',
    },
    {
      name: isSl ? 'Skupaj' : 'Total',
      value: totalItems.toString(),
      sub: isSl ? 'vseh zapisov' : 'all records',
      icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
      color: 'emerald',
    },
  ]

  const clearData = (key: string) => {
    localStorage.removeItem(key)
    window.location.reload()
  }

  const exportCSV = () => {
    let csv = ''
    if (activeTab === 'reservations') {
      csv = 'First Name,Last Name,Email,Phone,Suite,Check-in,Check-out,Nights,Total,Submitted\n'
      reservations.forEach((r) => {
        csv += `"${r.firstName}","${r.lastName}","${r.email}","${r.phone}","${r.selectedRoom || r.roomType}","${r.checkIn}","${r.checkOut}","${r.nights}","€${r.totalPrice}","${r.submittedAt}"\n`
      })
    } else if (activeTab === 'vouchers') {
      csv = 'Sender,Email,Recipient,Recipient Email,Amount,Theme,Delivery Date,Submitted,Voucher ID\n'
      vouchers.forEach((v) => {
        csv += `"${v.senderName}","${v.senderEmail}","${v.recipientName}","${v.recipientEmail}","€${v.amount}","${v.theme}","${v.deliveryDate || 'Immediate'}","${v.submittedAt}","${v.voucherId}"\n`
      })
    } else {
      csv = 'Name,Email,Subject,Message,Submitted\n'
      messages.forEach((m) => {
        csv += `"${m.name}","${m.email}","${m.subject}","${m.message?.replace(/"/g, '""')}","${m.submittedAt}"\n`
      })
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `villa-adora-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—'
    try {
      return new Date(dateStr).toLocaleDateString(isSl ? 'sl-SI' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  const tabs = [
    { id: 'reservations' as const, label: isSl ? 'Rezervacije' : 'Reservations', count: reservations.length },
    { id: 'vouchers' as const, label: isSl ? 'Darilni boni' : 'Vouchers', count: vouchers.length },
    { id: 'messages' as const, label: isSl ? 'Sporočila' : 'Messages', count: messages.length },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-12 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
              {isSl ? 'Nadzorna plošča' : 'Dashboard'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Villa Adora — {isSl ? 'Upravljanje rezervacij in naročil' : 'Reservation & Order Management'}
            </p>
          </div>
          <div className="flex gap-3">
            {activeTab === 'reservations' && reservations.length > 0 && (
              <button
                onClick={() => clearData('villa_adora_reservations')}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-1.5"
              >
                <TrashIcon className="w-4 h-4" />
                {isSl ? 'Počisti rezervacije' : 'Clear'}
              </button>
            )}
            {activeTab === 'vouchers' && vouchers.length > 0 && (
              <button
                onClick={() => clearData('villa_adora_vouchers')}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-1.5"
              >
                <TrashIcon className="w-4 h-4" />
                {isSl ? 'Počisti bone' : 'Clear'}
              </button>
            )}
            {activeTab === 'messages' && messages.length > 0 && (
              <button
                onClick={() => clearData('villa_adora_messages')}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-1.5"
              >
                <TrashIcon className="w-4 h-4" />
                {isSl ? 'Počisti sporočila' : 'Clear'}
              </button>
            )}
            <button
              onClick={exportCSV}
              disabled={totalItems === 0}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium shadow transition-colors flex items-center gap-1.5 text-sm"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              {isSl ? 'Izvozi CSV' : 'Export CSV'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                  stat.color === 'rose' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
                  stat.color === 'amber' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                  'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">{stat.name}</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'reservations' && (
              <motion.div
                key="reservations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {reservations.length === 0 ? (
                  <div className="p-12 text-center">
                    <CalendarDaysIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {isSl ? 'Ni rezervacij' : 'No reservations yet'}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                      {isSl
                        ? 'Zahteve za rezervacijo s spletne strani bodo prikazane tukaj.'
                        : 'Reservation requests from the website will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                          <th className="px-6 py-4 font-medium">{isSl ? 'Gost' : 'Guest'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Kontakt' : 'Contact'}</th>
                          <th className="px-6 py-4 font-medium">Suite</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Datumi' : 'Dates'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Skupaj' : 'Total'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Poslano' : 'Submitted'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {reservations.reverse().map((r, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {r.firstName} {r.lastName}
                              </div>
                              <div className="text-xs text-slate-500">
                                {r.adults} {isSl ? 'odraslih' : 'adults'}
                                {r.children && Number(r.children) > 0 ? `, ${r.children} ${isSl ? 'otrok' : 'children'}` : ''}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                                {r.email}
                                <button
                                  onClick={() => copyToClipboard(r.email || '', `res-email-${i}`)}
                                  className="p-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                                  title="Copy"
                                >
                                  {copiedId === `res-email-${i}` ? (
                                    <CheckIcon className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <ClipboardDocumentIcon className="w-3 h-3 text-slate-400" />
                                  )}
                                </button>
                              </div>
                              <div className="text-xs text-slate-500">{r.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-slate-600 dark:text-slate-300">{r.selectedRoom || r.roomType}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-slate-600 dark:text-slate-300">
                                {r.checkIn} → {r.checkOut}
                              </div>
                              <div className="text-xs text-slate-500">{r.nights} {isSl ? 'nočitev' : 'nights'}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                €{r.totalPrice?.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500">
                              {formatDate(r.submittedAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'vouchers' && (
              <motion.div
                key="vouchers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {vouchers.length === 0 ? (
                  <div className="p-12 text-center">
                    <GiftIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {isSl ? 'Ni darilnih bonov' : 'No gift vouchers yet'}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                      {isSl
                        ? 'Naročila darilnih bonov s spletne strani bodo prikazana tukaj.'
                        : 'Gift voucher orders from the website will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                          <th className="px-6 py-4 font-medium">{isSl ? 'Pošiljatelj' : 'Sender'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Prejemnik' : 'Recipient'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Znesek' : 'Amount'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Tema' : 'Theme'}</th>
                          <th className="px-6 py-4 font-medium">{isSl ? 'Dostava' : 'Delivery'}</th>
                          <th className="px-6 py-4 font-medium">ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {vouchers.reverse().map((v, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-slate-900 dark:text-white">{v.senderName}</div>
                              <div className="text-xs text-slate-500">{v.senderEmail}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-slate-600 dark:text-slate-300">{v.recipientName}</div>
                              <div className="text-xs text-slate-500">{v.recipientEmail}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-rose-600 dark:text-rose-400">€{v.amount?.toLocaleString()}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{v.theme}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                              {v.deliveryDate || (isSl ? 'Takoj' : 'Immediate')}
                            </td>
                            <td className="px-6 py-4">
                              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-slate-600 dark:text-slate-400">
                                {v.voucherId}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {messages.length === 0 ? (
                  <div className="p-12 text-center">
                    <EnvelopeIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {isSl ? 'Ni sporočil' : 'No messages yet'}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                      {isSl
                        ? 'Sporočila s kontaktnega obrazca bodo prikazana tukaj.'
                        : 'Messages from the contact form will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {messages.reverse().map((m, i) => (
                      <div key={i} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white text-sm">{m.name}</span>
                            <span className="text-slate-400 text-sm ml-2">&lt;{m.email}&gt;</span>
                          </div>
                          <span className="text-xs text-slate-400">{formatDate(m.submittedAt)}</span>
                        </div>
                        {m.subject && (
                          <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">{m.subject}</div>
                        )}
                        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{m.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {isSl
            ? 'Vsi podatki so shranjeni lokalno v brskalniku. Izvozite CSV za varnostno kopijo.'
            : 'All data is stored locally in the browser. Export CSV for backup.'}
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
