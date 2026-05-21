import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import {
  Check,
  X,
  ShieldCheck,
  Download,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── FAQ data ─── */
const faqItems = [
  {
    q: "What formats are included?",
    a: "All presets come in .XMP format compatible with Adobe Lightroom CC, Lightroom Classic, and Camera Raw. All LUTs come in .CUBE format compatible with Premiere Pro, DaVinci Resolve, Final Cut Pro, and virtually all NLEs and color grading software.",
  },
  {
    q: "Can I use these commercially?",
    a: "Pro and Studio tiers include a full commercial license allowing unlimited commercial use \u2014 client work, advertisements, films, social media content. The Starter tier is for personal use only.",
  },
  {
    q: "How do I install the presets?",
    a: "XMP presets can be imported directly into Lightroom via the Presets panel. CUBE LUTs can be loaded through your NLE's color grading panel. We include step-by-step video guides for every major platform.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. All purchases come with a 30-day money-back guarantee. If CINEGRADE LAB doesn't meet your expectations, contact us for a full refund \u2014 no questions asked.",
  },
  {
    q: "Will I get future updates?",
    a: "Pro and Studio tiers receive all future preset and LUT releases at no additional cost. We add new collections monthly based on trends and community requests.",
  },
  {
    q: "Can I switch tiers later?",
    a: "Yes. You can upgrade from Starter to Pro or Studio at any time by paying the difference. Contact our support team and we'll help you upgrade instantly.",
  },
  {
    q: "What is the AI Assistant?",
    a: "The AI Assistant helps you find the perfect preset by describing your vision, mood, or project type. It analyzes your input and matches it against our collection's color characteristics, returning ranked recommendations with match scores.",
  },
  {
    q: "Do you offer team or educational discounts?",
    a: "Yes. Studio tier includes 5 team seats. For larger teams or educational institutions, contact our sales team for custom pricing.",
  },
];

/* ─── Comparison table data ─── */
const comparisonCategories = [
  {
    name: 'Collection',
    features: [
      { name: 'Presets (XMP)', starter: '25', pro: '125', studio: '125' },
      { name: 'LUTs (CUBE)', starter: '25', pro: '125', studio: '125' },
      { name: 'Categories', starter: '5', pro: '25', studio: '25' },
      { name: 'New monthly releases', starter: false, pro: true, studio: true },
    ],
  },
  {
    name: 'Tools',
    features: [
      { name: 'Preview slider', starter: 'Basic', pro: 'Full', studio: 'Full' },
      { name: 'AI Assistant', starter: false, pro: '50/mo', studio: 'Unlimited' },
      { name: 'Cloud sync & favorites', starter: false, pro: true, studio: true },
      { name: 'Custom presets', starter: false, pro: false, studio: true },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Email support', starter: 'Standard', pro: 'Priority', studio: 'Dedicated' },
      { name: 'Community access', starter: 'Public', pro: 'Private', studio: 'Private' },
      { name: 'Account manager', starter: false, pro: false, studio: true },
    ],
  },
  {
    name: 'Licensing',
    features: [
      { name: 'Personal use', starter: true, pro: true, studio: true },
      { name: 'Commercial license', starter: false, pro: true, studio: true },
      { name: 'Team seats', starter: false, pro: false, studio: '5' },
      { name: 'White-label exports', starter: false, pro: false, studio: true },
      { name: 'API access', starter: false, pro: false, studio: true },
    ],
  },
];

/* ─── Animated check / cross ─── */
function FeatureIcon({ included }: { included: boolean | string }) {
  if (included === true) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.2 }}
      >
        <Check size={18} className="text-[#D4AF37]" />
      </motion.div>
    );
  }
  if (included === false) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.2 }}
      >
        <X size={18} className="text-[rgba(255,255,255,0.15)]" />
      </motion.div>
    );
  }
  // string value
  return (
    <span className="text-[13px] font-medium text-[#3A86FF]">{included}</span>
  );
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <Accordion.Item value={question} className="border-b border-[rgba(255,255,255,0.06)]">
      <Accordion.Trigger className="group w-full flex items-center justify-between py-5 text-left cursor-pointer">
        <span className="font-body font-medium text-[16px] text-white group-hover:text-[#D4AF37] transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={20}
          className="text-[rgba(255,255,255,0.4)] shrink-0 ml-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        <p className="pb-6 font-body text-[15px] leading-relaxed text-[rgba(255,255,255,0.7)]">
          {answer}
        </p>
      </Accordion.Content>
    </Accordion.Item>
  );
}

