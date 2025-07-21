import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, translations } from './LanguageContext';  // Adjust path if necessary
import './Footer.css';

const Footer = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <footer className="footer-container">
      <div>
        <h4 className="footer-site-name">RoyalStats</h4>
        <small className="footer-copyright">
          © {new Date().getFullYear()} RoyalStats. All rights reserved.
        </small>
      </div>
      <nav>
        <Link to="/" className="footer-link">{translations.homepage.homeLinkText?.[language] || 'Home'}</Link>
        <Link to="/fleet" className="footer-link">{translations.homepage.fleetLinkText?.[language] || 'Fleet'}</Link>
        <Link to="/prices" className="footer-link">{translations.homepage.pricesLinkText?.[language] || 'Prices'}</Link>
      </nav>
      <div className="footer-language-toggle-container">
        <small className="footer-language-toggle">
          {translations.homepage.languageToggleInfo?.[language] || 'Use the language toggle to switch languages'}
        </small>
        <button className="language-toggle" onClick={toggleLanguage}>
          {language === 'en' ? 'EN' : 'FR'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;