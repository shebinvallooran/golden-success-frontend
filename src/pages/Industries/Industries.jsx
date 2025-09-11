import React from 'react'
import { motion } from 'framer-motion'
import { AboutTextSection, HeroSection } from '../../components/page-hero-text/PageHeroAndText'
import IndustriesList from './components/IndustriesList'
import { ArrowRight, ArrowRightIcon } from 'lucide-react'

function Industries() {
    const aboutText = "At Najah Dhahabi, we cater to a wide spectrum of scientific and diagnostic sectors with precision-engineered biomedical products. Our portfolio supports everything from cutting-edge clinical diagnostics to environmental and food safety monitoring. We understand that every industry has unique standards, and we deliver solutions that meet global compliance, SFDA guidelines, and ISO benchmarks."
  
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        {/* hero section */}
        <div>
          <HeroSection 
              imageUrl={'/img/industries/industries-hero-image.webp'}
              heroTitle={'Industries We Serve'}
              heroDescription={'Empowering Progress Across Laboratories, Clinics & Industry'}
          />
        </div>
        
        <motion.section 
          className='py-20 px-4 sm:px-8 bg-[#FAF9F6] font-sans'
          variants={sectionVariants}
        >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <AboutTextSection aboutText={aboutText} />
            </motion.div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
            <IndustriesList />
        </motion.section>

        <motion.section 
          className="py-16 px-6 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start text-left"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.3,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                    {/* Left Column - Title */}
                    <motion.div 
                      className="lg:col-span-3"
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                        }
                      }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-semibold text-[#00271F] leading-normal">
                        Serving You Across<br />the GCC
                        </h2>
                    </motion.div>
                
                    {/* Right Column - Content */}
                    <motion.div 
                      className="lg:col-span-2 space-y-8"
                      variants={{
                        hidden: { opacity: 0, x: 30 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                        }
                      }}
                    >
                        <motion.p 
                          className="text-lg text-[#00271F]/80 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                        From government laboratories to private research firms, our 
                        biomedical solutions are tailored to meet the real-world 
                        challenges of each industry. We maintain strong regional 
                        logistics support in Khafji, Riyadh, and Dubai, ensuring 
                        timely, SFDA-compliant delivery.
                        </motion.p>
                        
                        <motion.button 
                          className="inline-flex items-center gap-3 px-6 py-3 text-[#00271F] border border-[#00271F]/20 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(0, 39, 31, 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                        <span>Explore Our Products</span>
                        <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    </motion.div>
  )
}

export default Industries
