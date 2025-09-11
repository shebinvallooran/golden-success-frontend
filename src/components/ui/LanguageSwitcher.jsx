import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = ({ className = '', showText = true, isMobile = false }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#04C39A] transition-all duration-300 group ${
          isMobile ? 'w-full justify-center' : ''
        }`}
        aria-label={t('common.language')}
      >
        <Globe className="w-4 h-4 text-gray-600 group-hover:text-[#04C39A] transition-colors duration-300" />
        {showText && (
          <>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#04C39A] transition-colors duration-300">
              {currentLang?.nativeName}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-600 group-hover:text-[#04C39A] transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={`absolute top-full mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-20 min-w-[160px] overflow-hidden ${
            isMobile ? 'left-1/2 transform -translate-x-1/2' : 'right-0'
          }`}>
            {availableLanguages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-[#04C39A]/10 hover:to-[#04C39A]/5 ${
                  currentLanguage === language.code
                    ? 'text-[#04C39A] font-semibold border-r-2 border-[#04C39A]'
                    : 'text-gray-700 hover:text-[#04C39A]'
                } ${index === 0 ? 'rounded-t-xl' : ''} ${index === availableLanguages.length - 1 ? 'rounded-b-xl' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="w-3 h-3 mr-2 opacity-60" />
                    {language.nativeName}
                  </span>
                  {currentLanguage === language.code && (
                    <div className="w-2 h-2 bg-[#04C39A] rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
