import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { categories, allPresets } from '@/data/presets';
import type { Preset, PresetFormat } from '@/data/presets';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ITEMS_PER_PAGE = 24;

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Fade-up wrapper                                                    */
/* ------------------------------------------------------------------ */

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preset Card                                                        */
/* ------------------------------------------------------------------ */

function PresetCard({
  preset,
  index,
}: {
  preset: Preset;
  index: number;
}) {
  const cat = categories.find((c) => c.id === preset.categoryId);
  const accent = cat?.accentColor ?? '#D4AF37';

  const handleClick = useCallback(() => {
    toast('Preview coming soon', {
      description: `${preset.name} — ${preset.category}`,
    });
  }, [preset]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.8),
        ease: easeOutExpo,
        layout: { duration: 0.3 },
      }}
      onClick={handleClick}
      className="glass-card overflow-hidden cursor-pointer group"
      style={{ willChange: 'transform' }}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3' }}
      >
        {/* Base gradient using category accent */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${accent}33 0%, transparent 60%),
                         radial-gradient(ellipse at 70% 80%, ${accent}22 0%, transparent 50%),
                         linear-gradient(135deg, #1A1A24 0%, #0A0A0F 100%)`,
          }}
        />
        {/* Accent line overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, ${accent}18 0%, transparent 50%, ${accent}0D 100%)`,
          }}
        />
        {/* Format badge */}
        <div className="absolute top-3 right-3">
          <span
            className="font-mono font-medium text-[11px] px-2 py-1 rounded"
            style={{
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(10,10,15,0.6)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {preset.format}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-medium text-[15px] text-white mb-2 truncate">
          {preset.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 6px ${accent}44`,
            }}
          />
          <span
            className="font-body text-[13px]"
            style={{ color: accent }}
          >
            {preset.category}
          </span>
        </div>
        <p
          className="font-mono text-[11px] leading-relaxed truncate"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}
        >
          {preset.params}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Collection Card                                           */
/* ------------------------------------------------------------------ */

function FeaturedCard({
  title,
  description,
  count,
  accentColors,
  delay,
}: {
  title: string;
  description: string;
  count: string;
  accentColors: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
      className="glass-card overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail area with color montage */}
      <div
        className="relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="absolute inset-0 bg-[#0A0A0F]" />
        <div className="absolute inset-0 flex">
          {accentColors.map((color, i) => (
            <div
              key={i}
              className="flex-1 relative"
              style={{
                background: `linear-gradient(180deg, ${color}30 0%, ${color}10 50%, transparent 100%)`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-full opacity-20"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${color}50 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${accentColors[0]}15 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="font-display font-semibold text-[22px] text-white mb-2">
          {title}
        </h3>
        <p
          className="font-body text-[14px] leading-relaxed mb-4"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          {description}
        </p>
        <p
          className="font-body text-[13px] mb-5"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {count}
        </p>
        <button className="btn-secondary text-[13px] py-2 px-5">
          Explore Collection
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                        */
/* ------------------------------------------------------------------ */

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 col-span-full"
    >
      <Search
        size={48}
        style={{ color: 'rgba(255,255,255,0.2)' }}
        strokeWidth={1.5}
      />
      <h3
        className="font-display font-medium text-[20px] mt-6 mb-2"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        No presets found
      </h3>
      <p
        className="font-body text-[15px] mb-6 text-center max-w-md"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        Try adjusting your filters or search terms to find what you are looking for.
      </p>
      <button onClick={onClear} className="btn-secondary text-[13px] py-2.5 px-6">
        Clear all filters
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Library Page                                                  */
/* ------------------------------------------------------------------ */

type FormatFilter = 'all' | PresetFormat;

export default function Library() {
  /* -- state -- */
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFormat, setActiveFormat] = useState<FormatFilter>('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* -- filter logic -- */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allPresets.filter((preset) => {
      const matchesSearch =
        !q ||
        preset.name.toLowerCase().includes(q) ||
        preset.category.toLowerCase().includes(q) ||
        preset.mood.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === 'all' || preset.categoryId === activeCategory;

      const matchesFormat =
        activeFormat === 'all' || preset.format === activeFormat;

      return matchesSearch && matchesCategory && matchesFormat;
    });
  }, [search, activeCategory, activeFormat]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const hasMore = visibleCount < filtered.length;

  /* -- callbacks -- */
  const handleLoadMore = useCallback(() => {
    setVisibleCount((c) => c + ITEMS_PER_PAGE);
  }, []);

  const handleClearAll = useCallback(() => {
    setSearch('');
    setActiveCategory('all');
    setActiveFormat('all');
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const handleCategoryClick = useCallback((catId: string) => {
    setActiveCategory((prev) => (prev === catId ? 'all' : catId));
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const handleFormatChange = useCallback((f: FormatFilter) => {
    setActiveFormat(f);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const activeFiltersCount = [
    activeCategory !== 'all',
    activeFormat !== 'all',
    search.trim().length > 0,
  ].filter(Boolean).length;

  /* -- featured data -- */
  const featuredCollections = [
    {
      title: 'Cinema Classics',
      description:
        'The essential film emulation collection. Kodak Portra, ARRI Alexa, CineStill 800T — the looks that built modern cinema.',
      count: '36 Presets & LUTs',
      accentColors: ['#F4A460', '#4682B4', '#FF6347'],
    },
    {
      title: 'Modern Creator',
      description:
        'Built for the content economy. Clean, punchy grades that perform on every platform from YouTube to TikTok.',
      count: '48 Presets & LUTs',
      accentColors: ['#00D26A', '#E50914', '#9400D3'],
    },
    {
      title: 'Luxury & Editorial',
      description:
        'High-end fashion and luxury brand aesthetics. Refined, sophisticated color for premium visual storytelling.',
      count: '42 Presets & LUTs',
      accentColors: ['#D4AF37', '#FF6B9D', '#B8860B'],
    },
  ];

  /* -- render -- */
  return (
    <div className="min-h-[100dvh] bg-[#0A0A0F]">
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                       */}
      {/* ============================================================ */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            {/* Title group */}
            <FadeUp>
              <p
                className="font-body font-medium text-[13px] uppercase tracking-[0.12em] mb-3"
                style={{ color: '#D4AF37' }}
              >
                CINEGRADE LAB
              </p>
              <h1
                className="font-display font-semibold text-white"
                style={{
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                The Library
              </h1>
              <div
                className="mt-4 h-[2px] w-20"
                style={{
                  background:
                    'linear-gradient(90deg, #FF6B35 0%, #D4AF37 100%)',
                }}
              />
            </FadeUp>

            {/* Search bar */}
            <FadeUp delay={0.1} className="w-full lg:w-[360px]">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  placeholder="Search presets, LUTs, categories..."
                  className="w-full font-body text-[14px] text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '12px 16px 12px 48px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 3px rgba(212,175,55,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch('');
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  </button>
                )}
              </div>
            </FadeUp>
          </div>

          {/* Results count */}
          <FadeUp delay={0.15}>
            <p
              className="font-body text-[14px]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Showing {filtered.length} preset{filtered.length !== 1 ? 's' : ''} &amp; LUTs
            </p>
          </FadeUp>

          {/* Active filter tags */}
          <AnimatePresence>
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap items-center gap-2 mt-4"
              >
                {activeCategory !== 'all' && (
                  <span
                    className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer"
                    style={{
                      background: 'rgba(212,175,55,0.15)',
                      border: '1px solid #D4AF37',
                      color: 'white',
                    }}
                    onClick={() => handleCategoryClick('all')}
                  >
                    {categories.find((c) => c.id === activeCategory)?.name}
                    <X size={14} />
                  </span>
                )}
                {activeFormat !== 'all' && (
                  <span
                    className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer"
                    style={{
                      background: 'rgba(212,175,55,0.15)',
                      border: '1px solid #D4AF37',
                      color: 'white',
                    }}
                    onClick={() => handleFormatChange('all')}
                  >
                    {activeFormat === 'XMP' ? 'Presets (XMP)' : 'LUTs (CUBE)'}
                    <X size={14} />
                  </span>
                )}
                {search.trim() && (
                  <span
                    className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer"
                    style={{
                      background: 'rgba(212,175,55,0.15)',
                      border: '1px solid #D4AF37',
                      color: 'white',
                    }}
                    onClick={() => {
                      setSearch('');
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                  >
                    &quot;{search.trim()}&quot;
                    <X size={14} />
                  </span>
                )}
                <button
                  onClick={handleClearAll}
                  className="font-body font-medium text-[13px] ml-2 transition-colors duration-200 hover:underline"
                  style={{ color: '#D4AF37' }}
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Filter Bar                                        */}
      {/* ============================================================ */}
      <section
        className="sticky top-[72px] z-40"
        style={{
          background: 'rgba(10,10,15,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          {/* Mobile filter toggle */}
          <div className="flex items-center gap-3 md:hidden mb-3">
            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="btn-secondary text-[13px] py-2 px-4"
            >
              <SlidersHorizontal size={16} />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          {/* Desktop filter pills */}
          <div
            className={`flex-col md:flex-row md:flex md:items-center gap-4 ${
              mobileFiltersOpen ? 'flex' : 'hidden md:flex'
            }`}
          >
            {/* Category label + pills */}
            <div className="flex items-center gap-3 overflow-hidden">
              <span
                className="font-body font-medium text-[13px] shrink-0 hidden lg:block"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Category
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {/* "All" pill */}
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="shrink-0 font-body font-medium text-[13px] rounded-full transition-all duration-200"
                  style={
                    activeCategory === 'all'
                      ? {
                          background: 'rgba(212,175,55,0.15)',
                          border: '1px solid #D4AF37',
                          color: 'white',
                          padding: '8px 18px',
                        }
                      : {
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.7)',
                          padding: '8px 18px',
                        }
                  }
                >
                  All
                </button>

                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="shrink-0 font-body font-medium text-[13px] rounded-full transition-all duration-200 flex items-center gap-1.5"
                      style={
                        isActive
                          ? {
                              background: `${cat.accentColor}22`,
                              border: `1px solid ${cat.accentColor}`,
                              color: 'white',
                              padding: '8px 18px',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: 'rgba(255,255,255,0.7)',
                              padding: '8px 18px',
                            }
                      }
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor =
                            'rgba(255,255,255,0.25)';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor =
                            'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        }
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cat.accentColor }}
                      />
                      <span className="truncate max-w-[120px]">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Format Toggle + Grid                              */}
      {/* ============================================================ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 pb-20">
        {/* Format toggle tabs */}
        <FadeUp>
          <div className="flex items-center gap-2 mb-8">
            {(
              [
                ['all', 'All'],
                ['XMP', 'Presets (XMP)'],
                ['CUBE', 'LUTs (CUBE)'],
              ] as const
            ).map(([key, label]) => {
              const isActive = activeFormat === key;
              return (
                <button
                  key={key}
                  onClick={() => handleFormatChange(key as FormatFilter)}
                  className="font-body font-medium text-[14px] rounded-lg transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: 'rgba(212,175,55,0.15)',
                          border: '1px solid #D4AF37',
                          color: 'white',
                          padding: '10px 20px',
                        }
                      : {
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.6)',
                          padding: '10px 20px',
                        }
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Preset grid */}
        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${activeFormat}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-6"
            >
              <AnimatePresence>
                {visible.map((preset, idx) => (
                  <PresetCard key={preset.id} preset={preset} index={idx} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState onClear={handleClearAll} />
          )}
        </AnimatePresence>

        {/* Load more */}
        {visible.length > 0 && (
          <div className="flex justify-center mt-12">
            {hasMore ? (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleLoadMore}
                className="btn-secondary text-[14px]"
              >
                Load More
              </motion.button>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-[13px]"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.02em',
                }}
              >
                All {filtered.length} presets loaded
              </motion.p>
            )}
          </div>
        )}
      </section>

      {/* Toaster for toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A1A24',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fff',
            fontSize: '14px',
          },
        }}
      />

      {/* ============================================================ */}
      {/* SECTION 4 — Featured Collections                              */}
      {/* ============================================================ */}
      <section
        style={{
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-12"
          >
            <p
              className="font-body font-medium text-[13px] uppercase tracking-[0.12em] mb-3"
              style={{ color: '#D4AF37' }}
            >
              FEATURED
            </p>
            <h2
              className="font-display font-semibold text-white"
              style={{
                fontSize: 'clamp(24px, 3vw, 40px)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              Curated Collections
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCollections.map((col, i) => (
              <FeaturedCard
                key={col.title}
                title={col.title}
                description={col.description}
                count={col.count}
                accentColors={col.accentColors}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
