import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { quoteService } from '../../../services/quoteService';
import { motion, AnimatePresence } from 'framer-motion';

// Fully responsive InputField component
const InputField = ({ label, type = 'text', name, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full h-10 px-3 text-sm text-gray-700 
                 bg-white border border-gray-300 rounded-md 
                 focus:outline-none focus:ring-1 focus:ring-[#20B2AA] focus:border-[#20B2AA] 
                 placeholder-gray-400 transition-all duration-200 hover:border-gray-400"
      min={type === 'number' ? '1' : undefined}
    />
  </div>
);

// Fully responsive TextAreaField component
const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="3"
      className="w-full px-3 py-2 text-sm text-gray-700 
                 bg-white border border-gray-300 rounded-md 
                 focus:outline-none focus:ring-1 focus:ring-[#20B2AA] focus:border-[#20B2AA] 
                 placeholder-gray-400 transition-all duration-200 hover:border-gray-400 
                 resize-none min-h-[80px]"
    ></textarea>
  </div>
);

// Fully responsive ContactForm component
const ContactForm = ({ initialProductName = '', onSuccess = null }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    company: '',
    productName: initialProductName || '',
    quantity: '',
    message: '',
  });

  useEffect(() => {
    if (initialProductName) {
      setFormData((prevData) => ({
        ...prevData,
        productName: initialProductName,
      }));
    }
  }, [initialProductName]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      const quoteData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        company: formData.company,
        product_name: formData.productName,
        quantity: parseInt(formData.quantity, 10) || 1,
        message: formData.message,
      };

      await quoteService.createQuoteRequest(quoteData);

      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        company: '',
        productName: initialProductName || '',
        quantity: '',
        message: '',
      });

      setSubmitStatus({
        success: true,
        message: t('contact.form.successMessage') || 'Your enquiry has been submitted successfully!',
      });

      // Auto-reset back to inputs form after 5 seconds with animation
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          setSubmitStatus({ success: false, message: '' });
        }
      }, 5000);

    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitStatus({
        success: false,
        message: t('contact.form.errorMessage') || 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-none mx-0 p-0 font-sans bg-transparent">
      {/* Responsive error message */}
      {submitStatus.message && !submitStatus.success && (
        <div className="p-3 sm:p-4 mb-4 sm:mb-6 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium bg-red-50 text-red-700 border border-red-200">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 sm:mr-3 flex-shrink-0 bg-red-400"></div>
            <span className="break-words">{submitStatus.message}</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {submitStatus.success ? (
          <motion.div
            key="success-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-10 px-6 sm:py-12 sm:px-10 bg-white border border-green-100 rounded-xl sm:rounded-2xl shadow-xl text-center"
          >
            {/* Professional checkmark animation */}
            <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6">
              {/* Outer pulsing glow */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#20B2AA]"
              />
              {/* Inner Circle scale up */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#20B2AA] to-[#04C39A] text-white shadow-lg shadow-teal-100"
              >
                {/* SVG path drawing */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            </div>

            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-2xl font-bold text-gray-900 mb-2"
            >
              {t('contact.form.successTitle', 'Thank You!')}
            </motion.h3>
            
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-base text-gray-600 max-w-md mb-8"
            >
              {submitStatus.message}
            </motion.p>

            {/* Timed countdown bar */}
            <div className="w-full max-w-xs bg-gray-100 h-1 rounded-full overflow-hidden relative mb-2">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute top-0 bottom-0 left-0 bg-[#20B2AA]"
              />
            </div>
             <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">
              {t('contact.form.returningToForm', 'Returning to form in a few seconds...')}
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="inputs-container"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-0"
          >
            {/* Responsive grid for Full Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <InputField
                label={t('contact.form.fields.fullName.label')}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t('contact.form.fields.fullName.placeholder')}
                required
              />
              <InputField
                label={t('contact.form.fields.email.label')}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.fields.email.placeholder')}
                required
              />
            </div>

            {/* Responsive grid for Mobile and Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <InputField
                label={t('contact.form.fields.mobile.label')}
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder={t('contact.form.fields.mobile.placeholder')}
                required
              />
              <InputField
                label={t('contact.form.fields.company.label')}
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('contact.form.fields.company.placeholder')}
              />
            </div>

            {/* Responsive grid for Product Name and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <InputField
                label={t('contact.form.fields.productName.label')}
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder={t('contact.form.fields.productName.placeholder')}
                required
              />
              <InputField
                label={t('contact.form.fields.quantity.label')}
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder={t('contact.form.fields.quantity.placeholder')}
                required
              />
            </div>

            {/* Full-width responsive message field */}
            <div className="w-full">
              <TextAreaField
                label={t('contact.form.fields.message.label')}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.form.fields.message.placeholder')}
              />
            </div>

            {/* Fully responsive submit button */}
            <div className="pt-1 sm:pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient group flex items-center justify-center text-white hover:text-[#04C39A] transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="truncate">{t('contact.form.submittingButton')}</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="truncate">{t('contact.form.submitButton')}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="ml-2"
                    >
                      <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;