import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Toaster } from 'sonner';
import { allProducts, productCategories } from '@/data/products';
import type { ProductFormat } from '@/data/products';
import { CinematicCard } from '@/components/CinematicCard';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ITEMS_PER_PAGE = 24;

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

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
/*  Featured Collection Card                                           */
/* ------------------------------------------------------------------ */

function FeaturedCard({
  title,
  description,
  count,
  image,
  accentColor,
  delay,
}: {
  title: string;
  description: string;
  count: string;
  image: string;
  accentColor: string;
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
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 30%, rgba(10,10,15,0.85) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${accentColor}30 0%, transparent 70%)`,
          }}
        />
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-display font-semibold text-[22px] text-white mb-2">
            {title}
          </h3>
          <p className="font-body text-[14px] leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {description}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {count}
            </p>
            <span
              className="font-mono text-[11px] px-3 py-1.5 rounded transition-colors duration-200"
              style={{
                background: `${accentColor}20`,
                border: `1px solid ${accentColor}40`,
                color: accentColor,
              }}
            >
              Explore
            </span>
          </div>
        </div>
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
      <Search size={48} style={{ color: 'rgba(255,255,255,0.2)' }} strokeWidth={1.5} />
      <h3 className="font-display font-medium text-[20px] mt-6 mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
        No presets found
      </h3>
      <p className="font-body text-[15px] mb-6 text-center max-w-md" style={{ color: 'rgba(255,255,255,0.4)' }}>
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

type FormatFilter = 'all' | ProductFormat;

export default function Library() {
  /* -- state -- */
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFormat, setActiveFormat] = useState<FormatFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* -- filter & sort logic -- */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = allProducts.filter((product) => {
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.mood.toLowerCase().includes(q) ||
        product.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        activeCategory === 'all' || product.categoryId === activeCategory;

      const matchesFormat =
        activeFormat === 'all' || product.format === activeFormat;

      return matchesSearch && matchesCategory && matchesFormat;
    });

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        break;
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        // Bestsellers first, then by name
        result = result.sort((a, b) => {
          const aScore = a.badge === 'Bestseller' ? 2 : a.badge === 'Staff Pick' ? 1 : 0;
          const bScore = b.badge === 'Bestseller' ? 2 : b.badge === 'Staff Pick' ? 1 : 0;
          return bScore - aScore || a.name.localeCompare(b.name);
        });
    }

    return result;
  }, [search, activeCategory, activeFormat, sortBy]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  /* -- callbacks -- */
  const handleLoadMore = useCallback(() => {
    setVisibleCount((c) => c + ITEMS_PER_PAGE);
  }, []);

  const handleClearAll = useCallback(() => {
    setSearch('');
    setActiveCategory('all');
    setActiveFormat('all');
    setSortBy('featured');
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
    sortBy !== 'featured',
  ].filter(Boolean).length;

  /* -- featured data -- */
  const featuredCollections = [
    {
      title: 'Cinema Classics',
      description: 'The essential film emulation collection. Kodak Portra, ARRI Alexa, CineStill 800T — the looks that built modern cinema.',
      count: '36 Presets & LUTs',
      image: productCategories.find((c) => c.id === 'kodak-portra-emulation')?.coverImage || '',
      accentColor: '#F4A460',
    },
    {
      title: 'Modern Creator',
      description: 'Built for the content economy. Clean, punchy grades that perform on every platform from YouTube to TikTok.',
      count: '48 Presets & LUTs',
      image: productCategories.find((c) => c.id === 'clean-creator-economy')?.coverImage || '',
      accentColor: '#00D26A',
    },
    {
      title: 'Luxury & Editorial',
      description: 'High-end fashion and luxury brand aesthetics. Refined, sophisticated color for premium visual storytelling.',
      count: '42 Presets & LUTs',
      image: productCategories.find((c) => c.id === 'luxury-editorial')?.coverImage || '',
      accentColor: '#D4AF37',
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
            <FadeUp>
              <p className="font-body font-medium text-[13px] uppercase tracking-[0.12em] mb-3" style={{ color: '#D4AF37' }}>
                CINEGRADE LAB
              </p>
              <h1 className="font-display font-semibold text-white" style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                The Library
              </h1>
              <div className="mt-4 h-[2px] w-20" style={{ background: 'linear-gradient(90deg, #FF6B35 0%, #D4AF37 100%)' }} />
            </FadeUp>

            <FadeUp delay={0.1} className="w-full lg:w-[360px]">
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.4)' }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                  placeholder="Search presets, LUTs, categories..."
                  className="w-full font-body text-[14px] text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px 12px 48px' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                {search && (
                  <button onClick={() => { setSearch(''); setVisibleCount(ITEMS_PER_PAGE); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  </button>
                )}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <p className="font-body text-[14px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Showing {filtered.length} preset{filtered.length !== 1 ? 's' : ''} &amp; LUTs
            </p>
          </FadeUp>

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
                  <span className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: 'white' }} onClick={() => handleCategoryClick('all')}>
                    {productCategories.find((c) => c.id === activeCategory)?.name}
                    <X size={14} />
                  </span>
                )}
                {activeFormat !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: 'white' }} onClick={() => handleFormatChange('all')}>
                    {activeFormat === 'XMP' ? 'Presets (XMP)' : 'LUTs (CUBE)'}
                    <X size={14} />
                  </span>
                )}
                {search.trim() && (
                  <span className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: 'white' }} onClick={() => { setSearch(''); setVisibleCount(ITEMS_PER_PAGE); }}>
                    &quot;{search.trim()}&quot;
                    <X size={14} />
                  </span>
                )}
                {sortBy !== 'featured' && (
                  <span className="inline-flex items-center gap-1.5 font-body text-[13px] px-4 py-1.5 rounded-full cursor-pointer" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: 'white' }} onClick={() => setSortBy('featured')}>
                    {sortBy === 'newest' ? 'Newest' : sortBy === 'price-asc' ? 'Price: Low' : 'Price: High'}
                    <X size={14} />
                  </span>
                )}
                <button onClick={handleClearAll} className="font-body font-medium text-[13px] ml-2 transition-colors duration-200 hover:underline" style={{ color: '#D4AF37' }}>
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
      <section className="sticky top-[72px] z-40" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-3 md:hidden mb-3">
            <button onClick={() => setMobileFiltersOpen((v) => !v)} className="btn-secondary text-[13px] py-2 px-4">
              <SlidersHorizontal size={16} />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          <div className={`flex-col md:flex-row md:flex md:items-center gap-4 ${mobileFiltersOpen ? 'flex' : 'hidden md:flex'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="font-body font-medium text-[13px] shrink-0 hidden lg:block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Category
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="shrink-0 font-body font-medium text-[13px] rounded-full transition-all duration-200"
                  style={activeCategory === 'all' ? { background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: 'white', padding: '8px 18px' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '8px 18px' }}
                >
                  All
                </button>
                {productCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="shrink-0 font-body font-medium text-[13px] rounded-full transition-all duration-200 flex items-center gap-1.5"
                      style={isActive ? { background: `${cat.accentColor}22`, border: `1px solid ${cat.accentColor}`, color: 'white', padding: '8px 18px' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '8px 18px' }}
                      onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'white'; }}}
                      onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.accentColor }} />
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
      {/* SECTION 3 — Format Toggle + Sort + Grid                       */}
      {/* ============================================================ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 pb-20">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Format toggle */}
            <div className="flex items-center gap-2">
              {(['all', 'XMP', 'CUBE'] as const).map((key) => {
                const label = key === 'all' ? 'All' : key === 'XMP' ? 'Presets (XMP)' : 'LUTs (CUBE)';
                const isActive = activeFormat === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleFormatChange(key as FormatFilter)}
                    className="font-body font-medium text-[14px] rounded-lg transition-all duration-200"
                    style={isActive ? { background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: 'white', padding: '10px 20px' } : { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '10px 20px' }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="font-body text-[14px] rounded-lg outline-none transition-all duration-200 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                  padding: '10px 16px',
                }}
              >
                <option value="featured" style={{ background: '#1A1A24' }}>Featured</option>
                <option value="newest" style={{ background: '#1A1A24' }}>Newest</option>
                <option value="price-asc" style={{ background: '#1A1A24' }}>Price: Low to High</option>
                <option value="price-desc" style={{ background: '#1A1A24' }}>Price: High to Low</option>
              </select>
            </div>
          </div>
        </FadeUp>

        {/* Preset grid */}
        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${activeFormat}-${search}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-6"
            >
              <AnimatePresence>
                {visible.map((product, idx) => (
                  <CinematicCard key={product.id} product={product} index={idx} />
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
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>
                All {filtered.length} presets loaded
              </motion.p>
            )}
          </div>
        )}
      </section>

      <Toaster
        position="bottom-right"
        toastOptions={{ style: { background: '#1A1A24', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px' } }}
      />

      {/* ============================================================ */}
      {/* SECTION 4 — Featured Collections                              */}
      {/* ============================================================ */}
      <section style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-12"
          >
            <p className="font-body font-medium text-[13px] uppercase tracking-[0.12em] mb-3" style={{ color: '#D4AF37' }}>
              FEATURED
            </p>
            <h2 className="font-display font-semibold text-white" style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
              Curated Collections
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCollections.map((col, i) => (
              <FeaturedCard key={col.title} {...col} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
