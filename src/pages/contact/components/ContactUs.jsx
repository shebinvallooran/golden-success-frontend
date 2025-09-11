import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

const ContactInfoLine = ({ icon, label, text, textClasses = "text-lg" }) => (
  <div className="flex items-start mb-6">
    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-b from-[#00B4D8] to-[#04C39A] rounded-full flex items-center justify-center mr-4 mt-1">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className={`font-medium text-[#00271F] ${textClasses}`}>{text}</p>
    </div>
  </div>
);

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-md mx-auto bg-[#F8F8F8] rounded-xl p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00271F] mb-2">{t('contact.contactUs.title')}</h1>
        <p className="text-sm text-gray-500">
          {t('contact.contactUs.subtitle')}
        </p>
      </div>
       
      {/* Contact Details */}
      <div className="mb-8">
        <ContactInfoLine
          icon={<Phone size={16} color="white" />}
          label={t('contact.contactUs.phone.label')}
          text={t('contact.contactUs.phone.number')}
          textClasses="text-base"
        />
        <ContactInfoLine
          icon={<Mail size={16} color="white" />}
          label={t('contact.contactUs.email.label')}
          text={t('contact.contactUs.email.address')}
          textClasses="text-base"
        />
        <div className="flex items-start mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-b from-[#00B4D8] to-[#04C39A] rounded-full flex items-center justify-center mr-4 mt-1">
                <MapPin size={16} color="white" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{t('contact.contactUs.address.label')}</p>
                <p className="font-medium text-[#00271F] text-base">
                    {t('contact.contactUs.address.location')}
                </p>
                <p className="font-medium text-[#00271F] text-base mt-1">
                    {t('contact.contactUs.address.locationArabic')}
                </p>
            </div>
        </div>
      </div>
       
      {/* Social Links */}
      <div>
        <h3 className="text-base font-semibold text-[#00271F] mb-3">{t('contact.contactUs.social.title')}</h3>
        <div className="flex space-x-2">
          <a href="#" className="w-8 h-8 bg-[#00271F] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
            <Instagram size={16} color="white" />
          </a>
          <a href="#" className="w-8 h-8 bg-[#00271F] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
            <Linkedin size={16} color="white" />
          </a>
          <a href="#" className="w-8 h-8 bg-[#00271F] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
            <Facebook size={16} color="white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;