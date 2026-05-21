import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { getProductById, getRelatedProducts, allProducts } from '@/data/products';
import { ProductPreviewGallery } from '@/components/ProductPreviewGallery';
import { ProductHero } from '@/components/ProductHero';
import { CinematicCard } from '@/components/CinematicCard';

/* ─── Animation Helpers ──────────────────────────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Parameter bar visualization ────────────────────────────────── */

function ParameterBars({ params }: { params: string }) {
  const entries = params.split(', ').map((p) => {
    const match = p.match(/^(.+)\s+([\+\-]?[\d.]+)$/);
    return match ? { label: match[1], value: match[2] } : null;
  }).filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {entries.map(({ label, value }) => {
        const numericVal = parseFloat(value);
        const isNumeric = !isNaN(numericVal);
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(255,255,255,0.5)', fontSize: '11px', letterSpacing: '0.04em' }}>
                {label}
              </span>
              <span className="text-xs font-medium" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#FFFFFF', fontSize: '12px' }}>
                {value}
              </span>
            </div>
            {isNumeric && (
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: numericVal >= 0 ? 'linear-gradient(90deg, #FF6B35, #D4AF37)' : 'linear-gradient(90deg, #3A86FF, #00B4D8)',
                    transformOrigin: numericVal >= 0 ? 'left' : 'right',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: Math.min(Math.abs(numericVal) / 50, 1) }}
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

/* ─── Gallery Thumbnail Strip ────────────────────────────────────── */

function GalleryThumbnails({
  images,
  activeIndex,
  onSelect,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 mt-6">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className="relative rounded-lg overflow-hidden transition-all duration-300 group"
          style={{
            width: 80,
            height: 56,
            border: activeIndex === idx ? '2px solid #D4AF37' : '2px solid transparent',
            opacity: activeIndex === idx ? 1 : 0.6,
          }}
        >
          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </button>
      ))}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */

export default function Preview() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || allProducts[0]?.id;
  const product = useMemo(() => getProductById(productId || ''), [productId]);
  const related = useMemo(() => product ? getRelatedProducts(product.id, 4) : [], [product]);

  const [isFavorited, setIsFavorited] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: '#0A0A0F' }}>
        <div className="text-center">
          <h1 className="font-display text-white text-2xl mb-4">Product not found</h1>
          <Link to="/library" className="btn-primary">Browse Library</Link>
        </div>
      </div>
    );
  }

  const allImages = [product.heroImage, product.beforeImage, product.afterImage, ...product.galleryImages];

  return (
    <div className="min-h-[100dvh]" style={{ background: '#0A0A0F' }}>
      {/* ── Section 1: Breadcrumb + Title ── */}
      <section className="w-full pt-[104px] pb-6" style={{ background: '#0A0A0F' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Link to="/library" className="text-[13px] transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Library
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <Link to={`/library?category=${product.categoryId}`} className="text-[13px] transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {product.category}
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span className="text-[13px] text-white">{product.name}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Product Hero ── */}
      <section className="w-full py-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ProductHero
            product={product}
            isFavorited={isFavorited}
            onFavoriteToggle={() => setIsFavorited(!isFavorited)}
            onDownload={() => toast('Preview download started', { description: product.name })}
            onShare={() => toast('Link copied to clipboard', { description: product.name })}
          />

          {/* Gallery Thumbnails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOutExpo }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-medium text-white text-[18px]">Gallery</h3>
              <button
                onClick={() => setGalleryOpen(true)}
                className="flex items-center gap-2 font-body text-[13px] transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <ImageIcon size={16} />
                View all {allImages.length} images
              </button>
            </div>
            <GalleryThumbnails
              images={allImages}
              activeIndex={galleryIndex}
              onSelect={(idx) => { setGalleryIndex(idx); setGalleryOpen(true); }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Full Description ── */}
      <section className="w-full py-12" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h2 className="font-display font-semibold text-white text-[24px] mb-4">About This Look</h2>
              <p className="font-body text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {product.description}
              </p>

              <div className="p-5 rounded-xl mt-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-display font-medium text-white text-[16px] mb-3">Color Parameters</h3>
                <ParameterBars params={product.params} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
            >
              <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-display font-medium text-white text-[16px] mb-4">Product Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Format', value: product.format },
                    { label: 'Category', value: product.category },
                    { label: 'Mood', value: product.mood },
                    { label: 'Release', value: product.releaseDate },
                    { label: 'Price', value: `$${product.price}${product.isOnSale ? ` (was $${product.compareAtPrice})` : ''}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                      <span className="font-body text-[13px] text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 className="font-body text-[12px] uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.04em' }}>
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-1 rounded"
                        style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Related Presets ── */}
      {related.length > 0 && (
        <section className="w-full py-12 pb-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="mb-8"
            >
              <h2 className="font-display font-semibold text-white text-[20px] leading-tight">
                More from {product.category}
              </h2>
              <p className="mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                Explore related presets in this collection
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rp, i) => (
                <CinematicCard key={rp.id} product={rp} index={i} variant="compact" />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <Link
                to={`/library?category=${product.categoryId}`}
                className="btn-secondary text-[13px] py-[10px] px-6 inline-flex items-center gap-2"
              >
                Browse All {product.category} Presets
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Modal */}
      <ProductPreviewGallery
        images={allImages}
        productName={product.name}
        initialIndex={galleryIndex}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
}
