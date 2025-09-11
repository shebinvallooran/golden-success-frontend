import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin , ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../contexts/LanguageContext'
import GoldenSuccessLogo from '../../assets/icons/golden-success-white-logo'

function Footer() {
    const { t } = useTranslation();
    const { isRTL } = useLanguage();

    useEffect(() => {
        const scrollToTopBtn = document.querySelector('#scrollToTopBtn');

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', scrollToTop);
        }

        return () => {
            if (scrollToTopBtn) {
                scrollToTopBtn.removeEventListener('click', scrollToTop);
            }
        };
    }, []);
    
  return (
    <footer className="relative w-full bg-[#00040F] text-[#D6D6D6] p-4 sm:p-6 pt-12 sm:pt-16 lg:pt-20 font-sans overflow-hidden">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-20">
        {/* Main Columns */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-[20px]">
          
          {/* Logo Section */}
          <div className="flex w-full lg:w-1/5 flex-col items-start gap-4 sm:gap-5">
            <div className="scale-90 sm:scale-100">
              <GoldenSuccessLogo />
            </div>
            <p className={`text-sm sm:text-base text-gray-400 leading-tight max-w-full lg:max-w-[280px] ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('footer.description')}
            </p>
          </div>

          {/* Content Sections - Stack on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row lg:flex-row w-full lg:w-4/5 gap-8 sm:gap-12 lg:gap-[40px]">
            
            {/* Quick Links Section */}
            <div className={`flex flex-col gap-4 sm:gap-[20px] flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
              <h4 className="text-lg sm:text-[20px] font-semibold text-white">{t('footer.quickLinks')}</h4>
              <div className={`flex flex-col gap-3 sm:gap-[12px] text-sm sm:text-[16px] text-gray-400 ${isRTL ? 'items-end' : 'items-start'}`}>
                <a href="#" className="hover:text-white transition-colors duration-200">{t('footer.navigation.home')}</a>
                <a href="#" className="hover:text-white transition-colors duration-200">{t('footer.navigation.about')}</a>
                <a href="#" className="hover:text-white transition-colors duration-200">{t('footer.navigation.products')}</a>
                <a href="#" className="hover:text-white transition-colors duration-200">{t('footer.navigation.industries')}</a>
                <a href="#" className="hover:text-white transition-colors duration-200">{t('footer.navigation.whyChooseUs')}</a>
                <a href="#" className="hover:text-white transition-colors duration-200">{t('footer.navigation.contact')}</a>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className={`flex flex-col gap-5 sm:gap-[30px] flex-1 ${isRTL ? 'items-end' : 'items-start'}`}>
              <h4 className="text-lg sm:text-[20px] font-semibold text-white">{t('footer.contactDetails')}</h4>
              <div className={`flex flex-col gap-4 sm:gap-[24px] ${isRTL ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-start gap-3 sm:gap-[12px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-gray-400 mt-1 flex-shrink-0">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm sm:text-[16px] font-semibold text-white mb-1 sm:mb-2">{t('footer.headOffice')}</p>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {t('footer.address')} <br />
                      <span dir="rtl" className="text-gray-400">{t('footer.addressArabic')}</span>
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 sm:gap-[12px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-gray-400 flex-shrink-0">
                    <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="text-sm sm:text-[16px] text-gray-400">{t('footer.phone')}</div>
                </div>

                <div className={`flex items-center gap-3 sm:gap-[12px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-gray-400 flex-shrink-0">
                    <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="text-sm sm:text-[16px] text-gray-400 break-all sm:break-normal">{t('footer.email')}</div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className={`flex flex-col gap-5 sm:gap-[30px] flex-1 lg:flex-none lg:w-auto ${isRTL ? 'items-end' : 'items-start'}`}>
              <h4 className="text-lg sm:text-[20px] font-semibold text-white">{t('footer.stayConnected')}</h4>
              <div className="flex gap-3 sm:gap-[12px]">
                <a href="https://www.instagram.com/goldensucces_?igsh=MXN5d2I0dmFhZ3ZyNw==" target="_blank" className="p-2 sm:p-3 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-all duration-200">
                  <Instagram size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://linkedin.com/company/goldensuccessksa" target="_blank" className="p-2 sm:p-3 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-all duration-200">
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="#" target="_blank" className="p-2 sm:p-3 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-all duration-200">
                  <Facebook size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="h-px w-full mt-8 sm:mt-12 lg:mt-[50px] mb-4 sm:mb-6 lg:mb-[10px] border-none bg-gray-700" />

        {/* Copyright and Legal Section */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-[14px] ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <p className={isRTL ? 'text-right' : 'text-left'}>{t('footer.copyright')}</p>
          <div className={`flex items-center gap-2 text-xs sm:text-[14px] ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="hover:text-gray-300 transition-colors">{t('footer.termsConditions')}</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">{t('footer.privacyPolicy')}</a>
          </div>
        </div>
      </div>

      {/* Large Arabic Text Overlay - Hidden on small screens */}
      <div className="pointer-events-none hidden lg:block w-full flex justify-center">
        <div
          className="text-6xl lg:text-7xl xl:text-9xl mt-3 sm:mt-5 font-bold text-gray-700 text-center leading-none whitespace-nowrap select-none opacity-30 lg:opacity-100"
          // dir="rtl"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {t('footer.companyNameArabic')}
        </div>
      </div>
      
      {/* Scroll to top button - Responsive positioning */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-[40px] right-4 sm:right-6 lg:right-[40px] z-30">
        <button
          id="scrollToTopBtn"
          className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 lg:w-[40px] lg:h-[40px] rounded-full border-2 sm:border-[2.5px] border-white text-white
                     transition-transform duration-200 ease-in-out
                     hover:scale-110
                     group"
        >
          <ArrowRight
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transform -rotate-90 transition-transform duration-200 ease-in-out group-hover:scale-125"
          />
        </button>
      </div>
    </footer>
  )
}

export default Footer