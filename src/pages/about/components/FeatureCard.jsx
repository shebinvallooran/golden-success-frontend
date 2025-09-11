import React from 'react'

function FeatureCard({ iconSrc, iconAlt, title, showBorder = false }) {
  return (
    <div className={`flex flex-col items-center text-center p-8 ${showBorder ? 'lg:border-r lg:border-gray-300' : ''}`}>
      <div className="mb-6">
        <img 
          src={iconSrc} 
          alt={iconAlt}
          className="w-12 h-12 object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 leading-tight">
        {title}
      </h3>
    </div>

  )
}

export default FeatureCard
