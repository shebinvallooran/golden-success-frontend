import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar'
import { ProductCard } from './components/ProductCard';
import { getProducts } from '../../../../api/axiosInstance';
import { Pagination } from '../../../../components/pagination/Pagination';
import ShimmerProductCard from './components/ShimmerProductCard ';
import { useLanguage } from '../../../../contexts/LanguageContext';

function ProductList({ onProductClick }) {
  const { isRTL } = useLanguage();
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayList, setDisplayList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
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
    const allProductsLabel = isRTL ? 'جميع المنتجات' : 'All Products';
    return [allProductsLabel, ...uniqueCategories.sort()];
  }, [isRTL]);

  // Filter products based on search query and category
  const filterProducts = useCallback((products, query, category) => {
    let filtered = [...products];

    // Filter by category
    if (category && category !== (isRTL ? 'جميع المنتجات' : 'All Products')) {
      filtered = filtered.filter(product =>
        product.category_en === category || product.category_ar === category
      );
    }

    // Filter by search query (search in both languages)
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filtered = filtered.filter(product => {
        const nameEn = (product.name_en || '').toLowerCase();
        const nameAr = (product.name_ar || '').toLowerCase();
        const descEn = (product.description_en || '').toLowerCase();
        const descAr = (product.description_ar || '').toLowerCase();
        const catEn = (product.category_en || '').toLowerCase();
        const catAr = (product.category_ar || '').toLowerCase();

        return nameEn.includes(searchTerm) ||
               nameAr.includes(searchTerm) ||
               descEn.includes(searchTerm) ||
               descAr.includes(searchTerm) ||
               catEn.includes(searchTerm) ||
               catAr.includes(searchTerm);
      });
    }

    return filtered;
  }, [isRTL]);

  // Sort products based on selected option
  const sortProducts = useCallback((products, sortOption) => {
    if (!sortOption) return products;

    const sorted = [...products];

    switch (sortOption) {
      case 'A to Z':
      case 'أ إلى ي':
        return sorted.sort((a, b) => {
          const nameA = isRTL ? (a.name_ar || a.name_en || '') : (a.name_en || a.name_ar || '');
          const nameB = isRTL ? (b.name_ar || b.name_en || '') : (b.name_en || b.name_ar || '');
          return nameA.localeCompare(nameB);
        });
      case 'Z to A':
      case 'ي إلى أ':
        return sorted.sort((a, b) => {
          const nameA = isRTL ? (a.name_ar || a.name_en || '') : (a.name_en || a.name_ar || '');
          const nameB = isRTL ? (b.name_ar || b.name_en || '') : (b.name_en || b.name_ar || '');
          return nameB.localeCompare(nameA);
        });
      default:
        return sorted;
    }
  }, [isRTL]);

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
    setCurrentPage(0); // Reset to first page when searching

    // Apply filters and sorting
    let filtered = filterProducts(productList, query, category);
    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);

    // Update pagination
    const batches = convertToPaginatedList(filtered, 24);
    setPaginatedProducts(batches);
  }, [productList, sortBy, filterProducts, sortProducts, convertToPaginatedList]);

  // Handle sorting functionality
  const handleSort = useCallback((sortOption) => {
    setSortBy(sortOption);
    setCurrentPage(0); // Reset to first page when sorting

    // Apply sorting to current filtered products
    const sorted = sortProducts(filteredProducts, sortOption);
    setFilteredProducts(sorted);

    // Update pagination
    const batches = convertToPaginatedList(sorted, 24);
    setPaginatedProducts(batches);
  }, [filteredProducts, sortProducts, convertToPaginatedList]);

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

  return (
    <div className='w-full min-h-screen bg-gray-50 pt-20'>
      <div className='w-full border-t border-b border-gray-200 bg-white'>
        <SearchBar
          categories={categories}
          onSearch={handleSearch}
          onSort={handleSort}
          placeholder={isRTL ? "ما الذي تبحث عنه؟" : "What are you looking for?"}
          isRTL={isRTL}
        />
      </div>
      
      <div className='w-full px-4 py-6'>
        {loading ? (
          // Show shimmer loading state - More cards per row since they're smaller
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-auto'>
            {renderShimmerCards()}
          </div>
        ) : displayList && displayList.length > 0 ? (
          // Show actual products - More cards per row since they're smaller
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-auto'>
            {displayList.map((product, index) => {
              const title = isRTL ?
                (product?.name_ar || product?.name_en || `منتج ${index + 1}`) :
                (product?.name_en || product?.name_ar || `Product ${index + 1}`);

              const subtitle = isRTL ?
                (product?.category_ar || product?.category_en || 'لا تصنيف') :
                (product?.category_en || product?.category_ar || 'No Category');

              return (
                <div key={product?.id || index} className="w-full">
                  <ProductCard
                    title={title}
                    subtitle={subtitle}
                    image={product?.image_url}
                    initialFavorited={product?.isFavorited || false}
                    onRequestQuote={() => handleRequestQuote(product)}
                    onFavoriteToggle={(isFavorited) => handleFavoriteToggle(product?.id, isFavorited)}
                    onProductClick={() => onProductClick && onProductClick(product)}
                    product={product}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          // Show empty state
          <div className='w-full flex justify-center items-center py-20'>
            <div className={`text-lg text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'لم يتم العثور على منتجات' : 'No products found'}
            </div>
          </div>
        )}
      </div>
      
      {!loading && paginatedProducts.length > 1 && (
        <div className="pagination-container w-full flex justify-center pb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedProducts.length}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

ProductList.propTypes = {
  onProductClick: PropTypes.func
};

export default ProductList