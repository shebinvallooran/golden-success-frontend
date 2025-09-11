import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChevronRight, Menu, X } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';

function Header() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL location
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation links with translations
  const navLinks = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.about'), path: '/about' },
    { label: t('navigation.products'), path: '/products' },
    { label: t('navigation.industries'), path: '/industries' },
    { label: t('navigation.contact'), path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Updated goTo function to navigate directly with the path
  const goTo = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  // A reusable button component for the quote request
  const RequestQuoteButton = ({ isMobile = false }) => (
    <div
      className={`relative gradient-primary-secondary-background p-[2px] rounded-full inline-block ${isMobile ? 'w-full' : ''}`}
    >
      <button
        className={`bg-white hover:bg-transparent text-[#04C39A] hover:text-white font-medium text-sm flex items-center justify-center px-6 py-3 rounded-full transition-all duration-300 ${isMobile ? 'w-full' : ''}`}
      >
        {t('navigation.requestQuote')}
        <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
      </button>
    </div>
  );

  // Mobile Request Quote Button (simplified for header)
  const MobileQuoteButton = () => (
    <button className="bg-transparent border-2 border-[#04C39A] text-[#04C39A] font-medium text-sm flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#04C39A] hover:text-white">
      {t('navigation.requestQuote')}
      <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
    </button>
  );

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-6 py-4 items-center justify-between">
        {/* Logo and company name - Left side */}
        <div style={{ width: '180px' }} className="cursor-pointer" onClick={() => goTo('/')}>
          <img src="/img/Golden Logo.png" alt="Golden Success Logo" />
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="flex items-center justify-center flex-1 mx-12">
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => goTo(link.path)}
                className={`py-2 text-sm transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#04C39A] font-semibold'
                    : 'text-gray-700 font-medium hover:text-[#04C39A]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Language Switcher and Button - Right side */}
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <LanguageSwitcher />
          <RequestQuoteButton />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        {/* Left side: Menu Button + Logo */}
        <div className="flex items-center space-x-3">
          <button 
            className="text-gray-600 hover:text-[#04C39A] transition-colors p-2" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="cursor-pointer max-w-[140px]" onClick={() => goTo('/')}>
            <img src="/img/Golden Logo.png" alt="Golden Success Logo" className="h-auto max-h-12" />
          </div>
        </div>

        {/* Request Quote Button - Right */}
        <div className="flex-shrink-0">
          <MobileQuoteButton />
        </div>
      </div>

      {/* Mobile Navigation (Conditional) */}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg lg:hidden z-40">
          <div className="px-6 py-4">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => goTo(link.path)}
                    className={`text-sm block w-full text-left py-3 px-2 rounded transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#04C39A] font-semibold bg-[#04C39A]/5'
                        : 'text-gray-700 font-medium hover:text-[#04C39A] hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Additional mobile menu items */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <LanguageSwitcher isMobile={true} />
              </div>
              <RequestQuoteButton isMobile={true} />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;