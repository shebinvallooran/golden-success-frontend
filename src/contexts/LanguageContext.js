import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Set RTL for Arabic
    const rtlLanguages = ['ar'];
    setIsRTL(rtlLanguages.includes(currentLanguage));
    
    // Update document direction and language
    document.documentElement.dir = rtlLanguages.includes(currentLanguage) ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update body class for styling
    document.body.className = document.body.className.replace(/\b(ltr|rtl)\b/g, '');
    document.body.classList.add(rtlLanguages.includes(currentLanguage) ? 'rtl' : 'ltr');
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
