import React from 'react';
import './Navbar.css';

function LightningIcon() {
  return (
    <svg viewBox="0 0 18 22" fill="none" width="18" height="22">
      <path
        d="M10.5 1L2 13H9L7.5 21L16 9H9.5L10.5 1Z"
        fill="url(#lg1)"
        stroke="rgba(255,255,255,.3)"
        strokeWidth=".5"
      />
      <defs>
        <linearGradient id="lg1" x1="2" y1="1" x2="16" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B7FE3" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="logo">
          <div className="logo-icon">
            <LightningIcon />
          </div>
          <div>
            <span className="logo-text">CotaJá</span>
            <small className="logo-sub">Marketplace de Serviços</small>
          </div>
        </div>

        <ul className="nav-links">
          <li><a href="#como-funciona">Como funciona</a></li>
          <li><a href="#recursos">Recursos</a></li>
          <li><a href="#ia">Inteligência IA</a></li>
        </ul>

        <a href="#download" className="nav-cta">Baixar App</a>
      </div>
    </nav>
  );
}

export default Navbar;
