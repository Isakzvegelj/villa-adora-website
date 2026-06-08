import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import {
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  TrashIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Revenue', value: '€24,500', change: '+12%', icon: <CurrencyDollarIcon className="w-6 h-6" /> },
  { name: 'Active Bookings', value: '45', change: '+5%', icon: <CalendarDaysIcon className="w-6 h-6" /> },
  { name: 'New Guests', value: '12', change: '+2%', icon: <UsersIcon className="w-6 h-6" /> },
  { name: 'Occupancy Rate', value: '88%', change: '+14%', icon: <ArrowTrendingUpIcon className="w-6 h-6" /> },
]

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

const AdminDashboard = () => {
  const { t } = useLanguage()

  // Read real reservations from localStorage
  let reservations: Reservation[] = []
  try {
    reservations = JSON.parse(localStorage.getItem('villa_adora_reservations') || '[]')
  } catch {
    reservations = []
  }

  const clearReservations = () => {
    localStorage.removeItem('villa_adora_reservations')
    window.location.reload()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-12 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <div className="container-max">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
            {t('nav.admin')} Dashboard
          </h1>
          <div className="flex gap-3">
            {reservations.length > 0 && (
              <button
                onClick={clearReservations}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-1.5"
              >
                <TrashIcon className="w-4 h-4" />
                Clear ({reservations.length})
              </button>
            )}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservations Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Reservations
                {reservations.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({reservations.length} from website)
                  </span>
                )}
              </h2>
            </div>

            {reservations.length === 0 ? (
              <div className="p-12 text-center">
                <CalendarDaysIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">No reservations yet</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                  Reservation requests from the website will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Guest</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Suite</th>
                      <th className="px-6 py-4 font-medium">Dates</th>
                      <th className="px-6 py-4 font-medium">Total</th>
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
                            {r.adults} adults{r.children && Number(r.children) > 0 ? `, ${r.children} children` : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-300">{r.email}</div>
                          <div className="text-xs text-slate-500">{r.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-300">{r.selectedRoom || r.roomType}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            {r.checkIn} → {r.checkOut}
                          </div>
                          <div className="text-xs text-slate-500">{r.nights} nights</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            €{r.totalPrice?.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions / Activity */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
                  + Add New Booking
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
                  Manage Suites
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
                  View Guest Messages
                </button>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5" />
                Contact
              </h3>
              <div className="space-y-2 text-sm text-indigo-100">
                <p>📞 +386 51 603 858</p>
                <p>✉️ evita.vilebled@gmail.com</p>
                <p>📍 Cesta svobode 35, Bled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
