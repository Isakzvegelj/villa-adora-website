import { useEffect } from 'react'

interface FAQData {
  question: string
  answer: string
}

interface FAQPageStructuredDataProps {
  faqs: FAQData[]
}

export function FAQPageStructuredData({ faqs }: FAQPageStructuredDataProps) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }

    const existing = document.querySelector('script[data-jsonld="faq"]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', 'faq')
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      const el = document.querySelector('script[data-jsonld="faq"]')
      if (el) el.remove()
    }
  }, [faqs])

  return null
}
