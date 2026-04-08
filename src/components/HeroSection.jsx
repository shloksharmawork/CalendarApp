import React from 'react';
import styles from './HeroSection.module.css';
import heroImage from '../assets/hero_winter.png';

const HeroSection = ({ currentMonth }) => {
  const year = currentMonth.getFullYear();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  return (
    <div className={styles.heroContainer}>
      <svg width="100%" height="24" preserveAspectRatio="none" className={styles.bindingEffect}>
        <defs>
          <pattern id="rings" width="24" height="24" patternUnits="userSpaceOnUse">
            {/* The wire ring */}
            <rect x="9" y="0" width="2" height="16" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="13" y="0" width="2" height="16" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
            {/* The punched hole */}
            <circle cx="12" cy="15" r="4" fill="#1e293b" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="24" fill="url(#rings)" />
      </svg>
      
      <img 
        src={heroImage} 
        alt="Mountain landscape" 
        className={styles.heroImage} 
      />

      <div className={styles.yearOverlay}>
        <div className={styles.yearText}>{year}</div>
        <div className={styles.monthText}>{monthName}</div>
      </div>

      <svg 
        className={styles.bottomShape} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
      >
        <path d="M0,60 L240,100 L480,60 L720,110 L960,50 L1200,90 L1440,40 L1440,120 L0,120 Z"></path>
      </svg>
    </div>
  );
};

export default HeroSection;
