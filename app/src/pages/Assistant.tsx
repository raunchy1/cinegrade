import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Loader2,
  Wand2,
  ScanText,
  GitCompare,
  Lightbulb,
  ArrowRight,
  Film,
  Sun,
  Moon,
  Cloud,
  Zap,
  Heart,
  Star,
  TreePine,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

interface MatchResult {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  matchScore: number;
  matchReason: string;
  tags: string[];
  thumbnail: string;
}

interface MoodOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MOOD_OPTIONS: MoodOption[] = [
  { id: 'cinematic', label: 'Cinematic', icon: <Film size={20} /> },
  { id: 'moody', label: 'Moody', icon: <Cloud size={20} /> },
  { id: 'bright', label: 'Bright', icon: <Sun size={20} /> },
  { id: 'vintage', label: 'Vintage', icon: <Star size={20} /> },
  { id: 'dark', label: 'Dark', icon: <Moon size={20} /> },
  { id: 'dreamy', label: 'Dreamy', icon: <Heart size={20} /> },
  { id: 'bold', label: 'Bold', icon: <Zap size={20} /> },
  { id: 'natural', label: 'Natural', icon: <TreePine size={20} /> },
];

const QUICK_PROMPTS = [
  'Moody wedding photography with soft golden light',
  'Cyberpunk night street scenes with neon reflections',
  'Film emulation with vintage analog grain',
  'Luxury fashion editorial with dramatic shadows',
];

// ─── Mock AI Response Generator ──────────────────────────────────────────────

