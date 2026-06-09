import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../../contexts/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  countryFlag: string;
  rating: number;
  text: { en: string; sl: string; de: string; it: string };
  date: string;
  suite: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah & James Mitchell',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    rating: 5,
    text: {
      en: 'Villa Adora exceeded every expectation. Waking up to the view of Lake Bled from our Princess Suite was magical. The attention to detail throughout the hotel is remarkable, and the staff made us feel like royalty.',
      sl: 'Villa Adora je presegla vsa pričakovanja. Budnost z razgledom na Blejsko jezero iz naše Princess Suite je bila čudovita. Pozornost do podrobnosti v hotelu je izjemna, osebno pa nas je naredilo, da smo se počutili kot kraljeva družina.',
      de: 'Villa Adora hat alle Erwartungen übertroffen. Der Blick auf den Bleder See aus unserer Prinzessin-Suite beim Aufwachen war magisch. Die Liebe zum Detail im gesamten Hotel ist bemerkenswert, und das Personal fühlte uns wie königlich.',
      it: 'Villa Adora ha superato ogni aspettativa. Svegliarsi con la vista sul lago di Bled dalla nostra Suite Principessa è stato magico. L\'attenzione ai dettagli in tutto l\'hotel è notevole, e il personale ci ha fatto sentire come reali.',
    },
    date: 'October 2025',
    suite: 'Princess Suite',
  },
  {
    id: 2,
    name: 'Marco Rossi',
    country: 'Italy',
    countryFlag: '🇮🇹',
    rating: 5,
    text: {
      en: 'The Penthouse Suite is simply breathtaking. Two floors of pure elegance with views that belong in a painting. We celebrated our anniversary here and the staff arranged a private dinner on the terrace. Unforgettable.',
      sl: 'Penthouse Suite je preprosto dih jemajoč. Dve nadstropji čiste elegance z razgledi, ki sodijo v sliko. Tukaj smo proslavili obletnico poroke in osebno je organiziralo zajtrk na terasi. Nepozabno.',
      de: 'Die Penthouse-Suite ist einfach atemberaubend. zwei Etagen voller Eleganz mit Ausblicken, die in ein Gemälde gehören. Wir haben hier unseren Jubiläum gefeiert und das Personnel hat ein privates Dinner auf der Terrasse organisiert. Unvergesslich.',
      it: 'La Penthouse Suite è semplicemente mozzafiato. Due piani di pura eleganza con viste che appartengono a un dipinto. Abbiamo celebrato il nostro anniversario qui e il personale ha organizzato una cena privata sulla Terrazza. Indimenticabile.',
    },
    date: 'September 2025',
    suite: 'Penthouse Suite',
  },
  {
    id: 3,
    name: 'Anna & Thomas Weber',
    country: 'Germany',
    countryFlag: '🇩🇪',
    rating: 5,
    text: {
      en: 'From the moment we arrived, we knew this was special. The Island Suite with its two balconies overlooking the lake was perfect for our family. The children loved watching the swans from the window.',
      sl: 'Od trenutka, ko smo prispeli, smo vedeli, da je to posebno. Island Suite z dvema balkonoma z razgledom na jezero je bil popoln za našo družino. Otroci so oboževali opazovanje labodov z okna.',
      de: 'Vom Moment unserer Anreise wussten wir, dass etwas Besonderes auf uns wartete. Die Insel-Suite mit ihren zwei Balkonen mit Blick auf den See war perfekt für unsere Familie. Die Kinder liebten es, die Schwäne vom Fenster aus zu beobachten.',
      it: 'Dal momento dell\'arrivo, sapevamo che questo era speciale. La Suite Isola con i suoi due balconi con vista sul lago era perfetta per la nostra famiglia. I bambini amavano guardare i cigni dalla finestra.',
    },
    date: 'August 2025',
    suite: 'Island Suite',
  },
  {
    id: 4,
    name: 'Yuki Tanaka',
    country: 'Japan',
    countryFlag: '🇯🇵',
    rating: 5,
    text: {
      en: 'We have traveled extensively but Villa Adora stands out as one of the most beautiful boutique hotels we have ever stayed in. The blend of historic charm and modern luxury is perfect. The concierge recommended hidden gems around Bled that we would never have found on our own.',
      sl: 'Veliko potujemo, a Villa Adora se kot eden najlepših butičnih hotelov, kjer smo boli, izstopa. Mešanica zgodovinskega šarma in modernega luksuza je popolna. Concierge je priporočil skrite krasote okoli Bleda, ki jih sami nikoli ne bi našli.',
      de: 'Wir haben viel gereist, aber Villa Adora sticht als eines der schönsten Boutique-Hotels hervor, in denen wir je gewohnt haben. Die Mismatch aus historischem Charme und modernem Luxus ist perfekt. Der Concierge empfahl versteckte Schätze rund um Bled, die wir allein nie gefunden hätten.',
      it: 'Abbiamo viaggiato molto ma Villa Adora si distingue come uno degli hotel boutique più belli in cui abbiamo mai alloggiato. La combinazione di fascino storico e lusso moderna è perfetta. Il concierge ha consigliato gioielli nascosti intorno a Bled che non avremmo mai trovato da soli.',
    },
    date: 'July 2025',
    suite: 'Swan Suite',
  },
  {
    id: 5,
    name: 'Petra Novak',
    country: 'Slovenia',
    countryFlag: '🇸🇮',
    rating: 5,
    text: {
      en: 'As a Slovenian, I am proud that we have a hotel of this caliber. The Prestige Suite is a masterpiece of design. Every corner tells a story of elegance and sophistication. We come back every year.',
      sl: 'Kot Slovenka sem ponosna, da imamo hotel te kakovosti. Prestige Suite je mojstrovina oblikovanja. Vsak kot pripoveduje zgodobo eleganci in prefinjenosti. Vsak prideva nazaj.',
      de: 'Als Slowenin bin ich stolz, dass wir ein Hotel dieses Kalibers haben. Die Prestige-Suite ist ein Meisterwerk des Designs. Jede Ecke erzählt eine Geschichte von Eleganz und Raffinesse. Wir kommen jedes Jahr zurück.',
      it: 'Come slovena, sono fiera che abbiamo un hotel di questo calibro. La Suite Prestige è un capolavoro di design. Ogni angolo racconta una storia di eleganza e raffinatezza. Torniamo ogni anno.',
    },
    date: 'June 2025',
    suite: 'Prestige Suite',
  },
  {
    id: 6,
    name: 'Pierre & Claire Dubois',
    country: 'France',
    countryFlag: '🇫🇷',
    rating: 5,
    text: {
      en: 'The Luxury Suite with its lake view was the perfect romantic getaway. We enjoyed the sunset from our private balcony with a glass of local wine. The breakfast was exquisite — fresh, local, and beautifully presented.',
      sl: 'Luxury Suite z razgledom na jezero je bil popoln romantičen oddih. Uživali smo v sončnem zahodu z našega zasebnega balkona s kozcem lokalnega vina. Zajtrk je bil izjemen — svež, lokalno pridelan in lepo predstavljen.',
      de: 'Die Luxus-Suite mit Seeblick war der perfekte romantische Kurzurlaub. Wir genossen den Sonnenuntergang von unserem privaten Balkon mit einem Glas lokalen Weins. Das Frühstück war exquisit — frisch, lokal und wunderschön präsentiert.',
      it: 'La Suite Luxury con vista sul lago è stata la fuga romantica perfetta. Abbiamo goduto del tramonto dal nostro balcone privato con un bicchiere di vino locale. La colazione era squisita — fresca, locale e presentata magnificamente.',
    },
    date: 'May 2025',
    suite: 'Luxury Suite',
  },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const testimonial = testimonials[current];

  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            Guest Experiences
          </div>
          <h2 className="text-responsive-xl font-bold text-slate-900 dark:text-white mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real stories from travelers who experienced the magic of Villa Adora
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-8 md:p-12">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-light italic">
                    "{testimonial.text[language]}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.countryFlag} {testimonial.country}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {testimonial.suite}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.date}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-indigo-600 dark:bg-indigo-400'
                  : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Aggregate Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 px-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">5.0</div>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Happy Guests</div>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">4.9</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Booking.com</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
