import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Funnel, Search } from 'lucide-react';

const SearchBar = ({
  categories = ['All Products', 'Electronics', 'Clothing', 'Books', 'Home & Garden'],
  onSearch = (query, category) => console.log('Search:', query, 'Category:', category),
  onSort = (sortBy) => console.log('Sort by:', sortBy),
  placeholder = "What are you looking for?",
  className = "",
  isRTL = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || (isRTL ? 'جميع المنتجات' : 'All Products'));
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // Multi-language sort options
  const sortOptions = isRTL ? ['أ إلى ي', 'ي إلى أ'] : ['A to Z', 'Z to A'];
  const sortByLabel = isRTL ? 'ترتيب حسب' : 'Sort By';

  // Sync selectedCategory when categories prop changes
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);



  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    // Trigger search with new category
    onSearch(searchQuery, category);
  };

  const handleSortSelect = (option) => {
    onSort(option);
    setIsSortOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex items-center justify-between w-full max-w-5xl mx-auto py-2 ${className} ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="relative" ref={categoryRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 px-4 py-3 bg-transparent hover:bg-gray-50 transition-colors duration-200 min-w-[130px] justify-between h-12 rounded-md ${
            isDropdownOpen ? 'bg-gray-50' : ''
          } ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span className={`text-sm font-semibold ${
            isDropdownOpen ? 'text-teal-600' : 'text-gray-800'
          } ${isRTL ? 'font-cairo' : ''}`}>{selectedCategory}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-teal-600' : 'text-gray-600'}`} />
        </button>

        {isDropdownOpen && (
          <div className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px] ${isRTL ? 'right-0' : 'left-0'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-sm first:rounded-t-lg last:rounded-b-lg ${
                  category === selectedCategory ? 'bg-gray-50 text-teal-600 font-medium' : 'text-gray-700'
                } ${isRTL ? 'text-right font-cairo' : 'text-left'}`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex-1 max-w-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const newQuery = e.target.value;
            setSearchQuery(newQuery);
            // Trigger real-time search
            onSearch(newQuery, selectedCategory);
          }}
          placeholder={placeholder}
          className={`w-full py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700 placeholder-gray-500 h-12 rounded-[50px] ${
            isRTL ? 'pr-6 pl-12 text-right font-cairo' : 'pl-6 pr-12 text-left'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center ${
            isRTL ? 'left-2' : 'right-2'
          }`}
        >
          <Search className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="relative" ref={sortRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className={`flex items-center gap-2 px-4 py-3 bg-transparent hover:bg-gray-50 transition-colors duration-200 h-12 rounded-md ${
            isSortOpen ? 'bg-gray-50' : ''
          } ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Funnel className={`w-4 h-4 transition-colors duration-200 ${isSortOpen ? 'text-teal-600' : 'text-gray-600'}`} />
          <span className={`text-sm font-semibold ${
            isSortOpen ? 'text-teal-600' : 'text-gray-800'
          } ${isRTL ? 'font-cairo' : ''}`}>{sortByLabel}</span>
        </button>

        {isSortOpen && (
          <div className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px] ${isRTL ? 'left-0' : 'right-0'}`}>
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSortSelect(option)}
                className={`w-full px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                  isRTL ? 'text-right font-cairo' : 'text-left'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;