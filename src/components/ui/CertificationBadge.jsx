import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

const CertificationBadge = ({ text, translationKey, className = '' }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Use translation if translationKey is provided, otherwise use text prop
  const displayText = translationKey ? t(translationKey) : text;

  return (
    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} ${className}`}>
      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full"></div>
      <span className="text-gray-800 font-medium text-xs sm:text-sm">{displayText}</span>
    </div>
  );
};

export default CertificationBadge;
