import { Link } from 'react-router-dom';
import { Camera, Clapperboard, BookOpen, Mail } from 'lucide-react';

const productLinks = [
  { label: 'Library', path: '/library' },
  { label: 'Preview', path: '/preview' },
  { label: 'AI Assistant', path: '/assistant' },
  { label: 'Pricing', path: '/pricing' },
];

const resourceLinks = [
  { label: 'Blog', path: '#' },
  { label: 'Tutorials', path: '#' },
  { label: 'Support', path: '#' },
  { label: 'Changelog', path: '#' },
];

const companyLinks = [
  { label: 'About', path: '#' },
  { label: 'Careers', path: '#' },
  { label: 'Contact', path: '#' },
  { label: 'Terms', path: '#' },
];

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#0A0A0F]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Logo + tagline */}
          <div>
            <Link to="/" className="flex items-center gap-0 mb-4">
              <span className="font-display font-bold text-[18px] text-white tracking-tight">
                CINEGRADE
              </span>
              <span className="font-display font-bold text-[18px] text-[#D4AF37] tracking-tight">
                LAB
              </span>
            </Link>
            <p className="font-body text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Premium color tools for creators
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Camera size={18} />
              </a>
              <a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Clapperboard size={18} />
              </a>
              <a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <BookOpen size={18} />
              </a>
              <a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="font-display font-semibold text-[14px] text-white mb-5 uppercase tracking-wider">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-200 hover:text-[#D4AF37]"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="font-display font-semibold text-[14px] text-white mb-5 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-200 hover:text-[#D4AF37]"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="font-display font-semibold text-[14px] text-white mb-5 uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-200 hover:text-[#D4AF37]"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} CINEGRADE LAB. All rights reserved.
          </p>
          <p className="font-body text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Made for creators
          </p>
        </div>
      </div>
    </footer>
  );
}
