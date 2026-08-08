import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRightIcon, ClockIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { JsonLd, PageSEO } from '../components/ui/PageSEO'
import '../breakfast.css'

const menu = [
  ['Bakery', 'Fresh croissants, bread, butter, jam and homemade sweet treats.'],
  ['Warm breakfast', 'Eggs, omelettes, vegetables, bacon and sausages.'],
  ['Fresh & light', 'Seasonal fruit, yoghurt, cereals, nuts and seeds.'],
  ['Drinks', 'Fresh juice, coffee and tea to start the morning well.'],
]

export default function Breakfast() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Breakfast reservation — ${form.get('date') || ''}`)
    const body = encodeURIComponent([
      `Name: ${form.get('name') || ''}`,
      `Date: ${form.get('date') || ''}`,
      `Guests: ${form.get('guests') || ''}`,
      `Notes: ${form.get('notes') || ''}`,
    ].join('\n'))
    window.location.href = `mailto:evita.vilebled@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="breakfast-page">
      <PageSEO
        title="Breakfast in Bled — Buffet at Villa Adora"
        description="Enjoy an all-in-one breakfast buffet at Villa Adora in Bled. Fresh pastries, eggs, fruit, coffee and local flavours. Open to hotel guests and outside visitors."
        keywords={['breakfast Bled', 'breakfast in Bled', 'buffet breakfast Bled', 'breakfast Lake Bled', 'Villa Adora breakfast']}
        ogImage="https://isakzvegelj.github.io/villa-adora-website/images/adora/real/breakfast-user.jpg"
        canonicalUrl="https://isakzvegelj.github.io/villa-adora-website/#/breakfast"
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FoodEstablishment',
        name: 'Villa Adora Breakfast',
        description: 'All-in-one breakfast buffet in Bled, open to hotel guests and outside visitors.',
        url: 'https://isakzvegelj.github.io/villa-adora-website/#/breakfast',
        image: 'https://isakzvegelj.github.io/villa-adora-website/images/adora/real/breakfast-user.jpg',
        telephone: '+386 51 603 858',
        email: 'evita.vilebled@gmail.com',
        address: { '@type': 'PostalAddress', streetAddress: 'Cesta svobode 35', addressLocality: 'Bled', postalCode: '4260', addressCountry: 'SI' },
        openingHours: 'Mo-Su 07:30-10:30',
      }} />

      <section className="breakfast-hero">
        <img src="/villa-adora-website/images/adora/real/breakfast-user.jpg" alt="Breakfast at Villa Adora in Bled" />
        <div className="breakfast-hero-shade" />
        <div className="breakfast-hero-content">
          <p className="breakfast-kicker">Villa Adora · Bled</p>
          <h1>Breakfast<br /><em>at Adora.</em></h1>
          <p className="breakfast-lead">A generous buffet in one of Bled’s most beautiful villas. Open every morning to hotel guests and outside visitors.</p>
          <div className="breakfast-actions">
            <a href="#reserve" className="breakfast-button breakfast-button-gold">Reserve a table <ArrowRightIcon /></a>
            <a href="#included" className="breakfast-button breakfast-button-ghost">What’s included</a>
          </div>
          <div className="breakfast-meta"><span><ClockIcon /> Every day · 7:30–10:30</span><span><MapPinIcon /> Cesta svobode 35, Bled</span></div>
        </div>
      </section>

      <section className="breakfast-intro">
        <p className="breakfast-kicker breakfast-kicker-dark">Good mornings, simply done</p>
        <h2>Come hungry.<br /><em>Leave happy.</em></h2>
        <p className="breakfast-copy">Choose what you like, come back for more, and take your time. Our all-in-one breakfast buffet brings together fresh ingredients, warm favourites and the quiet feeling of a morning by Lake Bled.</p>
      </section>

      <section id="included" className="breakfast-menu-section">
        <div className="breakfast-menu-heading"><p className="breakfast-kicker breakfast-kicker-dark">On the table</p><h2>Something for<br /><em>every appetite.</em></h2></div>
        <div className="breakfast-menu-grid">{menu.map(([title, text], index) => <article key={title} className="breakfast-menu-card"><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="reserve" className="breakfast-reserve">
        <div className="breakfast-reserve-copy"><p className="breakfast-kicker">Save your table</p><h2>Make breakfast<br /><em>part of your Bled day.</em></h2><p>Reserve ahead for weekends and holidays. We will confirm your table by email.</p><div className="breakfast-contact"><span><ClockIcon /> Daily · 7:30–10:30</span><span><EnvelopeIcon /> evita.vilebled@gmail.com</span></div></div>
        <form onSubmit={handleSubmit} className="breakfast-form"><label>Name<input name="name" required placeholder="Your name" /></label><label>Date<input name="date" type="date" required /></label><label>Guests<select name="guests"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label><label>Notes<input name="notes" placeholder="Allergies or requests" /></label><button type="submit" className="breakfast-submit">{sent ? 'Email draft ready' : 'Request a table'} <ArrowRightIcon /></button><small>This opens your email app with the details filled in.</small></form>
      </section>
    </div>
  )
}
