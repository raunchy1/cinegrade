import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Heart,
  Download,
  Clock,
  Settings,
  Crown,
  ChevronLeft,
  ChevronRight,
  CloudCheck,
  Sparkles,
  Calendar,
  Eye,
  CreditCard,
  Mail,
  Bell,
  AlertTriangle,
  Search,
} from 'lucide-react';
import {
  userProfile,
  statsData,
  recentActivity,
  downloadedPresets,
  favoritedPresets,
  categories,
} from '../data/dashboardData';
import type { ActivityItem, PresetItem } from '../data/dashboardData';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Sidebar nav items ─── */
const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'mypresets', label: 'My Presets', icon: SlidersHorizontal },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'activity', label: 'Activity', icon: Clock },
  { id: 'settings', label: 'Settings', icon: Settings },
];

/* ─── Activity icon helper ─── */
function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  const map = {
    download: Download,
    favorite: Heart,
    preview: Eye,
    ai_query: Sparkles,
    purchase: CreditCard,
  };
  const Icon = map[type];
  const colors: Record<ActivityItem['type'], string> = {
    download: '#D4AF37',
    favorite: '#FF6B6B',
    preview: '#3A86FF',
    ai_query: '#D4AF37',
    purchase: '#00D26A',
  };
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <Icon size={14} style={{ color: colors[type] }} />
    </div>
  );
}

