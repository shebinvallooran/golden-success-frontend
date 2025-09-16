import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'

function ContactUsBanner() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigation = useNavigate();

  return (
    <motion.div 
      className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[385px] font-sans overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, #00B4D8 0%, #04C39A 100%), url('/img/contact-banner-background.webp')`,
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(5px) brightness(100%)',
            WebkitBackdropFilter: 'blur(5px) brightness(100%)'
          }}
        ></div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div 
          className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-[20px] max-w-[838px] w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className={`text-lg sm:text-2xl md:text-4xl lg:text-[40px] font-semibold leading-tight lg:leading-[53.2px] px-2 ${isRTL ? 'text-right' : 'text-left'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t('home.contactBanner.title')}
          </motion.h2>
          <motion.p
            className={`max-w-[605px] text-sm sm:text-base lg:text-[18px] leading-relaxed lg:leading-[25.2px] px-2 ${isRTL ? 'text-right' : 'text-left'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t('home.contactBanner.description')}
          </motion.p>
        </motion.div>
        
        {/* Request a Quote Button */}
        <motion.div 
          className="mt-6 sm:mt-8 lg:mt-[40px] px-4 sm:px-5 lg:px-[20px] py-3 sm:py-4 lg:py-[19px] bg-white rounded-full lg:rounded-[40px] shadow-lg transition-colors duration-300 hover:bg-gray-100 flex justify-center sm:justify-start cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <button className={`w-fit flex items-center gap-2 lg:gap-[10px] text-gray-800 ${isRTL ? 'flex-row-reverse' : ''}`} onClick={()=>navigation('/contact')}>
            <span className="text-sm sm:text-base lg:text-[16px] font-medium whitespace-nowrap">{t('home.contactBanner.buttonText')}</span>
            {/* SVG for arrow icon */}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-4 sm:h-4 lg:w-4 lg:h-4"
            >
              <path d="M16 8.5L0 8.5" stroke="#000" strokeWidth="2" />
              <path d="M8.5 16L8.5 0" stroke="#000" strokeWidth="2" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ContactUsBanner