import React from 'react';
import './HomePage.css';
import { useTranslation } from 'react-i18next';
import AuthSection from '../components/AuthSection'; // Import the new component

function HomePage() {
  const { t } = useTranslation();

  return (
    // Use a main container for the entire non-header content of the homepage
    <main className="homepage-content">
      
      {/* This section remains for your "Why Spotlight?" content.
          It will now have its own dark background, separate from the hero image. */}
      <section id="why-spotlight" className="why-spotlight-section">
        <h2 className="section-title">{t('whySpotlightTitle')}</h2>
        <div className="spotlight-description-content">
          <p>{t('spotlightBrief1')}</p>
          <p>{t('spotlightBrief2')}</p>
          <p>{t('spotlightBrief3')}</p>
          <p>{t('spotlightBrief4')}</p>
        </div>
      </section>
      
      {/* The authentication section is now a distinct part of the page flow */}
      <AuthSection />

    </main>
  );
}
export default HomePage;
