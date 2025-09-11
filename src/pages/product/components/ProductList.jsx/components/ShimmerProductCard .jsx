import React from 'react';

function ShimmerProductCard() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-4 flex flex-col items-center gap-3 animate-pulse">
      {/* Favorite Icon Shimmer */}
      <div className="w-full flex justify-end">
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>

      {/* Product Image Placeholder */}
      <div className="w-32 h-40 bg-gray-200 rounded-lg" />

      {/* Product Name Placeholder */}
      <div className="w-3/4 h-4 bg-gray-200 rounded" />
      <div className="w-1/2 h-3 bg-gray-200 rounded" />

      {/* Button Placeholder */}
      <div className="w-full h-10 border border-gray-200 rounded-full flex justify-between items-center px-4 bg-white">
        <div className="w-1/3 h-2.5 bg-gray-200 rounded" />
        <div className="w-3 h-3 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export default ShimmerProductCard;
