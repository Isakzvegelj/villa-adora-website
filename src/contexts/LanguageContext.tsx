import React, { createContext, useContext, useState, useEffect } from 'react'

// Language Context
interface LanguageContextType {
  language: 'sl' | 'en'
  setLanguage: (lang: 'sl' | 'en') => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'sl' | 'en'>('sl')

  // Translation object
  const translations = {
    sl: {
      // Navigation
      'nav.home': 'Domov',
      'nav.about': 'O nas',
      'nav.suites': 'Suite',
      'nav.activities': 'Aktivnosti',
      'nav.gallery': 'Galerija',
      'nav.contact': 'Kontakt',
      'nav.reservation': 'Rezervacija',
      'nav.admin': 'Admin',
      
      // Hero section
      'hero.title': 'Villa Adora',
      'hero.subtitle': 'Luksuzni hotel ob jezeru Bled',
      'hero.description': 'Doživite nepozabno bivanje v našem luksuznem hotelu ob čudovitem jezeru Bled',
      'hero.book': 'Rezerviraj',
      'hero.learn': 'Več informacij',
      
      // About section
      'about.title': 'O nas',
      'about.subtitle': 'Villa Adora',
      'about.description': 'Villa Adora je edinstven luksuzni hotel na obali čudovitega jezera Bled v Sloveniji. Ponuja popolno kombinacijo naravne lepote, udobja in vrhunske storitve za nepozabno bivanje.',
        // Suites section
      'suites.title': 'Luksuzne suite',
      'suites.princess.title': 'Princess Suite',
      'suites.princess.description': 'Zelo lepo opremljena in okusno dekorirana suite, v kateri se boste počutili posebno. 55 m² prijetnega prostora z bivalnim delom, spalnico in kopalnico. Stolpič nudi pogled na čudovito Blejsko jezero.',
      'suites.luxury.title': 'Luxury Suite',
      'suites.luxury.description': 'Razkošna suite, zasnovana za vrhunsko udobje in eleganco z nepozabnim razgledom na jezero.',
      'suites.penthouse.title': 'Penthouse Suite',
      'suites.penthouse.description': 'Najbolj edinstven prostor v naši hiši, razporejen v dveh nadstropjih (60 m²). Vzdušje je posebno in domače, razgledi pa dih jemajoči.',
      'suites.swan.title': 'Swan Suite',
      'suites.swan.description': 'Elegantna in prostorna suite, ki ponuja popolno zavetje za vaš oddih.',
      'suites.island.title': 'Island Suite',
      'suites.island.description': 'Stilska in luksuzna suite (65 m²) v prvem nadstropju. Nudi osupljiv razgled na jezero in Blejski otok. Ima dve luksuzni spalnici, velik bivalni del in dva balkona.',
      'suites.prestige.title': 'Prestige Suite',
      'suites.prestige.description': 'Absolutna harmonija umetniškega dekorja in prostornosti (72 m²). Nahaja se v pritličju in ponuja nepozaben razgled na jezero skozi vsa okna.',
      
      // Activities section
      'activities.title': 'Aktivnosti in doživetja',
      'activities.lake.title': 'Jezerske aktivnosti',
      'activities.lake.description': 'Pustolovščine na jezeru Bled: vožnja s čolnom do otoka, kajak, sup, ribolov in piknik na vodi.',
      'activities.mountain.title': 'Gorski pohodi',
      'activities.mountain.description': 'Raziskujte čudovite gorske poti okoli Bleda. Obiščite Ojstrico, planinske koče in uživajte v spektakularnih razgledih.',
      'activities.culinary.title': 'Kulinarične doživetje',
      'activities.culinary.description': 'Okusite lokalne specialitete v našem hotelu ali obiščite tradicionalne gostilne. Uživajte v kremni rezini in lokalnih vinih.',
      'activities.spa.title': 'Spa in relaksacija',
      'activities.spa.description': 'Sprostite se v našem luksuznem wellness centru z masažami, savno in pogledom na jezero.',
      
      // Gallery section
      'gallery.title': 'Fotogalerija',
      
      // Contact section
      'contact.title': 'Lokacija in kontakt',
      'contact.address': 'Cesta svobode 35, 4260 Bled, Slovenija',
      'contact.phone': '+386 51 603 858',
      'contact.email': 'evita.vilebled@gmail.com',
      'contact.hours': '7:00 - 22:00',
      
      // Reservation section
      'reservation.title': 'Rezervacija',
      'reservation.firstName': 'Ime',
      'reservation.lastName': 'Priimek',
      'reservation.email': 'E-pošta',
      'reservation.phone': 'Telefon',
      'reservation.checkIn': 'Datum prihoda',
      'reservation.checkOut': 'Datum odhoda',
      'reservation.adults': 'Število odraslih',
      'reservation.roomType': 'Tip sobe',
      'reservation.requests': 'Posebne zahtevke',
      'reservation.submit': 'Pošlji rezervacijo',
      
      // Nearby Attractions
      'nearby.island.title': 'Blejski otok',
      'nearby.island.description': 'Slovenska ikona — majhen otok s cerkvico, dostopen s tradicionalnim čolnom "pletna".',
      'nearby.castle.title': 'Blejski grad',
      'nearby.castle.description': 'Srednjeveški grad na kotu s panoramskim razgledom na jezero in okolico.',
      'nearby.vintgar.title': 'Vintgar',
      'nearby.vintgar.description': 'Čudovita soteska z železniškim mostom in rečnim kanjonom. Priljubljena naravna znamenitost.',
      'nearby.triglav.title': 'Triglavski narodni park',
      'nearby.triglav.description': 'Eden najstarejših narodnih parkov v Evropi. Triglav, najvišja gora Slovenije.',
      'nearby.ljubljana.title': 'Ljubljana',
      'nearby.ljubljana.description': 'Čudovito glavno mesto Slovenije z baročno arhitekturo in živahno kulturno sceno.',
      'nearby.planica.title': 'Planica',
      'nearby.planica.description': 'Svetovno priljubljena skakalnica in center zimskih športov.',
      
      // Seasonal Offers
      'offers.spring.title': 'Pomladanski paket',
      'offers.spring.desc': '3 nočitve + kajak na jezeru. Od €690.',
      'offers.summer.title': 'Poletni luksuz',
      'offers.summer.desc': '5 nočitve, 2. nočitev brezplačna. Velja julij–avgust.',
      'offers.autumn.title': 'Jesenski oddih',
      'offers.autumn.desc': '4 nočitve + degustacija vin. Od €890.',
      'offers.winter.title': 'Zimsko čudo',
      'offers.winter.desc': '3 nočitve + wellness paket. Od €750.',
      
      // Common
      'common.book': 'Rezerviraj',
      'common.learn': 'Več',
      'common.close': 'Zapri',
      'common.loading': 'Nalaganje...',
      'common.error': 'Napaka',
      'common.success': 'Uspeh',
      'common.from': 'Od',
      'common.perNight': 'na noč',
      
      // Footer
      'footer.description': 'Luksuzni butični hotel v osrčju Bleda. Zgodovinska vila iz leta 1878, preoblikovana v zatočišče elegance.',
      'footer.contact': 'Kontakt',
      'footer.links': 'Povezave',
      'footer.newsletter.title': 'E-novice',
      'footer.newsletter.desc': 'Prijavite se na naše e-novice za ekskluzivne ponudbe.',
      'footer.newsletter.placeholder': 'Vaš e-naslov',
      'footer.newsletter.button': 'Prijava',
      'footer.rights': 'Vse pravice pridržane.',
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.suites': 'Suites',
      'nav.activities': 'Activities',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'nav.reservation': 'Reservation',
      'nav.admin': 'Admin',
      
      // Hero section
      'hero.title': 'Villa Adora',
      'hero.subtitle': 'Luxury Boutique Hotel Bled',
      'hero.description': 'Experience the pinnacle of elegance in our historic villa on the shores of Lake Bled.',
      'hero.book': 'Book Now',
      'hero.learn': 'Explore Villa',
      
      // About section
      'about.title': 'About Us',
      'about.subtitle': 'Villa Adora',
      'about.description': 'Villa Adora is a heritage-protected historic villa built in 1878, meticulously renovated into a boutique luxury design hotel. Located directly on the shore of Lake Bled, it offers an intimate and high-end experience.',
      
      // Suites section
      'suites.title': 'Our Luxury Suites',
      'suites.princess.title': 'Princess Suite',
      'suites.princess.description': 'Very nicely furnished and tastefully decorated suite (55 m²) with a living area, bedroom, and bathroom. The little tower overlooks beautiful Lake Bled.',
      'suites.luxury.title': 'Luxury Suite',
      'suites.luxury.description': 'Designed for ultimate comfort and elegance with unforgettable lake views.',
      'suites.penthouse.title': 'Penthouse Suite',
      'suites.penthouse.description': 'The most unique space in our house, designed with great taste across two floors (60 m²). Cozy atmosphere with breathtaking views.',
      'suites.swan.title': 'Swan Suite',
      'suites.swan.description': 'An elegant and spacious suite providing the perfect sanctuary for your stay.',
      'suites.island.title': 'Island Suite',
      'suites.island.description': 'A stylish luxury suite (65 m²) on the first floor. Offers stunning views of the lake and Bled Island. Features two bedrooms and two balconies.',
      'suites.prestige.title': 'Prestige Suite',
      'suites.prestige.description': 'Absolute harmony of artful decor and spaciousness (72 m²). Located on the ground floor with lake views from every window.',
      
      // Activities section
      'activities.title': 'Activities & Experiences',
      'activities.lake.title': 'Lake Activities',
      'activities.lake.description': 'Lake Bled adventures: rowing to the island, kayaking, stand-up paddleboarding, fishing and lakeside picnics.',
      'activities.mountain.title': 'Mountain Hiking',
      'activities.mountain.description': 'Explore the magnificent mountain trails around Bled. Visit Ojstrica, mountain huts and enjoy spectacular panoramic views.',
      'activities.culinary.title': 'Culinary Experiences',
      'activities.culinary.description': 'Taste local specialties at our hotel or visit traditional restaurants. Enjoy cream cake and local wines.',
      'activities.spa.title': 'Spa & Relaxation',
      'activities.spa.description': 'Relax in our luxury wellness center with massages, sauna and lake views.',
      
      // Gallery section
      'gallery.title': 'Photo Gallery',
      
      // Contact section
      'contact.title': 'Location & Contact',
      'contact.address': 'Cesta svobode 35, 4260 Bled, Slovenia',
      'contact.phone': '+386 51 603 858',
      'contact.email': 'evita.vilebled@gmail.com',
      'contact.hours': '7:00 - 22:00',
      
      // Reservation section
      'reservation.title': 'Reservation',
      'reservation.firstName': 'First Name',
      'reservation.lastName': 'Last Name',
      'reservation.email': 'Email',
      'reservation.phone': 'Phone',
      'reservation.checkIn': 'Check-in Date',
      'reservation.checkOut': 'Check-out Date',
      'reservation.adults': 'Number of Adults',
      'reservation.roomType': 'Room Type',
      'reservation.requests': 'Special Requests',
      'reservation.submit': 'Submit Reservation',
      
      // Nearby Attractions
      'nearby.island.title': 'Bled Island',
      'nearby.island.description': 'Slovenia\'s iconic island with a picturesque church, accessible by traditional "pletna" wooden boat.',
      'nearby.castle.title': 'Bled Castle',
      'nearby.castle.description': 'Medieval castle on a cliff with panoramic views of the lake and surrounding Alps.',
      'nearby.vintgar.title': 'Vintgar Gorge',
      'nearby.vintgar.description': 'Stunning 1.6km gorge with boardwalks, waterfalls, and a historic railway bridge.',
      'nearby.triglav.title': 'Triglav National Park',
      'nearby.triglav.description': 'One of Europe\'s oldest national parks. Home to Mount Triglav, Slovenia\'s highest peak.',
      'nearby.ljubljana.title': 'Ljubljana',
      'nearby.ljubljana.description': 'Charming capital of Slovenia with baroque architecture, a vibrant café culture, and lively arts scene.',
      'nearby.planica.title': 'Planica',
      'nearby.planica.description': 'World-famous ski jumping center and Nordic skiing venue in the heart of the Julian Alps.',
      
      // Seasonal Offers
      'offers.spring.title': 'Spring Package',
      'offers.spring.desc': '3 nights + kayaking on the lake. From €690.',
      'offers.summer.title': 'Summer Luxury',
      'offers.summer.desc': '5 nights, 2nd night free. Valid July–August.',
      'offers.autumn.title': 'Autumn Retreat',
      'offers.autumn.desc': '4 nights + wine tasting. From €890.',
      'offers.winter.title': 'Winter Wonderland',
      'offers.winter.desc': '3 nights + wellness package. From €750.',
      
      // Common
      'common.book': 'Book',
      'common.learn': 'Learn More',
      'common.close': 'Close',
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.from': 'From',
      'common.perNight': 'per night',
      
      // Footer
      'footer.description': 'Luxury boutique hotel in the heart of Bled. A historic villa from 1878 transformed into a sanctuary of elegance.',
      'footer.contact': 'Contact',
      'footer.links': 'Quick Links',
      'footer.newsletter.title': 'Newsletter',
      'footer.newsletter.desc': 'Subscribe to our newsletter for exclusive offers.',
      'footer.newsletter.placeholder': 'Your email',
      'footer.newsletter.button': 'Subscribe',
      'footer.rights': 'All rights reserved.',
    },
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('villa-adora-language', language)
  }, [language])

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('villa-adora-language') as 'sl' | 'en'
    if (savedLanguage && (savedLanguage === 'sl' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
