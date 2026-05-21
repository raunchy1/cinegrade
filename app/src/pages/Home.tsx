import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Play,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Download,
  Quote,
} from 'lucide-react';

/* ──────────────────────── animation helpers ──────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];



const staggerContainer = {
  hidden: {},
  visible: (stagger: number = 0.1) => ({
    transition: { staggerChildren: stagger },
  }),
};

const fadeUpChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/* ──────────────────────── Counter component ──────────────────────── */

function Counter({ target, suffix = '', prefix = '', duration = 2 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30% 0px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration,
      ease: easeOutExpo,
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [isInView, target, count, rounded, duration]);

  return <span ref={ref}>{display}</span>;
}

/* ──────────────────────── data ──────────────────────── */

const categories = [
  { name: 'Luxury Editorial', accent: '#D4AF37', count: '12 Presets · 12 LUTs', swatches: ['#D4AF37', '#8B5A2B', '#F5E6CC'] },
  { name: 'Cinematic Shadows', accent: '#2D2D3A', count: '10 Presets · 10 LUTs', swatches: ['#2D2D3A', '#1A1A24', '#4A4A5A'] },
  { name: 'Analog Film', accent: '#C8956C', count: '10 Presets · 10 LUTs', swatches: ['#C8956C', '#8B6914', '#DEB887'] },
  { name: 'Moody Documentary', accent: '#4A5568', count: '8 Presets · 8 LUTs', swatches: ['#4A5568', '#2D3748', '#718096'] },
  { name: 'Dreamy Wedding', accent: '#F7E7CE', count: '12 Presets · 12 LUTs', swatches: ['#F7E7CE', '#E8D5B7', '#FFF8EE'] },
  { name: 'Night Neon', accent: '#FF00FF', count: '10 Presets · 10 LUTs', swatches: ['#FF00FF', '#00F0FF', '#9400D3'] },
  { name: 'Cyberpunk Cinema', accent: '#00F0FF', count: '8 Presets · 8 LUTs', swatches: ['#00F0FF', '#FF00FF', '#3A86FF'] },
  { name: 'Neo Noir', accent: '#8B0000', count: '10 Presets · 10 LUTs', swatches: ['#8B0000', '#2D2D3A', '#4A0000'] },
  { name: 'Teal & Orange', accent: '#008080', count: '10 Presets · 10 LUTs', swatches: ['#008080', '#FF6B35', '#D4AF37'] },
  { name: 'Kodak Portra', accent: '#F4A460', count: '10 Presets · 10 LUTs', swatches: ['#F4A460', '#DEB887', '#8B4513'] },
  { name: 'Netflix Inspired', accent: '#E50914', count: '8 Presets · 8 LUTs', swatches: ['#E50914', '#B20710', '#FF4D4D'] },
  { name: 'A24 Inspired', accent: '#708090', count: '8 Presets · 8 LUTs', swatches: ['#708090', '#2F4F4F', '#A9A9A9'] },
];

const presetsShowcase = [
  { name: 'Teal & Orange', category: 'Cinematic Grade', before: '/sample-image-1.jpg', after: '/sample-image-1-graded.jpg' },
  { name: 'Neo Noir', category: 'Moody Drama', before: '/sample-image-2.jpg', after: '/sample-image-2-graded.jpg' },
  { name: 'Night Neon', category: 'Cyberpunk', before: '/sample-image-3.jpg', after: '/sample-image-3-graded.jpg' },
  { name: 'Luxury Editorial', category: 'Fashion', before: '/sample-image-1.jpg', after: '/sample-image-1-graded.jpg' },
  { name: 'Dreamy Wedding', category: 'Romance', before: '/sample-image-2.jpg', after: '/sample-image-2-graded.jpg' },
  { name: 'Kodak Portra', category: 'Film Emulation', before: '/sample-image-3.jpg', after: '/sample-image-3-graded.jpg' },
];

