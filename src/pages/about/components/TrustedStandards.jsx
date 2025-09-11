import React from 'react';
import { useTranslation } from 'react-i18next';

export const TrustedStandards = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white font-sans py-24 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl md:text-5xl text-left font-semibold text-gray-800 leading-tight whitespace-pre-line">
            {t('about.trustedStandards.title')}
          </h2>
          <p className="mt-6 text-lg text-left text-gray-600 max-w-lg">
            {t('about.trustedStandards.description')}
          </p>
        </div>

        {/* Logos Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-y-10 gap-x-8">
          {/* Thermo Fisher Scientific Logo */}
          <div className="flex justify-start">
            <img src="/img/about/thermoscientific.png" alt="Thermo Fisher Scientific" className="h-14 md:h-12" />
          </div>
          {/* Sclavo Diagnostics International Logo */}
          <div className="flex justify-start">
            <img src="/img/about/sclavoDiagnostics.png" alt="Sclavo Diagnostics International" className="h-12 md:h-12" />
          </div>
          {/* Liophilchem Logo */}
          <div className="flex justify-start">
            <img src="/img/about/liofilchem.png" alt="Liophilchem" className="h-14 md:h-12" />
          </div>
          {/* LabMal Logo */}
          <div className="flex justify-start">
            <img src="/img/about/labMall.png" alt="LabMal" className="h-12 md:h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};