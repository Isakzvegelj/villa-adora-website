import { useState } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill'
}

/**
 * Optimized image component with blur-up loading effect.
 * Shows a blurred placeholder while the full image loads.
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generate a tiny blur hash placeholder (1x1 pixel approach)
  const blurDataUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E`

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Blur placeholder */}
      <div
        className={`absolute inset-0 bg-slate-200 dark:bg-slate-700 transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${blurDataUrl})`,
          backgroundSize: 'cover',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 w-full h-full ${objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : 'object-fill'}`}
      />
    </div>
  )
}

export default OptimizedImage
