import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../../contexts/LanguageContext';

const SectionHeader = ({
  logoText = "What We Do",
  heading = "Connecting Biomedical Innovation to Frontline Science",
  description = "We supply certified biomedical and diagnostic products to a range of professional institutions across the Gulf region — ensuring each facility receives the tools they need to work with precision, safety, and efficiency.",
  buttonText = "Explore Our Product Range",
  onButtonClick,
  className = "",
  showLogo = true,
  showButton = true
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <section className={`section-header ${className} ${isRTL ? 'rtl' : 'ltr'}`}>
      {showLogo && (
        <div className={`logo-section ${isRTL ? 'rtl-logo' : ''}`}>
          <div className="logo-icon">
            <div className="outer-circle"></div>
            <div className="inner-circle">
              <div className="green-dot"></div>
            </div>
          </div>
          <span className="logo-text">{logoText}</span>
        </div>
      )}

      <div className={`content-wrapper ${isRTL ? 'rtl-content' : ''}`}>
        <div className={`content-left ${isRTL ? 'rtl-left' : ''}`}>
          <h1 className={`main-heading ${isRTL ? 'rtl-heading' : ''}`}>
            {heading}
          </h1>
        </div>

        <div className={`content-right ${isRTL ? 'rtl-right' : ''}`}>
          <p className={`description ${isRTL ? 'rtl-description' : ''}`}>
            {description}
          </p>

          {showButton && (
            <button
               className={`cta-button ${isRTL ? 'rtl-button' : ''}`}
               onClick={handleButtonClick}
              type="button"
            >
              <span>{buttonText}</span>
              <svg
                className={`arrow-icon ${isRTL ? 'rtl-arrow' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={isRTL ? { transform: 'scaleX(-1)' } : {}}
              >
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

SectionHeader.propTypes = {
  logoText: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  className: PropTypes.string,
  showLogo: PropTypes.bool,
  showButton: PropTypes.bool
};

export default SectionHeader;