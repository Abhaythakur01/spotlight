// src/Views/Header.js

// 1. Import GSAP and its ScrollTrigger plugin at the top
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { FaMobileAlt, FaChevronDown, FaStar } from 'react-icons/fa';
import SpotlightLogo from '../assets/spotlight-v1.png';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import HeroVideo from '../assets/hero-video.mp4';
import MagneticButton from '../components/MagneticButton'; 

// 2. Register the GSAP plugin right after imports
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isExploreOpen, setExploreOpen] = useState(false);
  const [isWhoAreYouOpen, setWhoAreYouOpen] = useState(false);
  
  const profileRef = useRef(null);
  const exploreRef = useRef(null);
  const whoAreYouRef = useRef(null);
  
  // 3. Add a ref for the navbar element
  const navbarRef = useRef(null); 

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
      if (whoAreYouRef.current && !whoAreYouRef.current.contains(event.target)) {
        setWhoAreYouOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 4. Add the useEffect for the scroll animation
  useEffect(() => {
    // Only apply the animation on the homepage for logged-out users
    if (!currentUser && isHomePage) {
      const navbar = navbarRef.current;

      // Use ScrollTrigger to toggle a class when scrolling
      const trigger = ScrollTrigger.create({
        // THE FIX: Add the 'trigger' property here to watch the navbar
        trigger: navbar,

        start: "top top", // Trigger when the top of the page hits the top of the viewport
        end: "+=150",   // End the trigger after scrolling 150px
        onToggle: self => {
          // Add the 'scrolled' class when active (scrolling down), remove it when inactive (at the top)
          self.isActive ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
        }
      });

      // Cleanup function to kill the trigger when the component unmounts
      return () => {
        if (trigger) {
          trigger.kill();
        }
      };
    }
  }, [currentUser, isHomePage]); // Rerun this effect if login status or page changes

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  return (
    <div className={!currentUser && isHomePage ? "landing-container" : "header-only-container"}>
      {!currentUser && isHomePage && (
        <video autoPlay loop muted className="background-video">
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="content-overlay">
        {/* 5. Attach the ref to the header element */}
        <header className="navbar" ref={navbarRef}>
          <div className="logo">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={SpotlightLogo} alt="Spotlight Logo" height={30} />
              <span className="brand-name">Spotlight</span>
            </Link>
          </div>
          <nav className="nav-links">
            {/* ... Rest of your nav links ... */}
            <div className="nav-explore-container" ref={exploreRef}>
              <button onClick={() => setExploreOpen(!isExploreOpen)} className="nav-button-link" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                Explore <FaChevronDown size={12} />
              </button>
              {isExploreOpen && (
                <div className="explore-dropdown">
                  <Link to="/blog" className="explore-dropdown-link" onClick={() => setExploreOpen(false)}>Blog</Link>
                  <a href="/#" className="explore-dropdown-link" onClick={() => setExploreOpen(false)}>Events (Coming Soon)</a>
                  <a href="/#" className="explore-dropdown-link" onClick={() => setExploreOpen(false)}>Success Stories</a>
                </div>
              )}
            </div>

            <a href="/#why-spotlight">{t('whySpotlight')}</a>
            
            <div className="nav-explore-container" ref={whoAreYouRef}>
              <button onClick={() => setWhoAreYouOpen(!isWhoAreYouOpen)} className="nav-button-link" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                Who are you? <FaChevronDown size={12} />
              </button>
              {isWhoAreYouOpen && (
                <div className="explore-dropdown">
                  <Link to="/artists/stand-up-comic" className="explore-dropdown-link" onClick={() => setWhoAreYouOpen(false)}>Stand up comic</Link>
                  <Link to="/artists/poet" className="explore-dropdown-link" onClick={() => setWhoAreYouOpen(false)}>Poet</Link>
                  <Link to="/artists/storyteller" className="explore-dropdown-link" onClick={() => setWhoAreYouOpen(false)}>Storyteller</Link>
                  <Link to="/artists/singer" className="explore-dropdown-link" onClick={() => setWhoAreYouOpen(false)}>Singer</Link>
                  <Link to="/artists/dancer" className="explore-dropdown-link" onClick={() => setWhoAreYouOpen(false)}>Dancer</Link>
                  <Link to="/artists/theater-artist" className="explore-dropdown-link" onClick={() => setWhoAreYouOpen(false)}>Theater Artist</Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="nav-button-link">{t('blog')}</Link>
            
            <Link to="/membership" className="nav-membership-link">
              <FaStar className="membership-icon" />
              <span>Membership</span>
            </Link>

            <button onClick={() => navigate('/auth')} className="nav-button-link">{t('account')}</button>
          </nav>
          
          <div className="header-actions">
            {/* ... Your language selector and profile section ... */}
            <select 
              onChange={(e) => i18n.changeLanguage(e.target.value)} 
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
              <div className="profile-container" ref={profileRef}>
                <button onClick={() => setProfileOpen(!isProfileOpen)} className="profile-icon-btn">
                  <div className="profile-initials-avatar">
                    {getInitials(currentUser.displayName)}
                  </div>
                </button>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <p className="profile-name">{currentUser.displayName || 'User'}</p>
                      <p className="profile-email">{currentUser.email}</p>
                    </div>
                    <button onClick={logout} className="dropdown-logout-btn">{t('logout')}</button>
                  </div>
                )}
              </div>
            ) : (
              <MagneticButton onClick={() => navigate('/auth')} className="get-started-btn">
                Login/Signup
              </MagneticButton>
            )}
          </div>
        </header>
        {!currentUser && isHomePage && (
          <section className="hero-text">
            {/* ... Rest of your hero text ... */}
            <MagneticButton onClick={() => navigate('/auth')} className="register-btn">
              {t('registerNow')}
            </MagneticButton>
            <div className="app-coming">
              <FaMobileAlt />
              <span>{t('appComingSoon')}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Header;