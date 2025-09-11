import React from 'react';

const LabImages = ({ className = '' }) => {
  return (
    <div className={`relative flex justify-center items-center h-[14rem] sm:h-[16rem] lg:h-[20rem] ${className}`}>
      {/* First image - back left (responsive positioning and sizing) */}
      <div className="absolute transform -rotate-12 -translate-x-24 sm:-translate-x-40 lg:-translate-x-60 translate-y-5 sm:translate-y-6 lg:translate-y-8 z-10">
        <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl overflow-hidden">
          <img
            src="/img/labHeroSection.png"
            alt="Laboratory Equipment"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Second image - center front (responsive sizing) */}
      <div className="relative z-20 transform translate-y-1 sm:translate-y-2">
        <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl overflow-hidden">
          <img
            src="/img/labHeroSection2.png"
            alt="Laboratory Research"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Third image - back right (responsive positioning and sizing) */}
      <div className="absolute transform rotate-12 translate-x-24 sm:translate-x-40 lg:translate-x-60 translate-y-5 sm:translate-y-6 lg:translate-y-8 z-10">
        <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl overflow-hidden">
          <img
            src="/img/labHeroSection3.png"
            alt="Laboratory Analysis"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LabImages;
