import { useEffect } from 'react'

interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
}

export function PageSEO({
  title,
  description,
  keywords = ['Villa Adora', 'hotel', 'Bled', 'Slovenia', 'luxury'],
  ogImage = 'https://villa-adora-bled.si/og-image.jpg',
  ogType = 'website',
  canonicalUrl,
}: PageSEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Villa Adora`
    document.title = fullTitle

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('keywords', keywords.join(', '))
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:image', ogImage, true)
    setMeta('og:type', ogType, true)
    setMeta('og:site_name', 'Villa Adora', true)
    setMeta('og:locale', 'sl_SI', true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonicalUrl)
    }

    // Hreflang tags for multilingual SEO
    const hreflangLinks = [
      { lang: 'en', url: canonicalUrl || 'https://villa-adora-bled.si/' },
      { lang: 'sl', url: (canonicalUrl || 'https://villa-adora-bled.si/').replace('/en/', '/sl/') },
      { lang: 'de', url: (canonicalUrl || 'https://villa-adora-bled.si/').replace('/en/', '/de/') },
      { lang: 'it', url: (canonicalUrl || 'https://villa-adora-bled.si/').replace('/en/', '/it/') },
      { lang: 'x-default', url: canonicalUrl || 'https://villa-adora-bled.si/' },
    ]
    hreflangLinks.forEach(({ lang, url }) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', lang)
        document.head.appendChild(link)
      }
      link.setAttribute('href', url)
    })

    return () => {
      document.title = 'Villa Adora'
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl])

  return null
}

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    const existing = document.querySelector('script[data-jsonld="page"]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', 'page')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      const el = document.querySelector('script[data-jsonld="page"]')
      if (el) el.remove()
    }
  }, [data])

  return null
}
