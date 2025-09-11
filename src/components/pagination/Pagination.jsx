import { ChevronLeft, ChevronRight } from 'lucide-react';

const getPaginationItems = (currentPage, totalPages) => {
  const delta = 2; // How many pages to show around the current page
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};


// --- Pagination Component ---
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }
  
  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex items-center justify-center gap-2 p-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-2">
        {paginationItems.map((page, index) => {
          const isEllipsis = page === '...';
          const isActive = page === currentPage;
          
          if (isEllipsis) {
            return (
              <span key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg text-base font-medium transition-all duration-200
                ${
                  isActive
                    ? 'bg-teal-500 text-white border border-teal-500 shadow-md' // Active styles
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400' // Inactive styles
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </nav>
  );
};