function generateMockResults(input: string, moods: string[]): MatchResult[] {
  const lower = input.toLowerCase();
  const hasWedding = lower.includes('wedding') || lower.includes('bride') || moods.includes('dreamy');
  const hasCyberpunk = lower.includes('cyberpunk') || lower.includes('neon') || lower.includes('night') || moods.includes('dark');
  const hasFilm = lower.includes('film') || lower.includes('vintage') || lower.includes('analog') || lower.includes('grain');
  const hasLuxury = lower.includes('luxury') || lower.includes('fashion') || lower.includes('editorial');

  const results: MatchResult[] = [];

  if (hasWedding) {
    results.push(
      {
        id: 'dreamy-wedding-01',
        name: 'Dreamy Wedding',
        category: 'Dreamy Wedding',
        categoryColor: '#F7E7CE',
        matchScore: 96,
        matchReason: 'Soft pastel tones with creamy highlights perfect for romantic settings',
        tags: ['Warm tones match', 'Soft highlights', 'Romantic feel'],
        thumbnail: '/sample-image-1-graded.jpg',
      },
      {
        id: 'golden-editorial-01',
        name: 'Golden Editorial 01',
        category: 'Luxury Editorial',
        categoryColor: '#D4AF37',
        matchScore: 88,
        matchReason: 'Warm skin tones with elegant golden hour quality',
        tags: ['Warm skin tones', 'Elegant grade'],
        thumbnail: '/sample-image-1-graded.jpg',
      },
      {
        id: 'kodak-portra-01',
        name: 'Kodak Portra 400',
        category: 'Kodak Portra Emulation',
        categoryColor: '#F4A460',
        matchScore: 82,
        matchReason: 'Classic film stock with beautiful skin tone rendering',
        tags: ['Film stock', 'Skin tones'],
        thumbnail: '/sample-image-2-graded.jpg',
      }
    );
  } else if (hasCyberpunk) {
    results.push(
      {
        id: 'night-neon-01',
        name: 'Tokyo Night Neon',
        category: 'Night Neon',
        categoryColor: '#FF00FF',
        matchScore: 95,
        matchReason: 'Enhanced neon glow with boosted contrast for urban nights',
        tags: ['Neon glow', 'Night contrast', 'Cyberpunk vibe'],
        thumbnail: '/sample-image-3-graded.jpg',
      },
      {
        id: 'cyberpunk-cinema-01',
        name: 'Cyberpunk Cinema',
        category: 'Cyberpunk Cinema',
        categoryColor: '#00F0FF',
        matchScore: 91,
        matchReason: 'Cyan-magenta split with digital futurism aesthetics',
        tags: ['Cyan accent', 'Futuristic', 'High contrast'],
        thumbnail: '/sample-image-3-graded.jpg',
      },
      {
        id: 'neo-noir-01',
        name: 'Neo Noir Cinema',
        category: 'Neo Noir',
        categoryColor: '#8B0000',
        matchScore: 78,
        matchReason: 'Deep shadows with dramatic red accent lighting',
        tags: ['Deep shadows', 'Red accents'],
        thumbnail: '/sample-image-2-graded.jpg',
      }
    );
  } else if (hasFilm) {
    results.push(
      {
        id: 'analog-film-01',
        name: 'Kodak Vision3',
        category: 'Analog Film',
        categoryColor: '#C8956C',
        matchScore: 94,
        matchReason: 'Authentic film grain with warm color science',
        tags: ['Film grain', 'Warm science', 'Analog feel'],
        thumbnail: '/sample-image-2-graded.jpg',
      },
      {
        id: 'kodak-portra-02',
        name: 'Kodak Portra 800',
        category: 'Kodak Portra Emulation',
        categoryColor: '#F4A460',
        matchScore: 90,
        matchReason: 'Classic Portra look with beautiful skin rendering',
        tags: ['Portra look', 'Skin tones'],
        thumbnail: '/sample-image-1-graded.jpg',
      },
      {
        id: 'fuji-400h-01',
        name: 'Fuji 400H Emulation',
        category: 'Fuji 400H Emulation',
        categoryColor: '#98D8C8',
        matchScore: 85,
        matchReason: 'Fuji signature cool shadows with warm highlights',
        tags: ['Cool shadows', 'Fuji look'],
        thumbnail: '/sample-image-1-graded.jpg',
      }
    );
  } else if (hasLuxury) {
    results.push(
      {
        id: 'luxury-editorial-01',
        name: 'Luxury Editorial',
        category: 'Luxury Editorial',
        categoryColor: '#D4AF37',
        matchScore: 93,
        matchReason: 'Gold-toned elegance with refined highlight control',
        tags: ['Gold tones', 'Luxury feel', 'Refined'],
        thumbnail: '/sample-image-1-graded.jpg',
      },
      {
        id: 'hyperreal-fashion-01',
        name: 'Hyperreal Fashion',
        category: 'Hyperreal Fashion',
        categoryColor: '#FF6B9D',
        matchScore: 87,
        matchReason: 'Punchy saturation with fashion-forward color science',
        tags: ['Punchy colors', 'Fashion grade'],
        thumbnail: '/sample-image-1-graded.jpg',
      },
      {
        id: 'arri-alexa-01',
        name: 'ARRI Alexa Look',
        category: 'ARRI Alexa Look',
        categoryColor: '#4682B4',
        matchScore: 81,
        matchReason: 'Natural skin tones with digital cinema quality',
        tags: ['Natural tones', 'Cinema look'],
        thumbnail: '/sample-image-2-graded.jpg',
      }
    );
  } else {
    // Default popular mix
    results.push(
      {
        id: 'teal-orange-01',
        name: 'Teal & Orange Cinema',
        category: 'Teal & Orange Modern',
        categoryColor: '#008080',
        matchScore: 92,
        matchReason: 'The classic blockbuster look — universally flattering',
        tags: ['Popular', 'Versatile', 'Cinematic'],
        thumbnail: '/sample-image-1-graded.jpg',
      },
      {
        id: 'cinematic-shadows-01',
        name: 'Cinematic Shadows',
        category: 'Cinematic Shadows',
        categoryColor: '#2D2D3A',
        matchScore: 86,
        matchReason: 'Deep dramatic shadows with controlled highlight roll-off',
        tags: ['Dramatic', 'Shadow detail'],
        thumbnail: '/sample-image-2-graded.jpg',
      },
      {
        id: 'luxury-travel-01',
        name: 'Luxury Travel',
        category: 'Luxury Travel',
        categoryColor: '#20B2AA',
        matchScore: 80,
        matchReason: 'Rich golden hour tones with enhanced natural colors',
        tags: ['Golden hour', 'Travel'],
        thumbnail: '/sample-image-3-graded.jpg',
      }
    );
  }

  // Always add at least 3 results
  while (results.length < 3) {
    results.push({
      id: `generic-0${results.length}`,
      name: 'Cinematic Standard',
      category: 'Cinematic Shadows',
      categoryColor: '#2D2D3A',
      matchScore: 70 - results.length * 5,
      matchReason: 'A versatile all-around cinematic grade',
      tags: ['Versatile'],
      thumbnail: '/sample-image-1-graded.jpg',
    });
  }

  return results;
}

// ─── Animation Helpers ───────────────────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Components ──────────────────────────────────────────────────────────────

/** Animated dots for "thinking" state */
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/** Circular match score indicator */
function MatchScoreCircle({ score }: { score: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeColor = score > 80 ? '#D4AF37' : score > 50 ? '#3A86FF' : 'rgba(255,255,255,0.3)';
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <div className="relative w-[40px] h-[40px] flex items-center justify-center shrink-0">
      <svg width="40" height="40" className="-rotate-90">
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <motion.circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-medium text-white"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
        }}
      >
        {score}%
      </span>
    </div>
  );
}

