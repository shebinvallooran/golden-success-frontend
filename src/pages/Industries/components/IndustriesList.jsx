import React from 'react';
import { motion } from 'framer-motion';
import { IndustryCard } from './IndustriesCard';

const industriesData = [
  {
    imageSrc: '/img/industries/clinicalLaboratories.png',
    title: 'Clinical Laboratories',
    points: [
      'Solutions for microbiology, hematology, and biochemistry labs.',
      'Rapid diagnostic kits, stains, reagents, culture media.',
      'Supporting hospital labs and private diagnostic centers.',
    ],
  },
  {
    imageSrc: '/img/industries/pharmaceuticalIndustry.png',
    title: 'Pharmaceutical Industry',
    points: [
      'Bulk reagents, analytical chemicals, media powders for R&D.',
      'QC tools to support manufacturing and formulation labs.',
      'Compliant with international regulatory frameworks.',
    ],
  },
  {
    imageSrc: '/img/industries/food-Beverage.png',
    title: 'Food & Beverage Testing Labs',
    points: [
      'Kits for foodborne pathogen detection, hygiene monitoring.',
      'Media and reagents tailored to meat, dairy, and processed foods.',
      'Ensure public safety through microbiological integrity.',
    ],
  },
  {
    imageSrc: '/img/industries/dairy-milk.png',
    title: 'Dairy & Milk Testing Facilities',
    points: [
      'Solutions for bacterial contamination, spoilage detection.',
      'Rapid test strips, media, and veterinary diagnostic tools.',
      'Ideal for cooperatives, dairies, and quality labs.',
    ],
  },
  {
    imageSrc: '/img/industries/veterinary.png',
    title: 'Veterinary Diagnostic Centers',
    points: [
      'Animal health diagnostic kits for clinical and field use.',
      'Serological and rapid assay tools for zoonotic disease monitoring',
      'Trusted by veterinary hospitals and government health bodies.',
    ],
  },
  {
    imageSrc: '/img/industries/water-enviorment.png',
    title: 'Water & Environmental Testing',
    points: [
      'Microbial testing kits for drinking water, waste, and surface water.',
      'Disposables and culture media for safe, precise analysis.',
      'Ideal for government labs, utilities, and research institutions.',
    ],
  },
];

const IndustriesList = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {industriesData.map((industry, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <IndustryCard
                imageSrc={industry.imageSrc}
                title={industry.title}
                points={industry.points}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesList;