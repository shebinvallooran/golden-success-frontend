import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { getProducts } from '../../../../api/axiosInstance';
import { Pagination } from '../../../../components/pagination/Pagination';
import ShimmerProductCard from './components/ShimmerProductCard ';
import { useLanguage } from '../../../../contexts/LanguageContext';

function ProductList({ onProductClick, onRequestQuote, isRTL: propIsRTL }) {
  const { t, i18n } = useTranslation();
  const { isRTL: contextIsRTL } = useLanguage();
  const isRTL = propIsRTL !== undefined ? propIsRTL : contextIsRTL;
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayList, setDisplayList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Extract unique categories from products with multi-language support
  const extractCategories = useCallback((products) => {
    const categorySet = new Set();

    products.forEach(product => {
      // Only add the category for the current language
      const categoryName = isRTL ? product.category_ar : product.category_en;
      if (categoryName) {
        categorySet.add(categoryName);
      }
    });

    const uniqueCategories = Array.from(categorySet);

    // Add "All Products" option at the beginning
    const allProductsLabel = t('products.allProducts', 'All Products');
    return [allProductsLabel, ...uniqueCategories.sort((a, b) => a.localeCompare(b, i18n.language))];
  }, [isRTL, t, i18n.language]);

  // Filter products based on search query and category
  const filterProducts = useCallback((products, query, category) => {
    const searchTerm = query.toLowerCase().trim();
    const allProductsText = t('common.allProducts', 'All Products');
    
    return products.filter(product => {
      // Filter by category if not 'All Products'
      if (category && category !== allProductsText) {
        const productCategoryEn = (product.category_en || '').toLowerCase();
        const productCategoryAr = (product.category_ar || '').toLowerCase();
        const targetCategory = category.toLowerCase();
        
        if (productCategoryEn !== targetCategory && productCategoryAr !== targetCategory) {
          return false;
        }
      }

      // Skip search if no search term
      if (!searchTerm) return true;

      // Search in all relevant fields
      const searchFields = [
        product.name_en || '',
        product.name_ar || '',
        product.description_en || '',
        product.description_ar || '',
        product.category_en || '',
        product.category_ar || ''
      ];

      return searchFields.some(field => 
        field.toLowerCase().includes(searchTerm)
      );
    });
  }, [isRTL, t]);

  // Sort products based on selected option
  const sortProducts = useCallback((products, sortOption) => {
    if (!sortOption) return [...products];

    const sorted = [...products];
    const sortOptions = [
      t('common.newest', 'Newest'),
      t('common.oldest', 'Oldest'),
      t('common.aToZ', 'A to Z'),
      t('common.zToA', 'Z to A')
    ];

    // Get the appropriate name based on RTL and availability
    const getName = (item) => {
      if (isRTL) {
        return (item.name_ar || item.name_en || '').trim().toLowerCase();
      }
      return (item.name_en || item.name_ar || '').trim().toLowerCase();
    };

    return sorted.sort((a, b) => {
      switch (sortOption) {
        case sortOptions[0]: // Newest
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        case sortOptions[1]: // Oldest
          return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        case sortOptions[2]: // A to Z
          return getName(a).localeCompare(getName(b), isRTL ? 'ar' : 'en');
        case sortOptions[3]: // Z to A
          return getName(b).localeCompare(getName(a), isRTL ? 'ar' : 'en');
        default:
          return 0;
      }
    });
  }, [isRTL, t]);

  const convertToPaginatedList = useCallback((list, pageSize) => {
    const paginatedList = [];
    for (let i = 0; i < list.length; i += pageSize) {
      paginatedList.push(list.slice(i, i + pageSize));
    }
    return paginatedList;
  }, []);

  const getProductListApi = useCallback(async ()=>{
    setLoading(true);
    try{
      const api = await getProducts();
      if(api && api.data && api.data.length > 0){
        const fullList = api.data;
        setProductList(fullList);
        setFilteredProducts(fullList);

        // Extract categories from products
        const extractedCategories = extractCategories(fullList);
        setCategories(extractedCategories);
        setSelectedCategory(extractedCategories[0]); // Set "All Products" as default

        // Increased page size since cards are smaller now
        const batches = convertToPaginatedList(fullList, 24);
        setPaginatedProducts(batches);
        setCurrentPage(0);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }, [extractCategories, convertToPaginatedList])

  // Handle search functionality
  const handleSearch = useCallback((query, category) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentPage(0);

    // Apply filters and sorting in a single pass
    const filtered = filterProducts(productList, query, category);
    const sorted = sortProducts(filtered, sortBy);
    
    setFilteredProducts(sorted);
    
    // Update pagination
    const batches = convertToPaginatedList(sorted, 24);
    setPaginatedProducts(batches);
  }, [productList, sortBy, filterProducts, sortProducts, convertToPaginatedList]);

  // Handle sorting functionality
  const handleSort = useCallback((sortOption) => {
    setSortBy(sortOption);
    setCurrentPage(0);

    // Apply sorting to original filtered list to maintain consistency
    const filtered = filterProducts(productList, searchQuery, selectedCategory);
    const sorted = sortProducts(filtered, sortOption);
    
    setFilteredProducts(sorted);
    
    // Update pagination
    const batches = convertToPaginatedList(sorted, 24);
    setPaginatedProducts(batches);
  }, [productList, searchQuery, selectedCategory, sortProducts, filterProducts, convertToPaginatedList]);

  const handleRequestQuote = useCallback((product) => {
    console.log('Quote requested for:', product);
    const productName = isRTL ?
      (product?.name_ar || product?.name_en || 'Product') :
      (product?.name_en || product?.name_ar || 'Product');

    const message = isRTL ?
      `تم طلب عرض سعر لـ: ${productName}` :
      `Quote requested for: ${productName}`;

    alert(message);
  }, [isRTL]);

  const handleFavoriteToggle = useCallback((productId, isFavorited) => {
    console.log(`Product ${productId} favorited: ${isFavorited}`);
  }, []);

  useEffect(()=>{
    getProductListApi();
  }, [getProductListApi])

  useEffect(() => {
    if (paginatedProducts.length > 0) {
      setDisplayList(paginatedProducts[currentPage] || []);
    }
  }, [paginatedProducts, currentPage]);

  // Update categories when language changes
  useEffect(() => {
    if (productList.length > 0) {
      const extractedCategories = extractCategories(productList);
      setCategories(extractedCategories);
      setSelectedCategory(extractedCategories[0]); // Reset to "All Products"
    }
  }, [isRTL, productList, extractCategories]);

  const renderShimmerCards = () => {
    return Array.from({ length: 12 }, (_, index) => (
      <div key={index} className="w-full">
        <ShimmerProductCard />
      </div>
    ));
  };

  // Animation variants for the product grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.h2 
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('products.browseOurProducts', 'Browse Our Products')}
      </motion.h2>
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-full md:w-1/2 lg:w-1/3">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('common.searchPlaceholder', 'Search for a product...')}
            isRTL={isRTL}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => handleSearch(searchQuery, e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'font-cairo' : ''}`}
              style={{ 
                direction: isRTL ? 'rtl' : 'ltr',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit'
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'font-cairo' : ''}`}
              style={{ 
                direction: isRTL ? 'rtl' : 'ltr',
                fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit'
              }}
            >
              <option value="">
                {t('common.sortBy', 'Sort by')}
              </option>
              {[
                t('common.newest', 'Newest'),
                t('common.oldest', 'Oldest'),
                t('common.aToZ', 'A to Z'),
                t('common.zToA', 'Z to A')
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {loading ? (
          // Show shimmer loading state - More cards per row since they're smaller
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-auto'>
            {renderShimmerCards()}
          </div>
        ) : displayList && displayList.length > 0 ? (
          // Show actual products - More cards per row since they're smaller
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayList.map((product, index) => (
              <motion.div 
                key={product?.id || index}
                variants={itemVariants}
              >
                <div className="w-full">
                  <ProductCard
                    title={isRTL ? (product?.name_ar || product?.name_en || `Product ${index + 1}`) : (product?.name_en || product?.name_ar || `Product ${index + 1}`)}
                    subtitle={isRTL ? (product?.category_ar || product?.category_en || 'No Category') : (product?.category_en || product?.category_ar || 'No Category')}
                    image={product?.image_url}
                    initialFavorited={product?.isFavorited || false}
                    onRequestQuote={() => handleRequestQuote(product)}
                    onFavoriteToggle={(isFavorited) => handleFavoriteToggle(product?.id, isFavorited)}
                    onProductClick={() => onProductClick && onProductClick(product)}
                    product={product}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Show empty state
          <div className='w-full flex justify-center items-center py-20'>
            <div className={`text-lg text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'لم يتم العثور على منتجات' : 'No products found'}
            </div>
          </div>
        )}
      </AnimatePresence>
      {!loading && paginatedProducts.length > 0 && (
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / 24)}
            onPageChange={setCurrentPage}
            showIcons={true}
            isRTL={isRTL}
          />
        </motion.div>
      )}
    </div>
  )
}

ProductList.propTypes = {
  onProductClick: PropTypes.func.isRequired,
  onRequestQuote: PropTypes.func,
  isRTL: PropTypes.bool
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ProductList, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.isRTL === nextProps.isRTL &&
    prevProps.onProductClick === nextProps.onProductClick &&
    prevProps.onRequestQuote === nextProps.onRequestQuote
  );
});