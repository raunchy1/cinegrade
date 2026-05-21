import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FilmGrainOverlay } from './FilmGrainOverlay';

/* ─── Types ──────────────────────────────────────────────────────── */

export interface ProductPreviewGalleryProps {
  images: string[];
  productName?: string;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Animation Constants ────────────────────────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Component ──────────────────────────────────────────────────── */

export const ProductPreviewGallery: React.FC<ProductPreviewGalleryProps> = ({
  images,
  productName = 'Preview',
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentImage = images[activeIndex];

  /* ── Keyboard Navigation ──────────────────────────────────────── */

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, navigate]);

  /* ── Preload Adjacent Images ──────────────────────────────────── */

  useEffect(() => {
    if (!isOpen) return;
    const preloadIndices = [
      (activeIndex + 1) % images.length,
      (activeIndex - 1 + images.length) % images.length,
    ];
    preloadIndices.forEach((idx) => {
      const img = new Image();
      img.src = images[idx];
    });
  }, [activeIndex, images, isOpen]);

  /* ── Touch Swipe ──────────────────────────────────────────────── */

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  /* ── Variants ─────────────────────────────────────────────────── */

  const slideVariants = {
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
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(20px)' }}
            onClick={onClose}
          />

          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X size={20} className="text-white" />
          </motion.button>

          {/* Product Name */}
          <div className="absolute top-6 left-6 z-[110]">
            <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {productName}
            </p>
            <p className="font-display text-white text-[15px] mt-1">
              Image {activeIndex + 1} / {images.length}
            </p>
          </div>

          {/* Main Image Area */}
          <div
            className="relative w-full h-full flex items-center justify-center px-20 py-24"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="relative max-w-full max-h-full cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={currentImage}
                  alt={`${productName} - ${activeIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform 0.4s ease',
                  }}
                  draggable={false}
                />
                <FilmGrainOverlay intensity={0.02} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <motion.button
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-[110]"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                >
                  <ChevronLeft size={24} className="text-white" />
                </motion.button>
                <motion.button
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-[110]"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); navigate(1); }}
                >
                  <ChevronRight size={24} className="text-white" />
                </motion.button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110]">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeIndex ? 1 : -1);
                      setActiveIndex(idx);
                    }}
                    className="relative rounded-md overflow-hidden transition-all duration-200"
                    style={{
                      width: 56,
                      height: 40,
                      border: activeIndex === idx ? '2px solid #D4AF37' : '2px solid transparent',
                      opacity: activeIndex === idx ? 1 : 0.5,
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPreviewGallery;