/* ─── Preset Card ─── */
function PresetCard({ preset, actions }: { preset: PresetItem; actions?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      className="glass-card overflow-hidden group"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06))' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <SlidersHorizontal size={32} className="text-[rgba(255,255,255,0.08)]" />
        </div>
        {/* Format badge */}
        <span
          className="absolute top-3 right-3 font-mono font-medium text-[11px] px-2 py-1 rounded"
          style={{
            color: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(10,10,15,0.6)',
          }}
        >
          {preset.format}
        </span>
        {/* Favorite heart */}
        {preset.favorited && (
          <div className="absolute top-3 left-3">
            <Heart size={16} className="text-[#FF6B6B]" fill="#FF6B6B" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[rgba(10,10,15,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button className="px-3 py-1.5 rounded-md bg-[rgba(255,255,255,0.1)] text-white font-body text-[12px] font-medium hover:bg-[rgba(255,255,255,0.2)] transition-colors">
            Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-display font-medium text-[16px] text-white truncate">{preset.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-sm" style={{ background: preset.categoryColor }} />
          <span className="font-body text-[13px]" style={{ color: preset.categoryColor }}>
            {preset.category}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-[12px] text-[rgba(255,255,255,0.3)] tracking-[0.04em]">
            {preset.fileSize}
          </span>
          <span className="font-mono text-[12px] text-[rgba(255,255,255,0.3)] tracking-[0.04em]">
            {preset.dateDownloaded}
          </span>
        </div>
        {actions && <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">{actions}</div>}
      </div>
    </motion.div>
  );
}

/* ─── Stat Card ─── */
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo, delay }}
      className="glass-card p-5 flex items-center gap-4"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}15` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="font-display font-bold text-[28px] text-white leading-tight">{value}</p>
        <p className="font-body text-[13px] text-[rgba(255,255,255,0.5)]">{label}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Dashboard ─── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [presetFilter, setPresetFilter] = useState('All');
  const [presetSort, setPresetSort] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  /* Filtered presets */
  const filteredPresets = downloadedPresets
    .filter((p) => {
      const matchCategory = presetFilter === 'All' || p.category === presetFilter;
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (presetSort === 'name') return a.name.localeCompare(b.name);
      if (presetSort === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const filteredFavorites = favoritedPresets
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0F] pt-[72px] flex">
      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="fixed top-[72px] left-0 bottom-0 z-50 w-[280px] bg-[#0A0A0F] border-r border-[rgba(255,255,255,0.06)] lg:hidden overflow-y-auto"
            >
              <MobileSidebarContent activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setMobileSidebarOpen(false); }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop Sidebar ── */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="hidden lg:flex flex-col shrink-0 border-r border-[rgba(255,255,255,0.06)] bg-[#0A0A0F] transition-all duration-300"
        style={{ width: sidebarOpen ? 260 : 72 }}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#1A1A24] border border-[rgba(255,255,255,0.08)] flex items-center justify-center cursor-pointer hover:border-[rgba(255,255,255,0.15)] transition-colors z-10"
        >
          {sidebarOpen ? <ChevronLeft size={12} className="text-[rgba(255,255,255,0.5)]" /> : <ChevronRight size={12} className="text-[rgba(255,255,255,0.5)]" />}
        </button>

        {/* User section */}
        <div className="p-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #D4AF37)' }}>
              <span className="font-display font-bold text-[14px] text-[#0A0A0F]">
                {userProfile.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="font-body font-medium text-[14px] text-white truncate">{userProfile.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Crown size={12} className="text-[#D4AF37]" />
                    <span className="font-body text-[12px] text-[#D4AF37]">{userProfile.planBadge}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <Icon size={20} className="shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-body font-medium text-[14px] whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* Bottom sync status */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 border-t border-[rgba(255,255,255,0.06)]"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <CloudCheck size={16} className="text-[#00D26A]" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00D26A]" />
                </div>
                <span className="font-body text-[13px] text-[#00D26A]">Synced</span>
                <span className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] ml-auto">2m ago</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <LayoutDashboard size={18} className="text-[rgba(255,255,255,0.7)]" />
          </button>
          <div>
            <h1 className="font-display font-semibold text-[16px] text-white">Dashboard</h1>
            <p className="font-body text-[12px] text-[rgba(255,255,255,0.4)]">{userProfile.name} &middot; {userProfile.planBadge}</p>
          </div>
        </div>

        {/* Tabbed content */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="h-full">
          {/* ── Top tab bar (mobile + desktop) ── */}
          <div className="sticky top-[72px] z-30 bg-[rgba(10,10,15,0.95)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)] overflow-x-auto">
            <div className="flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Tabs.Trigger
                    key={item.id}
                    value={item.id}
                    className="relative flex items-center gap-2 px-5 py-4 font-body font-medium text-[14px] transition-colors duration-200 cursor-pointer shrink-0"
                    style={{
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                      borderBottom: isActive ? '2px solid #D4AF37' : '2px solid transparent',
                      background: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                    }}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Tabs.Trigger>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* ── Overview Tab ── */}
            <Tabs.Content value="overview" className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                {/* Welcome */}
                <div className="mb-8">
                  <h2 className="font-display font-semibold text-white" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                    Welcome back, {userProfile.name.split(' ')[0]}
                  </h2>
                  <p className="font-body text-[15px] text-[rgba(255,255,255,0.5)] mt-1">
                    Here's what's happening with your creative toolkit.
                  </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                  <StatCard label="Total Downloads" value={statsData.totalDownloads} icon={Download} color="#D4AF37" delay={0} />
                  <StatCard label="Presets Used" value={statsData.presetsUsed} icon={SlidersHorizontal} color="#3A86FF" delay={0.08} />
                  <StatCard label="Favorites" value={statsData.favorites} icon={Heart} color="#FF6B6B" delay={0.16} />
                  <StatCard label="Days Active" value={statsData.daysActive} icon={Calendar} color="#00D26A" delay={0.24} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Recent activity */}
                  <div className="xl:col-span-2 glass-card p-6">
                    <h3 className="font-display font-semibold text-[18px] text-white mb-5">Recent Activity</h3>
                    <div className="relative pl-4">
                      {/* Timeline line */}
                      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.08)]" />
                      {recentActivity.slice(0, 5).map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
                          className="relative flex items-start gap-4 pb-5 last:pb-0"
                        >
                          {/* Dot */}
                          <div className="absolute left-[-11px] top-4 w-[10px] h-[10px] rounded-full bg-[#D4AF37] ring-4 ring-[#0A0A0F]" />
                          <div className="ml-6 flex items-start gap-3">
                            <ActivityIcon type={item.type} />
                            <div>
                              <p className="font-body font-medium text-[14px] text-white">{item.action}</p>
                              <p className="font-body text-[13px] text-[rgba(255,255,255,0.5)] mt-0.5">{item.detail}</p>
                              <p className="font-mono text-[12px] text-[rgba(255,255,255,0.3)] mt-1 tracking-[0.04em]">{item.timestamp}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-[18px] text-white mb-5">Quick Actions</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Browse Library', icon: SlidersHorizontal, desc: 'Discover new presets', color: '#D4AF37' },
                        { label: 'Try AI Assistant', icon: Sparkles, desc: 'Find the perfect look', color: '#3A86FF' },
                        { label: 'View Preview', icon: Eye, desc: 'Compare before/after', color: '#00D26A' },
                      ].map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.label}
                            className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-pointer text-left hover:bg-[rgba(255,255,255,0.03)]"
                            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${action.color}15` }}
                            >
                              <Icon size={18} style={{ color: action.color }} />
                            </div>
                            <div>
                              <p className="font-body font-medium text-[14px] text-white">{action.label}</p>
                              <p className="font-body text-[12px] text-[rgba(255,255,255,0.4)] mt-0.5">{action.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Storage mini card */}
                    <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-body font-medium text-[14px] text-white">Storage</span>
                        <span className="font-mono text-[12px] text-[rgba(255,255,255,0.5)]">1.2 GB / 5 GB</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '24%' }}
                          transition={{ duration: 1, ease: easeOutExpo, delay: 0.5 }}
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #D4AF37, #FF6B35)' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tabs.Content>

            {/* ── My Presets Tab ── */}
            <Tabs.Content value="mypresets" className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                {/* Header with filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="font-display font-semibold text-[20px] text-white">
                    My Presets
                    <span className="ml-2 font-mono text-[14px] text-[rgba(255,255,255,0.4)]">({filteredPresets.length})</span>
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)]" />
                      <input
                        type="text"
                        placeholder="Search presets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-lg font-body text-[13px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.2)]"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    {/* Sort */}
                    <select
                      value={presetSort}
                      onChange={(e) => setPresetSort(e.target.value)}
                      className="px-3 py-2 rounded-lg font-body text-[13px] text-white outline-none cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="recent">Recently Used</option>
                      <option value="name">Name</option>
                      <option value="category">Category</option>
                    </select>
                  </div>
                </div>

                {/* Category filter pills */}
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPresetFilter(cat)}
                      className="px-4 py-2 rounded-full font-body text-[13px] font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        background: presetFilter === cat ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
                        color: presetFilter === cat ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                        border: presetFilter === cat ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Presets grid */}
                {filteredPresets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {filteredPresets.map((preset, i) => (
                      <motion.div
                        key={preset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.04 }}
                      >
                        <PresetCard
                          preset={preset}
                          actions={
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 font-body text-[12px] text-[rgba(255,255,255,0.5)] hover:text-[#D4AF37] transition-colors cursor-pointer">
                                <Download size={12} /> Re-download
                              </button>
                            </div>
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={SlidersHorizontal} title="No presets found" subtitle="Try adjusting your filters or search query." />
                )}
              </motion.div>
            </Tabs.Content>

            {/* ── Favorites Tab ── */}
            <Tabs.Content value="favorites" className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="font-display font-semibold text-[20px] text-white">
                    Your Favorites
                    <span className="ml-2 font-mono text-[14px] text-[rgba(255,255,255,0.4)]">({filteredFavorites.length})</span>
                  </h3>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)]" />
                    <input
                      type="text"
                      placeholder="Search favorites..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-lg font-body text-[13px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.2)]"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>

                {filteredFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {filteredFavorites.map((preset, i) => (
                      <motion.div
                        key={preset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.04 }}
                      >
                        <PresetCard
                          preset={preset}
                          actions={
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 font-body text-[12px] text-[rgba(255,255,255,0.5)] hover:text-[#D4AF37] transition-colors cursor-pointer">
                                <Eye size={12} /> Preview
                              </button>
                              <button className="flex items-center gap-1 font-body text-[12px] text-[rgba(255,100,100,0.7)] hover:text-[#FF6464] transition-colors cursor-pointer">
                                <Heart size={12} fill="currentColor" /> Remove
                              </button>
                            </div>
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={Heart} title="No favorites yet" subtitle="Heart presets you love to save them here for quick access." />
                )}
              </motion.div>
            </Tabs.Content>

            {/* ── Downloads Tab ── */}
            <Tabs.Content value="downloads" className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-[20px] text-white">
                    Downloads
                    <span className="ml-2 font-mono text-[14px] text-[rgba(255,255,255,0.4)]">({downloadedPresets.length})</span>
                  </h3>
                </div>

                <div className="glass-card overflow-hidden">
                  {/* Table header */}
                  <div className="hidden sm:grid grid-cols-[1fr_140px_80px_120px_80px_100px] gap-4 px-5 py-3 border-b border-[rgba(255,255,255,0.06)] font-body font-semibold text-[13px] text-[rgba(255,255,255,0.5)]">
                    <span>Preset</span>
                    <span>Category</span>
                    <span>Format</span>
                    <span>Date</span>
                    <span>Size</span>
                    <span className="text-right">Action</span>
                  </div>

                  {/* Table rows */}
                  {downloadedPresets.map((preset, i) => (
                    <motion.div
                      key={preset.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_140px_80px_120px_80px_100px] gap-2 sm:gap-4 px-5 py-4 border-b border-[rgba(255,255,255,0.04)] items-center hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <SlidersHorizontal size={14} className="text-[rgba(255,255,255,0.3)]" />
                        </div>
                        <span className="font-body font-medium text-[14px] text-white">{preset.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm" style={{ background: preset.categoryColor }} />
                        <span className="font-body text-[13px]" style={{ color: preset.categoryColor }}>{preset.category}</span>
                      </div>
                      <span
                        className="font-mono font-medium text-[11px] px-2 py-1 rounded inline-block w-fit"
                        style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        {preset.format}
                      </span>
                      <span className="font-mono text-[12px] text-[rgba(255,255,255,0.4)] tracking-[0.04em]">{preset.dateDownloaded}</span>
                      <span className="font-mono text-[12px] text-[rgba(255,255,255,0.4)] tracking-[0.04em]">{preset.fileSize}</span>
                      <div className="flex justify-end">
                        <button className="flex items-center gap-1 font-body text-[12px] text-[rgba(255,255,255,0.5)] hover:text-[#D4AF37] transition-colors cursor-pointer">
                          <Download size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Tabs.Content>

            {/* ── Activity Tab ── */}
            <Tabs.Content value="activity" className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <h3 className="font-display font-semibold text-[20px] text-white mb-6">Recent Activity</h3>
                <div className="glass-card p-6">
                  <div className="relative pl-4">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.08)]" />
                    {recentActivity.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
                        className="relative flex items-start gap-4 pb-6 last:pb-0"
                      >
                        <div className="absolute left-[-11px] top-4 w-[10px] h-[10px] rounded-full bg-[#D4AF37] ring-4 ring-[#0A0A0F]" />
                        <div className="ml-6 flex items-start gap-3">
                          <ActivityIcon type={item.type} />
                          <div>
                            <p className="font-body font-medium text-[14px] text-white">{item.action}</p>
                            <p className="font-body text-[13px] text-[rgba(255,255,255,0.5)] mt-0.5">{item.detail}</p>
                            <p className="font-mono text-[12px] text-[rgba(255,255,255,0.3)] mt-1 tracking-[0.04em]">{item.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tabs.Content>

            {/* ── Settings Tab ── */}
            <Tabs.Content value="settings" className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="max-w-[800px]"
              >
                <h3 className="font-display font-semibold text-[20px] text-white mb-6">Settings</h3>

                {/* Profile */}
                <div className="glass-card p-6 mb-6">
                  <h4 className="font-display font-semibold text-[16px] text-white mb-5">Profile</h4>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #D4AF37)' }}>
                      <span className="font-display font-bold text-[22px] text-[#0A0A0F]">
                        {userProfile.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[18px] text-white">{userProfile.name}</p>
                      <p className="font-body text-[14px] text-[rgba(255,255,255,0.5)] flex items-center gap-1.5">
                        <Mail size={14} /> {userProfile.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-[13px] text-[rgba(255,255,255,0.5)] mb-1.5">Display Name</label>
                      <input
                        type="text"
                        defaultValue={userProfile.name}
                        className="w-full px-4 py-2.5 rounded-lg font-body text-[14px] text-white outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.2)]"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <div>
                      <label className="block font-body text-[13px] text-[rgba(255,255,255,0.5)] mb-1.5">Email</label>
                      <input
                        type="email"
                        defaultValue={userProfile.email}
                        className="w-full px-4 py-2.5 rounded-lg font-body text-[14px] text-white outline-none focus:ring-2 focus:ring-[rgba(212,175,55,0.2)]"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Plan */}
                <div className="glass-card p-6 mb-6">
                  <h4 className="font-display font-semibold text-[16px] text-white mb-4">Plan</h4>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)' }}>
                        <Crown size={18} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="font-body font-medium text-[14px] text-white">{userProfile.planBadge}</p>
                        <p className="font-body text-[13px] text-[rgba(255,255,255,0.5)]">Billed monthly</p>
                      </div>
                    </div>
                    <button className="btn-primary text-[13px] py-2.5 px-5">Upgrade Plan</button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="glass-card p-6 mb-6">
                  <h4 className="font-display font-semibold text-[16px] text-white mb-4">Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell size={18} className="text-[rgba(255,255,255,0.5)]" />
                        <div>
                          <p className="font-body font-medium text-[14px] text-white">Notifications</p>
                          <p className="font-body text-[12px] text-[rgba(255,255,255,0.4)]">Get notified about new presets and updates</p>
                        </div>
                      </div>
                      <ToggleSwitch defaultChecked />
                    </div>
                    <div className="h-px bg-[rgba(255,255,255,0.06)]" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Download size={18} className="text-[rgba(255,255,255,0.5)]" />
                        <div>
                          <p className="font-body font-medium text-[14px] text-white">Default Format</p>
                          <p className="font-body text-[12px] text-[rgba(255,255,255,0.4)]">Preferred download format</p>
                        </div>
                      </div>
                      <select
                        className="px-3 py-2 rounded-lg font-body text-[13px] text-white outline-none cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <option>XMP (Lightroom)</option>
                        <option>CUBE (LUT)</option>
                        <option>Both</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="glass-card p-6" style={{ border: '1px solid rgba(255,100,100,0.15)' }}>
                  <h4 className="font-display font-semibold text-[16px] text-[#FF6464] mb-4 flex items-center gap-2">
                    <AlertTriangle size={18} /> Danger Zone
                  </h4>
                  <p className="font-body text-[14px] text-[rgba(255,255,255,0.5)] mb-4">
                    Once you delete your account, there is no going back. All your data will be permanently removed.
                  </p>
                  <button className="px-5 py-2.5 rounded-lg font-body font-medium text-[14px] text-[#FF6464] transition-all duration-200 cursor-pointer hover:bg-[rgba(255,100,100,0.1)]"
                    style={{ border: '1px solid rgba(255,100,100,0.3)' }}
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </main>
    </div>
  );
}

/* ─── Mobile sidebar content ─── */
function MobileSidebarContent({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* User section */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #D4AF37)' }}>
            <span className="font-display font-bold text-[14px] text-[#0A0A0F]">
              {userProfile.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-body font-medium text-[14px] text-white">{userProfile.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Crown size={12} className="text-[#D4AF37]" />
              <span className="font-body text-[12px] text-[#D4AF37]">{userProfile.planBadge}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
              style={{
                background: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
                color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
              }}
            >
              <Icon size={20} />
              <span className="font-body font-medium text-[14px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ─── Empty state component ─── */
function EmptyState({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Icon size={48} className="text-[rgba(255,255,255,0.1)] mb-4" />
      <h4 className="font-display font-semibold text-[20px] text-[rgba(255,255,255,0.5)] mb-2">{title}</h4>
      <p className="font-body text-[15px] text-[rgba(255,255,255,0.3)] max-w-[360px]">{subtitle}</p>
    </div>
  );
}

/* ─── Toggle switch component ─── */
function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0"
      style={{
        background: checked ? 'linear-gradient(135deg, #FF6B35, #D4AF37)' : 'rgba(255,255,255,0.1)',
      }}
    >
      <motion.div
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white"
        animate={{ left: checked ? 24 : 3 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
    </button>
  );
}