/** Match result card */
function MatchCard({ result, index }: { result: MatchResult; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOutExpo }}
      className="rounded-xl p-5 flex gap-4 transition-all duration-300 hover:-translate-y-0.5 group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{ borderColor: 'rgba(255,255,255,0.15)' }}
    >
      {/* Thumbnail */}
      <div className="w-20 h-[60px] rounded-lg overflow-hidden shrink-0">
        <img
          src={result.thumbnail}
          alt={result.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display font-medium text-white text-[15px]">
              {result.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: result.categoryColor }}
              />
              <span className="text-[13px]" style={{ color: result.categoryColor }}>
                {result.category}
              </span>
            </div>
          </div>
          <MatchScoreCircle score={result.matchScore} />
        </div>

        {/* Match reason */}
        <p
          className="mt-1.5 text-[13px]"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {result.matchReason}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded"
              style={{
                color: 'rgba(58,134,255,0.8)',
                background: 'rgba(58,134,255,0.1)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <Link
          to="/preview"
          className="inline-flex items-center gap-1 mt-2.5 text-[13px] font-medium transition-all duration-200 hover:underline"
          style={{ color: '#3A86FF' }}
        >
          Apply Preview
          <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

/** Step card for How It Works */
function StepCard({
  icon,
  title,
  description,
  color,
  bgColor,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: easeOutExpo }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
        style={{ background: bgColor, color }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number] }}
      >
        {icon}
      </motion.div>
      <h4
        className="font-display font-semibold text-white mb-2"
        style={{ fontSize: '18px' }}
      >
        {title}
      </h4>
      <p
        className="text-[15px] leading-relaxed max-w-[280px]"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Assistant() {
  const [inputText, setInputText] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const charCount = inputText.length;
  const canSubmit = inputText.trim().length > 0 || selectedMoods.length > 0;

  const toggleMood = (moodId: string) => {
    setSelectedMoods((prev) =>
      prev.includes(moodId) ? prev.filter((m) => m !== moodId) : [...prev, moodId]
    );
  };

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setIsAnalyzing(true);
    setResults(null);

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Simulate AI thinking
    setTimeout(() => {
      const mockResults = generateMockResults(inputText, selectedMoods);
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2500);
  }, [canSubmit, inputText, selectedMoods]);

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleRefine = () => {
    setResults(null);
    setInputText('');
    textareaRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh]" style={{ background: '#0A0A0F' }}>
      {/* ── Section 1: Hero Header ── */}
      <section className="w-full pt-[104px] pb-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(58,134,255,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center relative">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(58,134,255,0.1)',
              border: '1px solid rgba(58,134,255,0.2)',
            }}
          >
            <Sparkles size={16} style={{ color: '#3A86FF' }} />
            <span
              className="text-[13px] font-medium"
              style={{ color: '#3A86FF' }}
            >
              AI-Powered
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
            className="font-display font-semibold leading-tight"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI Color Concierge
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOutExpo }}
            className="mt-4 text-[18px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Describe your vision. We&apos;ll find the perfect look.
          </motion.p>
        </div>
      </section>

      {/* ── Section 2: AI Interface ── */}
      <section className="w-full py-8 pb-16" style={{ background: '#0A0A0F' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Input Panel */}
            <motion.div
              className="w-full lg:flex-[0_0_480px] shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <div
                className="rounded-xl p-6 lg:p-8"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Textarea */}
                <label
                  className="block text-[14px] font-medium text-white mb-3"
                >
                  Describe your look
                </label>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) {
                        setInputText(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleSubmit();
                      }
                    }}
                    placeholder="e.g., 'I'm shooting a moody fashion editorial with dramatic side lighting. I want something cinematic with deep shadows and warm skin tones.'"
                    className="w-full rounded-xl px-4 py-4 text-white text-[15px] resize-none outline-none transition-all duration-200 focus:border-[#3A86FF]"
                    style={{
                      minHeight: 120,
                      maxHeight: 200,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#3A86FF';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(58,134,255,0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <span
                    className="absolute bottom-3 right-3"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: '11px',
                    }}
                  >
                    {charCount}/300
                  </span>
                </div>

                {/* Mood Selector */}
                <div className="mt-6">
                  <label className="block text-[14px] font-medium text-white mb-3">
                    Or select a mood
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {MOOD_OPTIONS.map((mood, i) => {
                      const isActive = selectedMoods.includes(mood.id);
                      return (
                        <motion.button
                          key={mood.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.03,
                            ease: easeOutExpo,
                          }}
                          onClick={() => toggleMood(mood.id)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200"
                          style={{
                            background: isActive
                              ? 'rgba(212,175,55,0.15)'
                              : 'rgba(255,255,255,0.05)',
                            border: isActive
                              ? '1px solid #D4AF37'
                              : '1px solid rgba(255,255,255,0.1)',
                            color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                          }}
                        >
                          {mood.icon}
                          {mood.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isAnalyzing}
                  className="w-full mt-6 btn-primary"
                  style={{
                    background:
                      'linear-gradient(135deg, #3A86FF 0%, #00B4D8 100%)',
                    opacity: !canSubmit || isAnalyzing ? 0.5 : 1,
                    cursor: !canSubmit || isAnalyzing ? 'not-allowed' : 'pointer',
                  }}
                  whileTap={canSubmit && !isAnalyzing ? { scale: 0.98 } : undefined}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Find My Presets
                    </>
                  )}
                </motion.button>

                {/* Example Prompts */}
                <div className="mt-5">
                  <span
                    className="text-[13px]"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Try an example
                  </span>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="text-left text-[13px] transition-all duration-200 hover:underline py-1"
                        style={{ color: '#3A86FF' }}
                      >
                        &ldquo;{prompt}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Results Panel */}
            <div ref={resultsRef} className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {!isAnalyzing && !results && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center"
                  >
                    <Wand2
                      size={48}
                      style={{ color: 'rgba(255,255,255,0.15)' }}
                    />
                    <h3
                      className="font-display font-medium mt-4"
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '20px',
                      }}
                    >
                      Ready to match
                    </h3>
                    <p
                      className="mt-2 text-[15px]"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      Describe your vision or select moods to get started
                    </p>
                  </motion.div>
                )}

                {isAnalyzing && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <Loader2 size={32} style={{ color: '#3A86FF' }} />
                    </motion.div>
                    <p
                      className="mt-4 text-[15px]"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      Analyzing your preferences...
                    </p>
                    <div className="mt-3">
                      <ThinkingDots />
                    </div>

                    {/* Shimmer placeholder cards */}
                    <div className="mt-8 w-full max-w-md space-y-3">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-24 rounded-xl overflow-hidden relative"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background:
                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                              backgroundSize: '200% 100%',
                            }}
                            animate={{
                              backgroundPosition: ['200% 0', '-200% 0'],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: 'linear',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {results && !isAnalyzing && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Results header */}
                    <div className="mb-5">
                      <div className="flex items-center gap-3">
                        <h3
                          className="font-display font-semibold text-white"
                          style={{ fontSize: '20px' }}
                        >
                          Top Matches
                        </h3>
                        <span
                          className="text-[12px] px-2 py-0.5 rounded-full"
                          style={{
                            color: 'rgba(255,255,255,0.4)',
                            background: 'rgba(255,255,255,0.05)',
                          }}
                        >
                          {results.length} matches
                        </span>
                      </div>
                      <p
                        className="mt-1 text-[14px]"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        Based on your description
                      </p>
                    </div>

                    {/* Match cards */}
                    <div className="space-y-3">
                      {results.map((result, i) => (
                        <MatchCard key={result.id} result={result} index={i} />
                      ))}
                    </div>

                    {/* Refine button */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleRefine}
                        className="btn-secondary text-[13px] py-[10px] px-6"
                      >
                        Refine Search
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: How It Works ── */}
      <section
        className="w-full py-16 pb-24"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-12"
          >
            <span
              className="text-[13px] uppercase tracking-wider font-medium"
              style={{ color: '#3A86FF', letterSpacing: '0.08em' }}
            >
              How It Works
            </span>
            <h2
              className="font-display font-semibold text-white mt-3"
              style={{
                fontSize: 'clamp(24px, 3vw, 40px)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              Intelligent Color Matching
            </h2>
          </motion.div>

          {/* 3 steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <StepCard
              icon={<ScanText size={28} />}
              title="Analyze Your Input"
              description="Our AI processes your description, mood selections, and project type to understand your creative intent."
              color="#3A86FF"
              bgColor="rgba(58,134,255,0.1)"
              index={0}
            />
            <StepCard
              icon={<GitCompare size={28} />}
              title="Match Parameters"
              description="Each preset's color characteristics — temperature, contrast, saturation curve, tonal range — are compared against your request."
              color="#D4AF37"
              bgColor="rgba(212,175,55,0.1)"
              index={1}
            />
            <StepCard
              icon={<Lightbulb size={28} />}
              title="Ranked Results"
              description="Presets are scored and ranked by match percentage, with explanations for why each is a good fit."
              color="#00D26A"
              bgColor="rgba(0,210,106,0.1)"
              index={2}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
