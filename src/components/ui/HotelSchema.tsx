import { useEffect } from 'react'

interface HotelSchemaProps {
  name?: string
  description?: string
  url?: string
  image?: string
  priceRange?: string
  telephone?: string
  email?: string
  address?: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  geo?: { lat: number; lng: number }
  starRating?: number
  amenities?: string[]
  checkInTime?: string
  checkOutTime?: string
}

const DEFAULT_AMENITIES = [
  'Free WiFi',
  'Lake View',
  'Spa & Wellness',
  'Concierge Service',
  'Airport Transfer',
  'Restaurant',
  'Bar',
  'Room Service',
  'Free Parking',
  'Pet Friendly',
  'Garden',
  'Terrace',
]

export function HotelSchema({
  name = 'Villa Adora',
  description = 'A luxury boutique hotel on the shores of Lake Bled, Slovenia. Heritage villa from 1878 with premium suites, lake views, and world-class service.',
  url = 'https://villa-adora.si',
  image = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop&q=80',
  priceRange = '€€€',
  telephone = '+386-4-123-4567',
  email = 'info@villa-adora.si',
  address = {
    street: 'Cesta svobode 12',
    city: 'Bled',
    region: 'Upper Carniola',
    postalCode: '4260',
    country: 'SI',
  },
  geo = { lat: 46.3683, lng: 14.1146 },
  starRating = 4,
  amenities = DEFAULT_AMENITIES,
  checkInTime = '15:00',
  checkOutTime = '11:00',
}: HotelSchemaProps) {
  useEffect(() => {
    // 1. LodgingBusiness / Hotel schema
    const hotelSchema = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name,
      description,
      url,
      image,
      priceRange,
      telephone,
      email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.lat,
        longitude: geo.lng,
      },
      starRating: {
        '@type': 'Rating',
        ratingValue: starRating,
        bestRating: 5,
      },
      amenityFeature: amenities.map((a) => ({
        '@type': 'LocationFeatureSpecification',
        name: a,
        value: true,
      })),
      checkInTime,
      checkOutTime,
      knowsAbout: ['Lake Bled', 'Slovenia', 'Alps', 'Wellness', 'Hiking', 'Gastronomy'],
      knowsLanguage: ['en', 'sl', 'de', 'it'],
    }

    // 2. Hotel room offers schema
    const offersSchema = {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      name,
      url,
      containsPlace: [
        {
          '@type': 'HotelRoom',
          name: 'Princess Suite',
          description: 'Elegant suite with garden views, king-size bed, and luxury bathroom.',
          occupancy: { '@type': 'QuantitativeValue', maxValue: 2 },
          bed: 'King-size bed',
          amenityFeature: ['Free WiFi', 'Air Conditioning', 'Minibar', 'Balcony'],
          offer: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'EUR',
              minPrice: 250,
            },
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'HotelRoom',
          name: 'Penthouse Suite',
          description: 'Two-floor penthouse with panoramic lake views and private terrace.',
          occupancy: { '@type': 'QuantitativeValue', maxValue: 4 },
          bed: 'King-size bed + sofa bed',
          amenityFeature: ['Free WiFi', 'Air Conditioning', 'Minibar', 'Private Terrace', 'Lake View'],
          offer: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'EUR',
              minPrice: 300,
            },
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'HotelRoom',
          name: 'Prestige Suite',
          description: 'Ground-floor suite with private garden access and premium amenities.',
          occupancy: { '@type': 'QuantitativeValue', maxValue: 3 },
          bed: 'King-size bed + single bed',
          amenityFeature: ['Free WiFi', 'Air Conditioning', 'Minibar', 'Private Garden', 'Lake View'],
          offer: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'EUR',
              minPrice: 420,
            },
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    }

    // Write hotel schema
    const existing1 = document.querySelector('script[data-jsonld="hotel"]')
    if (existing1) existing1.remove()
    const s1 = document.createElement('script')
    s1.type = 'application/ld+json'
    s1.setAttribute('data-jsonld', 'hotel')
    s1.textContent = JSON.stringify(hotelSchema)
    document.head.appendChild(s1)

    // Write offers schema
    const existing2 = document.querySelector('script[data-jsonld="hotel-offers"]')
    if (existing2) existing2.remove()
    const s2 = document.createElement('script')
    s2.type = 'application/ld+json'
    s2.setAttribute('data-jsonld', 'hotel-offers')
    s2.textContent = JSON.stringify(offersSchema)
    document.head.appendChild(s2)

    return () => {
      document.querySelector('script[data-jsonld="hotel"]')?.remove()
      document.querySelector('script[data-jsonld="hotel-offers"]')?.remove()
    }
  }, [
    name, description, url, image, priceRange, telephone, email,
    address.street, address.city, address.region, address.postalCode, address.country,
    geo.lat, geo.lng, starRating,
    amenities.join(','),
    checkInTime, checkOutTime,
  ])

  return null
}

// Standalone BreadcrumbList component
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }

    const existing = document.querySelector('script[data-jsonld="breadcrumbs"]')
    if (existing) existing.remove()
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-jsonld', 'breadcrumbs')
    s.textContent = JSON.stringify(schema)
    document.head.appendChild(s)

    return () => {
      document.querySelector('script[data-jsonld="breadcrumbs"]')?.remove()
    }
  }, [items])

  return null
}
