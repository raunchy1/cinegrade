import React from 'react';
import { motion } from 'framer-motion';
import { Download, Heart, Share2, Check, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { BeforeAfterSlider } from './BeforeAfterSlider';

/* ─── Types ──────────────────────────────────────────────────────── */

export interface ProductHeroProps {
  product: Product;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

/* ─── Animation Constants ────────────────────────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Software Icon Map ──────────────────────────────────────────── */

const softwareIcons: Record<string, string> = {
  'Adobe Lightroom Classic': 'LrC',
  'Adobe Lightroom CC': 'Lr',
  'Adobe Camera Raw': 'ACR',
  'Adobe Photoshop': 'Ps',
  'Premiere Pro': 'Pr',
  'DaVinci Resolve': 'DaV',
  'Final Cut Pro': 'FcP',
  'Capture One': 'C1',
  'LumaFusion': 'LuF',
  'Affinity Photo': 'AfP',
};

/* ─── Component ──────────────────────────────────────────────────── */

export const ProductHero: React.FC<ProductHeroProps> = ({
  product,
  isFavorited = false,
  onFavoriteToggle,
  onDownload,
  onShare,
}) => {
  const accent = product.categoryId === 'luxury-editorial' ? '#D4AF37' :
    product.categoryId === 'cinematic-shadows' ? '#2D2D3A' :
    product.categoryId === 'analog-film' ? '#C8956C' :
    product.categoryId === 'moody-documentary' ? '#4A5568' :
    product.categoryId === 'dreamy-wedding' ? '#F7E7CE' :
    product.categoryId === 'hyperreal-fashion' ? '#FF6B9D' :
    product.categoryId === 'night-neon' ? '#FF00FF' :
    product.categoryId === 'luxury-travel' ? '#20B2AA' :
    product.categoryId === 'minimal-scandinavian' ? '#E8E8E8' :
    product.categoryId === 'cyberpunk-cinema' ? '#00F0FF' :
    product.categoryId === 'neo-noir' ? '#8B0000' :
    product.categoryId === 'vintage-film-lab' ? '#DEB887' :
    product.categoryId === 'high-dynamic-luxury' ? '#FFD700' :
    product.categoryId === 'dark-instagram-mood' ? '#6B5B95' :
    product.categoryId === 'clean-creator-economy' ? '#00D26A' :
    product.categoryId === 'music-video-looks' ? '#9400D3' :
    product.categoryId === 'commercial-luxury' ? '#B8860B' :
    product.categoryId === 'netflix-inspired' ? '#E50914' :
    product.categoryId === 'a24-inspired' ? '#708090' :
    product.categoryId === 'kodak-portra-emulation' ? '#F4A460' :
    product.categoryId === 'fuji-400h-emulation' ? '#98D8C8' :
    product.categoryId === 'arri-alexa-look' ? '#4682B4' :
    product.categoryId === 'cinestill-800t-emulation' ? '#FF6347' :
    product.categoryId === 'bleach-bypass' ? '#C0C0C0' :
    '#008080';

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Before/After Slider */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <BeforeAfterSlider
            beforeImage={product.beforeImage}
            afterImage={product.afterImage}
            aspectRatio="16/10"
            showLabels
            showFilmGrain
            showVignette
          />
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          className="w-full lg:w-[380px] shrink-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
        >
          <div
            className="rounded-xl p-6 lg:p-8 h-full"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Category & Badge */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                <span className="text-[12px] font-medium" style={{ color: accent }}>
                  {product.category}
                </span>
              </div>
              {product.badge && (
                <span
                  className="font-mono font-semibold text-[10px] px-2.5 py-1 rounded"
                  style={{
                    background: product.badge === 'Bestseller' ? 'rgba(212,175,55,0.15)' :
                      product.badge === 'New' ? 'rgba(0,210,106,0.15)' :
                      product.badge === 'Staff Pick' ? 'rgba(58,134,255,0.15)' :
                      'rgba(139,0,0,0.15)',
                    color: product.badge === 'Bestseller' ? '#D4AF37' :
                      product.badge === 'New' ? '#00D26A' :
                      product.badge === 'Staff Pick' ? '#3A86FF' :
                      '#FF6B6B',
                    border: `1px solid ${product.badge === 'Bestseller' ? 'rgba(212,175,55,0.3)' :
                      product.badge === 'New' ? 'rgba(0,210,106,0.3)' :
                      product.badge === 'Staff Pick' ? 'rgba(58,134,255,0.3)' :
                      'rgba(139,0,0,0.3)'}`,
                  }}
                >
                  {product.badge.toUpperCase()}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display font-semibold text-white text-[28px] lg:text-[32px] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display font-bold text-[28px] text-white">
                ${product.price}
              </span>
              {product.isOnSale && product.compareAtPrice && (
                <>
                  <span
                    className="font-body text-[18px] line-through"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    ${product.compareAtPrice}
                  </span>
                  <span
                    className="font-mono text-[11px] px-2 py-1 rounded"
                    style={{
                      background: 'rgba(212,175,55,0.15)',
                      color: '#D4AF37',
                      border: '1px solid rgba(212,175,55,0.3)',
                    }}
                  >
                    SAVE ${product.compareAtPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p
              className="font-body text-[14px] leading-relaxed mb-5"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {product.shortDescription}
            </p>

            {/* Included Files */}
            <div className="mb-5">
              <span
                className="text-xs uppercase tracking-wider font-mono"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.04em' }}
              >
                Included Files
              </span>
              <div className="mt-2 space-y-1.5">
                {product.includedFiles.map((file) => (
                  <div key={file} className="flex items-center gap-2">
                    <Check size={14} style={{ color: '#00D26A' }} />
                    <span
                      className="font-body text-[13px]"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="mb-6">
              <span
                className="text-xs uppercase tracking-wider font-mono"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.04em' }}
              >
                Compatible With
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.compatibility.map((compat) => (
                  <span
                    key={compat}
                    className="font-mono text-[10px] px-2 py-1 rounded"
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    title={compat}
                  >
                    {softwareIcons[compat] || compat}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 mb-5">
              <motion.button
                className="flex-1 btn-primary text-[14px] py-[12px] flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDownload}
              >
                <ShoppingBag size={18} />
                Add to Cart — ${product.price}
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                className="flex-1 btn-secondary text-[13px] py-[10px] flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDownload}
              >
                <Download size={16} />
                Download Preview
              </motion.button>
              <motion.button
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  border: isFavorited ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
                  background: isFavorited ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onFavoriteToggle}
              >
                <Heart
                  size={18}
                  style={{
                    color: isFavorited ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                    fill: isFavorited ? '#D4AF37' : 'none',
                  }}
                />
              </motion.button>
              <motion.button
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShare}
              >
                <Share2 size={18} style={{ color: 'rgba(255,255,255,0.7)' }} />
              </motion.button>
            </div>

            {/* Creator Notes */}
            <div
              className="mt-6 p-4 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="text-xs uppercase tracking-wider font-mono"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', letterSpacing: '0.04em' }}
              >
                Creator Notes
              </span>
              <p
                className="font-body text-[12px] leading-relaxed mt-2 italic"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                "{product.creatorNotes.split(' — ')[0]}"
              </p>
              <p
                className="font-body text-[11px] mt-2"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                — {product.creatorNotes.split(' — ')[1] || 'CINEGRADE Team'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductHero;
