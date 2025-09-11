import React from 'react'
import { useTranslation } from 'react-i18next'
import ContactUs from './components/ContactUs'
import ContactForm from './components/ContactForm'

function Contact() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Us Section */}
          <div className="w-full bg-white rounded-xl shadow-sm">
            <ContactUs />
          </div>
          
          {/* Contact Form Section */}
          <div className="w-full bg-white rounded-xl shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
