import { useEffect } from 'react'

interface ReviewData {
  author: string
  datePublished: string
  reviewBody: string
  reviewRating: number
  suite?: string
}

interface AggregateRatingProps {
  reviews: ReviewData[]
  businessName?: string
}

export function ReviewStructuredData({ reviews, businessName = 'Villa Adora' }: AggregateRatingProps) {
  useEffect(() => {
    if (!reviews || reviews.length === 0) return

    const avgRating = reviews.reduce((sum, r) => sum + r.reviewRating, 0) / reviews.length

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      name: businessName,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: reviews.length,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.map((r) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: r.author,
        },
        datePublished: r.datePublished,
        reviewBody: r.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.reviewRating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    }

    const existing = document.querySelector('script[data-jsonld="reviews"]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', 'reviews')
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      const el = document.querySelector('script[data-jsonld="reviews"]')
      if (el) el.remove()
    }
  }, [reviews, businessName])

  return null
}
