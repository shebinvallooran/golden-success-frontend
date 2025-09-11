import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import WhatWeDo from './components/sections/what-we-do/WhatWeDo'
import WhyUs from './components/sections/why-us/WhyUs'
import OurProductsHome from './components/sections/our-products/OurProductsHome'
import AboutUsSection from './components/sections/about-us/AboutUsSection'
import ContactUsBanner from './components/ContactUsBanner'

function Home() {
  // Each section will animate individually when it comes into view

  return (
    <div>
      {/* Hero Section - has its own animations */}
      <div>
        <HeroSection />
      </div>

      {/* Each section animates when it comes into view */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <WhatWeDo/>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <WhyUs/>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <OurProductsHome />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AboutUsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <ContactUsBanner />
      </motion.div>
    </div>
  )
}

export default Home
