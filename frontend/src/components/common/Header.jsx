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
      setIsScrolled(window.scrollY > 50);
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
      
      // Si on n'est pas sur la page d'accueil, y aller d'abord
      if (location.pathname !== '/') {
        navigate('/');
        // Attendre que la navigation soit terminée avant de faire défiler
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 transition-colors z-10"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SY</span>
            </div>
            <span className="hidden sm:block">{PERSONAL_INFO.name}</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              if (item.href.startsWith('#')) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
            
            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-2 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-medium shadow-lg"
            >
              Me Contacter
            </button>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl dark:bg-gray-900/95 border-t dark:border-gray-800">
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={() => handleNavClick('#contact')}
                className="block w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white text-center px-6 py-3 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-medium mt-4"
              >
                Me Contacter
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
