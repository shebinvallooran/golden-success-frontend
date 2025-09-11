import React from 'react';
import { useTranslation } from 'react-i18next';

const MissionVisionSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* Our Mission */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                {t('about.mission.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed opacity-80">
                {t('about.mission.description')}
              </p>
            </div>
            
            <div className="flex-1 flex items-start gap-4">
              {/* Small image */}
              <div className="w-40 h-44">
                <img
                  src="/img/about/ourMissionImg1.png"
                  alt={t('about.mission.imageAlt1')}
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>
              
              {/* Large image */}
              <div className=" h-80 w-80">
                <img
                  src="/img/about/ourMissionImg2.png"
                  alt={t('about.mission.imageAlt2')}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Our Vision */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                {t('about.vision.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed opacity-80">
                {t('about.vision.description')}
              </p>
            </div>
            
            <div className="flex-1 flex items-start gap-4">
              {/* Small image */}
              <div className="w-40 h-44">
                <img
                  src="/img/about/ourVisionImg1.png"
                  alt={t('about.vision.imageAlt1')}
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>
              
              {/* Large image */}
              <div className="w-80 h-80">
                <img
                  src="/img/about/ourVisionImg1.png"
                  alt={t('about.vision.imageAlt2')}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;