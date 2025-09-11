import React from 'react';

const TrustedBadge = ({ text = "Trusted Biomedical Supply.", className = '' }) => {
  return (
    <div className={`inline-block ${className}`}>
      <span className="text-primary font-medium text-sm px-4 py-2 rounded-full border border-gray-300 bg-white">
        {text}
      </span>
    </div>
  );
};

export default TrustedBadge;
