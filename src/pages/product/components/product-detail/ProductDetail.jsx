import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { getImageUrl } from '../../../../api/axiosInstance';

export const ProductDetail = ({
  product,
  onRequestQuote = () => {},
  onBackToList = () => {}
}) => {
  const { isRTL } = useLanguage();

  // Handle missing product
  if (!product) {
    return (
      <div className="mx-auto p-6 pt-20 pb-20 bg-[#F7F9F2] text-center">
        <p className="text-gray-600">Product not found</p>
        <button
          onClick={onBackToList}
          className="mt-4 btn btn-gradient inline-flex items-center text-sm"
        >
          Back to List
        </button>
      </div>
    );
  }

  // Get the appropriate language content
  const productName = isRTL ? product.name_ar : product.name_en;
  const productDescription = isRTL ? product.description_ar : product.description_en;
  const productCategory = isRTL ? product.category_ar : product.category_en;

  const renderQuillContent = (htmlContent) => {
    if (!htmlContent) return { __html: '' };
    return { __html: htmlContent };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.div
      className="mx-auto p-6 pt-20 pb-20 bg-[#F7F9F2]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16 max-w-7xl mx-auto ${isRTL ? 'lg:grid-cols-[3fr_2fr]' : ''}`}>

        {/* Product Image */}
        <motion.div
          className={`flex justify-center items-center ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          variants={imageVariants}
        >
          <div className='flex justify-center items-center p-8 bg-[#E9E9E9] rounded-2xl h-full w-full'>
            <img
              src={getImageUrl(product.image_url || product.image) || "/api/placeholder/400/500"}
              alt={productName || "Product"}
              className="max-w-full max-h-[550px] rounded-2xl "
              loading="lazy"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/500";
              }}
            />
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          className={`space-y-6 ${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}
          initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >

          <div className="space-y-1.5">
            <h1 className={`text-2xl font-bold text-black ${isRTL ? 'font-cairo' : ''}`}>
              {productName || "Product Name"}
            </h1>

            {productCategory && (
              <p className={`text-sm font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'font-cairo' : ''}`}>
                {productCategory}
              </p>
            )}
          </div>

          <div
            className={`text-gray-600 text-sm leading-relaxed ${isRTL ? 'font-cairo text-right' : 'text-left'}`}
            dangerouslySetInnerHTML={renderQuillContent(productDescription)}
          />

          <div className={`flex gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={onBackToList}
              className={`border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors flex items-center gap-2 ${isRTL ? 'font-cairo flex-row-reverse' : ''}`}
              style={{padding: '8px 16px', fontSize: '14px'}}
            >
              {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              {isRTL ? 'العودة للقائمة' : 'Back to List'}
            </button>
            <button
              onClick={onRequestQuote}
              className={`btn btn-gradient inline-flex items-center text-sm sm:text-base ${isRTL ? 'font-cairo flex-row-reverse' : ''}`}
              style={{padding: '8px 16px', fontSize: '14px'}}
            >
              {isRTL ? 'طلب عرض سعر' : 'Request a Quote'}
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object,
  onRequestQuote: PropTypes.func,
  onBackToList: PropTypes.func
};