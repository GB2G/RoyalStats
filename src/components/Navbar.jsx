import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

import { useLanguage } from './LanguageContext';
import royalLogo from '../assets/rcl-logo.png';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-home-link">
          <img src={royalLogo} alt="Royal Caribbean Logo" className="navbar-logo" />
          <h3>{language === 'en' ? 'RoyalStats' : 'DonnésRoyal'}</h3>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">{language === 'en' ? 'Home' : 'Accueil'}</Link></li>
        <li><Link to={`/prices/${language}`}>{language === 'en' ? 'Pricing' : 'Prix'}</Link></li>
        <li><Link to={`/fleet/${language}`}>{language === 'en' ? 'Fleet' : 'Flotte'}</Link></li>
      </ul>
      <div className="language-switch">
        <span className="language-label">Language:</span>
        <button className="language-toggle" onClick={toggleLanguage}>
          {language === 'en' ? 'EN' : 'FR'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;