const testimonials = [
  {
    quote: "CINEGRADE LAB completely transformed my wedding editing workflow. The Dreamy Wedding presets are worth the price alone — my clients consistently ask how I achieve this look.",
    name: "Marcus Chen",
    role: "Wedding Photographer, Los Angeles",
    initial: "MC",
    color: "#D4AF37",
  },
  {
    quote: "As a filmmaker, I've tried dozens of LUT packs. These are the only ones that truly feel cinematic. The A24 Inspired LUTs are pure magic for indie projects.",
    name: "Sofia Martinez",
    role: "Filmmaker & Colorist, Barcelona",
    initial: "SM",
    color: "#3A86FF",
  },
  {
    quote: "The quality of these presets is unreal. I use the Cinematic Shadows collection for every documentary project. It's like having a colorist in your pocket.",
    name: "David Okafor",
    role: "Documentary Filmmaker, Lagos",
    initial: "DO",
    color: "#00F0FF",
  },
  {
    quote: "I was skeptical about another preset pack, but CINEGRADE LAB proved me wrong. The AI assistant matched me with perfect looks I never would have found myself.",
    name: "Emily Nakamura",
    role: "Content Creator, Tokyo",
    initial: "EN",
    color: "#FF6B9D",
  },
];

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse the Collection',
    description: 'Explore 25 curated categories across 250+ presets and LUTs. Filter by mood, camera, lighting, or genre.',
  },
  {
    number: '02',
    icon: SlidersHorizontal,
    title: 'Compare Before & After',
    description: 'Use our interactive slider to see the exact transformation on sample images. Check parameters and compatibility.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Download & Create',
    description: 'Instant download in .XMP and .CUBE formats. Import into Lightroom, Photoshop, Premiere Pro, DaVinci Resolve, or any NLE.',
  },
];

