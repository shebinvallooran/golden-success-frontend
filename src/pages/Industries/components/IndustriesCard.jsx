
import React from 'react';

// A custom checkmark icon component
const CheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.64 0H0V9C0 10.6568 1.34315 12 3 12H5.64V3C5.64 1.34315 4.29685 0 2.64 0ZM9.36 0C7.70316 0 6.36 1.34315 6.36 3V12H9C10.6568 12 12 10.6568 12 9V0H9.36Z" fill="url(#paint0_linear_419_208)"/>
        <defs>
            <linearGradient id="paint0_linear_419_208" x1="0" y1="6" x2="12" y2="6" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00B4D8"/>
                <stop offset="1" stop-color="#04C39A"/>
            </linearGradient>
        </defs>
    </svg>
);

export const IndustryCard = ({ imageSrc, title, points }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 leadin-normal text-left">{title}</h3>
        <ul className="space-y-4 flex-1">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-gray-600 text-[15px] leading-none flex-1 text-left">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
