import React from 'react';
import PropTypes from 'prop-types';

const ServiceCard = ({ image, title, description, imageAlt }) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col items-start space-y-3 sm:space-y-4 w-full h-full">
      {/* Image Container with background */}
      <div className="bg-secondary-light rounded-xl p-3 sm:p-4 flex items-center justify-center">
        <img 
          src={image}
          alt={imageAlt || title}
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
        />
      </div>
      
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-left">
        {description}
      </p>
    </div>
  );
};

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

export default ServiceCard;