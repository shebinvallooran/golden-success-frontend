import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import FeatureCard from './components/FeatureCard'
import { Award, Briefcase, Truck, Users, Zap } from 'lucide-react'
import MissionVisionSection from './components/MissionVisionSection'
import { TrustedStandards } from './components/TrustedStandards'
import { AboutTextSection, HeroSection } from '../../components/page-hero-text/PageHeroAndText'

function About() {
  const { t } = useTranslation();
  
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

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        {/* Hero Section with Image and Text */}
        <div>
          <HeroSection
              imageUrl={'/img/about-us-banner.webp'}
              heroTitle={t('about.heroTitle')}
              heroDescription={t('about.heroDescription')}
          />
        </div>
        
        {/* features */}
        <motion.section 
          className="py-20 px-4 sm:px-8 bg-[#F7F9F2] font-sans"
          variants={sectionVariants}
        >
            <div className="max-w-6xl mx-auto">
                {/* Company Introduction Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <AboutTextSection aboutText={t('about.aboutText')}  />
                </motion.div>

                {/* Feature Cards Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                    {/* First Feature Card */}
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <FeatureCard
                          iconSrc={'/icons/microscope-lcon.png'}
                          iconAlt={'microscope'}
                          title={t('about.features.premiumProducts')}
                          showBorder={true}
                      />
                    </motion.div>
                    
                    {/* Second Feature Card */}
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <FeatureCard
                          iconSrc={'/icons/delivery-truck-icon.png'}
                          iconAlt={'delivery-truck'}
                          icon={Truck}
                          title={t('about.features.quickResponses')}
                          showBorder={true}
                      />
                    </motion.div>
                    
                    {/* Third Feature Card */}
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <FeatureCard
                          iconSrc={'/icons/group.png'}
                          title={t('about.features.backedByExperience')}
                      />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>

        {/* mission and vission */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MissionVisionSection />
        </motion.div>

        {/* trusted standards */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <TrustedStandards />
        </motion.div>
    </motion.div>
  )
}

export default About
