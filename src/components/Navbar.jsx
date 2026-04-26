import React from 'react';
import './Navbar.css';
import { getAppUrl } from '../utils/appLinks';

function Navbar() {
  const appUrl=getAppUrl();
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="/" className="logo">
          <img className="logo-img" src="/cotaja-logo.png" alt="CotaJá" />
        </a>

        <ul className="nav-links">
          <li><a href="#como-funciona">Como funciona</a></li>
          <li><a href="#categorias">Categorias</a></li>
          <li><a href="#prestadores">Para prestadores</a></li>
        </ul>

        <div className="nav-actions">
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="nav-link-plain">Entrar</a>
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">Criar conta</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
