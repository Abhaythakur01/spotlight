// src/Views/Header.js
import React from 'react';
import './Header.css'; // Path relative to src/Views/
import { FaMobileAlt } from 'react-icons/fa';
import SpotlightLogo from '../assets/spotlight-v1.png'; // Path relative to src/Views/assets/
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext'; // Import useAuth hook from src/AuthContext.js

const Header = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, logout } = useAuth();

  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    console.log('Language changed to:', langCode);
  };

  return (
    <div className="landing-container">
      <header className="navbar">
        <div className="logo">
          <img src={SpotlightLogo} alt="Spotlight Logo" height={30} />
          <span className="brand-name">Spotlight</span>
        </div>

        <nav className="nav-links">
          <a href="#why-spotlight">{t('whySpotlight')}</a>
          <a href="#events">{t('events')}</a>
          <a href="#register">{t('register')}</a>
          <a href="#help">{t('help')}</a>
          <a href="#blog">{t('blog')}</a>
          <a href="#account">{t('account')}</a>
        </nav>

        <div className="header-actions">
          <select
            onChange={handleLanguageChange}
            className="language-selector"
            defaultValue={i18n.language}
          >
            <option value="">{t('Select Language')}</option>
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
          {currentUser ? (
            <button onClick={logout} className="get-started-btn">
              {t('logout')}
            </button>
          ) : (
            <button className="get-started-btn">
              {t('login')}
            </button>
          )}
        </div>
      </header>

      <section className="hero-text">
        
        
        {/* REMOVED: The text "PERFORMING ARTS PLATFORM" */}
        {/* <h2 className="hero-category-text">{t('performingArtsPlatform')}</h2> */}

        <button className="register-btn">{t('registerNow')}</button>
        <div className="app-coming">
          <FaMobileAlt />
          <span>{t('appComingSoon')}</span>
        </div>
      </section>
    </div>
  );
};

export default Header;
