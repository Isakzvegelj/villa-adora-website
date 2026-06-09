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
      'activities.culture.title': 'Kulturne znamenitosti',
      'activities.culture.description': 'Obiščite Blejski grad, cerkev na otoku, Vintgar sotesko in številne muzeje. Bled je poln zgodovine in kulture.',
      'activities.romantic.title': 'Romantična doživetja',
      'activities.romantic.description': 'Večerja ob sončnem zahodu, vožnja s čolnom na otok, masaža za par in kremsnita ob zvokih klavirja. Popolno za pare.',
      'activities.winter.title': 'Zimske aktivnosti',
      'activities.winter.description': 'Smučanje v Krvavcu in Voku, smučarski tek na Planici, sankanje, drsanje na jezeru in božična tržnica v Bledu.',
      'activities.adventure.title': 'Pustolovska doživetja',
      'activities.adventure.description': 'Kanjoning v Bohinju, rafting na Soči, zipline nad Vintgarjem in gorsko kolesarjenje v Triglavskem narodnem parku.',
      
      // Gallery section
      'gallery.title': 'Fotogalerija',
      'gallery.subtitle': 'Ujel dušo Villa Adore',
      'gallery.followUs': 'Sledite naši zgodbi na Instagramu',
      'gallery.followDesc': 'Za najboljše fotografije in trenutke iz Villa Adore',
      'gallery.filter.all': 'Vse',
      'gallery.filter.exterior': 'Zunanjost',
      'gallery.filter.suites': 'Suite',
      'gallery.filter.lake': 'Jezero',
      'gallery.filter.dining': 'Gostinstvo',
      'gallery.img.villa': 'Zgodovinska dediščina vile',
      'gallery.img.princess': 'Princess Suite',
      'gallery.img.prestige': 'Prestige Suite Terasa',
      'gallery.img.lakeMorning': 'Jezero Bled zjutraj',
      'gallery.img.penthouse': 'Penthouse pogled',
      'gallery.img.gardens': 'Vrtovi vile',
      'gallery.img.alpine': 'Alpska mirnost',
      'gallery.img.luxuryDetails': 'Luksuzni detajli',
      'gallery.img.dining': 'Vrhunska kulinarika',
      'gallery.img.cuisine': 'Lokalna kuhinja',
      'gallery.img.facade': 'Fasada vile',
      'gallery.img.sunset': 'Sončni zahod',
      'gallery.img.suiteInterior': 'Notranjost suite',
      'gallery.img.terrace': 'Jezerska terasa',
      'gallery.img.islandView': 'Pogled na otok',
      'gallery.img.evening': 'Večerno vzdušje',
      
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

      // Special Offers (detailed)
      'offers.earlyBird.title': 'Early Bird Popust',
      'offers.earlyBird.description': 'Rezervirajte 60+ dni vnaprej in prejmite 10% popust na vaše bivanje.',
      'offers.earlyBird.price': '10% popust',
      'offers.earlyBird.tag': 'Priporočamo',
      'offers.romantic.title': 'Romantični paket',
      'offers.romantic.description': '3 nočitve + šampanjec + masaža za par + večerja ob sončnem zahodu.',
      'offers.romantic.price': 'Od €890',
      'offers.romantic.tag': 'Romantika',
      'offers.wellness.title': 'Wellness umik',
      'offers.wellness.description': '3 nočitve + dnevna joga + 2 masaži + zdrav zajtrk.',
      'offers.wellness.price': 'Od €750',
      'offers.wellness.tag': 'Wellness',
      'offers.stay5.title': '5 nočitev, plačate 4',
      'offers.stay5.description': 'Rezervirajte 5 nočitev v visoki sezoni (jul-avg) in plačate samo 4.',
      'offers.stay5.price': '1 nočitev brezplačno',
      'offers.stay5.tag': 'Najbolja ponudba',
      'offers.direct.title': 'Direktna rezervacija',
      'offers.direct.description': 'Rezervirajte direktno preko naše spletne strani in prejmite brezplačno nadgradnjo sobe + pijačo dobrodošlice.',
      'offers.direct.price': 'Brezplačna nadgradnja',
      'offers.direct.tag': 'Ekskluzivno',
      'offers.lastMinute.title': 'Last Minute',
      'offers.lastMinute.description': 'Rezervirajte v zadnjih 7 dneh in prejmite 15% popust (odvisno od razpoložljivosti).',
      'offers.lastMinute.price': '15% popust',
      'offers.lastMinute.tag': 'Hitra ponudba',
      
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

      // Why Choose Us
      'whyChoose.badge': 'Zakaj izbrati nas',
      'whyChoose.title': 'Zakaj Villa Adora?',
      'whyChoose.subtitle': 'Odkrijte, kaj nas loči od drugih in zakaj gostje iz vsega sveta prihajajo nazaj.',
      'whyChoose.bestPrice': 'Najboljša cena',
      'whyChoose.bestPriceDesc': 'Zagotavljamo najboljšo ceno. Če najdete cenejšo ponudbo, jo bomo znižali še za 10%.',
      'whyChoose.heritage': 'Zgodovinska dediščina',
      'whyChoose.heritageDesc': 'Vila iz leta 1878, obnovljena z ljubeznijo do detajlov in spoštovanjem do zgodovine.',
      'whyChoose.personalized': 'Osebna storitev',
      'whyChoose.personalizedDesc': 'Vsak gost je za nas poseben. Prilagodimo vaše bivanje do najmanjših detajlov.',
      'whyChoose.awards': 'Nagrajena kakovost',
      'whyChoose.awardsDesc': 'Priznani od gostov in potovalnih strokovnjakov kot eden najboljših butičnih hotelov v Sloveniji.',
      'whyChoose.concierge': '24/7 Concierge',
      'whyChoose.conciergeDesc': 'Naš digitalni concierge Luka je na voljo 24 ur na dan, 7 dni v tednu.',
      'whyChoose.location': 'Lokacija',
      'whyChoose.locationDesc': 'Neposredno ob jezeru Bled, s pogledom na otok in grad. Najlepša lokacija v Bledu.',
      'whyChoose.stat.rating': 'Povprečna ocena',
      'whyChoose.stat.reviews': 'Gostinskih mnenj',
      'whyChoose.stat.established': 'Ustanovljena',
      'whyChoose.stat.returnGuests': 'Gostov se vrača',

      // Bled Seasons
      'seasons.title': 'Bled skozi leto',
      'seasons.subtitle': 'Vsako sezono ponuje svoja čuda',
      'seasons.spring.title': 'Pomlad',
      'seasons.spring.desc': 'Cvetoče češnje, tople sončne dni in mirno jezero. Idealno za kajak in pohodništvo.',
      'seasons.summer.title': 'Poletje',
      'seasons.summer.desc': 'Topla voda za kopanje, živahna terasa in dolgi večeri. Padajoče cvetje in lokalne specialitete.',
      'seasons.autumn.title': 'Jesen',
      'seasons.autumn.desc': 'Zlatorumena lista, čista vina in mistični megleni jutri. Popoln za romantičen oddih.',
      'seasons.winter.title': 'Zima',
      'seasons.winter.desc': 'Zavito v sneg, Bled postane pravljica. Božična tržnica, smučanje in topli napitki.',

      // Culinary & Dining
      'culinary.subtitle': 'Kulinarična doživetja',
      'culinary.title': 'Okusi Bleda',
      'culinary.description': 'Odkrijte bogastvo lokalnih okusov, ki jih ponujamo v našem hotelu. Od tradicionalne kremne rezine do vrhunskih slovenskih vin.',
      'culinary.breakfast.title': 'Zajtrk ob jezeru',
      'culinary.breakfast.description': 'Začnite dan z bogatim samopostrežnim zajtrkom na terasi s pogledom na jezero. Sveže pecivo, lokalni sirji, domači džemi in sezonsko sadje.',
      'culinary.restaurant.title': 'Gostilna 1878',
      'culinary.restaurant.description': 'Naša restavracija ponuja sodobno interpretacijo slovenske kuhane z lokalnimi sestavinami. Degustacijski meniji s priporočenimi vini.',
      'culinary.terrace.title': 'Jezerska terasa',
      'culinary.terrace.description': 'Pijte kavo ali večerjo na naši ekskluzivni terasi neposredno ob jezeru. Nepozabno doživetje ob sončnem zahodu.',
      'culinary.experiences.title': 'Kulinarične delavnice',
      'culinary.experiences.description': 'Pridružite se našim kuharskim delavnicam — naučite se pripravljati kremno rezino, tradicionalno potico ali okusiti najboljša slovenska vina.',
      'culinary.cta': 'Rezerviraj mizo',

      // Newsletter
      'newsletter.title': 'Ostanite v stiku',
      'newsletter.description': 'Prijavite se na naše e-novice in prejmite ekskluzivne ponudbe, sezonske pakete in novice iz Villa Adore.',
      'newsletter.placeholder': 'Vaš e-naslov',
      'newsletter.button': 'Prijava',
      'newsletter.success': 'Hvala za prijavo! Prejeli ste potrditveno e-pošto.',
      'newsletter.error': 'Prosimo, vnesite veljaven e-naslov.',
      'newsletter.privacy': 'Vaš e-naslov bo uporabljen izključno za naše novice. Odjavite se lahko kadarkoli.',

      // FAQ
      'faq.checkin.question': 'Kateri so časi prihoda in odhoda?',
      'faq.checkin.answer': 'Prihod (check-in) je od 15:00 do 22:00. Odhod (check-out) je do 11:00. Pozen prihod in pozen odhod sta na voljo na zahtevo — obvestite nas vnaprej.',
      'faq.cancellation.question': 'Kakšna je politika odpovedi?',
      'faq.cancellation.answer': 'Brezplačna odpoved je možna do 48 ur pred prihodom. Odpovedi v roku 48 ur pred prihodom se zaračuna prva nočitev. Pri rezervacijah v visoki sezoni (julij-avgust) velja odpoved do 72 ur pred prihodom.',
      'faq.parking.question': 'Ali je na voljo brezplačno parkiranje?',
      'faq.parking.answer': 'Da, brezplačno zasebno parkirišče je na voljo na lokaciji za vse goste. Parkiranje je varovano in pod nadzorom kamere.',
      'faq.pets.question': 'Ali so dovoljeni hišni ljubljenčki?',
      'faq.pets.answer': 'Da, hišni ljubljenčki so dovoljeni na zahtevo. Prosimo, da nas obvestite vnaprej. Dodatna pristojbina za čiščenje znaša €30 na bivanje.',
      'faq.breakfast.question': 'Ali je zajtrk vključen v ceno?',
      'faq.breakfast.answer': 'Da, bogat samopostrežni zajtrk je vključen v ceno nočitve. Zajtrk je serviran od 7:30 do 10:30 na terasi s pogledom na jezero. Na voljo so tudi veganske in glutenske opcije.',
      'faq.airport.question': 'Kako prletim iz letališča do Villa Adore?',
      'faq.airport.answer': 'Letališče Jože Pučnik Ljubljana je oddaljeno 35 km (približno 30 min vožnje). Ponujamo prevoz iz letališča po naroku (€40 enosmerno). Tudi letališče Klagenfurt (Avstrija) je oddaljeno 70 km.',
      'faq.wifi.question': 'Ali je na voljo brezplačen WiFi?',
      'faq.wifi.answer': 'Da, brezplačen visokohitrostni WiFi je na voljo v celotnem hotelu in vseh suitah. Povezava je zanesljiva tudi na terasi in v vrtnem delu.',
      'faq.spa.question': 'Ali imate wellness center?',
      'faq.spa.answer': 'Da, naš wellness center vključuje finsko savno, turško kopel in masažne storitve. Wellness je na voljo brezplačno vsem gostom. Masaže je potrebno rezervirati vnaprej.',
      'faq.transport.question': 'Ali ponujate prevoz ali izposojo koles?',
      'faq.transport.answer': 'Da, ponujamo brezplačno izposojo gorskih koles za vse goste. Ponujamo tudi prevoz z električnim vozilom po Bledu in okolici. Za daljše izlete (Vintgar, Triglavski narodni park) organiziramo prevoz po naroku.',
      'faq.miniBar.question': 'Ali ima suite minibar?',
      'faq.miniBar.answer': 'Da, vsa suite imajo minibar z izbranimi slovenskimi vinami, pijačami in prigrizki. Vsebuje tudi kavo, čaj in vročo čokolado za pripravo.',

      // Book Direct Benefits
      'bookDirect.badge': 'Rezervirajte direktno in prihranite',
      'bookDirect.title': 'Zakaj rezervirati direktno pri nas?',
      'bookDirect.subtitle': 'Preskočite posrednike in pridobite najboljšo vrednost, ko rezervirate direktno prek naše spletne strani.',
      'bookDirect.bestPrice.title': 'Zagotovljeno najboljša cena',
      'bookDirect.bestPrice.description': 'Če najdete nižjo ceno drugje, se bomo prilagodili. Plus dodatni 5% popust za direktno rezervacijo.',
      'bookDirect.freeBreakfast.title': 'Brezplačen zajtrk',
      'bookDirect.freeBreakfast.description': 'Uživajte v bogatem samopostrežnem zajtrku s pogledom na jezero — brezplačno vključeno pri direktni rezervaciji (vrednost €25 na osebo).',
      'bookDirect.freeWifi.title': 'Premium WiFi',
      'bookDirect.freeWifi.description': 'Visokohitrostno fiber internetno omrežje po celotnem objektu, idealno za delo na daljavo ali streaming.',
      'bookDirect.upgrade.title': 'Brezplačna nadgradnja sobe',
      'bookDirect.upgrade.description': 'Glede na razpoložljivost imajo direktne rezervacije prednost pri brezplačni nadgradnji sobe.',
      'bookDirect.directSupport.title': 'Direktna podpora',
      'bookDirect.directSupport.description': 'Govorite direktno z našo ekipo za osebno storitev, posebne zahteve in lokalna priporočila.',
      'bookDirect.flexible.title': 'Fleksibilna odpoved',
      'bookDirect.flexible.description': 'Brezplačna odpoved do 48 ur pred prihodom — bolj fleksibilno kot pri rezervacijah prek tretjih strani.',
      'bookDirect.cta': 'Preveri razpoložljivost',
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
      'activities.culture.title': 'Cultural Heritage',
      'activities.culture.description': 'Visit Bled Castle, the island church, Vintgar Gorge, and numerous museums. Bled is steeped in history and culture.',
      'activities.romantic.title': 'Romantic Experiences',
      'activities.romantic.description': 'Sunset dinner, boat ride to the island, couples massage, and cream cake with piano music. Perfect for couples.',
      'activities.winter.title': 'Winter Activities',
      'activities.winter.description': 'Skiing in Krvavec and Voklo, ski jumping at Planica, sledding, ice skating on the lake, and the Bled Christmas market.',
      'activities.adventure.title': 'Adventure Experiences',
      'activities.adventure.description': 'Canyoning in Bohinj, rafting on the Soča River, zipline over Vintgar, and mountain biking in Triglav National Park.',
      
      // Gallery section
      'gallery.title': 'Photo Gallery',
      'gallery.subtitle': 'Capturing the soul of Villa Adora',
      'gallery.followUs': 'Follow our story on Instagram',
      'gallery.followDesc': 'For the best photos and moments from Villa Adora',
      'gallery.filter.all': 'All',
      'gallery.filter.exterior': 'Exterior',
      'gallery.filter.suites': 'Suites',
      'gallery.filter.lake': 'Lake',
      'gallery.filter.dining': 'Dining',
      'gallery.img.villa': 'Historic Heritage Villa',
      'gallery.img.princess': 'Princess Suite',
      'gallery.img.prestige': 'Prestige Suite Terrace',
      'gallery.img.lakeMorning': 'Lake Bled Morning',
      'gallery.img.penthouse': 'Penthouse View',
      'gallery.img.gardens': 'Villa Gardens',
      'gallery.img.alpine': 'Alpine Serenity',
      'gallery.img.luxuryDetails': 'Luxury Details',
      'gallery.img.dining': 'Fine Dining',
      'gallery.img.cuisine': 'Local Cuisine',
      'gallery.img.facade': 'Villa Facade',
      'gallery.img.sunset': 'Lake Sunset',
      'gallery.img.suiteInterior': 'Suite Interior',
      'gallery.img.terrace': 'Lakeside Terrace',
      'gallery.img.islandView': 'Island View',
      'gallery.img.evening': 'Evening Ambiance',
      
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

      // Special Offers (detailed)
      'offers.earlyBird.title': 'Early Bird Discount',
      'offers.earlyBird.description': 'Book 60+ days in advance and receive 10% off your stay.',
      'offers.earlyBird.price': '10% off',
      'offers.earlyBird.tag': 'Recommended',
      'offers.romantic.title': 'Romantic Package',
      'offers.romantic.description': '3 nights + champagne + couples massage + sunset dinner.',
      'offers.romantic.price': 'From €890',
      'offers.romantic.tag': 'Romance',
      'offers.wellness.title': 'Wellness Retreat',
      'offers.wellness.description': '3 nights + daily yoga + 2 massages + healthy breakfast.',
      'offers.wellness.price': 'From €750',
      'offers.wellness.tag': 'Wellness',
      'offers.stay5.title': 'Stay 5, Pay 4',
      'offers.stay5.description': 'Book 5 nights in high season (Jul-Aug) and only pay for 4.',
      'offers.stay5.price': '1 night free',
      'offers.stay5.tag': 'Best Value',
      'offers.direct.title': 'Direct Booking Bonus',
      'offers.direct.description': 'Book directly through our website and receive a free room upgrade + welcome drink.',
      'offers.direct.price': 'Free upgrade',
      'offers.direct.tag': 'Exclusive',
      'offers.lastMinute.title': 'Last Minute Deal',
      'offers.lastMinute.description': 'Book within 7 days and get 15% off (subject to availability).',
      'offers.lastMinute.price': '15% off',
      'offers.lastMinute.tag': 'Hot Deal',
      
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

      // Why Choose Us
      'whyChoose.badge': 'Why Choose Us',
      'whyChoose.title': 'Why Villa Adora?',
      'whyChoose.subtitle': 'Discover what sets us apart and why guests from around the world keep coming back.',
      'whyChoose.bestPrice': 'Best Price Guarantee',
      'whyChoose.bestPriceDesc': 'We guarantee the best rate. If you find a lower price, we\'ll beat it by 10%.',
      'whyChoose.heritage': 'Historic Heritage',
      'whyChoose.heritageDesc': 'A villa from 1878, renovated with love for detail and respect for history.',
      'whyChoose.personalized': 'Personalized Service',
      'whyChoose.personalizedDesc': 'Every guest is special to us. We tailor your stay down to the smallest detail.',
      'whyChoose.awards': 'Award-Winning Quality',
      'whyChoose.awardsDesc': 'Recognized by guests and travel experts as one of the finest boutique hotels in Slovenia.',
      'whyChoose.concierge': '24/7 Concierge',
      'whyChoose.conciergeDesc': 'Our digital concierge Luka is available 24 hours a day, 7 days a week.',
      'whyChoose.location': 'Prime Location',
      'whyChoose.locationDesc': 'Directly on Lake Bled, with views of the island and castle. The best location in Bled.',
      'whyChoose.stat.rating': 'Average Rating',
      'whyChoose.stat.reviews': 'Guest Reviews',
      'whyChoose.stat.established': 'Established',
      'whyChoose.stat.returnGuests': 'Return Guests',

      // Bled Seasons
      'seasons.title': 'Bled Through the Seasons',
      'seasons.subtitle': 'Every season brings its own magic',
      'seasons.spring.title': 'Spring',
      'seasons.spring.desc': 'Cherry blossoms, warm sunny days, and a tranquil lake. Perfect for kayaking and hiking.',
      'seasons.summer.title': 'Summer',
      'seasons.summer.desc': 'Warm water for swimming, vibrant terraces, and long evenings. Blooming flowers and local delicacies.',
      'seasons.autumn.title': 'Autumn',
      'seasons.autumn.desc': 'Golden foliage, fine wines, and mystical foggy mornings. Ideal for a romantic retreat.',
      'seasons.winter.title': 'Winter',
      'seasons.winter.desc': 'Blanketed in snow, Bled becomes a fairytale. Christmas market, skiing, and warm drinks.',

      // Culinary & Dining
      'culinary.subtitle': 'Culinary Experiences',
      'culinary.title': 'Flavors of Bled',
      'culinary.description': 'Discover the richness of local flavors offered at our hotel. From traditional cream cake to premium Slovenian wines.',
      'culinary.breakfast.title': 'Lakeside Breakfast',
      'culinary.breakfast.description': 'Start your day with a lavish buffet breakfast on the terrace overlooking the lake. Fresh pastries, local cheeses, homemade jams, and seasonal fruits.',
      'culinary.restaurant.title': 'Restaurant 1878',
      'culinary.restaurant.description': 'Our restaurant offers a modern interpretation of Slovenian cuisine with local ingredients. Degustation menus with wine pairings.',
      'culinary.terrace.title': 'Lakeside Terrace',
      'culinary.terrace.description': 'Enjoy coffee or dinner on our exclusive terrace right on the lake. An unforgettable experience at sunset.',
      'culinary.experiences.title': 'Cooking Workshops',
      'culinary.experiences.description': 'Join our cooking workshops — learn to make cream cake, traditional potica, or taste the finest Slovenian wines.',
      'culinary.cta': 'Book a Table',

      // Newsletter
      'newsletter.title': 'Stay Connected',
      'newsletter.description': 'Subscribe to our newsletter and receive exclusive offers, seasonal packages, and news from Villa Adora.',
      'newsletter.placeholder': 'Your email address',
      'newsletter.button': 'Subscribe',
      'newsletter.success': 'Thank you for subscribing! You will receive a confirmation email.',
      'newsletter.error': 'Please enter a valid email address.',
      'newsletter.privacy': 'Your email will be used exclusively for our newsletters. You can unsubscribe at any time.',

      // FAQ
      'faq.checkin.question': 'What are the check-in and check-out times?',
      'faq.checkin.answer': 'Check-in is from 15:00 to 22:00. Check-out is by 11:00. Late check-in and late check-out are available on request — please let us know in advance.',
      'faq.cancellation.question': 'What is the cancellation policy?',
      'faq.cancellation.answer': 'Free cancellation up to 48 hours before arrival. Cancellations within 48 hours before arrival are charged for the first night. For high season bookings (July-August), cancellation must be made 72 hours in advance.',
      'faq.parking.question': 'Is free parking available?',
      'faq.parking.answer': 'Yes, free private parking is available on-site for all guests. The parking area is secured and under surveillance.',
      'faq.pets.question': 'Are pets allowed?',
      'faq.pets.answer': 'Yes, pets are allowed on request. Please let us know in advance. An additional cleaning fee of €30 per stay applies.',
      'faq.breakfast.question': 'Is breakfast included in the rate?',
      'faq.breakfast.answer': 'Yes, a lavish buffet breakfast is included in the room rate. Breakfast is served from 7:30 to 10:30 on the terrace overlooking the lake. Vegan and gluten-free options are available.',
      'faq.airport.question': 'How do I get from the airport to Villa Adora?',
      'faq.airport.answer': 'Ljubljana Jože Pučnik Airport is 35 km away (approximately 30 minutes by car). We offer airport transfer on request (€40 one way). Klagenfurt Airport (Austria) is also 70 km away.',
      'faq.wifi.question': 'Is free WiFi available?',
      'faq.wifi.answer': 'Yes, free high-speed WiFi is available throughout the hotel and in all suites. The connection is reliable even on the terrace and in the garden area.',
      'faq.spa.question': 'Do you have a wellness center?',
      'faq.spa.answer': 'Yes, our wellness center includes a Finnish sauna, Turkish bath, and massage services. Wellness facilities are free for all guests. Massages must be booked in advance.',
      'faq.transport.question': 'Do you offer transport or bicycle rental?',
      'faq.transport.answer': 'Yes, we offer complimentary mountain bike rental for all guests. We also provide electric vehicle transport around Bled and the surrounding area. For longer excursions (Vintgar, Triglav National Park), we organize transport on request.',
      'faq.miniBar.question': 'Does the suite have a mini bar?',
      'faq.miniBar.answer': 'Yes, all suites have a mini bar with selected Slovenian wines, beverages, and snacks. It also includes coffee, tea, and hot chocolate for self-service.',

      // Book Direct Benefits
      'bookDirect.badge': 'Book Direct & Save',
      'bookDirect.title': 'Why Book Direct With Us?',
      'bookDirect.subtitle': 'Skip the middleman and get the best value when you book directly through our website.',
      'bookDirect.bestPrice.title': 'Best Price Guaranteed',
      'bookDirect.bestPrice.description': 'If you find a lower price elsewhere, we will match it. Plus get an additional 5% discount for booking direct.',
      'bookDirect.freeBreakfast.title': 'Complimentary Breakfast',
      'bookDirect.freeBreakfast.description': 'Enjoy a full gourmet breakfast with lake views — included free when you book direct (€25 value per person).',
      'bookDirect.freeWifi.title': 'Premium WiFi',
      'bookDirect.freeWifi.description': 'High-speed fiber internet throughout the property, perfect for remote work or streaming.',
      'bookDirect.upgrade.title': 'Free Room Upgrade',
      'bookDirect.upgrade.description': 'Subject to availability, direct bookings receive priority for complimentary room upgrades.',
      'bookDirect.directSupport.title': 'Direct Support',
      'bookDirect.directSupport.description': 'Speak directly with our team for personalized service, special requests, and local recommendations.',
      'bookDirect.flexible.title': 'Flexible Cancellation',
      'bookDirect.flexible.description': 'Free cancellation up to 48 hours before arrival — more flexible than third-party booking sites.',
      'bookDirect.cta': 'Check Availability',
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
