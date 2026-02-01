// ========== frontend/src/components/common/Header.jsx (CORRIGÉ) ==========
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, PERSONAL_INFO } from '../../utils/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleNavClick = (href) => {
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
        ? 'bg-bg-dark/98 backdrop-blur-xl border-b border-border-subtle py-4'
        : 'bg-transparent py-8'
        }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Industrial Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-4 z-[101]"
          >
            <div className="relative w-10 h-10 border border-primary-500/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary-500 bg-bg-dark/50">
              <img
                src="/logo.jpeg"
                alt="Souleymane Yeo Logo"
                className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <span className="block text-xs font-mono text-primary-400/50 tracking-[0.3em] uppercase mb-0.5">Architect</span>
              <span className="block text-sm font-bold text-white tracking-widest leading-none">SOULEYMANE.YEO</span>
            </div>
          </Link>

          {/* Navigation Desktop - Tech/Mono */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative group ${location.pathname === item.href || (item.href.startsWith('#') && location.hash === item.href)
                  ? 'text-primary-400'
                  : 'text-text-secondary hover:text-white'
                  }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}

            <div className="w-[1px] h-4 bg-white/10 mx-6" />

            <button
              onClick={() => handleNavClick('#contact')}
              className="px-6 py-2 border border-primary-500/50 text-primary-400 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-primary-500 hover:text-white transition-all duration-500"
            >
              INITIALIZE_CONTACT
            </button>
          </div>

          {/* Menu Mobile Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 border border-white/10 flex flex-col items-center justify-center space-y-1 z-[101]"
          >
            <span className={`w-5 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[2px]' : ''}`} />
            <span className={`w-5 h-[1px] bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-bg-dark/98 backdrop-blur-2xl z-[200] transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-x-full'
          }`}>
          {/* Close Button Inside Menu */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 border border-white/10 flex items-center justify-center group hover:border-primary-500 transition-all active:scale-95"
          >
            <div className="relative w-6 h-6">
              <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white rotate-45 group-hover:bg-primary-500 transition-colors" />
              <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white -rotate-45 group-hover:bg-primary-500 transition-colors" />
            </div>
          </button>

          <div className="h-full flex flex-col justify-center px-10">
            <div className="space-y-6">
              <span className="block font-mono text-[10px] text-primary-500 tracking-[0.4em] mb-4">SYSTEM_NAVIGATION</span>
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-4xl font-bold text-white tracking-tighter hover:text-primary-500 transition-all text-left relative group w-full active:translate-x-2"
                >
                  <span className="text-[10px] font-mono text-primary-500/50 mr-4">0{i + 1}_</span>
                  {item.label}
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary-500 group-hover:h-8 transition-all" />
                </button>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 space-y-8">
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full py-5 bg-primary-500/10 border border-primary-500 text-primary-400 font-mono tracking-widest uppercase text-xs hover:bg-primary-500 hover:text-white transition-all active:scale-[0.98]"
              >
                INITIALIZE_PROTOCOL_01
              </button>

              <div className="flex justify-between items-center opacity-20 font-mono text-[8px] tracking-widest uppercase">
                <span>VER: 3.0.4_STABLE</span>
                <span>ENC: AES_256_RSA</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