const software = ['Adobe Lightroom', 'Adobe Photoshop', 'Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'Capture One', 'LumaFusion'];

/* ═══════════════════════════ HOME PAGE ═══════════════════════════ */

export default function Home() {
  return (
    <div className="bg-bg-dark">
      {/* ──────────── Section 1: Hero ──────────── */}
      <HeroSection />

      {/* ──────────── Section 2: Stats Bar ──────────── */}
      <StatsBarSection />

      {/* ──────────── Section 3: Category Preview ──────────── */}
      <CategoryPreviewSection />

      {/* ──────────── Section 4: How It Works ──────────── */}
      <HowItWorksSection />

      {/* ──────────── Section 5: Featured LUTs ──────────── */}
      <FeaturedLUTsSection />

      {/* ──────────── Section 6: Testimonials ──────────── */}
      <TestimonialsSection />

      {/* ──────────── Section 7: CTA Banner ──────────── */}
      <CTABannerSection />
    </div>
  );
}

/* ═══════════════════════ HERO SECTION ═══════════════════════ */

function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOutExpo }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0.95) 100%)' }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] px-6 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          className="font-display font-bold text-white leading-[0.92] tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            textShadow: '0 4px 60px rgba(0,0,0,0.5)',
          }}
        >
          Cinematic Color, Perfected
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOutExpo }}
          className="font-body text-[18px] leading-[1.55] max-w-[600px] mt-6"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          250+ professional-grade color tools. From luxury editorial to cyberpunk cinema — transform your vision in one click.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOutExpo }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Link to="/library" className="btn-primary">
            Explore Library
          </Link>
          <Link to="/preview" className="btn-secondary">
            <Play size={16} />
            Watch Demo
          </Link>
        </motion.div>
      </div>

      {/* Stats strip at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: easeOutExpo }}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { value: 125, suffix: '+', label: 'Lightroom Presets' },
              { value: 125, suffix: '+', label: 'Cinematic LUTs' },
              { value: 25, suffix: '', label: 'Categories' },
              { value: 1, suffix: '-Click', label: 'Apply' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span className="font-display font-bold text-[clamp(32px,4vw,56px)] text-white">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-body text-[14px] uppercase tracking-[0.08em] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-[180px] md:bottom-[160px] left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════ STATS BAR SECTION ═══════════════════════ */

function StatsBarSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30% 0px' });

  const stats = [
    { value: 250, suffix: '+', label: 'Total Presets & LUTs' },
    { value: 25, suffix: '', label: 'Unique Categories' },
    { value: 50, suffix: 'K+', label: 'Creators Using' },
    { value: 4.9, suffix: '', label: 'Average Rating', isDecimal: true },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full py-[100px]"
      style={{
        background: '#0A0A0F',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[32px]">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center text-center w-full">
                <span
                  className="font-display font-bold leading-none"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #D4AF37 50%, #FF6B35 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.isDecimal ? (
                    <DecimalCounter target={stat.value} suffix={stat.suffix} />
                  ) : (
                    <Counter target={stat.value} suffix={stat.suffix} />
                  )}
                </span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="font-body text-[14px] uppercase tracking-[0.08em] mt-3"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {stat.label}
                </motion.span>
              </div>
              {i < stats.length - 1 && (
                <div
                  className="hidden lg:block w-px h-16 ml-8 shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="font-body text-[13px] uppercase tracking-[0.06em] mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Works with your favorite tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {software.map((name) => (
              <span
                key={name}
                className="font-body font-medium text-[14px] transition-colors duration-300 hover:text-[rgba(255,255,255,0.7)] cursor-default"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Decimal counter for 4.9 rating */
function DecimalCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30% 0px' });
  const [display, setDisplay] = useState('0.0');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: easeOutExpo,
      onUpdate: (v) => setDisplay(v.toFixed(1)),
    });
    return () => { controls.stop(); };
  }, [isInView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ═══════════════════════ CATEGORY PREVIEW ═══════════════════════ */

function CategoryPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      ref={ref}
      className="relative w-full py-[120px]"
      style={{ background: '#0A0A0F' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-[#D4AF37]">
            THE COLLECTION
          </span>
          <h2
            className="font-display font-semibold text-white mt-3 leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            25 Cinematic Worlds
          </h2>
          <p className="font-body text-[18px] mt-4 max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Every mood, every genre, every story — find your perfect grade.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.05}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={fadeUpChild}>
              <Link
                to={`/library?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group glass-card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
                style={{ padding: 0 }}
              >
                {/* Accent bar */}
                <div className="h-[3px] w-full" style={{ background: cat.accent }} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Placeholder gradient thumbnail */}
                  <div
                    className="w-full aspect-[3/2] rounded-lg mb-4 transition-transform duration-400 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${cat.accent}33 0%, ${cat.accent}11 100%)`,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  />

                  <h4 className="font-display font-semibold text-[16px] text-white mb-1">
                    {cat.name}
                  </h4>
                  <p className="font-body text-[13px] mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {cat.count}
                  </p>

                  {/* Color swatches */}
                  <div className="flex gap-1 mt-auto">
                    {cat.swatches.map((s) => (
                      <span
                        key={s}
                        className="w-4 h-4 rounded-[4px] shrink-0"
                        style={{ background: s, border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section
      ref={ref}
      className="relative w-full py-[120px]"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-20"
        >
          <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-[#D4AF37]">
            HOW IT WORKS
          </span>
          <h2
            className="font-display font-semibold text-white mt-3 leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Your Perfect Grade, Three Steps
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-[48px]">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i, ease: easeOutExpo }}
                className="relative flex flex-col items-start"
              >
                {/* Big number */}
                <span
                  className="font-display font-bold leading-none select-none pointer-events-none absolute -top-4 -left-2"
                  style={{
                    fontSize: 'clamp(64px, 8vw, 120px)',
                    color: 'rgba(255,255,255,0.06)',
                  }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{ background: 'rgba(212,175,55,0.1)' }}
                >
                  <Icon size={32} className="text-[#D4AF37]" />
                </div>

                <h4 className="font-display font-medium text-[20px] text-white mb-3 relative z-10">
                  {step.title}
                </h4>
                <p className="font-body text-[16px] leading-[1.6] relative z-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FEATURED LUTs ═══════════════════════ */

function FeaturedLUTsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      ref={ref}
      className="relative w-full py-[120px]"
      style={{ background: '#0A0A0F' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-[#D4AF37]">
            FEATURED LUTS
          </span>
          <h2
            className="font-display font-semibold text-white mt-3 leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Before & After Showcase
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.1}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {presetsShowcase.map((preset) => (
            <motion.div
              key={preset.name}
              variants={fadeUpChild}
              className="glass-card flex-shrink-0 w-[320px] md:w-[380px] overflow-hidden snap-start group"
              style={{ padding: 0 }}
            >
              {/* Before/After images stacked */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={preset.before}
                  alt={`${preset.name} before`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-60" />
                {/* After image on hover overlay */}
                <img
                  src={preset.after}
                  alt={`${preset.name} after`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* Before/After labels */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="font-mono font-medium text-[11px] px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.7)' }}>
                    BEFORE
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-mono font-medium text-[11px] px-2 py-1 rounded" style={{ background: 'rgba(212,175,55,0.8)', color: '#0A0A0F' }}>
                    AFTER
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h4 className="font-display font-medium text-[16px] text-white mb-1">
                  {preset.name}
                </h4>
                <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {preset.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll
  useEffect(() => {
    if (!scrollRef.current || isHovered) return;
    const el = scrollRef.current;
    let raf: number;
    let lastTime = performance.now();
    const scroll = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft += dt * 0.03;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(scroll);
    };
    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  return (
    <section
      ref={ref}
      className="relative w-full py-[120px]"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="font-body font-medium text-[13px] uppercase tracking-[0.12em] text-[#D4AF37]">
            TESTIMONIALS
          </span>
          <h2
            className="font-display font-semibold text-white mt-3 leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Trusted by Creators Worldwide
          </h2>
        </motion.div>
      </div>

      {/* Carousel - full bleed with padding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-6 lg:px-12"
      >
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Double the testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="glass-card flex-shrink-0 flex flex-col snap-start transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]"
              style={{
                minWidth: '360px',
                maxWidth: '420px',
                padding: '32px',
              }}
            >
              <Quote size={24} className="mb-4" style={{ color: 'rgba(212,175,55,0.3)' }} />
              <p className="font-body text-[16px] leading-[1.6] flex-1 mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-[14px]"
                  style={{ background: `${t.color}22`, color: t.color, border: `2px solid rgba(255,255,255,0.1)` }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-body font-semibold text-[15px] text-white">{t.name}</p>
                  <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════ CTA BANNER ═══════════════════════ */

function CTABannerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section
      ref={ref}
      className="relative w-full py-[100px]"
      style={{ background: '#0A0A0F' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)' }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0.1}
        className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center"
      >
        <motion.h2
          variants={fadeUpChild}
          className="font-display font-semibold text-white leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
        >
          Ready to Transform Your Color?
        </motion.h2>

        <motion.p
          variants={fadeUpChild}
          className="font-body text-[18px] mt-4"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Join 50,000+ creators using CINEGRADE LAB. Instant download. Lifetime access.
        </motion.p>

        <motion.div
          variants={fadeUpChild}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link to="/pricing" className="btn-primary" style={{ padding: '16px 40px' }}>
            Get Full Access
          </Link>
          <Link to="/pricing" className="btn-secondary">
            View Pricing
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUpChild}
          className="font-body text-[13px] mt-6"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          No subscription. One-time purchase. 30-day money-back guarantee.
        </motion.p>
      </motion.div>
    </section>
  );
}
