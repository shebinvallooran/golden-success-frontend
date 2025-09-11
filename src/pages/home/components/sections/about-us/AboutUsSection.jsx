import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../SectionHeader'
import { useNavigate } from 'react-router-dom';

function AboutUsSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='about-us-section mb-20'>
      <SectionHeader
        logoText={t('home.aboutUs.title')}
        heading={t('home.aboutUs.heading')}
        description={t('home.aboutUs.description')}
        buttonText={t('home.aboutUs.buttonText')}
        onButtonClick={() => {navigate('/about')}}
        className='customer-class'
        showLogo={true}
        showButton={true}
      />

      <div className="image-section mt-12 w-full max-w-[1240px] mx-auto overflow-hidden rounded-[16px] shadow-lg">
        <img
          src="/img/about-us-home-image.webp"
          alt={t('home.aboutUs.imageAlt')}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  )
}

export default AboutUsSection
