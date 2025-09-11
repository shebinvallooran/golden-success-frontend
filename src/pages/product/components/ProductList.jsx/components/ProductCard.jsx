import { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../../../../../api/axiosInstance';

export const ProductCard = ({
  title = "Product Title",
  subtitle = "(Pack Size)",
  image,
  onRequestQuote,
  onFavoriteToggle,
  onProductClick,
  initialFavorited = false,
  className = "",
  product = null
}) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    if (onFavoriteToggle) {
      onFavoriteToggle(newFavoriteState);
    }
  };



  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleFavoriteClickWithStop = (e) => {
    e.stopPropagation(); // Prevent card click when favorite button is clicked
    handleFavoriteClick();
  };

  return (
    <div className={`relative w-full h-content bg-white flex flex-col gap-3 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}>
      {/* Favorite Button */}
      {/* <button
        onClick={handleFavoriteClickWithStop}
        className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group z-10"
      >
        <Heart
          className={`w-3.5 h-3.5 transition-colors duration-300 ${
            isFavorited
              ? 'fill-red-500 text-red-500'
              : 'text-gray-600 group-hover:text-red-500 group-hover:fill-red-500'
          }`}
        />
      </button> */}

      {/* Clickable Card Area - Image and Text */}
      <div
        className="cursor-pointer flex-1"
        onClick={handleCardClick}
      >
        {/* Image Section */}
        <div className="w-full h-[230px] bg-[#E9E9E9] flex items-center justify-center p-8 rounded-xl">
          <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
            {image ? (
              <img
                src={getImageUrl(image)}
                alt={title}
                className="w-full h-full "
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <div
              className="text-center text-gray-500 p-2"
              style={{ display: image ? 'none' : 'block' }}
            >
              <div className="text-xs font-semibold mb-1 truncate">{title.split(' ')[0]}</div>
              <div className="text-[10px] truncate">{title.split(' ')[1] || 'Product'}</div>
              <div className="w-8 h-6 border-2 border-gray-400 rounded mx-auto mt-1"></div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="px-4 py-2">
          <h3 className="text-sm font-semibold text-black leading-tight truncate">{title}</h3>
          <p className="text-xs text-black/70 mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>

      {/* View Details Button - Separate from clickable area */}
      <button
        onClick={handleCardClick}
        className="mt-1 mx-4 mb-4 h-8 w-fit bg-white border border-gray-900 rounded-full hover:bg-gray-50 flex items-center gap-3 px-3 group shadow-sm"
      >
        <span className="text-green-900 font-semibold text-xs">
          View Details
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-green-900 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  onRequestQuote: PropTypes.func,
  onFavoriteToggle: PropTypes.func,
  onProductClick: PropTypes.func,
  initialFavorited: PropTypes.bool,
  className: PropTypes.string,
  product: PropTypes.object
};
