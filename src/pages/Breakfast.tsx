import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { JsonLd, PageSEO } from '../components/ui/PageSEO'

const highlights = [
  { icon: '🥐', title: 'Fresh from the oven', text: 'Warm pastries, artisan breads and homemade sweet treats.' },
  { icon: '🍳', title: 'Made your way', text: 'Eggs, savoury favourites and fresh ingredients to build your plate.' },
  { icon: '🍓', title: 'Bright & seasonal', text: 'Fruit, yoghurt, cereals and local flavours for a lighter start.' },
  { icon: '☕', title: 'Coffee, tea & juice', text: 'Barista-style coffee, tea and fresh juice are included.' },
]

const menu = [
  { label: 'From the bakery', items: 'Croissants · rolls · artisan bread · butter · jams' },
  { label: 'Warm favourites', items: 'Eggs · omelettes · vegetables · bacon · sausages' },
  { label: 'Fresh & light', items: 'Seasonal fruit · yoghurt · cereals · nuts · seeds' },
  { label: 'Something sweet', items: 'Pancakes · berries · honey · homemade treats' },
]

export default function Breakfast() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const date = String(form.get('date') || '')
    const guests = String(form.get('guests') || '')
    const notes = String(form.get('notes') || '')
    const subject = encodeURIComponent(`Breakfast reservation — ${date}`)
    const body = encodeURIComponent(`Name: ${name}\nDate: ${date}\nGuests: ${guests}\nDietary notes: ${notes}`)
    window.location.href = `mailto:evita.vilebled@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#fbfaf7] text-slate-900">
      <PageSEO
        title="Breakfast in Bled — Buffet at Villa Adora"
        description="Enjoy an all-in-one breakfast buffet at Villa Adora in Bled. Fresh pastries, eggs, fruit, coffee and local flavours. Open to hotel guests and outside visitors — reserve your table."
        keywords={['breakfast Bled', 'breakfast in Bled', 'buffet breakfast Bled', 'breakfast Lake Bled', 'Villa Adora breakfast', 'brunch Bled']}
        ogImage="https://isakzvegelj.github.io/villa-adora-website/images/adora/real/breakfast-user.jpg"
        canonicalUrl="https://villa-adora-bled.si/breakfast"
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FoodEstablishment',
        name: 'Villa Adora Breakfast',
        description: 'All-in-one breakfast buffet in Bled, open to hotel guests and outside visitors.',
        url: 'https://isakzvegelj.github.io/villa-adora-website/breakfast',
        image: 'https://isakzvegelj.github.io/villa-adora-website/images/adora/real/breakfast-user.jpg',
        telephone: '+386 51 603 858',
        email: 'evita.vilebled@gmail.com',
        servesCuisine: ['Breakfast', 'Local cuisine'],
        address: { '@type': 'PostalAddress', streetAddress: 'Cesta svobode 35', addressLocality: 'Bled', postalCode: '4260', addressCountry: 'SI' },
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '07:30', closes: '10:30' }],
        menu: 'https://villa-adora-bled.si/breakfast#menu',
        potentialAction: { '@type': 'ReserveAction', target: 'mailto:evita.vilebled@gmail.com?subject=Breakfast%20reservation' },
      }} />

      <section className="relative min-h-[720px] overflow-hidden bg-[#193b39] pt-20">
        <img src="/villa-adora-website/images/adora/real/breakfast-user.jpg" alt="Breakfast buffet with eggs, pastries, fruit and coffee at Villa Adora" className="absolute inset-0 h-full w-full object-cover object-center opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#122e2d]/95 via-[#173d39]/70 to-[#173d39]/15" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-6 py-24 lg:px-10">
          <div className="max-w-2xl text-white">
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-200"><SparklesIcon className="h-5 w-5" /> Breakfast in Bled</p>
            <h1 className="text-5xl leading-[0.98] sm:text-7xl">Start your day<br /><em className="font-normal text-amber-200">the Adora way.</em></h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">An abundant breakfast buffet in a historic lakeside villa — now open to everyone in Bled, not only hotel guests.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#reserve" className="inline-flex items-center gap-3 rounded-full bg-amber-200 px-7 py-4 font-semibold text-[#193b39] transition hover:bg-white">Reserve breakfast <ArrowRightIcon className="h-5 w-5" /></a>
              <a href="#menu" className="inline-flex items-center rounded-full border border-white/50 px-7 py-4 font-semibold text-white transition hover:bg-white/10">See what is included</a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80"><span className="flex items-center gap-2"><ClockIcon className="h-5 w-5 text-amber-200" /> Every day · 7:30–10:30</span><span className="flex items-center gap-2"><MapPinIcon className="h-5 w-5 text-amber-200" /> Cesta svobode 35, Bled</span></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div><p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#b47e32]">A generous morning</p><h2 className="max-w-lg text-4xl leading-tight text-[#193b39] sm:text-5xl">One table. Every kind of breakfast.</h2></div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">Whether you are staying in Bled, meeting friends before a day by the lake, or simply looking for a beautiful breakfast, come and make a plate exactly the way you like it. Take your time — mornings taste better at Adora.</p>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{highlights.map((item) => <div key={item.title} className="rounded-2xl border border-[#e6dfd2] bg-white p-7 shadow-sm"><div className="text-3xl">{item.icon}</div><h3 className="mt-5 text-xl text-[#193b39]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p></div>)}</div>
      </section>

      <section id="menu" className="bg-[#efe8dc] px-6 py-24 lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#b47e32]">The buffet</p><h2 className="text-4xl leading-tight text-[#193b39] sm:text-5xl">Pick a little.<br />Pick a lot.</h2><p className="mt-6 max-w-md leading-7 text-slate-600">Our all-in-one buffet is made for different appetites. Explore the table, come back for seconds, and pair your favourite flavours with a view of Bled.</p><div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#193b39]"><CheckCircleIcon className="h-6 w-6 text-[#b47e32]" /> Vegan and vegetarian choices available</div><div className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#193b39]"><CheckCircleIcon className="h-6 w-6 text-[#b47e32]" /> Please tell us about allergies when reserving</div></div><div className="grid gap-4 sm:grid-cols-2">{menu.map((item, index) => <div key={item.label} className="rounded-2xl bg-white p-7 shadow-sm"><span className="text-sm font-bold text-[#b47e32]">0{index + 1}</span><h3 className="mt-5 text-2xl text-[#193b39]">{item.label}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.items}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10"><div className="overflow-hidden rounded-3xl"><img src="/villa-adora-website/images/adora/real/restaurant-adora.jpg" alt="The elegant dining room at Villa Adora in Bled" className="h-full min-h-[420px] w-full object-cover" /></div><div className="flex flex-col justify-center"><p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#b47e32]">More than a meal</p><h2 className="text-4xl leading-tight text-[#193b39] sm:text-5xl">A beautiful place to meet.</h2><p className="mt-6 text-lg leading-8 text-slate-600">Villa Adora sits on Bled’s lakeside promenade, close to the island, castle and the morning calm of the lake. Come as an outside guest, settle into our dining room, and let the day begin slowly.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#193b39] hover:text-[#b47e32]">Discover Villa Adora <ArrowRightIcon className="h-5 w-5" /></Link></div></section>

      <section id="reserve" className="bg-[#193b39] px-6 py-24 text-white lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-200">Save your table</p><h2 className="text-4xl leading-tight sm:text-5xl">Breakfast plans?<br /><em className="font-normal text-amber-200">Let’s make them delicious.</em></h2><p className="mt-6 max-w-md leading-7 text-white/70">Reserve for your preferred date and number of guests. We will confirm availability by email.</p><div className="mt-8 space-y-4 text-sm text-white/80"><p className="flex items-center gap-3"><ClockIcon className="h-5 w-5 text-amber-200" /> Daily, 7:30–10:30</p><p className="flex items-center gap-3"><UserGroupIcon className="h-5 w-5 text-amber-200" /> Open to hotel guests and outside visitors</p><p className="flex items-center gap-3"><EnvelopeIcon className="h-5 w-5 text-amber-200" /> evita.vilebled@gmail.com</p></div></div><form onSubmit={handleSubmit} className="rounded-3xl bg-white p-7 text-slate-900 shadow-2xl sm:p-10"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Your name<input name="name" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#b47e32]" placeholder="Name and surname" /></label><label className="text-sm font-semibold">Breakfast date<input name="date" type="date" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#b47e32]" /></label><label className="text-sm font-semibold">Number of guests<select name="guests" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#b47e32]"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label><label className="text-sm font-semibold">Dietary notes<input name="notes" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#b47e32]" placeholder="Optional" /></label></div><button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#b47e32] px-7 py-4 font-semibold text-white transition hover:bg-[#946526]">{sent ? 'Your email draft is ready' : 'Request a breakfast table'} <ArrowRightIcon className="h-5 w-5" /></button><p className="mt-4 text-center text-xs text-slate-500">This opens your email app with the reservation details filled in.</p></form></div></section>

      <section className="border-b border-[#e6dfd2] bg-[#fbfaf7] px-6 py-10 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-600 sm:flex-row sm:items-center"><p className="flex items-center gap-2"><CalendarDaysIcon className="h-5 w-5 text-[#b47e32]" /> Reserve ahead for weekends and holidays.</p><a href="tel:+38651603858" className="font-semibold text-[#193b39] hover:text-[#b47e32]">Call +386 51 603 858</a></div></section>
    </motion.div>
  )
}
