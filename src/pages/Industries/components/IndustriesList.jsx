import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IndustryCard } from './IndustriesCard';
import { getCategoriesList, getImageUrl } from '../../../api/axiosInstance';

const IndustriesList = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fetchIndustries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCategoriesList();
      if (response.data && Array.isArray(response.data)) {
        // Sort by priority if needed, then by id as fallback
        const sortedIndustries = [...response.data].sort((a, b) => 
          (a.priority || 0) - (b.priority || 0) || a.id - b.id
        );
        setIndustries(sortedIndustries);
      }
    } catch (err) {
      console.error('Error fetching industries:', err);
      setError(t('errors.fetchIndustries', 'Failed to load industries. Please try again later.'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  // Format points for display based on language
  const getIndustryPoints = (industry) => {
    return [
      industry[`point1_${i18n.language}`] || industry.point1_en,
      industry[`point2_${i18n.language}`] || industry.point2_en,
      industry[`point3_${i18n.language}`] || industry.point3_en
    ].filter(Boolean); // Remove any undefined points
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-lg text-gray-600">
          {t('common.loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className={`p-6 ${isRTL ? 'rtl font-cairo' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id || index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <IndustryCard
                imageSrc={getImageUrl(industry.image_url) || '/logo512.png'}
                title={industry[`name_${i18n.language}`] || industry.name_en || t('common.untitled', 'Untitled')}
                description={industry[`home_description_${i18n.language}`] || industry.home_description_en || ''}
                points={getIndustryPoints(industry)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesList;