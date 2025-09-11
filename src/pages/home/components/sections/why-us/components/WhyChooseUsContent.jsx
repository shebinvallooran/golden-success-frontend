import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../../../../contexts/LanguageContext';

const WhyUsSectionContent = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Optimized animation variants for individual cards
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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween"
      }
    }
  };



  // Phone image animation
  const phoneVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  const cards = [
    {
      iconName: 'group-icon',
      title: t('home.whyUs.cards.sfdaCompliance.title'),
      description: t('home.whyUs.cards.sfdaCompliance.description')
    },
    {
      iconName: 'truck-icon',
      title: t('home.whyUs.cards.deliveryNetwork.title'),
      description: t('home.whyUs.cards.deliveryNetwork.description')
    },
    {
      iconName: 'gloab-icon',
      title: t('home.whyUs.cards.trustedBrands.title'),
      description: t('home.whyUs.cards.trustedBrands.description')
    },
    {
      iconName: 'dna-icon',
      title: t('home.whyUs.cards.specialization.title'),
      description: t('home.whyUs.cards.specialization.description')
    }
  ];
  const Card = ({ iconName, title, description, index }) => {
    // Direct style approach to ensure it works
    const iconContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      flexDirection: 'row' // Always use row direction
    };

    return (
      <motion.div
        className={`bg-gray-100 rounded-2xl p-6 flex flex-col space-y-4 max-w-md ${isRTL ? 'items-end' : 'items-start'}`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          transition: {
            duration: 0.3,
            ease: "easeOut",
            type: "tween"
          }
        }}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <div style={iconContainerStyle}>
          <motion.div
            className="gradient-primary-secondary-background rounded-full p-3 flex items-center justify-center flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2 + (index * 0.1),
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <img
              src={`/icons/${iconName}.svg`}
              alt={`${title} icon`}
              className="w-7 h-7 object-contain"
              loading="lazy"
            />
          </motion.div>
          <motion.h3
            className={`text-xl font-semibold text-gray-900 leading-tight flex-1 ${isRTL ? 'rtl-text-align font-cairo' : 'text-left'}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3 + (index * 0.1),
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p
          className={`text-sm text-gray-600 leading-relaxed w-full ${isRTL ? 'rtl-text-align font-cairo' : 'text-left'}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4 + (index * 0.1),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {description}
        </motion.p>
      </motion.div>
    );
  };

  Card.propTypes = {
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <section className={`flex flex-col lg:flex-row items-end justify-center gap-16 p-8 bg-white ${isRTL ? 'rtl-section' : 'ltr-section'}`}>
      {/* Left cards column (order changes in RTL) */}
      <div className={`flex flex-col gap-8 ${isRTL ? 'lg:order-3' : 'lg:order-1'}`}>
        <Card
          iconName={cards[0].iconName}
          title={cards[0].title}
          description={cards[0].description}
          index={0}
        />
        <Card
          iconName={cards[1].iconName}
          title={cards[1].title}
          description={cards[1].description}
          index={1}
        />
      </div>

      {/* Center phone image */}
      <motion.div
        className="relative w-80 h-[35rem] lg:order-2 order-3 flex items-center justify-center"
        variants={phoneVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          src="/img/phone-screen-home.png"
          alt={isRTL ? "شاشة الهاتف مع المحتوى" : "Phone with screen content"}
          className="w-full h-full object-contain"
          loading="lazy"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        />
      </motion.div>

      {/* Right cards column (order changes in RTL) */}
      <div className={`flex flex-col gap-8 ${isRTL ? 'lg:order-1' : 'lg:order-3'}`}>
        <Card
          iconName={cards[2].iconName}
          title={cards[2].title}
          description={cards[2].description}
          index={2}
        />
        <Card
          iconName={cards[3].iconName}
          title={cards[3].title}
          description={cards[3].description}
          index={3}
        />
      </div>
    </section>
  );
};

WhyUsSectionContent.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default WhyUsSectionContent;