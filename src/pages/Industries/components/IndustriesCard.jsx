
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// A custom checkmark icon component
const CheckIcon = ({ isRTL = false }) => (
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`}
      style={{ marginTop: '0.125rem' }}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M2.64 0H0V9C0 10.6568 1.34315 12 3 12H5.64V3C5.64 1.34315 4.29685 0 2.64 0ZM9.36 0C7.70316 0 6.36 1.34315 6.36 3V12H9C10.6568 12 12 10.6568 12 9V0H9.36Z" fill="url(#paint0_linear_419_208)"/>
        <defs>
            <linearGradient id="paint0_linear_419_208" x1="0" y1="6" x2="12" y2="6" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00B4D8"/>
                <stop offset="1" stopColor="#04C39A"/>
            </linearGradient>
        </defs>
    </svg>
);

export const IndustryCard = ({ imageSrc, title, description, points = [] }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const textDirection = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';
  const marginDirection = isRTL ? 'mr-3' : 'ml-3';

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-md"
      dir={textDirection}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = '/logo512.png'; // Use the default React logo as fallback
            e.target.className = 'w-1/2 h-auto mx-auto my-4 object-contain' + 
              (e.target.className ? ' ' + e.target.className : '');
          }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${textAlign} ${isRTL ? 'font-cairo' : ''}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-gray-600 text-sm mb-4 ${textAlign} ${isRTL ? 'font-cairo' : ''}`}>
            {description}
          </p>
        )}
        {points.length > 0 && (
          <ul className={`space-y-3 flex-1 ${isRTL ? 'pr-0' : ''}`}>
            {points.map((point, index) => (
              <li key={index} className={`flex items-start ${flexDirection} gap-2`}>
                <CheckIcon isRTL={isRTL} />
                <p className={`text-gray-600 text-sm leading-relaxed ${textAlign} ${isRTL ? 'font-cairo' : ''}`}>
                  {point}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

IndustryCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.string)
};

IndustryCard.defaultProps = {
  description: '',
  points: []
};
