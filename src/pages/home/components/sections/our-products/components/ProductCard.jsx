import React from 'react';

function ProductCard({ imageUrl, title, description }) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h3 className="font-instrumentsans font-semibold text-xl text-[#00271F] truncate">
          {title}
        </h3>
        <p className="font-instrumentsans text-lg text-black/50 mt-2 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;