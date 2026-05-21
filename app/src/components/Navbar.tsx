import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Library', path: '/library' },
  { label: 'Preview', path: '/preview' },
  { label: 'AI Assistant', path: '/assistant' },
  { label: 'Pricing', path: '/pricing' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center"
        style={{
          background: isScrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transition: 'background 300ms ease',
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 shrink-0">
            <span className="font-display font-bold text-[20px] text-white tracking-tight">
              CINEGRADE
            </span>
            <span className="font-display font-bold text-[20px] text-[#D4AF37] tracking-tight">
              LAB
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body font-medium text-[14px] transition-colors duration-200"
                style={{
                  color: location.pathname === link.path ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => {
                  if (location.pathname !== link.path) {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/pricing"
              className="btn-primary text-[13px] py-[10px] px-6 rounded-[6px]"
            >
              Get Access
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-[#0A0A0F] border-l border-white/10 flex flex-col pt-[88px] px-8"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className="font-body font-medium text-[16px] transition-colors duration-200 block"
                      style={{
                        color: location.pathname === link.path ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/pricing" className="btn-primary w-full text-center">
                  Get Access
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
