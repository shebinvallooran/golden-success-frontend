import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../../../../contexts/LanguageContext'
import SectionHeader from '../SectionHeader'
import { BookOpen, Dna, Hospital, Microscope } from 'lucide-react'
import ServiceCard from './components/ServiceCard'
import { useNavigate } from 'react-router-dom'


function WhatWeDo() {
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div 
      className='what-we-do relative pb-16 bg-[#FAF9F6]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <SectionHeader
          logoText={t('home.whatWeDo.title')}
          heading={t('home.whatWeDo.heading')}
          description={t('home.whatWeDo.description')}
          buttonText={t('home.whatWeDo.buttonText')}
          onButtonClick={() => {navigation('/products')}}
          className="custom-class"
          showLogo={true}
          showButton={true}
        />
      </motion.div>

      {/* service cards */}
      <div className="px-2 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        <motion.div 
          className="max-w-7xl mx-auto flex flex-wrap gap-3 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1: Clinical Laboratories */}
          <motion.div 
            className="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(50%-16px)] min-w-[280px]"
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <ServiceCard
              image={'/icons/micro-scope-blue-icon.png'}
              imageAlt={t('home.whatWeDo.services.clinicalLabs.title')}
              title={t('home.whatWeDo.services.clinicalLabs.title')}
              description={t('home.whatWeDo.services.clinicalLabs.description')}
            />
          </motion.div>

          {/* Card 2: Medical Stores */}
          <motion.div 
            className="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(50%-16px)] min-w-[280px]"
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <ServiceCard
              image={'/icons/hospital-blue-icon.png'}
              imageAlt={t('home.whatWeDo.services.medicalStores.title')}
              title={t('home.whatWeDo.services.medicalStores.title')}
              description={t('home.whatWeDo.services.medicalStores.description')}
            />
          </motion.div>

          {/* Card 3: Diagnostic Centers */}
          <motion.div 
            className="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(50%-16px)] min-w-[280px]"
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <ServiceCard
              image={'/icons/dna-blue-icon.png'}
              imageAlt={t('home.whatWeDo.services.diagnosticCenters.title')}
              title={t('home.whatWeDo.services.diagnosticCenters.title')}
              description={t('home.whatWeDo.services.diagnosticCenters.description')}
            />
          </motion.div>

          {/* Card 4: Research Institutions */}
          <motion.div 
            className="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(50%-16px)] min-w-[280px]"
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <ServiceCard
              image={'/icons/report-blue-icon.png'}
              imageAlt={t('home.whatWeDo.services.researchInstitutions.title')}
              title={t('home.whatWeDo.services.researchInstitutions.title')}
              description={t('home.whatWeDo.services.researchInstitutions.description')}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WhatWeDo
