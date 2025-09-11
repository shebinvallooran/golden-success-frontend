import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../../../../contexts/LanguageContext'
import WhyUsSectionContent from './components/WhyChooseUsContent'
import SectionHeader from '../SectionHeader'
import { useNavigate } from 'react-router-dom'

function WhyUs() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigation = useNavigate();

  return (
        <motion.div
          className={`why-us relative mb-20 ${isRTL ? 'rtl-why-us' : 'ltr-why-us'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionHeader
              logoText={t('home.whyUs.title')}
              heading={t('home.whyUs.heading')}
              description={t('home.whyUs.description')}
              buttonText={t('home.whyUs.buttonText')}
              onButtonClick={() => {navigation('/contact')}}
              className="custom-class"
              showLogo={true}
              showButton={true}
            />
          </motion.div>

          {/* content section - individual cards now animate themselves */}
          <div className={`max-w-7xl mx-auto flex flex-wrap gap-3 sm:gap-6 lg:gap-8 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <div className="w-full">
              <WhyUsSectionContent />
            </div>
          </div>
        </motion.div>
  )
}

export default WhyUs
