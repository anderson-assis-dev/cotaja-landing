import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import { getAppUrl } from '../utils/appLinks';
import ClientRegisterModal from './ClientRegister';

function Navbar() {
  const appUrl = getAppUrl();
  const { pathname } = useLocation();
  const hideActions = pathname === '/renda-extra';
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="/" className="logo">
          <img className="logo-img" src="/assets/images/cotaja-logo.png" alt="CotaJá" />
        </a>

        {!hideActions && (
          <>
            <ul className="nav-links">
              <li><a href="#como-funciona">Como funciona</a></li>
              <li><a href="#categorias">Categorias</a></li>
              <li><a href="#prestadores">Para prestadores</a></li>
            </ul>

            <div className="nav-actions">
              <a href={appUrl} target="_blank" rel="noopener noreferrer" className="nav-link-plain">Entrar</a>
              <button type="button" className="nav-cta" onClick={openModal}>Criar conta</button>
            </div>
          </>
        )}
      </div>

      {modalOpen && <ClientRegisterModal open={modalOpen} onClose={closeModal} />}
    </nav>
  );
}

export default Navbar;
