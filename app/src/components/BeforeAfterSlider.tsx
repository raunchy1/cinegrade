import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FilmGrainOverlay } from './FilmGrainOverlay';
import { CinematicVignette } from './CinematicVignette';
import { ImageSkeleton } from './ImageSkeleton';

/* ─── Types ──────────────────────────────────────────────────────── */

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: string;
  showLabels?: boolean;
  className?: string;
  onSliderChange?: (position: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showFilmGrain?: boolean;
  showVignette?: boolean;
}

/* ─── Animation Constants ────────────────────────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Component ──────────────────────────────────────────────────── */

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  aspectRatio = '16/9',
  showLabels = true,
  className = '',
  onSliderChange,
  autoPlay = false,
  autoPlayInterval: _autoPlayInterval = 3000,
  showFilmGrain = true,
  showVignette = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [autoPlayDirection, setAutoPlayDirection] = useState<1 | -1>(1);

  const sliderPos = useMotionValue(50);
  const springPos = useSpring(sliderPos, { stiffness: 300, damping: 30 });
  const clipPathRight = useTransform(springPos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleX = useTransform(springPos, (v) => `${v}%`);

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  /* ── Drag Logic ───────────────────────────────────────────────── */

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(2, Math.min(98, pct));
      sliderPos.set(clamped);
      onSliderChange?.(clamped);
    },
    [sliderPos, onSliderChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    },
    [isDragging, updateSlider]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ── Touch Support ────────────────────────────────────────────── */

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    },
    [isDragging, updateSlider]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ── Keyboard Support ─────────────────────────────────────────── */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        sliderPos.set(Math.max(2, sliderPos.get() - 5));
      } else if (e.key === 'ArrowRight') {
        sliderPos.set(Math.min(98, sliderPos.get() + 5));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sliderPos]);

  /* ── Auto Play ────────────────────────────────────────────────── */

  useEffect(() => {
    if (!autoPlay || isDragging) return;
    const interval = setInterval(() => {
      const current = sliderPos.get();
      if (current >= 95) setAutoPlayDirection(-1);
      if (current <= 5) setAutoPlayDirection(1);
      sliderPos.set(current + autoPlayDirection * 0.8);
    }, 30);
    return () => clearInterval(interval);
  }, [autoPlay, isDragging, sliderPos, autoPlayDirection]);

  /* ── Preload Images ───────────────────────────────────────────── */

  useEffect(() => {
    const beforeImg = new Image();
    const afterImg = new Image();
    beforeImg.onload = () => setImagesLoaded((p) => ({ ...p, before: true }));
    afterImg.onload = () => setImagesLoaded((p) => ({ ...p, after: true }));
    beforeImg.src = beforeImage;
    afterImg.src = afterImage;
  }, [beforeImage, afterImage]);

  return (
    <motion.div
      className={`w-full rounded-xl overflow-hidden relative select-none ${className}`}
      style={{
        aspectRatio,
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: isDragging ? 'col-resize' : 'default',
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading Skeleton */}
      <AnimatePresence>
        {!allImagesLoaded && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ImageSkeleton aspectRatio={aspectRatio} className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Before Image (bottom layer) */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="lazy"
        style={{ opacity: allImagesLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />

      {/* After Image (top layer, clipped) */}
      <motion.img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="lazy"
        style={{
          clipPath: clipPathRight,
          opacity: allImagesLoaded ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Film Grain Overlay */}
      {showFilmGrain && allImagesLoaded && <FilmGrainOverlay intensity={0.035} />}

      {/* Cinematic Vignette */}
      {showVignette && allImagesLoaded && <CinematicVignette intensity={0.4} />}

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
        style={{
          x: handleX,
          translateX: '-50%',
          zIndex: 15,
        }}
      >
        {/* Vertical line with glow */}
        <div
          className="absolute top-0 bottom-0 w-[2px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,0) 100%)',
            boxShadow: isDragging
              ? '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.2)'
              : '0 0 10px rgba(0,0,0,0.5)',
            transition: 'box-shadow 0.3s ease',
          }}
        />
        {/* Circular thumb */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(10,10,15,0.85)',
            border: '2px solid rgba(255,255,255,0.9)',
            boxShadow: isDragging
              ? '0 0 30px rgba(212,175,55,0.5), 0 4px 20px rgba(0,0,0,0.4)'
              : '0 4px 20px rgba(0,0,0,0.4)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-0.5 text-white">
            <ChevronLeft size={16} strokeWidth={2.5} />
            <ChevronRight size={16} strokeWidth={2.5} />
          </div>
        </motion.div>
      </motion.div>

      {/* Labels */}
      {showLabels && allImagesLoaded && (
        <>
          <motion.div
            className="absolute bottom-4 left-4 px-3 py-1.5 rounded font-mono text-xs font-medium z-[12]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            BEFORE
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 px-3 py-1.5 rounded font-mono text-xs font-medium z-[12]"
            style={{
              background: 'rgba(212,175,55,0.85)',
              color: '#0A0A0F',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(212,175,55,0.5)',
            }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            AFTER
          </motion.div>
        </>
      )}

      {/* Hover Glow Effect */}
      {allImagesLoaded && (
        <div
          className="absolute inset-0 pointer-events-none z-[11] opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: 'inset 0 0 60px rgba(212,175,55,0.08)',
          }}
        />
      )}
    </motion.div>
  );
};

export default BeforeAfterSlider;
