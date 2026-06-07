import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  UsersIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Revenue', value: '€24,500', change: '+12%', icon: <CurrencyDollarIcon className="w-6 h-6" /> },
  { name: 'Active Bookings', value: '45', change: '+5%', icon: <CalendarDaysIcon className="w-6 h-6" /> },
  { name: 'New Guests', value: '12', change: '+2%', icon: <UsersIcon className="w-6 h-6" /> },
  { name: 'Occupancy Rate', value: '88%', change: '+14%', icon: <ArrowTrendingUpIcon className="w-6 h-6" /> },
]

const recentBookings = [
  { id: 'BK-001', guest: 'Michael Scott', room: 'Premium Suite', checkIn: 'Oct 12', status: 'Confirmed' },
  { id: 'BK-002', guest: 'Sarah Connor', room: 'Lake View Suite', checkIn: 'Oct 14', status: 'Pending' },
  { id: 'BK-003', guest: 'James Bond', room: 'Presidential Suite', checkIn: 'Oct 15', status: 'Confirmed' },
  { id: 'BK-004', guest: 'Ellen Ripley', room: 'Premium Suite', checkIn: 'Oct 18', status: 'Confirmed' },
]

const AdminDashboard = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-12 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <div className="container-max">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
            {t('nav.admin')} Dashboard
          </h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors">
            Generate Report
          </button>
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
          {/* Recent Bookings Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Reservations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Guest</th>
                    <th className="px-6 py-4 font-medium">Room</th>
                    <th className="px-6 py-4 font-medium">Check-In</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{booking.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{booking.guest}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{booking.room}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{booking.checkIn}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {booking.status === 'Confirmed' ? <CheckCircleIcon className="w-3 h-3 mr-1" /> : <ClockIcon className="w-3 h-3 mr-1" />}
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
