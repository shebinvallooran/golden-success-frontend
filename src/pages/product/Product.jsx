import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AboutTextSection,
  HeroSection,
} from "../../components/page-hero-text/PageHeroAndText";
import ProductList from "./components/ProductList.jsx/ProductList";
import { ProductDetail } from "./components/product-detail/ProductDetail";
import { useLanguage } from "../../contexts/LanguageContext";
import { X } from "lucide-react";
import ContactForm from "../contact/components/ContactForm";
import { getImageUrl } from "../../api/axiosInstance";

function Product() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProductName, setQuoteProductName] = useState('');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isQuoteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isQuoteModalOpen]);

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteProductName('');
  };

  const productText = t(
    "products.description",
    "At Najah Dhahabi, we supply a complete range of certified biomedical products sourced from trusted global manufacturers. Our catalog is tailored to meet the needs of clinical labs, diagnostic centers, pharmaceutical R&D, veterinary facilities, and food & water testing labs — all fully compliant with SFDA and international standards."
  );

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
    console.log("Quote requested for:", product);
    const productName = isRTL
      ? product?.name_ar || product?.name_en || t("common.product", "Product")
      : product?.name_en || product?.name_ar || t("common.product", "Product");

    setQuoteProductName(productName);
    setIsQuoteModalOpen(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (!isMounted) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir={i18n.dir()}
      className={`min-h-screen ${
        i18n.dir() === "rtl" ? "font-sans-arabic" : "font-sans"
      }`}
    >
      {/* Hero Section with Image and Text */}
      <div>
        <HeroSection
          imageUrl={"/img/product-hero-image.webp"}
          heroTitle={t("products.title", "Our Products")}
          heroDescription={t(
            "products.subtitle",
            "Comprehensive Biomedical Solutions for Laboratories, Clinics, and Research Facilities"
          )}
        />
      </div>

      {/* Description */}
      <motion.section
        className={`py-20 px-4 sm:px-8 bg-[#F7F9F2] ${
          i18n.dir() === "rtl" ? "text-right" : "text-left"
        }`}
        variants={sectionVariants}
      >
        <div
          className={`max-w-6xl mx-auto ${
            i18n.dir() === "rtl" ? "text-right" : "text-left"
          }`}
        >
          {/* Company Introduction Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={i18n.dir() === "rtl" ? "rtl-text" : ""}
          >
            <AboutTextSection aboutText={productText} />
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

      {/* Quote Request Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuoteModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('navigation.requestQuote', 'Request a Quote')}
                </h3>
                <button
                  onClick={closeQuoteModal}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Body: Split Layout */}
              <div className={`flex-1 overflow-y-auto flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                {/* Left Side: Product Details & Image */}
                <div className="w-full md:w-5/12 bg-[#F7F9F2] p-6 flex flex-col justify-center items-center border-r border-gray-100">
                  <div className="w-full max-w-[240px] aspect-square flex justify-center items-center p-4 bg-[#E9E9E9] rounded-2xl shadow-sm mb-4">
                    <img
                      src={
                        getImageUrl(selectedProduct?.image_url || selectedProduct?.image) ||
                        "/api/placeholder/300/300"
                      }
                      alt={quoteProductName}
                      className="max-w-full max-h-full object-contain rounded-xl"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/300/300";
                      }}
                    />
                  </div>
                  <h4 className="text-center font-bold text-gray-900 text-base md:text-lg max-w-[260px] break-words">
                    {quoteProductName}
                  </h4>
                  {selectedProduct?.category_en && (
                    <span className="mt-1.5 px-3 py-1 bg-[#20B2AA]/10 text-[#20B2AA] text-xs font-semibold rounded-full uppercase tracking-wider">
                      {isRTL ? selectedProduct?.category_ar : selectedProduct?.category_en}
                    </span>
                  )}
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-7/12 p-6">
                  <ContactForm 
                    initialProductName={quoteProductName} 
                    onSuccess={closeQuoteModal}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Product;
