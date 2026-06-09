import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SuiteGalleryProps {
  images: { url: string; alt: string }[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function SuiteGallery({ images, isOpen, onClose, initialIndex = 0 }: SuiteGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  }, [onClose, goNext, goPrev]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Image counter */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Main image */}
        <div className="relative w-full h-full flex items-center justify-center p-16" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  idx === currentIndex
                    ? 'border-white shadow-lg scale-110'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Suite image data - each suite has multiple gallery images
export const SUITE_GALLERY_IMAGES: Record<string, { url: string; alt: string }[]> = {
  princess: [
    { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', alt: 'Princess Suite - Main View' },
    { url: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&h=800&fit=crop&q=80', alt: 'Princess Suite - Bedroom' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop&q=80', alt: 'Princess Suite - Bathroom' },
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&h=800&fit=crop&q=80', alt: 'Princess Suite - Sitting Area' },
  ],
  luxury: [
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&h=800&fit=crop&q=80', alt: 'Luxury Suite - Main View' },
    { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', alt: 'Luxury Suite - Lake View' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=80', alt: 'Luxury Suite - Bedroom' },
    { url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&h=800&fit=crop&q=80', alt: 'Luxury Suite - Balcony' },
  ],
  penthouse: [
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=80', alt: 'Penthouse Suite - Main View' },
    { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', alt: 'Penthouse Suite - Upper Floor' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop&q=80', alt: 'Penthouse Suite - Living Area' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop&q=80', alt: 'Penthouse Suite - Views' },
  ],
  swan: [
    { url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&h=800&fit=crop&q=80', alt: 'Swan Suite - Main View' },
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&h=800&fit=crop&q=80', alt: 'Swan Suite - Bedroom' },
    { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', alt: 'Swan Suite - Lake View' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop&q=80', alt: 'Swan Suite - Bathroom' },
  ],
  island: [
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop&q=80', alt: 'Island Suite - Main View' },
    { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', alt: 'Island Suite - Bedroom' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=80', alt: 'Island Suite - Balcony' },
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&h=800&fit=crop&q=80', alt: 'Island Suite - Living Room' },
  ],
  prestige: [
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop&q=80', alt: 'Prestige Suite - Main View' },
    { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop&q=80', alt: 'Prestige Suite - Terrace' },
    { url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&h=800&fit=crop&q=80', alt: 'Prestige Suite - Bedroom' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=80', alt: 'Prestige Suite - Lake View' },
  ],
};
