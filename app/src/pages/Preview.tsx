import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Download,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Preset {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  formats: string[];
  thumbnail: string;
}

interface ImagePair {
  id: string;
  label: string;
  before: string;
  after: string;
  preset: Preset;
  params: Record<string, string>;
}

interface RelatedPreset {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  format: string;
  thumbnail: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const IMAGE_PAIRS: ImagePair[] = [
  {
    id: 'portrait',
    label: 'Portrait',
    before: '/sample-image-1.jpg',
    after: '/sample-image-1-graded.jpg',
    preset: {
      id: 'golden-editorial-01',
      name: 'Golden Editorial 01',
      category: 'Luxury Editorial',
      categoryColor: '#D4AF37',
      formats: ['XMP', 'CUBE'],
      thumbnail: '/sample-image-1-graded.jpg',
    },
    params: {
      Exposure: '+0.45',
      Contrast: '+15',
      Highlights: '-25',
      Shadows: '+35',
      Saturation: '+8',
      Temperature: '+450',
      Tint: '+5',
      Grain: '12',
    },
  },
  {
    id: 'landscape',
    label: 'Landscape',
    before: '/sample-image-2.jpg',
    after: '/sample-image-2-graded.jpg',
    preset: {
      id: 'neo-noir-02',
      name: 'Neo Noir Cinema',
      category: 'Neo Noir',
      categoryColor: '#8B0000',
      formats: ['XMP', 'CUBE'],
      thumbnail: '/sample-image-2-graded.jpg',
    },
    params: {
      Exposure: '-0.20',
      Contrast: '+32',
      Highlights: '-40',
      Shadows: '-15',
      Saturation: '-12',
      Temperature: '-200',
      Tint: '+3',
      Grain: '18',
    },
  },
  {
    id: 'street',
    label: 'Street / Neon',
    before: '/sample-image-3.jpg',
    after: '/sample-image-3-graded.jpg',
    preset: {
      id: 'night-neon-01',
      name: 'Tokyo Night Neon',
      category: 'Night Neon',
      categoryColor: '#FF00FF',
      formats: ['XMP', 'CUBE'],
      thumbnail: '/sample-image-3-graded.jpg',
    },
    params: {
      Exposure: '+0.10',
      Contrast: '+28',
      Highlights: '-15',
      Shadows: '+20',
      Saturation: '+22',
      Temperature: '-350',
      Tint: '+15',
      Grain: '15',
    },
  },
];

const RELATED_PRESETS: RelatedPreset[] = [
  {
    id: 'luxury-editorial-02',
    name: 'Champagne Portrait',
    category: 'Luxury Editorial',
    categoryColor: '#D4AF37',
    format: 'XMP',
    thumbnail: '/sample-image-1-graded.jpg',
  },
  {
    id: 'analog-film-01',
    name: 'Kodak Vision3',
    category: 'Analog Film',
    categoryColor: '#C8956C',
    format: 'CUBE',
    thumbnail: '/sample-image-2-graded.jpg',
  },
  {
    id: 'cyberpunk-cinema-01',
    name: 'Cyberpunk Cinema',
    category: 'Cyberpunk Cinema',
    categoryColor: '#00F0FF',
    format: 'XMP',
    thumbnail: '/sample-image-3-graded.jpg',
  },
  {
    id: 'dreamy-wedding-01',
    name: 'Dreamy Wedding',
    category: 'Dreamy Wedding',
    categoryColor: '#F7E7CE',
    format: 'XMP',
    thumbnail: '/sample-image-1-graded.jpg',
  },
];

// ─── Animation Helpers ───────────────────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOutExpo },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// ─── Components ──────────────────────────────────────────────────────────────

/** Before/After comparison slider */
function ComparisonSlider({ pair }: { pair: ImagePair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPos = useMotionValue(50);
  const clipPathRight = useTransform(sliderPos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleX = useTransform(sliderPos, (v) => `${v}%`);
  const [isDragging, setIsDragging] = useState(false);

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      sliderPos.set(Math.max(0, Math.min(100, pct)));
    },
    [sliderPos]
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

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        sliderPos.set(Math.max(0, sliderPos.get() - 5));
      } else if (e.key === 'ArrowRight') {
        sliderPos.set(Math.min(100, sliderPos.get() + 5));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sliderPos]);

