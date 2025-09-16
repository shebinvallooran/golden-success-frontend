import React, { use } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import TrustedBadge from '../../../components/ui/TrustedBadge';
import CertificationBadge from '../../../components/ui/CertificationBadge';
import RatingBadge from '../../../components/ui/RatingBadge';
import LabImages from '../../../components/ui/LabImages';
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigation = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const buttonTap = {
    scale: 0.98
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-6 py-5">
        <motion.div 
          className="text-center mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trusted Badge */}
          <motion.div variants={fadeInScale} className="mb-6">
            <TrustedBadge text={t('common.trustedSupplier')} />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 text-center whitespace-pre-line`}
          >
            {t('home.title')} <span className="text-teal-500">{t('home.titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className={`text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 px-4 sm:px-0 text-center whitespace-pre-line`}
          >
            {t('home.heroDescription')}
          </motion.p>
          
          {/* CTA Button */}
          <motion.button
            variants={fadeInUp}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="btn btn-gradient inline-flex items-center text-sm sm:text-sm px-2 sm:px-6 py-1 sm:py-3"
            onClick={()=>navigation('/contact')}
          >
            <span>{t('navigation.requestQuoteText')}</span>
            <motion.div
              animate={{ x: isRTL ? [-5, 0, -5] : [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'mr-2 sm:mr-3 transform rotate-180' : 'ml-2 sm:ml-3'}`} />
            </motion.div>
          </motion.button>
        </motion.div>
        
        {/* Main Content Area with Images and Badges */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Lab Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <LabImages className="mb-8 sm:mb-12 lg:mb-20 max-w-xs sm:max-w-md lg:max-w-none mx-auto lg:mx-0" />
          </motion.div>

          {/* Certifications - Right Side */}
          <motion.div 
            className="absolute top-8 sm:top-12 lg:top-16 right-4 sm:right-6 lg:right-8 space-y-4 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.2 }}
            >
              <CertificationBadge translationKey="common.sfdaCompliant" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ duration: 0.2 }}
            >
              <CertificationBadge translationKey="common.isoCertifiedPartners" />
            </motion.div>
          </motion.div>

          {/* Rating Badge - Bottom Left */}
          <motion.div 
            className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05 }}
          >
            <RatingBadge rating={4.6} subtitleKey="common.certifiedReliable" />
          </motion.div>

          {/* Mobile Layout - Horizontal layout like in image */}
          <motion.div 
            className="lg:hidden flex items-center justify-between space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Mobile Rating Badge - Left side */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <RatingBadge rating={4.6} subtitleKey="common.certifiedReliable" />
            </motion.div>
            
            {/* Mobile Certifications - Right side */}
            <motion.div 
              className="flex flex-col space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <CertificationBadge translationKey="common.sfdaCompliant" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <CertificationBadge translationKey="common.isoCertifiedPartners" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
