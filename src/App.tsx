import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import LoadingScreen from './components/ui/LoadingScreen'
import ConciergeWidget from './components/ui/ConciergeWidget'
import ScrollToTop from './components/ui/ScrollToTop'
import StickyBookNow from './components/ui/StickyBookNow'
import NotFound from './pages/NotFound'
import './App.css'

// Lazy-loaded pages for better code splitting
const About = lazy(() => import('./pages/About'))
const Suites = lazy(() => import('./pages/Suites'))
const Activities = lazy(() => import('./pages/Activities'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const Reservation = lazy(() => import('./pages/Reservation'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const GiftVoucher = lazy(() => import('./pages/GiftVoucher'))

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/suites" element={<Suites />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/gift-voucher" element={<GiftVoucher />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

// Sets the HTML lang attribute based on selected language
function HtmlLangUpdater() {
  const { language } = useLanguage()
  
  useEffect(() => {
    document.documentElement.lang = language === 'sl' ? 'sl' : 'en'
  }, [language])
  
  return null
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        <HtmlLangUpdater />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <Router key="router">
              <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col">
                <Header />
                <main className="flex-grow">
                  <AnimatedRoutes />
                </main>
                <Footer />
                <ConciergeWidget />
                <ScrollToTop />
                <StickyBookNow />
              </div>
            </Router>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
