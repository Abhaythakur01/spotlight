import React from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import SpotlightLogo from '../assets/spotlight-v1.png';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="footer-logo">
            <img src={SpotlightLogo} alt="Spotlight Logo" />
            <span className="footer-brand-name">Spotlight</span>
          </div>
          <p className="footer-tagline">Your stage is waiting. Shine on!</p>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-heading">Stay in the Loop</h3>
          <p>Get the latest updates on events and artists directly in your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe to newsletter">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Spotlight Performing Arts. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
