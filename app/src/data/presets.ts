export type PresetFormat = 'XMP' | 'CUBE';

export interface Preset {
  id: string;
  name: string;
  format: PresetFormat;
  category: string;
  categoryId: string;
  params: string;
  mood: string;
}

export interface Category {
  id: string;
  name: string;
  accentColor: string;
  description: string;
  presets: Preset[];
}

const createPresets = (): Category[] => {
  const categories: Omit<Category, 'presets'>[] = [
    {
      id: 'luxury-editorial',
      name: 'Luxury Editorial',
      accentColor: '#D4AF37',
      description: 'Refined gold-infused tones for high-end fashion and luxury brand storytelling',
    },
    {
      id: 'cinematic-shadows',
      name: 'Cinematic Shadows',
      accentColor: '#2D2D3A',
      description: 'Deep dramatic shadows with controlled highlight retention for narrative work',
    },
    {
      id: 'analog-film',
      name: 'Analog Film',
      accentColor: '#C8956C',
      description: 'Warm emulsion-like tones mimicking classic 35mm film stocks',
    },
    {
      id: 'moody-documentary',
      name: 'Moody Documentary',
      accentColor: '#4A5568',
      description: 'Desaturated earth tones perfect for journalistic and documentary projects',
    },
    {
      id: 'dreamy-wedding',
      name: 'Dreamy Wedding',
      accentColor: '#F7E7CE',
      description: 'Soft romantic pastels with creamy highlights for celebration photography',
    },
    {
      id: 'hyperreal-fashion',
      name: 'Hyperreal Fashion',
      accentColor: '#FF6B9D',
      description: 'Vivid punchy tones with enhanced saturation for editorial fashion work',
    },
    {
      id: 'night-neon',
      name: 'Night Neon',
      accentColor: '#FF00FF',
      description: 'Electric neon-accented grades for after-dark urban cinematography',
    },
    {
      id: 'luxury-travel',
      name: 'Luxury Travel',
      accentColor: '#20B2AA',
      description: 'Rich golden-hour warmth with enhanced aqua tones for aspirational content',
    },
    {
      id: 'minimal-scandinavian',
      name: 'Minimal Scandinavian',
      accentColor: '#E8E8E8',
      description: 'Clean restrained tones with subtle contrast for minimalist aesthetics',
    },
    {
      id: 'cyberpunk-cinema',
      name: 'Cyberpunk Cinema',
      accentColor: '#00F0FF',
      description: 'Electric cyan and purple tones for futuristic digital narratives',
    },
    {
      id: 'neo-noir',
      name: 'Neo Noir',
      accentColor: '#8B0000',
      description: 'Crushed blacks with crimson accents for modern film noir aesthetics',
    },
    {
      id: 'vintage-film-lab',
      name: 'Vintage Film Lab',
      accentColor: '#DEB887',
      description: 'Aged photo paper tones with corner darkening and nostalgic warmth',
    },
    {
      id: 'high-dynamic-luxury',
      name: 'High Dynamic Luxury',
      accentColor: '#FFD700',
      description: 'Extreme contrast HDR grades with brilliant gold highlights',
    },
    {
      id: 'dark-instagram-mood',
      name: 'Dark Instagram Mood',
      accentColor: '#6B5B95',
      description: 'Desaturated purple-gray tones with subtle warm accents for social content',
    },
    {
      id: 'clean-creator-economy',
      name: 'Clean Creator Economy',
      accentColor: '#00D26A',
      description: 'Crisp modern tones optimized for YouTube, TikTok, and platform content',
    },
    {
      id: 'music-video-looks',
      name: 'Music Video Looks',
      accentColor: '#9400D3',
      description: 'Dramatic stylized grades with bold color washes for performance visuals',
    },
    {
      id: 'commercial-luxury',
      name: 'Commercial Luxury',
      accentColor: '#B8860B',
      description: 'Polished bronze and amber tones for high-end product and brand films',
    },
    {
      id: 'netflix-inspired',
      name: 'Netflix Inspired',
      accentColor: '#E50914',
      description: 'Streaming-platform cinematic look with deep reds and cinematic contrast',
    },
    {
      id: 'a24-inspired',
      name: 'A24 Inspired',
      accentColor: '#708090',
      description: 'Indie film aesthetic with muted blue-gray tones and warm undertones',
    },
    {
      id: 'kodak-portra-emulation',
      name: 'Kodak Portra Emulation',
      accentColor: '#F4A460',
      description: 'Classic warm peach-to-tan color signature of iconic film stock',
    },
    {
      id: 'fuji-400h-emulation',
      name: 'Fuji 400H Emulation',
      accentColor: '#98D8C8',
      description: 'Soft mint-to-cream balance capturing the signature Fuji film look',
    },
    {
      id: 'arri-alexa-look',
      name: 'ARRI Alexa Look',
      accentColor: '#4682B4',
      description: 'Natural skin tone warmth with neutral shadows from digital cinema standard',
    },
    {
      id: 'cinestill-800t-emulation',
      name: 'CineStill 800T Emulation',
      accentColor: '#FF6347',
      description: 'Warm highlights with distinctive red halation glow of tungsten film stock',
    },
    {
      id: 'bleach-bypass',
      name: 'Bleach Bypass',
      accentColor: '#C0C0C0',
      description: 'High contrast silver-gray with desaturated cool metallic tones',
    },
    {
      id: 'teal-orange-modern',
      name: 'Teal & Orange Modern',
      accentColor: '#008080',
      description: 'Contemporary blockbuster grade with teal shadows and warm orange highlights',
    },
  ];

  const presetNamesByCategory: Record<string, [string, string, string, string, string]> = {
    'luxury-editorial': ['Nocturne Lux', 'Velvet Noir', 'Opulence', 'Silk Embers', 'Champagne Dusk'],
    'cinematic-shadows': ['Umbra Deep', 'Chiaroscuro', 'Midnight Form', 'Shadow Play', 'Tenebrae'],
    'analog-film': ['Emulsion Warm', 'Grain & Dust', 'Chemical Bath', 'Rewind 1984', 'Celluloid Soul'],
    'moody-documentary': ['Grey Witness', 'Field Notes', 'Overcast Truth', 'Raw Earth', 'Quiet Observer'],
    'dreamy-wedding': ['Blush Vow', 'Garden Mist', 'Lace Light', 'Eternal Soft', 'Ivory Glow'],
    'hyperreal-fashion': ['Runway Pop', 'Editorial Punch', 'Glamour Burst', 'Catwalk Electric', 'Haute Saturate'],
    'night-neon': ['Neon Drift', 'Electric Avenue', 'After Hours', 'Pulse City', 'Cyber Glow'],
    'luxury-travel': ['Golden Horizon', 'Aqua Resort', 'Passport Warm', 'Tropical Luxe', 'Wanderlust Gold'],
    'minimal-scandinavian': ['Nordic Clean', 'Snow Light', 'Fjord Grey', 'Hygge Warm', 'Oslo Mist'],
    'cyberpunk-cinema': ['Digital Rain', 'Neon Samurai', 'Grid Runner', 'Signal Hack', 'Zero Day'],
    'neo-noir': ['Blood Moon', 'Crimson Shadow', 'Red Veil', 'Dark Alley', 'Scarlet Night'],
    'vintage-film-lab': ['Time Fade', 'Memory Lane', 'Faded Print', 'Retro Grade', 'Darkroom Glow'],
    'high-dynamic-luxury': ['Lumina Prime', 'Highlight King', 'Radiance Ultra', 'Golden Peak', 'Clarity Lux'],
    'dark-instagram-mood': ['Mood Grid', 'Aesthetic Deep', 'Vibe Shift', 'Shadow Feed', 'Muted Flame'],
    'clean-creator-economy': ['Algorithm Pro', 'Thumbnail Pop', 'Trend Ready', 'Viral Grade', 'Content King'],
    'music-video-looks': ['Stage Light', 'Concert Haze', 'Backlash Beam', 'Encore Fade', 'Tour Visual'],
    'commercial-luxury': ['Brand Gold', 'Product Prime', 'Campaign Lux', 'Studio Select', 'Client Ready'],
    'netflix-inspired': ['Stream Dark', 'Binge Grade', 'Original Tone', 'Queue Premium', 'Series Cine'],
    'a24-inspired': ['Indie Spirit', 'Sundance Haze', 'Art House Warm', 'Festival Glow', 'Slate Grey'],
    'kodak-portra-emulation': ['Portra 160', 'Portra 400', 'Golden Hour Stock', 'Warm Emulsion', 'Analog Soul'],
    'fuji-400h-emulation': ['Fuji Mint', 'Pro 400H', 'Cool Balance', 'Green Shadow', 'Eastern Haze'],
    'arri-alexa-look': ['Alexa Log', 'Recurve Pro', 'Cinema Natural', 'Digital Negative', 'Sky Blue'],
    'cinestill-800t-emulation': ['Halation Red', 'Tungsten Glow', 'Night Stock', 'Cinema Halftone', 'Neon Bloom'],
    'bleach-bypass': ['Silver Retain', 'Skip Bleach', 'Metallic Cool', 'Steel Shadow', 'Chrome Edge'],
    'teal-orange-modern': ['Blockbuster', 'Teal Shadow', 'Orange Crush', 'Summer Hit', 'Modern Cine'],
  };

  const moods = ['Warm', 'Cool', 'Neutral', 'Vibrant', 'Muted', 'Dramatic', 'Soft', 'Vintage'];
  const formats: PresetFormat[] = ['XMP', 'CUBE'];

  const allPresets: Preset[] = [];

  const categoriesWithPresets: Category[] = categories.map((cat) => {
    const names = presetNamesByCategory[cat.id];
    const presets: Preset[] = names.map((name, idx) => {
      const format = formats[idx % 2];
      const mood = moods[idx % moods.length];
      const preset: Preset = {
        id: `${cat.id}-${idx + 1}`,
        name,
        format,
        category: cat.name,
        categoryId: cat.id,
        params: `Contrast +${10 + idx * 3}, Saturation ${-5 + idx * 2}, Shadows +${5 + idx}, Highlights -${2 + idx}`,
        mood,
      };
      allPresets.push(preset);
      return preset;
    });
    return { ...cat, presets };
  });

  return categoriesWithPresets;
};

export const categories = createPresets();

export const allPresets = categories.flatMap((cat) => cat.presets);

export const getPresetsByFormat = (format: PresetFormat | 'all') => {
  if (format === 'all') return allPresets;
  return allPresets.filter((p) => p.format === format);
};

export const getPresetsByCategory = (categoryId: string) => {
  return categories.find((c) => c.id === categoryId)?.presets ?? [];
};

export const getCategoryById = (categoryId: string) => {
  return categories.find((c) => c.id === categoryId);
};
