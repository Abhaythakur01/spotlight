// src/Views/HomePage.js
import React, { useState } from 'react';
import './HomePage.css'; // Path relative to src/Views/
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [isBlue, setIsBlue] = useState(false);
  const { t } = useTranslation();

  const toggleColor = () => setIsBlue(!isBlue);

  return (
    <div className={`cafe-homepage ${isBlue ? 'blue-theme' : ''}`}>
      <section id="why-spotlight" className="why-spotlight-section">
        <h2 className="section-title">{t('whySpotlightTitle')}</h2>
        <div className="spotlight-description-content">
          <p>{t('spotlightBrief1')}</p>
          <p>{t('spotlightBrief2')}</p>
          <p>{t('spotlightBrief3')}</p>
          <p>{t('spotlightBrief4')}</p>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
