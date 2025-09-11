import React from 'react';

function ProductCard({ imageUrl, title, description }) {
  return (
    <div className="relative w-[372px] h-[336px] bg-white rounded-[10px] shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={title}
        className="absolute top-0 left-0 w-full h-[256px] object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white p-[14px] flex flex-col justify-center">
        <h3 className="font-instrumentsans font-semibold text-[24px] text-[#00271F]">
          {title}
        </h3>
        <p className="font-instrumentsans text-[18px] text-black/50 mt-[7px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;