  return (
    <motion.div
      className="w-full rounded-xl overflow-hidden relative select-none"
      style={{
        aspectRatio: '16/9',
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
    >
      {/* Before image (bottom layer) */}
      <img
        src={pair.before}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* After image (top layer, clipped) */}
      <motion.img
        src={pair.after}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        style={{ clipPath: clipPathRight }}
      />

      {/* Slider handle */}
      <motion.div
        className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
        style={{
          x: handleX,
          translateX: '-50%',
          zIndex: 10,
        }}
      >
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 w-[3px] bg-white shadow-lg" />
        {/* Circular thumb */}
        <div
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-center gap-0.5 text-[#0A0A0F]">
            <ChevronLeft size={16} strokeWidth={2.5} />
            <ChevronRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>

      {/* Labels */}
      <div
        className="absolute bottom-3 left-3 px-3 py-1.5 rounded font-mono text-xs font-medium"
        style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
        }}
      >
        BEFORE
      </div>
      <div
        className="absolute bottom-3 right-3 px-3 py-1.5 rounded font-mono text-xs font-medium"
        style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
        }}
      >
        AFTER
      </div>
    </motion.div>
  );
}

/** Image thumbnail selector */
function ImageSelector({
  pairs,
  activeId,
  onSelect,
}: {
  pairs: ImagePair[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 mt-6">
      {pairs.map((pair) => (
        <button
          key={pair.id}
          onClick={() => onSelect(pair.id)}
          className="relative rounded-lg overflow-hidden transition-all duration-300 group"
          style={{
            width: 80,
            height: 56,
            border:
              activeId === pair.id
                ? '2px solid #D4AF37'
                : '2px solid transparent',
            opacity: activeId === pair.id ? 1 : 0.7,
          }}
        >
          <img
            src={pair.after}
            alt={pair.label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                activeId === pair.id
                  ? 'transparent'
                  : 'rgba(0,0,0,0.3)',
            }}
          >
            <span
              className="font-mono text-[10px] font-medium uppercase"
              style={{
                color:
                  activeId === pair.id
                    ? '#D4AF37'
                    : 'rgba(255,255,255,0.7)',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              {pair.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

/** Parameter bar visualization */
function ParameterBars({ params }: { params: Record<string, string> }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {Object.entries(params).map(([label, value]) => {
        const numericVal = parseFloat(value);
        const isNumeric = !isNaN(numericVal);
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-xs uppercase"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                  letterSpacing: '0.04em',
                }}
              >
                {label}
              </span>
              <span
                className="text-xs font-medium"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              >
                {value}
              </span>
            </div>
            {isNumeric && (
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      numericVal >= 0
                        ? 'linear-gradient(90deg, #FF6B35, #D4AF37)'
                        : 'linear-gradient(90deg, #3A86FF, #00B4D8)',
                    transformOrigin: numericVal >= 0 ? 'left' : 'right',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: Math.abs(numericVal) / 500 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Related preset card */
function RelatedCard({ preset, index }: { preset: RelatedPreset; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOutExpo }}
      className="glass-card overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 shrink-0"
      style={{ minWidth: 240, width: 240 }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={preset.thumbnail}
          alt={preset.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h4 className="font-display font-medium text-white text-[15px] mb-1">
          {preset.name}
        </h4>
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: preset.categoryColor }}
          />
          <span
            className="text-[13px]"
            style={{ color: preset.categoryColor }}
          >
            {preset.category}
          </span>
        </div>
        <div className="mt-2">
          <span
            className="inline-block font-mono text-[11px] font-medium px-2 py-0.5 rounded"
            style={{
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {preset.format}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Preview() {
  const [activePairId, setActivePairId] = useState(IMAGE_PAIRS[0].id);
  const activePair = IMAGE_PAIRS.find((p) => p.id === activePairId) || IMAGE_PAIRS[0];
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-[100dvh]" style={{ background: '#0A0A0F' }}>
      {/* ── Section 1: Page Header ── */}
      <section className="w-full pt-[104px] pb-6" style={{ background: '#0A0A0F' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Breadcrumb + Title */}
            <motion.div {...fadeUp}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-2">
                <Link
                  to="/library"
                  className="text-[13px] transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Library
                </Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <Link
                  to={`/library?category=${encodeURIComponent(activePair.preset.category)}`}
                  className="text-[13px] transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {activePair.preset.category}
                </Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <span className="text-[13px] text-white">
                  {activePair.preset.name}
                </span>
              </div>

              {/* Preset title block */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="font-display font-semibold text-white"
                  style={{
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {activePair.preset.name}
                </h1>
                {/* Category badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: `${activePair.preset.categoryColor}15`,
                    border: `1px solid ${activePair.preset.categoryColor}30`,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: activePair.preset.categoryColor }}
                  />
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: activePair.preset.categoryColor }}
                  >
                    {activePair.preset.category}
                  </span>
                </div>
                {/* Format badges */}
                {activePair.preset.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="font-mono text-[11px] font-medium px-2 py-0.5 rounded"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <button className="btn-primary text-[13px] py-[10px] px-5">
                <Download size={16} />
                Download
              </button>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all duration-200 hover:border-white/20"
                style={{
                  border: isFavorited
                    ? '1px solid #D4AF37'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: isFavorited ? 'rgba(212,175,55,0.1)' : undefined,
                }}
              >
                <Heart
                  size={18}
                  style={{
                    color: isFavorited ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                    fill: isFavorited ? '#D4AF37' : 'none',
                  }}
                />
              </button>
              <button className="w-10 h-10 rounded-xl glass-card flex items-center justify-center transition-all duration-200 hover:border-white/20">
                <Share2 size={18} style={{ color: 'rgba(255,255,255,0.7)' }} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Comparison Studio ── */}
      <section className="w-full py-6" style={{ background: '#0A0A0F' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Comparison Area */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePair.id}
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <ComparisonSlider pair={activePair} />
                </motion.div>
              </AnimatePresence>

              {/* Image Selector */}
              <ImageSelector
                pairs={IMAGE_PAIRS}
                activeId={activePairId}
                onSelect={setActivePairId}
              />
            </motion.div>

            {/* Sidebar — Preset Info */}
            <motion.div
              className="w-full lg:w-[320px] shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
            >
              <div
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Sample Images */}
                <div>
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Sample Image
                  </span>
                  <div className="flex gap-2 mt-3">
                    {IMAGE_PAIRS.map((pair) => (
                      <button
                        key={pair.id}
                        onClick={() => setActivePairId(pair.id)}
                        className="rounded-md overflow-hidden transition-all duration-200"
                        style={{
                          width: 56,
                          height: 40,
                          border:
                            activePairId === pair.id
                              ? '2px solid #D4AF37'
                              : '2px solid transparent',
                          opacity: activePairId === pair.id ? 1 : 0.7,
                        }}
                      >
                        <img
                          src={pair.after}
                          alt={pair.label}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="my-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                />

                {/* Parameters */}
                <div>
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Parameters
                  </span>
                  <div className="mt-3">
                    <ParameterBars params={activePair.params} />
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="my-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                />

                {/* Preset Info */}
                <div>
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Preset Info
                  </span>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '12px',
                        }}
                      >
                        Name
                      </span>
                      <span
                        className="text-white text-right"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '12px',
                        }}
                      >
                        {activePair.preset.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '12px',
                        }}
                      >
                        Category
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-sm"
                          style={{
                            backgroundColor: activePair.preset.categoryColor,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            color: activePair.preset.categoryColor,
                            fontSize: '12px',
                          }}
                        >
                          {activePair.preset.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '12px',
                        }}
                      >
                        Format
                      </span>
                      <span
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '12px',
                        }}
                      >
                        {activePair.preset.formats.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Related Presets ── */}
      <section
        className="w-full py-12 pb-20"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="mb-8"
          >
            <h2
              className="font-display font-semibold text-white"
              style={{
                fontSize: '20px',
                lineHeight: 1.2,
              }}
            >
              More from {activePair.preset.category}
            </h2>
            <p
              className="mt-1"
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '15px',
              }}
            >
              Explore related presets in this collection
            </p>
          </motion.div>

          {/* Horizontal scroll carousel */}
          <div
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {RELATED_PRESETS.map((preset, i) => (
              <div key={preset.id} style={{ scrollSnapAlign: 'start' }}>
                <RelatedCard preset={preset} index={i} />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              to={`/library?category=${encodeURIComponent(activePair.preset.category)}`}
              className="btn-secondary text-[13px] py-[10px] px-6 inline-flex items-center gap-2"
            >
              Browse All {activePair.preset.category} Presets
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
