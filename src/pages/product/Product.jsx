import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AboutTextSection, HeroSection } from '../../components/page-hero-text/PageHeroAndText';
import ProductList from './components/ProductList.jsx/ProductList';
import { ProductDetail } from './components/product-detail/ProductDetail';
import { useLanguage } from '../../contexts/LanguageContext';

function Product() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const productText = t('products.description', {
    defaultValue: 'At Najah Dhahabi, we supply a complete range of certified biomedical products sourced from trusted global manufacturers. Our catalog is tailored to meet the needs of clinical labs, diagnostic centers, pharmaceutical R&D, veterinary facilities, and food & water testing labs — all fully compliant with SFDA and international standards.'
  });

  // Handle product card click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  // Handle back to list
  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedProduct(null);
  };

  // Handle request quote
  const handleRequestQuote = (product) => {
    console.log('Quote requested for:', product);
    const productName = isRTL ?
      (product?.name_ar || product?.name_en || t('common.product', 'Product')) :
      (product?.name_en || product?.name_ar || t('common.product', 'Product'));

    const message = isRTL ?
      `${t('products.quoteRequested', 'تم طلب عرض سعر لـ')}: ${productName}` :
      `${t('products.quoteRequested', 'Quote requested for')}: ${productName}`;

    // You can implement your quote request logic here
    alert(message);
  };
  
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



  if (!isMounted) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir={i18n.dir()}
      className={`min-h-screen ${i18n.dir() === 'rtl' ? 'font-sans-arabic' : 'font-sans'}`}
    >
      {/* Hero Section with Image and Text */}
      <div>
        <HeroSection
          imageUrl={'/img/product-hero-image.webp'}
          heroTitle={t('products.title', 'Our Products')}
          heroDescription={t('products.subtitle', 'Comprehensive Biomedical Solutions for Laboratories, Clinics, and Research Facilities')}
        />
      </div>

      {/* Description */}
      <motion.section
        className={`py-20 px-4 sm:px-8 bg-[#F7F9F2] ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
        variants={sectionVariants}
      >
        <div className={`max-w-6xl mx-auto ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Company Introduction Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={i18n.dir() === 'rtl' ? 'rtl-text' : ''}
          >
            <AboutTextSection
              title={t('products.ourRange', 'Our Product Range')}
              description={productText}
              buttonText={t('common.viewAllProducts', 'View All Products')}
              buttonLink="/products"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Product List or Detail View */}
      <AnimatePresence mode="wait">
        {showDetail && selectedProduct ? (
          <motion.div
            key="product-detail"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProductDetail
              product={selectedProduct}
              onRequestQuote={() => handleRequestQuote(selectedProduct)}
              onBackToList={handleBackToList}
            />
          </motion.div>
        ) : (
          <motion.div
            key="product-list"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProductList onProductClick={handleProductClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Product
