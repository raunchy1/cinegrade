import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { FilmGrainOverlay } from './FilmGrainOverlay';
import { ImageSkeleton } from './ImageSkeleton';

/* ─── Types ──────────────────────────────────────────────────────── */

export interface CinematicCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
  onClick?: () => void;
  showBadge?: boolean;
}

/* ─── Animation Constants ────────────────────────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Format Badge ───────────────────────────────────────────────── */

const FormatBadge: React.FC<{ format: string }> = ({ format }) => (
  <span
    className="font-mono font-medium text-[10px] px-2 py-0.5 rounded"
    style={{
      color: 'rgba(255,255,255,0.6)',
      border: '1px solid rgba(255,255,255,0.12)',
      background: 'rgba(10,10,15,0.6)',
      backdropFilter: 'blur(8px)',
    }}
  >
    {format}
  </span>
);

/* ─── Compatibility Icons ────────────────────────────────────────── */

const compatibilityIcons: Record<string, string> = {
  'Adobe Lightroom Classic': 'Lr',
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

export const CinematicCard: React.FC<CinematicCardProps> = ({
  product,
  index = 0,
  variant = 'default',
  onClick,
  showBadge = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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

  const isCompact = variant === 'compact';
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      <Link to={`/preview?id=${encodeURIComponent(product.id)}`} onClick={onClick} className="block">
        <div
          className="glass-card overflow-hidden transition-all duration-500"
          style={{
            boxShadow: isHovered
              ? '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.08)'
              : '0 4px 20px rgba(0,0,0,0.2)',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {/* Image Area */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: isCompact ? '4/3' : '3/2' }}
          >
            {!imageLoaded && <ImageSkeleton aspectRatio={isCompact ? '4/3' : '3/2'} className="absolute inset-0" />}

            {/* Main Image */}
            <img
              src={product.thumbnail}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                opacity: imageLoaded ? 1 : 0,
              }}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            {/* Bottom Gradient for text readability */}
            <div
              className="absolute inset-0 z-[3] pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,15,0.7) 100%)',
              }}
            />

            {/* Film Grain */}
            {imageLoaded && <FilmGrainOverlay intensity={0.025} />}

            {/* Badge */}
            {showBadge && product.badge && (
              <div className="absolute top-3 left-3 z-[6]">
                <span
                  className="font-mono font-semibold text-[10px] px-2.5 py-1 rounded"
                  style={{
                    background: product.badge === 'Bestseller' ? 'rgba(212,175,55,0.9)' :
                      product.badge === 'New' ? 'rgba(0,210,106,0.9)' :
                      product.badge === 'Staff Pick' ? 'rgba(58,134,255,0.9)' :
                      'rgba(139,0,0,0.9)',
                    color: '#fff',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {product.badge.toUpperCase()}
                </span>
              </div>
            )}

            {/* Format Badge */}
            <div className="absolute top-3 right-3 z-[6]">
              <FormatBadge format={product.format} />
            </div>

            {/* Quick Actions Overlay */}
            <motion.div
              className="absolute inset-0 z-[7] flex items-center justify-center gap-3"
              style={{ background: 'rgba(10,10,15,0.5)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                whileHover={{ scale: 1.1, background: 'rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.preventDefault(); }}
              >
                <Eye size={18} className="text-white" />
              </motion.button>
              <motion.button
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: isFavorited ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.15)',
                  border: isFavorited ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.2)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.preventDefault(); setIsFavorited(!isFavorited); }}
              >
                <Heart size={18} className={isFavorited ? 'text-[#D4AF37]' : 'text-white'} fill={isFavorited ? '#D4AF37' : 'none'} />
              </motion.button>
              <motion.button
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                whileHover={{ scale: 1.1, background: 'rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.preventDefault(); }}
              >
                <ShoppingBag size={18} className="text-white" />
              </motion.button>
            </motion.div>

            {/* Category label at bottom */}
            <div className="absolute bottom-3 left-3 right-3 z-[6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 8px ${accent}66`,
                  }}
                />
                <span
                  className="font-body text-[11px] font-medium"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`${isCompact ? 'p-4' : 'p-5'}`}>
            <h3 className={`font-display font-medium text-white mb-1 truncate ${isCompact ? 'text-[14px]' : 'text-[15px]'}`}>
              {product.name}
            </h3>

            {!isCompact && (
              <p
                className="font-body text-[12px] leading-relaxed mb-3 line-clamp-2"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-semibold text-[16px] text-white">
                ${product.price}
              </span>
              {product.isOnSale && product.compareAtPrice && (
                <span
                  className="font-body text-[13px] line-through"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  ${product.compareAtPrice}
                </span>
              )}
              {product.isOnSale && (
                <span
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: 'rgba(212,175,55,0.15)',
                    color: '#D4AF37',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                >
                  SALE
                </span>
              )}
            </div>

            {/* Compatibility mini row */}
            {!isCompact && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.compatibility.slice(0, 5).map((compat) => (
                  <span
                    key={compat}
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    title={compat}
                  >
                    {compatibilityIcons[compat] || compat.slice(0, 3)}
                  </span>
                ))}
                {product.compatibility.length > 5 && (
                  <span
                    className="font-mono text-[9px]"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    +{product.compatibility.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Included files for compact */}
            {isCompact && (
              <div className="flex items-center gap-1.5">
                {product.includedFiles.map((file) => (
                  <span
                    key={file}
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {file.includes('.XMP') ? '.XMP' : file.includes('.CUBE') ? '.CUBE' : file.includes('PDF') ? 'PDF' : file}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CinematicCard;
