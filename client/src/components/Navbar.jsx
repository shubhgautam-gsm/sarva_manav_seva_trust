import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import logo from '../imgs/trust_logo.png'

export default function Navbar({ onThemeToggle, isLight }){
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/', text: t('nav.home') },
    { to: '/about', text: t('nav.about') },
    { to: '/services', text: t('nav.services') },
    { to: '/donate', text: t('nav.donate') },
    { to: '/media', text: t('nav.media') },
    { to: '/join', text: t('nav.join') },
    { to: '/contact', text: t('nav.contact') },
    { to: '/admin', text: t('nav.admin') }
  ];

  return (
    <nav role="navigation" aria-label="Main">
      <div className="brand">
        <div className="logo"><img width='100%' src={logo} alt="" /></div>
        <div className="title">{t('hero.title')}</div>
      </div>
      <div className={`links ${isMenuOpen ? 'show' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.text}
          </NavLink>
        ))}
      </div>
      
      <div className="controls">
        <LanguageToggle />
      </div>
            <button className="menu-toggle" onClick={toggleMenu}>☰</button>

    </nav>
  );
}