/* ─── Main Pricing Page ─── */
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  /* Monthly/yearly prices (from task spec) */
  const starterPrice = isYearly ? '$0' : '$0';
  const proPrice = isYearly ? '$24' : '$29';
  const studioPrice = isYearly ? '$66' : '$79';
  const starterPeriod = isYearly ? '/year' : '/month';
  const proPeriod = isYearly ? '/month' : '/month';
  const studioPeriod = isYearly ? '/month' : '/month';

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0F]">
      {/* ── Section 1: Page Header ── */}
      <section className="w-full pt-[80px] pb-12">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="font-body text-[13px] font-medium tracking-[0.08em] uppercase text-[#D4AF37] mb-4"
          >
            PRICING
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 }}
            className="font-display font-semibold text-white leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Choose Your Creative Arsenal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
            className="font-body text-[18px] leading-[1.55] text-[rgba(255,255,255,0.7)] mt-4"
          >
            Unlock premium color tools. Flexible plans for every creator.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.45 }}
            className="inline-flex items-center gap-4 mt-8"
          >
            <span
              className="font-body font-medium text-[14px] cursor-pointer select-none transition-colors duration-200"
              style={{ color: !isYearly ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </span>
            {/* Toggle switch */}
            <button
              onClick={() => setIsYearly((v) => !v)}
              className="relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer"
              style={{
                background: isYearly
                  ? 'linear-gradient(135deg, #FF6B35, #D4AF37)'
                  : 'rgba(255,255,255,0.1)',
              }}
              aria-label="Toggle yearly billing"
            >
              <motion.div
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white"
                animate={{ left: isYearly ? 27 : 3 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </button>
            <span
              className="font-body font-medium text-[14px] cursor-pointer select-none transition-colors duration-200"
              style={{ color: isYearly ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}
              onClick={() => setIsYearly(true)}
            >
              Yearly
            </span>
            <span className="font-body text-[13px] text-[#D4AF37] bg-[rgba(212,175,55,0.1)] rounded px-2 py-0.5">
              Save 20%
            </span>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-6 flex-wrap"
          >
            <span className="flex items-center gap-1.5 font-body text-[13px] tracking-[0.02em] text-[rgba(255,255,255,0.4)]">
              <ShieldCheck size={14} className="text-[rgba(255,255,255,0.3)]" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-1.5 font-body text-[13px] tracking-[0.02em] text-[rgba(255,255,255,0.4)]">
              <Download size={14} className="text-[rgba(255,255,255,0.3)]" />
              Instant download
            </span>
            <span className="flex items-center gap-1.5 font-body text-[13px] tracking-[0.02em] text-[rgba(255,255,255,0.4)]">
              <RefreshCw size={14} className="text-[rgba(255,255,255,0.3)]" />
              Free updates
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Pricing Cards ── */}
      <section className="w-full pt-6 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-6">
          {/* ── Starter Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-card overflow-hidden flex flex-col"
          >
            {/* Top accent */}
            <div className="h-[3px] bg-[rgba(255,255,255,0.1)]" />

            <div className="p-8 pb-0">
              <h3 className="font-display font-semibold text-[24px] text-white">Starter</h3>
              <p className="font-body text-[14px] text-[rgba(255,255,255,0.5)] mt-2">
                Perfect for hobbyists and beginners
              </p>
              <div className="flex items-baseline mt-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={starterPrice}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-display font-bold text-white"
                    style={{ fontSize: 'clamp(36px, 4vw, 48px)' }}
                  >
                    {starterPrice}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={starterPeriod}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-[16px] text-[rgba(255,255,255,0.5)] ml-2"
                  >
                    {starterPeriod}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="mx-8 my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            <div className="px-8 flex-1">
              {[
                '25 free presets (5 categories)',
                '10 free LUTs',
                'Basic preview tool',
                'Community support',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 mb-3.5">
                  <Check size={18} className="text-[#D4AF37] shrink-0" />
                  <span className="font-body text-[15px] text-[rgba(255,255,255,0.8)]">{f}</span>
                </div>
              ))}
              {/* Excluded */}
              {[
                'AI Assistant access',
                'Cloud sync',
                'Commercial license',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 mb-3.5">
                  <X size={18} className="text-[rgba(255,255,255,0.2)] shrink-0" />
                  <span className="font-body text-[15px] text-[rgba(255,255,255,0.25)] line-through">{f}</span>
                </div>
              ))}
            </div>

            <div className="p-8 pt-6">
              <button className="btn-secondary w-full">Get Started Free</button>
            </div>
          </motion.div>

          {/* ── Pro Card (Most Popular) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-card overflow-hidden flex flex-col relative"
            style={{ border: '1px solid rgba(212,175,55,0.3)' }}
          >
            {/* Top accent - gradient warm */}
            <div className="h-[4px]" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #D4AF37 50%, #FF6B35 100%)' }} />

            {/* Most Popular badge */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.6 }}
              className="absolute top-[4px] right-0 font-body font-semibold text-[11px] text-[#0A0A0F] uppercase tracking-wider px-3.5 py-1.5 rounded-bl-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #D4AF37 50%, #FF6B35 100%)' }}
            >
              Most Popular
            </motion.div>

            <div className="p-9 pb-0">
              <h3 className="font-display font-semibold text-[24px] text-white">Pro</h3>
              <p className="font-body text-[14px] text-[rgba(255,255,255,0.5)] mt-2">
                For serious creators and professionals
              </p>
              <div className="flex items-baseline mt-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={proPrice}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-display font-bold text-white"
                    style={{ fontSize: 'clamp(36px, 4vw, 48px)' }}
                  >
                    {proPrice}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={proPeriod}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-[16px] text-[rgba(255,255,255,0.5)] ml-2"
                  >
                    {proPeriod}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="mx-9 my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            <div className="px-9 flex-1">
              {[
                'All 125 presets (25 categories)',
                'All 125 LUTs',
                'Advanced preview with comparison',
                'AI Color Assistant',
                'Priority support',
                'Cloud sync & favorites',
                'Monthly new releases',
                'Commercial license',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 mb-3">
                  <Check size={18} className="text-[#D4AF37] shrink-0" />
                  <span className="font-body text-[15px] text-[rgba(255,255,255,0.8)]">{f}</span>
                </div>
              ))}
            </div>

            <div className="p-9 pt-6">
              <button className="btn-primary w-full">Start Pro Trial</button>
            </div>
          </motion.div>

          {/* ── Studio Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.24 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-card overflow-hidden flex flex-col"
          >
            {/* Top accent - gradient cool */}
            <div className="h-[3px]" style={{ background: 'linear-gradient(135deg, #3A86FF 0%, #00B4D8 100%)' }} />

            <div className="p-8 pb-0">
              <h3 className="font-display font-semibold text-[24px] text-white">Studio</h3>
              <p className="font-body text-[14px] text-[rgba(255,255,255,0.5)] mt-2">
                For teams and production houses
              </p>
              <div className="flex items-baseline mt-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={studioPrice}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-display font-bold text-white"
                    style={{ fontSize: 'clamp(36px, 4vw, 48px)' }}
                  >
                    {studioPrice}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={studioPeriod}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-[16px] text-[rgba(255,255,255,0.5)] ml-2"
                  >
                    {studioPeriod}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="mx-8 my-6 h-px bg-[rgba(255,255,255,0.06)]" />

            <div className="px-8 flex-1">
              <p className="font-body text-[14px] text-[#3A86FF] font-medium mb-3">
                Everything in Pro, plus:
              </p>
              {[
                'Team licenses (5 seats)',
                'Custom LUT generation',
                'API access',
                'Dedicated account manager',
                'White-label options',
                'Unlimited AI queries',
                'Early access to new collections',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 mb-3">
                  <Check size={18} className="text-[#D4AF37] shrink-0" />
                  <span className="font-body text-[15px] text-[rgba(255,255,255,0.8)]">{f}</span>
                </div>
              ))}
            </div>

            <div className="p-8 pt-6">
              <button className="btn-secondary w-full">Contact Sales</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Feature Comparison ── */}
      <section className="w-full py-20" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="font-body text-[13px] font-medium tracking-[0.08em] uppercase text-[#D4AF37] mb-3"
            >
              COMPARE
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
              className="font-display font-semibold text-white tracking-[-0.01em]"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              Full Feature Comparison
            </motion.h3>
          </div>

          {/* Desktop table */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="hidden md:block overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)]"
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_120px_120px_120px] items-center"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="px-5 py-4 font-body font-semibold text-[14px] text-white">Feature</div>
              <div className="px-3 py-4 text-center font-body font-semibold text-[14px] text-[rgba(255,255,255,0.5)]">
                Starter
              </div>
              <div className="px-3 py-4 text-center font-body font-semibold text-[14px] text-[#D4AF37]">
                Pro
              </div>
              <div className="px-3 py-4 text-center font-body font-semibold text-[14px] text-[#3A86FF]">
                Studio
              </div>
            </div>

            {/* Table rows */}
            {comparisonCategories.map((cat) => (
              <div key={cat.name}>
                {/* Category header */}
                <div
                  className="grid grid-cols-[1fr_120px_120px_120px] items-center border-t border-[rgba(255,255,255,0.06)]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="px-5 py-3 font-body font-semibold text-[13px] text-[rgba(255,255,255,0.6)] uppercase tracking-[0.06em]">
                    {cat.name}
                  </div>
                  <div />
                  <div />
                  <div />
                </div>
                {/* Feature rows */}
                {cat.features.map((feat, i) => (
                  <motion.div
                    key={feat.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.03 }}
                    className="grid grid-cols-[1fr_120px_120px_120px] items-center border-t border-[rgba(255,255,255,0.06)]"
                    style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}
                  >
                    <div className="px-5 py-3.5 font-body text-[14px] text-[rgba(255,255,255,0.8)]">
                      {feat.name}
                    </div>
                    <div className="px-3 py-3.5 flex justify-center">
                      <FeatureIcon included={feat.starter} />
                    </div>
                    <div className="px-3 py-3.5 flex justify-center">
                      <FeatureIcon included={feat.pro} />
                    </div>
                    <div className="px-3 py-3.5 flex justify-center">
                      <FeatureIcon included={feat.studio} />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Mobile accordion view */}
          <div className="md:hidden space-y-4">
            {comparisonCategories.map((cat) => (
              <div key={cat.name} className="glass-card p-4">
                <h4 className="font-body font-semibold text-[13px] text-[rgba(255,255,255,0.6)] uppercase tracking-[0.06em] mb-3">
                  {cat.name}
                </h4>
                {cat.features.map((feat) => (
                  <div
                    key={feat.name}
                    className="flex items-center justify-between py-2 border-t border-[rgba(255,255,255,0.04)]"
                  >
                    <span className="font-body text-[14px] text-[rgba(255,255,255,0.8)]">{feat.name}</span>
                    <div className="flex gap-4">
                      <div className="text-center w-12">
                        <span className="block text-[10px] text-[rgba(255,255,255,0.3)] mb-0.5">S</span>
                        <FeatureIcon included={feat.starter} />
                      </div>
                      <div className="text-center w-12">
                        <span className="block text-[10px] text-[#D4AF37] mb-0.5">P</span>
                        <FeatureIcon included={feat.pro} />
                      </div>
                      <div className="text-center w-12">
                        <span className="block text-[10px] text-[#3A86FF] mb-0.5">St</span>
                        <FeatureIcon included={feat.studio} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: FAQ ── */}
      <section className="w-full pt-20 pb-32 px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="font-body text-[13px] font-medium tracking-[0.08em] uppercase text-[#D4AF37] mb-3"
            >
              FAQ
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
              className="font-display font-semibold text-white tracking-[-0.01em]"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              Common Questions
            </motion.h3>
          </div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <Accordion.Root type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
                >
                  <FaqItem question={item.q} answer={item.a} />
                </motion.div>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
