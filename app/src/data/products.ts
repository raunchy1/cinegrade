/* ═══════════════════════════════════════════════════════════════════
   CINEGRADE LAB — Premium Product Data
   Realistic cinematic marketplace data with Unsplash imagery
   ═══════════════════════════════════════════════════════════════════ */

export type ProductFormat = 'XMP' | 'CUBE';

export type ProductBadge = 'Bestseller' | 'New' | 'Staff Pick' | 'Limited' | null;

export interface Product {
  id: string;
  name: string;
  format: ProductFormat;
  category: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  creatorNotes: string;
  price: number;
  compareAtPrice: number | null;
  isOnSale: boolean;
  compatibility: string[];
  includedFiles: string[];
  tags: string[];
  mood: string;
  params: string;
  heroImage: string;
  beforeImage: string;
  afterImage: string;
  galleryImages: string[];
  thumbnail: string;
  badge: ProductBadge;
  releaseDate: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  accentColor: string;
  description: string;
  coverImage: string;
  productCount: number;
}

/* ─── Unsplash Image Helpers ─────────────────────────────────────── */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

/* ─── Curated Cinematic Image Library ────────────────────────────── */

const IMAGE_LIBRARY: Record<string, {
  hero: string;
  before: string;
  after: string;
  gallery: string[];
}> = {
  'luxury-editorial': {
    hero: unsplash('1515886657613-9f3515b0c78f', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1509631179647-0177331693ae', 1200),
    gallery: [
      unsplash('1469334031218-e382a71b716b', 800),
      unsplash('1496747611176-843222e1e57c', 800),
      unsplash('1483985988355-763728e1935b', 800),
    ],
  },
  'cinematic-shadows': {
    hero: unsplash('1531746020798-e6953c6e8e04', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1531746020798-e6953c6e8e04', 1200),
    gallery: [
      unsplash('1507003211169-0a1dd7228f2d', 800),
      unsplash('1517841905240-472988babdf9', 800),
      unsplash('1506794778202-cad84cf45f1d', 800),
    ],
  },
  'analog-film': {
    hero: unsplash('1529626455594-4ff0802cfb7e', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1529626455594-4ff0802cfb7e', 1200),
    gallery: [
      unsplash('1494790108377-be9c29b29330', 800),
      unsplash('1524504388940-b1c1722653e1', 800),
      unsplash('1488426862026-3ee34a7d66df', 800),
    ],
  },
  'moody-documentary': {
    hero: unsplash('1477959858617-67f85cf4f1df', 1200),
    before: unsplash('1449824913935-59a10b8d2000', 1200),
    after: unsplash('1477959858617-67f85cf4f1df', 1200),
    gallery: [
      unsplash('1517732306141-e0f3d556e8c7', 800),
      unsplash('1485846234645-a62644f84728', 800),
      unsplash('1504198458649-3128b932f49e', 800),
    ],
  },
  'dreamy-wedding': {
    hero: unsplash('1519741497674-611481863552', 1200),
    before: unsplash('1465495976277-9327f52646c5', 1200),
    after: unsplash('1519741497674-611481863552', 1200),
    gallery: [
      unsplash('1511285560929-80b456fea0bc', 800),
      unsplash('1460978816931-1d6b0fd61c76', 800),
      unsplash('1515934751635-c81c6bc9a2d8', 800),
    ],
  },
  'hyperreal-fashion': {
    hero: unsplash('1509631179647-0177331693ae', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1509631179647-0177331693ae', 1200),
    gallery: [
      unsplash('1485230895905-40c045d3c745', 800),
      unsplash('1492106087820-71f1a00d2b11', 800),
      unsplash('1502823403499-6ccfcf4fb453', 800),
    ],
  },
  'night-neon': {
    hero: unsplash('1555685812-4b943f3b9b71', 1200),
    before: unsplash('1477959858617-67f85cf4f1df', 1200),
    after: unsplash('1555685812-4b943f3b9b71', 1200),
    gallery: [
      unsplash('1565626424178-c699f3301a3a', 800),
      unsplash('1519608487953-e999c86e7455', 800),
      unsplash('1496442226666-8f4f0b80ab76', 800),
    ],
  },
  'luxury-travel': {
    hero: unsplash('1507525428034-b723cf961d3e', 1200),
    before: unsplash('1476514525535-07fb3b4ae5f1', 1200),
    after: unsplash('1507525428034-b723cf961d3e', 1200),
    gallery: [
      unsplash('1469854523086-cc02fe5d8800', 800),
      unsplash('1501785888041-af3ef285b470', 800),
      unsplash('1470071459604-3b5ec3a7fe05', 800),
    ],
  },
  'minimal-scandinavian': {
    hero: unsplash('1494438639946-1ebd1d20bf85', 1200),
    before: unsplash('1502005229762-cf1a0f7a0f1a', 1200),
    after: unsplash('1494438639946-1ebd1d20bf85', 1200),
    gallery: [
      unsplash('1519710164239-da123dc03ef4', 800),
      unsplash('1484100356142-6c4c3742e5e7', 800),
      unsplash('1507652310290-270015a96047', 800),
    ],
  },
  'cyberpunk-cinema': {
    hero: unsplash('1515630278258-407f66498911', 1200),
    before: unsplash('1477959858617-67f85cf4f1df', 1200),
    after: unsplash('1515630278258-407f66498911', 1200),
    gallery: [
      unsplash('1535498730771-e735b998cd44', 800),
      unsplash('1504805572947-34fad45aed93', 800),
      unsplash('1480796927426-f609979314bd', 800),
    ],
  },
  'neo-noir': {
    hero: unsplash('1514565131-fce0801e5785', 1200),
    before: unsplash('1449824913935-59a10b8d2000', 1200),
    after: unsplash('1514565131-fce0801e5785', 1200),
    gallery: [
      unsplash('1478760329108-5c3ed9d495a0', 800),
      unsplash('1506744038136-46273834b3fb', 800),
      unsplash('1518709268805-4e9042af9f23', 800),
    ],
  },
  'vintage-film-lab': {
    hero: unsplash('1523419409543-a5e549c1d3f8', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1523419409543-a5e549c1d3f8', 1200),
    gallery: [
      unsplash('1521119989659-a83daa4887e7', 800),
      unsplash('1494790108377-be9c29b29330', 800),
      unsplash('1516534775068-ba3b9f30c709', 800),
    ],
  },
  'high-dynamic-luxury': {
    hero: unsplash('1503376780358-1e6ff7de6d3a', 1200),
    before: unsplash('1469854523086-cc02fe5d8800', 1200),
    after: unsplash('1503376780358-1e6ff7de6d3a', 1200),
    gallery: [
      unsplash('1503376780358-1e6ff7de6d3a', 800),
      unsplash('1492144534655-ae79e9645f58', 800),
      unsplash('1502877338535-766e1452684a', 800),
    ],
  },
  'dark-instagram-mood': {
    hero: unsplash('1516575155135-3854a95ccf40', 1200),
    before: unsplash('1449824913935-59a10b8d2000', 1200),
    after: unsplash('1516575155135-3854a95ccf40', 1200),
    gallery: [
      unsplash('1492562080023-ab3db95bfbce', 800),
      unsplash('1500917293891-ef795e70e1f6', 800),
      unsplash('1517841905240-472988babdf9', 800),
    ],
  },
  'clean-creator-economy': {
    hero: unsplash('1522202176988-66273c2fd55f', 1200),
    before: unsplash('1522202176988-66273c2fd55f', 1200),
    after: unsplash('1522202176988-66273c2fd55f', 1200),
    gallery: [
      unsplash('1517245386807-b43e861dc63e', 800),
      unsplash('1531498867512-7c9943265b0c', 800),
      unsplash('1552664730-d307ca884978', 800),
    ],
  },
  'music-video-looks': {
    hero: unsplash('1493225255756-d9584f8606e8', 1200),
    before: unsplash('1501281668745-7e8a5b5e6a67', 1200),
    after: unsplash('1493225255756-d9584f8606e8', 1200),
    gallery: [
      unsplash('1459749411177-047381bb3ece', 800),
      unsplash('1501386761578-eac5c94b800a', 800),
      unsplash('1493225255756-d9584f8606e8', 800),
    ],
  },
  'commercial-luxury': {
    hero: unsplash('1441986300917-64674bd600d8', 1200),
    before: unsplash('1441986300917-64674bd600d8', 1200),
    after: unsplash('1441986300917-64674bd600d8', 1200),
    gallery: [
      unsplash('1504198458649-3128b932f49e', 800),
      unsplash('1483985988355-763728e1935b', 800),
      unsplash('1492703943679-904e28357202', 800),
    ],
  },
  'netflix-inspired': {
    hero: unsplash('1536440136628-849c177e76a1', 1200),
    before: unsplash('1478720568477-152d9b164e26', 1200),
    after: unsplash('1536440136628-849c177e76a1', 1200),
    gallery: [
      unsplash('1485846234645-a62644f84728', 800),
      unsplash('1518676590629-1bc610705e9f', 800),
      unsplash('1489599849927-2ee91cede3ba', 800),
    ],
  },
  'a24-inspired': {
    hero: unsplash('1518173946687-a4c8892bbd9f', 1200),
    before: unsplash('1517841905240-472988babdf9', 1200),
    after: unsplash('1518173946687-a4c8892bbd9f', 1200),
    gallery: [
      unsplash('1500462918059-b1a0cb512f1d', 800),
      unsplash('1492684223076-e4e3f9c760f5', 800),
      unsplash('1506744038136-46273834b3fb', 800),
    ],
  },
  'kodak-portra-emulation': {
    hero: unsplash('1529626455594-4ff0802cfb7e', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1529626455594-4ff0802cfb7e', 1200),
    gallery: [
      unsplash('1494790108377-be9c29b29330', 800),
      unsplash('1488426862026-3ee34a7d66df', 800),
      unsplash('1524504388940-b1c1722653e1', 800),
    ],
  },
  'fuji-400h-emulation': {
    hero: unsplash('1516534775068-ba3b9f30c709', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1516534775068-ba3b9f30c709', 1200),
    gallery: [
      unsplash('1488426862026-3ee34a7d66df', 800),
      unsplash('1523419409543-a5e549c1d3f8', 800),
      unsplash('1519741497674-611481863552', 800),
    ],
  },
  'arri-alexa-look': {
    hero: unsplash('1506794778202-cad84cf45f1d', 1200),
    before: unsplash('1534528741775-53994a69daeb', 1200),
    after: unsplash('1506794778202-cad84cf45f1d', 1200),
    gallery: [
      unsplash('1494790108377-be9c29b29330', 800),
      unsplash('1531746020798-e6953c6e8e04', 800),
      unsplash('1507003211169-0a1dd7228f2d', 800),
    ],
  },
  'cinestill-800t-emulation': {
    hero: unsplash('1519608487953-e999c86e7455', 1200),
    before: unsplash('1477959858617-67f85cf4f1df', 1200),
    after: unsplash('1519608487953-e999c86e7455', 1200),
    gallery: [
      unsplash('1555685812-4b943f3b9b71', 800),
      unsplash('1565626424178-c699f3301a3a', 800),
      unsplash('1514565131-fce0801e5785', 800),
    ],
  },
  'bleach-bypass': {
    hero: unsplash('1478760329108-5c3ed9d495a0', 1200),
    before: unsplash('1449824913935-59a10b8d2000', 1200),
    after: unsplash('1478760329108-5c3ed9d495a0', 1200),
    gallery: [
      unsplash('1518709268805-4e9042af9f23', 800),
      unsplash('1506744038136-46273834b3fb', 800),
      unsplash('1480796927426-f609979314bd', 800),
    ],
  },
  'teal-orange-modern': {
    hero: unsplash('1472214103451-9374bd1c798e', 1200),
    before: unsplash('1476514525535-07fb3b4ae5f1', 1200),
    after: unsplash('1472214103451-9374bd1c798e', 1200),
    gallery: [
      unsplash('1501785888041-af3ef285b470', 800),
      unsplash('1469474932227-de0fd223a7db', 800),
      unsplash('1470071459604-3b5ec3a7fe05', 800),
    ],
  },
};

/* ─── Category Definitions ───────────────────────────────────────── */

const categoryDefs: Omit<ProductCategory, 'productCount'>[] = [
  { id: 'luxury-editorial', name: 'Luxury Editorial', accentColor: '#D4AF37', description: 'Refined gold-infused tones for high-end fashion and luxury brand storytelling', coverImage: IMAGE_LIBRARY['luxury-editorial'].hero },
  { id: 'cinematic-shadows', name: 'Cinematic Shadows', accentColor: '#2D2D3A', description: 'Deep dramatic shadows with controlled highlight retention for narrative work', coverImage: IMAGE_LIBRARY['cinematic-shadows'].hero },
  { id: 'analog-film', name: 'Analog Film', accentColor: '#C8956C', description: 'Warm emulsion-like tones mimicking classic 35mm film stocks', coverImage: IMAGE_LIBRARY['analog-film'].hero },
  { id: 'moody-documentary', name: 'Moody Documentary', accentColor: '#4A5568', description: 'Desaturated earth tones perfect for journalistic and documentary projects', coverImage: IMAGE_LIBRARY['moody-documentary'].hero },
  { id: 'dreamy-wedding', name: 'Dreamy Wedding', accentColor: '#F7E7CE', description: 'Soft romantic pastels with creamy highlights for celebration photography', coverImage: IMAGE_LIBRARY['dreamy-wedding'].hero },
  { id: 'hyperreal-fashion', name: 'Hyperreal Fashion', accentColor: '#FF6B9D', description: 'Vivid punchy tones with enhanced saturation for editorial fashion work', coverImage: IMAGE_LIBRARY['hyperreal-fashion'].hero },
  { id: 'night-neon', name: 'Night Neon', accentColor: '#FF00FF', description: 'Electric neon-accented grades for after-dark urban cinematography', coverImage: IMAGE_LIBRARY['night-neon'].hero },
  { id: 'luxury-travel', name: 'Luxury Travel', accentColor: '#20B2AA', description: 'Rich golden-hour warmth with enhanced aqua tones for aspirational content', coverImage: IMAGE_LIBRARY['luxury-travel'].hero },
  { id: 'minimal-scandinavian', name: 'Minimal Scandinavian', accentColor: '#E8E8E8', description: 'Clean restrained tones with subtle contrast for minimalist aesthetics', coverImage: IMAGE_LIBRARY['minimal-scandinavian'].hero },
  { id: 'cyberpunk-cinema', name: 'Cyberpunk Cinema', accentColor: '#00F0FF', description: 'Electric cyan and purple tones for futuristic digital narratives', coverImage: IMAGE_LIBRARY['cyberpunk-cinema'].hero },
  { id: 'neo-noir', name: 'Neo Noir', accentColor: '#8B0000', description: 'Crushed blacks with crimson accents for modern film noir aesthetics', coverImage: IMAGE_LIBRARY['neo-noir'].hero },
  { id: 'vintage-film-lab', name: 'Vintage Film Lab', accentColor: '#DEB887', description: 'Aged photo paper tones with corner darkening and nostalgic warmth', coverImage: IMAGE_LIBRARY['vintage-film-lab'].hero },
  { id: 'high-dynamic-luxury', name: 'High Dynamic Luxury', accentColor: '#FFD700', description: 'Extreme contrast HDR grades with brilliant gold highlights', coverImage: IMAGE_LIBRARY['high-dynamic-luxury'].hero },
  { id: 'dark-instagram-mood', name: 'Dark Instagram Mood', accentColor: '#6B5B95', description: 'Desaturated purple-gray tones with subtle warm accents for social content', coverImage: IMAGE_LIBRARY['dark-instagram-mood'].hero },
  { id: 'clean-creator-economy', name: 'Clean Creator Economy', accentColor: '#00D26A', description: 'Crisp modern tones optimized for YouTube, TikTok, and platform content', coverImage: IMAGE_LIBRARY['clean-creator-economy'].hero },
  { id: 'music-video-looks', name: 'Music Video Looks', accentColor: '#9400D3', description: 'Dramatic stylized grades with bold color washes for performance visuals', coverImage: IMAGE_LIBRARY['music-video-looks'].hero },
  { id: 'commercial-luxury', name: 'Commercial Luxury', accentColor: '#B8860B', description: 'Polished bronze and amber tones for high-end product and brand films', coverImage: IMAGE_LIBRARY['commercial-luxury'].hero },
  { id: 'netflix-inspired', name: 'Netflix Inspired', accentColor: '#E50914', description: 'Streaming-platform cinematic look with deep reds and cinematic contrast', coverImage: IMAGE_LIBRARY['netflix-inspired'].hero },
  { id: 'a24-inspired', name: 'A24 Inspired', accentColor: '#708090', description: 'Indie film aesthetic with muted blue-gray tones and warm undertones', coverImage: IMAGE_LIBRARY['a24-inspired'].hero },
  { id: 'kodak-portra-emulation', name: 'Kodak Portra Emulation', accentColor: '#F4A460', description: 'Classic warm peach-to-tan color signature of iconic film stock', coverImage: IMAGE_LIBRARY['kodak-portra-emulation'].hero },
  { id: 'fuji-400h-emulation', name: 'Fuji 400H Emulation', accentColor: '#98D8C8', description: 'Soft mint-to-cream balance capturing the signature Fuji film look', coverImage: IMAGE_LIBRARY['fuji-400h-emulation'].hero },
  { id: 'arri-alexa-look', name: 'ARRI Alexa Look', accentColor: '#4682B4', description: 'Natural skin tone warmth with neutral shadows from digital cinema standard', coverImage: IMAGE_LIBRARY['arri-alexa-look'].hero },
  { id: 'cinestill-800t-emulation', name: 'CineStill 800T Emulation', accentColor: '#FF6347', description: 'Warm highlights with distinctive red halation glow of tungsten film stock', coverImage: IMAGE_LIBRARY['cinestill-800t-emulation'].hero },
  { id: 'bleach-bypass', name: 'Bleach Bypass', accentColor: '#C0C0C0', description: 'High contrast silver-gray with desaturated cool metallic tones', coverImage: IMAGE_LIBRARY['bleach-bypass'].hero },
  { id: 'teal-orange-modern', name: 'Teal & Orange Modern', accentColor: '#008080', description: 'Contemporary blockbuster grade with teal shadows and warm orange highlights', coverImage: IMAGE_LIBRARY['teal-orange-modern'].hero },
];

/* ─── Product Names by Category ──────────────────────────────────── */

const productNamesByCategory: Record<string, [string, string, string, string, string]> = {
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

/* ─── Descriptions & Creator Notes ───────────────────────────────── */

const descriptionsByCategory: Record<string, string> = {
  'luxury-editorial': 'A meticulously crafted preset that elevates skin tones into warm honey while preserving shadow detail. Designed for editorial campaigns where every frame must feel expensive. The gold infusion is subtle — never garish — creating an aspirational warmth that clients consistently request by name.',
  'cinematic-shadows': 'Deep, velvety shadows with surgical highlight control. This look draws from the lighting philosophy of Roger Deakins — letting darkness breathe while protecting every detail in the rim light. Perfect for narrative work where mood drives story.',
  'analog-film': 'The unmistakable texture of 35mm emulsion, digitally recreated. Warmth that feels lived-in, grain that feels organic, and color separation that reminds you why film still matters. This preset does not simulate film — it honors it.',
  'moody-documentary': 'Built for photographers who chase truth, not perfection. Desaturated earth tones keep your subject grounded while a gentle shadow lift ensures no moment is lost to underexposure. The grey is intentional — it lets the story speak.',
  'dreamy-wedding': 'Soft pastels meet creamy highlight roll-off for a timeless wedding aesthetic. Skin tones glow without burning. Greens turn to sage. This is the preset that makes brides cry — in the best way. Designed for natural light ceremonies and golden-hour portraits.',
  'hyperreal-fashion': 'When the brief says "make it pop" and the art director means it. Enhanced saturation with hue-specific protection for skin tones. The result is vivid without being vulgar — editorial punch that still feels premium.',
  'night-neon': 'Electric color grading for after-dark storytelling. Cyan shadows hold detail in the blacks while neon accents are amplified, not clipped. Built from reference grades of Blade Runner 2049 and Tokyo Drift.',
  'luxury-travel': 'Golden-hour warmth meets aquamarine ocean tones. This preset transforms travel content into aspirational editorial. The aqua lift is calibrated to make water look inviting without looking artificial. Paradise, graded.',
  'minimal-scandinavian': 'Restrained, clean, and quietly confident. Shadow contrast is gentle. Whites are allowed to breathe. This preset understands that minimalism is not absence — it is precision. Perfect for architecture, interior, and lifestyle work.',
  'cyberpunk-cinema': 'Electric cyan and magenta grades for futures that feel tactile, not digital. Shadow blacks are lifted for a filmic base. Neon colors are isolated and amplified. The future is not clean — it is colorful, chaotic, and cinematic.',
  'neo-noir': 'Modern noir for contemporary storytellers. Crushed blacks sit at RGB 12,12,12 — deep but not hollow. Crimson accents in the midtones create psychological tension. Rain optional. Drama guaranteed.',
  'vintage-film-lab': 'Aged photo paper tones with corner darkening that feels mechanical, not digital. The warmth is uneven — like a print left in a shoebox for decades. Nostalgia, but make it cinematic.',
  'high-dynamic-luxury': 'Extreme dynamic range with gold highlight emphasis. Shadows are deep but recoverable. Highlights bloom with controlled halation. This preset turns any sensor into a medium-format experience.',
  'dark-instagram-mood': 'The anti-filter filter. Desaturated purple-gray tones with a whisper of warmth in the skin. Shadow detail is preserved for phone screens. This is the look that gets reposted — mysterious, curated, intentional.',
  'clean-creator-economy': 'Optimized for every platform algorithm. Crisp without being clinical. Skin tones stay true under any light. Export once, post everywhere. Built from analysis of the top 100 performing creator accounts.',
  'music-video-looks': 'Dramatic stylized grades with bold color washes that cut through stage lighting. Built in collaboration with music video colorists. The blacks stay black. The colors go loud. The audience feels it.',
  'commercial-luxury': 'Polished bronze and amber tones that make products look expensive. Specular highlights are shaped, not clipped. This is the preset behind campaigns you have seen in airports and magazines.',
  'netflix-inspired': 'The streaming cinematic look — deep reds in the shadows, cinematic contrast, and a filmic base that feels premium on every screen size. Built from analysis of Netflix Original color pipelines.',
  'a24-inspired': 'Muted blue-gray tones with warm undertones that feel like memory. The indie film aesthetic that launched a generation of colorists. Soft, uncertain, beautiful. For stories that do not need to shout.',
  'kodak-portra-emulation': 'The peach-to-tan color signature that made Portra the wedding film stock of choice for two decades. Skin tones glow. Shadows warm. This is not imitation — it is resurrection.',
  'fuji-400h-emulation': 'The mint-to-cream balance that only Fuji chemistry achieved. Greens turn to jade. Skins turn to porcelain. For photographers who miss the impossible beauty of discontinued film.',
  'arri-alexa-look': 'Natural skin tone warmth with neutral shadows — the digital cinema standard that replaced film on set. This preset brings Alexa color science to still photography. Accurate. Beautiful. Professional.',
  'cinestill-800t-emulation': 'The tungsten film stock with the infamous red halation glow around highlights. Digitally recreated with physical accuracy. Night photography will never look the same. The halation is real. The magic is intact.',
  'bleach-bypass': 'High contrast silver-gray with metallic cool tones and desaturated color. The look of Fight Club, Saving Private Ryan, and 1917. Aggressive. Beautiful. Unforgettable.',
  'teal-orange-modern': 'The blockbuster grade evolved. Teal shadows hold cinematic depth. Orange highlights keep skin tones alive. The most versatile preset in the collection — it works on everything.',
};

const creatorNotesByCategory: Record<string, string> = {
  'luxury-editorial': 'I built this preset after grading a campaign for a Paris fashion house. The client wanted "expensive" — not warm, not gold, but expensive. The secret is lifting the blacks while compressing the highlights. It feels rich because it is rich in tonal information. — Marcus Chen, Lead Colorist',
  'cinematic-shadows': 'This look started as a custom grade for a short film shot on Sony FX6. The director wanted every frame to feel like a Caravaggio painting. I protected the skin at all costs and let everything else fall to shadow. — Sofia Martinez, Colorist',
  'analog-film': 'I shot 200 rolls of Kodak Gold 200 to understand what makes film feel like film. It is not the grain — it is the color separation in the shadows. This preset recreates that chemically impossible color math. — David Okafor, Film Emulation Specialist',
  'moody-documentary': 'I spent three years photographing in Lagos markets with this grade. It had to work at noon and at dusk. It had to make dirt look beautiful. The grey is calibrated to feel honest, not trendy. — David Okafor, Documentary Photographer',
  'dreamy-wedding': 'After editing 200+ weddings, I know what brides actually want: to look like themselves, but in golden hour, at every hour. The highlight rolloff here is mathematically modeled after medium format film. — Emily Nakamura, Wedding Photographer',
  'hyperreal-fashion': 'Fashion color is about decision. Every hue is a choice. This preset protects skin in LAB color space while pushing everything else to its emotional limit. Vivid, but never cheap. — Marcus Chen',
  'night-neon': 'I shot in Tokyo for three weeks, chasing neon at 2 AM. Real neon color is more cyan than blue, more magenta than pink. This preset is calibrated to real neon tubes, not Instagram filters. — Emily Nakamura',
  'luxury-travel': 'The aqua tone in this preset is based on water color reference from the Maldives at 3 PM. It is specific because travel photography should feel specific — like you were actually there. — Sofia Martinez',
  'minimal-scandinavian': 'I grew up in Oslo. This preset is how Oslo light actually feels — clean, white, slightly cold, but never sterile. The shadow lift mimics snow bounce. — Erik Lindqvist, Nordic Photographer',
  'cyberpunk-cinema': 'I analyzed the color pipelines of Akira, Ghost in the Shell, and Blade Runner 2049. The cyan is not #00FFFF — it is desaturated, green-shifted, cinematic cyan. The future should feel worn. — Kai Tanaka, Sci-Fi Colorist',
  'neo-noir': 'Noir is not black and white. Noir is blue-black shadows with red-brown midtones. I studied 40 film noir prints at the Academy archive to get the shadow color right. The red is historically accurate. — Sofia Martinez',
  'vintage-film-lab': 'I bought a 1970s Kodak printer on eBay and scanned 300 prints to measure the actual color shift of aged photo paper. This preset uses those measured LAB values. The nostalgia is scientifically accurate. — David Okafor',
  'high-dynamic-luxury': 'This preset pushes 14 stops of dynamic range into a Rec.709 container without clipping. The math is aggressive. The result looks effortless. That is the definition of luxury. — Marcus Chen',
  'dark-instagram-mood': 'I tracked the top 500 mood-board accounts for six months. This grade is the mathematical average of what performs — but elevated. Dark, but not muddy. Muted, but not dead. — Emily Nakamura',
  'clean-creator-economy': 'I tested this preset on 12 different phone screens, 3 laptops, and a TV. It looks correct everywhere because the color is calibrated to sRGB primaries with controlled saturation. Platform-agnostic by design. — Kai Tanaka',
  'music-video-looks': 'Built in DaVinci Resolve, ported to Lightroom. The color washes are HSL-specific — red stays red, blue goes cyan. It survives compression because the hue separation is deliberate. — Marcus Chen',
  'commercial-luxury': 'Product photography is about material truth. This preset makes metal look metallic, glass look transparent, and leather look expensive. The bronze tone is calibrated to tungsten product lighting. — Sofia Martinez',
  'netflix-inspired': 'I reverse-engineered the Netflix HDR mastering guidelines. The reds are deeper than standard because streaming compression benefits from saturated primaries. It looks cinematic because it follows broadcast science. — Kai Tanaka',
  'a24-inspired': 'The A24 look is not a look — it is a feeling of uncertainty. The blue-grey is desaturated 40% from neutral. The warmth is in the gamma, not the gain. It feels like memory because it is mathematically imprecise. — Sofia Martinez',
  'kodak-portra-emulation': 'I measured Portra 400 on an X-Rite ColorChecker under 5500K light. The peach shift in the skin is +12 a* and +8 b* in LAB space. This preset uses those exact values. It is Portra because the numbers say so. — David Okafor',
  'fuji-400h-emulation': 'Fuji 400H was discontinued in 2014. I bought 100 rolls from eBay and processed them immediately. The mint shift is real — it is not a filter, it is a chemical property of Fuji chemistry. — David Okafor',
  'arri-alexa-look': 'ARRI color science is based on spectral sensitivity curves, not creative choice. This preset uses the same matrix coefficients as Alexa Wide Gamut. It is accurate because ARRI is accurate. — Marcus Chen',
  'cinestill-800t-emulation': 'The red halation in CineStill is caused by the remjet backing being removed. I modeled the light scatter physics in Nuke and baked the kernel into this preset. The halation behaves like real optics. — Kai Tanaka',
  'bleach-bypass': 'I studied the bleach bypass process at Fotokem lab. The silver retention creates a specific luminance curve — not contrast, but luminance-dependent saturation loss. This preset recreates that curve exactly. — Marcus Chen',
  'teal-orange-modern': 'This is the most-tested preset in the collection. It works on portraits, landscapes, interiors, and products because the teal is hue-shifted blue (not cyan) and the orange is hue-shifted red (not yellow). Universal by design. — Marcus Chen',
};

/* ─── Pricing & Badges ───────────────────────────────────────────── */

const basePrices: Record<string, number> = {
  'luxury-editorial': 59,
  'cinematic-shadows': 49,
  'analog-film': 49,
  'moody-documentary': 39,
  'dreamy-wedding': 59,
  'hyperreal-fashion': 49,
  'night-neon': 49,
  'luxury-travel': 49,
  'minimal-scandinavian': 39,
  'cyberpunk-cinema': 49,
  'neo-noir': 49,
  'vintage-film-lab': 49,
  'high-dynamic-luxury': 59,
  'dark-instagram-mood': 39,
  'clean-creator-economy': 39,
  'music-video-looks': 49,
  'commercial-luxury': 59,
  'netflix-inspired': 49,
  'a24-inspired': 49,
  'kodak-portra-emulation': 59,
  'fuji-400h-emulation': 59,
  'arri-alexa-look': 59,
  'cinestill-800t-emulation': 59,
  'bleach-bypass': 49,
  'teal-orange-modern': 49,
};

const categoryBadges: Record<string, ProductBadge> = {
  'luxury-editorial': 'Bestseller',
  'dreamy-wedding': 'Bestseller',
  'kodak-portra-emulation': 'Bestseller',
  'teal-orange-modern': 'Staff Pick',
  'cinestill-800t-emulation': 'New',
  'a24-inspired': 'Staff Pick',
  'cyberpunk-cinema': 'New',
  'neo-noir': 'Limited',
  'arri-alexa-look': 'Staff Pick',
  'bleach-bypass': 'Limited',
};

/* ─── Build Products ─────────────────────────────────────────────── */

const ALL_COMPATIBILITY = [
  'Adobe Lightroom Classic',
  'Adobe Lightroom CC',
  'Adobe Camera Raw',
  'Adobe Photoshop',
  'Premiere Pro',
  'DaVinci Resolve',
  'Final Cut Pro',
  'Capture One',
  'LumaFusion',
  'Affinity Photo',
];

const ALL_INCLUDED_FILES = [
  '1x Desktop .XMP Preset',
  '1x Mobile .DNG Preset',
  '1x .CUBE 33x33x33 LUT',
  '1x .CUBE 65x65x65 LUT',
  'Installation Guide PDF',
];

const moods = ['Warm', 'Cool', 'Neutral', 'Vibrant', 'Muted', 'Dramatic', 'Soft', 'Vintage'];
const formats: ProductFormat[] = ['XMP', 'CUBE'];

function buildProducts(): Product[] {
  const products: Product[] = [];

  categoryDefs.forEach((cat) => {
    const names = productNamesByCategory[cat.id];
    const images = IMAGE_LIBRARY[cat.id];
    const basePrice = basePrices[cat.id] ?? 49;
    const badge = categoryBadges[cat.id] ?? null;

    names.forEach((name, idx) => {
      const format = formats[idx % 2];
      const mood = moods[idx % moods.length];
      const isOnSale = idx === 1;
      const comparePrice = isOnSale ? Math.round(basePrice * 1.4) : null;

      const gallery = [
        images.gallery[idx % images.gallery.length],
        images.gallery[(idx + 1) % images.gallery.length],
        images.gallery[(idx + 2) % images.gallery.length],
      ];

      const product: Product = {
        id: `${cat.id}-${idx + 1}`,
        name,
        format,
        category: cat.name,
        categoryId: cat.id,
        shortDescription: descriptionsByCategory[cat.id].slice(0, 120) + '...',
        description: descriptionsByCategory[cat.id],
        creatorNotes: creatorNotesByCategory[cat.id],
        price: basePrice,
        compareAtPrice: comparePrice,
        isOnSale,
        compatibility: ALL_COMPATIBILITY,
        includedFiles: format === 'XMP'
          ? [ALL_INCLUDED_FILES[0], ALL_INCLUDED_FILES[1], ALL_INCLUDED_FILES[4]]
          : [ALL_INCLUDED_FILES[2], ALL_INCLUDED_FILES[3], ALL_INCLUDED_FILES[4]],
        tags: [cat.name, mood, format, 'Premium'],
        mood,
        params: `Exposure ${['+0.35', '-0.15', '+0.20', '-0.05', '+0.45'][idx]}, Contrast +${[12, 22, 8, 28, 15][idx]}, Saturation ${['+8', '-12', '+3', '-5', '+15'][idx]}, Shadows +${[25, 10, 35, -15, 20][idx]}, Highlights -${[15, 30, 10, 25, 20][idx]}`,
        heroImage: images.hero,
        beforeImage: images.before,
        afterImage: images.after,
        galleryImages: gallery,
        thumbnail: images.hero,
        badge,
        releaseDate: ['2024-01', '2024-03', '2024-06', '2024-09', '2024-11'][idx],
      };

      products.push(product);
    });
  });

  return products;
}

/* ─── Exports ────────────────────────────────────────────────────── */

export const allProducts = buildProducts();

export const productCategories: ProductCategory[] = categoryDefs.map((cat) => ({
  ...cat,
  productCount: allProducts.filter((p) => p.categoryId === cat.id).length,
}));

export const getProductById = (id: string): Product | undefined =>
  allProducts.find((p) => p.id === id);

export const getProductsByCategory = (categoryId: string): Product[] =>
  allProducts.filter((p) => p.categoryId === categoryId);

export const getProductsByFormat = (format: ProductFormat | 'all'): Product[] => {
  if (format === 'all') return allProducts;
  return allProducts.filter((p) => p.format === format);
};

export const getCategoryById = (categoryId: string): ProductCategory | undefined =>
  productCategories.find((c) => c.id === categoryId);

export const getFeaturedProducts = (count = 6): Product[] => {
  const featured = allProducts.filter(
    (p) => p.badge === 'Bestseller' || p.badge === 'Staff Pick'
  );
  return featured.slice(0, count);
};

export const getRelatedProducts = (productId: string, count = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== productId)
    .slice(0, count);
};

/* ─── Backward compatibility exports ─────────────────────────────── */

export type { Product as Preset };
export type { ProductFormat as PresetFormat };

export const categories = productCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  accentColor: cat.accentColor,
  description: cat.description,
  presets: allProducts.filter((p) => p.categoryId === cat.id),
}));

export const allPresets = allProducts;

export const getPresetsByFormat = getProductsByFormat;
export const getPresetsByCategory = getProductsByCategory;
export const getPresetById = getProductById;
