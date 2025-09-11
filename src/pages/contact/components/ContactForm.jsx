import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder }) => (
  <div className="mb-8">
    <label htmlFor={name} className="block text-lg font-medium text-[#00271F] mb-3">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full text-lg text-gray-400 border-b border-gray-300 focus:outline-none focus:border-[#00B4D8] pb-3 bg-transparent"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
    <div className="mb-8">
        <label htmlFor={name} className="block text-lg font-medium text-[#00271F] mb-3">
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            className="w-full text-lg text-gray-400 border-b border-gray-300 focus:outline-none focus:border-[#00B4D8] pb-3 resize-none bg-transparent"
        ></textarea>
    </div>
);

// The main ContactForm component
const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    company: '',
    message: '',
  });

  // Handler to update state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here,
    // for example, sending the data to an API.
    console.log('Form data submitted:', formData);
    alert(t('contact.form.successMessage')); // Replace with a more user-friendly notification
  };

  return (
    <div className="max-w-lg mx-auto p-8 font-sans bg-white">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#00271F] leading-tight">{t('contact.form.title')}</h1>
        <p className="text-base text-gray-500 mt-3">
          {t('contact.form.subtitle')}
        </p>
      </div>

      <div>
        <InputField
          label={t('contact.form.fields.fullName.label')}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t('contact.form.fields.fullName.placeholder')}
        />
        <InputField
          label={t('contact.form.fields.email.label')}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('contact.form.fields.email.placeholder')}
        />
        <InputField
          label={t('contact.form.fields.mobile.label')}
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder={t('contact.form.fields.mobile.placeholder')}
        />
        <InputField
          label={t('contact.form.fields.company.label')}
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder={t('contact.form.fields.company.placeholder')}
        />
        <TextAreaField
            label={t('contact.form.fields.message.label')}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contact.form.fields.message.placeholder')}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00B4D8] to-[#04C39A] text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-6"
        >
          {t('contact.form.submitButton')}
          <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactForm;