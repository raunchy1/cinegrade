// Mock data for the Dashboard page

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: 'Starter' | 'Pro' | 'Studio';
  planBadge: string;
}

export interface StatItem {
  label: string;
  value: number | string;
  icon: string;
}

export interface PresetItem {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  format: 'XMP' | 'CUBE';
  dateDownloaded: string;
  fileSize: string;
  favorited: boolean;
  imageUrl: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: 'download' | 'favorite' | 'preview' | 'ai_query' | 'purchase';
}

export interface SyncDevice {
  name: string;
  type: 'desktop' | 'mobile';
  lastActive: string;
  isActive: boolean;
}

export const userProfile: UserProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@filmmail.com',
  avatar: '',
  plan: 'Pro',
  planBadge: 'Pro Plan',
};

export const statsData = {
  totalDownloads: 47,
  presetsUsed: 23,
  favorites: 12,
  daysActive: 89,
};

export const quickStats: StatItem[] = [
  { label: 'Downloads', value: 47, icon: 'Download' },
  { label: 'Presets Used', value: 23, icon: 'SlidersHorizontal' },
  { label: 'Favorites', value: 12, icon: 'Heart' },
  { label: 'Days Active', value: 89, icon: 'Calendar' },
];

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    action: 'Downloaded "Nocturne Lux"',
    detail: 'Luxury Editorial \u00b7 XMP',
    timestamp: '2 hours ago',
    type: 'download',
  },
  {
    id: '2',
    action: 'Previewed "Cyber Glow"',
    detail: 'Cyberpunk Cinema',
    timestamp: 'Yesterday',
    type: 'preview',
  },
  {
    id: '3',
    action: 'Favorited "Portra 400"',
    detail: 'Kodak Portra Emulation \u00b7 XMP',
    timestamp: '3 days ago',
    type: 'favorite',
  },
  {
    id: '4',
    action: 'Downloaded "Teal Orange Pro 03"',
    detail: 'Teal & Orange Modern \u00b7 CUBE',
    timestamp: '4 days ago',
    type: 'download',
  },
  {
    id: '5',
    action: 'Used AI Assistant',
    detail: '"Moody fashion editorial" \u00b7 8 matches found',
    timestamp: '5 days ago',
    type: 'ai_query',
  },
  {
    id: '6',
    action: 'Previewed "A24 Desaturated 01"',
    detail: 'A24 Inspired',
    timestamp: '1 week ago',
    type: 'preview',
  },
  {
    id: '7',
    action: 'Purchased Pro Plan',
    detail: 'Lifetime access activated',
    timestamp: '2 weeks ago',
    type: 'purchase',
  },
];

export const downloadedPresets: PresetItem[] = [
  {
    id: 'p1',
    name: 'Nocturne Lux',
    category: 'Luxury Editorial',
    categoryColor: '#D4AF37',
    format: 'XMP',
    dateDownloaded: 'Jan 15, 2025',
    fileSize: '128 KB',
    favorited: true,
    imageUrl: '',
  },
  {
    id: 'p2',
    name: 'Cyber Glow',
    category: 'Cyberpunk Cinema',
    categoryColor: '#00F0FF',
    format: 'CUBE',
    dateDownloaded: 'Jan 14, 2025',
    fileSize: '256 KB',
    favorited: false,
    imageUrl: '',
  },
  {
    id: 'p3',
    name: 'Portra 400',
    category: 'Kodak Portra Emulation',
    categoryColor: '#F4A460',
    format: 'XMP',
    dateDownloaded: 'Jan 12, 2025',
    fileSize: '112 KB',
    favorited: true,
    imageUrl: '',
  },
  {
    id: 'p4',
    name: 'Teal Orange Pro 03',
    category: 'Teal & Orange Modern',
    categoryColor: '#008080',
    format: 'CUBE',
    dateDownloaded: 'Jan 11, 2025',
    fileSize: '312 KB',
    favorited: true,
    imageUrl: '',
  },
  {
    id: 'p5',
    name: 'Golden Editorial 01',
    category: 'Luxury Editorial',
    categoryColor: '#D4AF37',
    format: 'XMP',
    dateDownloaded: 'Jan 10, 2025',
    fileSize: '124 KB',
    favorited: false,
    imageUrl: '',
  },
  {
    id: 'p6',
    name: 'Neon Dreams 04',
    category: 'Night Neon',
    categoryColor: '#FF00FF',
    format: 'CUBE',
    dateDownloaded: 'Jan 9, 2025',
    fileSize: '240 KB',
    favorited: false,
    imageUrl: '',
  },
  {
    id: 'p7',
    name: 'Wedding Soft 05',
    category: 'Dreamy Wedding',
    categoryColor: '#F7E7CE',
    format: 'XMP',
    dateDownloaded: 'Jan 8, 2025',
    fileSize: '96 KB',
    favorited: true,
    imageUrl: '',
  },
  {
    id: 'p8',
    name: 'Neo Noir Shadow',
    category: 'Neo Noir',
    categoryColor: '#8B0000',
    format: 'CUBE',
    dateDownloaded: 'Jan 6, 2025',
    fileSize: '288 KB',
    favorited: false,
    imageUrl: '',
  },
];

export const favoritedPresets: PresetItem[] = downloadedPresets.filter((p) => p.favorited);

export const syncDevices: SyncDevice[] = [
  { name: 'MacBook Pro', type: 'desktop', lastActive: 'Active now', isActive: true },
  { name: 'iPhone 15 Pro', type: 'mobile', lastActive: '10 min ago', isActive: true },
  { name: 'iMac Studio', type: 'desktop', lastActive: '2 hours ago', isActive: false },
];

export const categories = [
  'All',
  'Luxury Editorial',
  'Cyberpunk Cinema',
  'Kodak Portra Emulation',
  'Teal & Orange Modern',
  'Night Neon',
  'Dreamy Wedding',
  'Neo Noir',
  'A24 Inspired',
  'Analog Film',
];
