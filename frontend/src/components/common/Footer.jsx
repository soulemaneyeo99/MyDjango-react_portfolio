// ========== frontend/src/components/common/Footer.jsx ==========
import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO, NAV_ITEMS } from '../../utils/constants';

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-bg-dark border-t border-border-default pt-24 pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="inline-flex items-center space-x-4 group">
              <div className="w-12 h-12 border border-primary-500/20 flex items-center justify-center group-hover:border-primary-500 transition-all duration-500 bg-bg-dark/50 overflow-hidden">
                <img
                  src="/logo.jpeg"
                  alt="Souleymane Yeo Logo"
                  className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-widest">{PERSONAL_INFO.name.toUpperCase()}</span>
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-sm font-light">
              Architecte de solutions digitales robustes. Spécialisé en ingénierie backend haute performance et interfaces frontend de précision.
            </p>

            <div className="flex space-x-4">
              {[
                { name: 'GITHUB', url: PERSONAL_INFO.social.github, icon: 'GH' },
                { name: 'LINKEDIN', url: PERSONAL_INFO.social.linkedin, icon: 'LI' },
                { name: 'WHATSAPP', url: PERSONAL_INFO.social.whatsapp, icon: 'WA' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-[10px] font-mono text-text-muted hover:border-primary-500 hover:text-primary-400 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="font-mono text-[10px] text-primary-400 uppercase tracking-[0.4em]">Navigation</h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-text-muted hover:text-white transition-colors uppercase tracking-[0.2em] font-mono text-[11px]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="font-mono text-[10px] text-primary-400 uppercase tracking-[0.4em]">Connection</h3>
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <span className="block font-mono text-[9px] text-text-muted mb-1 group-hover:text-primary-400 transition-colors">LOCATION//</span>
                <span className="text-sm text-white font-light">{PERSONAL_INFO.location}</span>
              </div>
              <div className="group cursor-pointer">
                <span className="block font-mono text-[9px] text-text-muted mb-1 group-hover:text-primary-400 transition-colors">EMAIL//</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm text-white font-light hover:text-primary-500 transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="group cursor-pointer">
                <span className="block font-mono text-[9px] text-text-muted mb-1 group-hover:text-primary-400 transition-colors">SECURE_TEL//</span>
                <span className="text-sm text-white font-light">{PERSONAL_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global System Status Line */}
        <div className="border-t border-border-default pt-12 flex flex-col md:flex-row items-center justify-between font-mono text-[9px] text-text-muted tracking-[0.2em]">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span>SYSTEM_OPERATIONAL</span>
            </span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span>LATENCY: 24MS</span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span>{currentYear} © ALL_RIGHTS_RESERVED</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>ABIDJAN_NODE_01</span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="text-primary-500/50">PROUDLY_IVOIRIAN_DEV</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
