import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../../../../contexts/LanguageContext'
import { getCategoriesForHome, getImageUrl } from '../../../../../api/axiosInstance'
import ProductCard from './components/ProductCard'
import { useNavigate } from 'react-router-dom'


function OurProductsHome() {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [displayCount, setDisplayCount] = useState(3); // Default to 3 for desktop

  // Calculate optimal display count based on available categories
  const calculateDisplayCount = (totalCategories, isMobileView) => {
    if (totalCategories === 0) return 0;

    if (isMobileView) {
      // Mobile limits: 2, 4, 6, 8
      if (totalCategories >= 8) return 8;
      if (totalCategories >= 6) return 6;
      if (totalCategories >= 4) return 4;
      return Math.min(totalCategories, 2);
    } else {
      // Desktop limits: 3, 6, 9
      if (totalCategories >= 9) return 9;
      if (totalCategories >= 6) return 6;
      return Math.min(totalCategories, 3);
    }
  };

  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // Tailwind's md breakpoint
      setIsMobile(mobile);

      // Recalculate display count when screen size changes
      if (categories.length > 0) {
        const optimalCount = calculateDisplayCount(categories.length, mobile);
        setDisplayCount(optimalCount);
      }
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [categories.length]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCategoriesForHome();
        if (response && response.data) {
          setCategories(response.data);

          // Set optimal display count based on available categories
          const optimalCount = calculateDisplayCount(response.data.length, isMobile);
          setDisplayCount(optimalCount);
        }
      } catch (err) {
        console.error('Error fetching categories for home:', err);
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isMobile]);

  // Get categories to display (now automatically calculated)
  const categoriesToDisplay = categories.slice(0, displayCount);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.section 
      className="font-sans py-16 px-4 bg-[#f0f1f0] min-h-screen"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto max-w-[1440px] text-center">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col items-center gap-[26px] mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className={`text-[46px] font-semibold text-[#00271f] leading-[53.2px]`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t('home.ourProducts.title')}
          </motion.h2>
          <motion.p
            className={`text-[18px] text-[#00271fcc] leading-[25.2px] max-w-2xl`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t('home.ourProducts.description')}
          </motion.p>
        </motion.div>

        {/* Categories Grid - Using a single flex container with wrapping */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00271f]"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap justify-center gap-[30px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {categoriesToDisplay && categoriesToDisplay.length > 0 && categoriesToDisplay.map((category) => {
              // Get the appropriate title and description based on language
              const title = isRTL ? category.name_ar || category.name_en : category.name_en;
              const description = isRTL ? category.home_description_ar || category.home_description_en : category.home_description_en;

              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <ProductCard
                    imageUrl={category.image_url ? getImageUrl(category.image_url) : null}
                    title={title}
                    description={description}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* See All Products Button */}
        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button
            className="flex items-center gap-[10px] px-[20px] py-[19px] rounded-[40px] border border-[#00271f] transition-colors duration-300 hover:bg-gray-200"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 39, 31, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>navigation('/products')}
          >
            <span className="text-[16px] text-[#00271f]">
              {t('home.ourProducts.seeAllProducts', 'See All Products')}
            </span>
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
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default OurProductsHome
