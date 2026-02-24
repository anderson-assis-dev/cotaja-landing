import React from 'react';
import './Footer.css';

const links = ['Sobre', 'Termos', 'Privacidade', 'Contato', 'Blog'];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="flt">CotaJá</div>
          <div className="footer-sub">Marketplace de Serviços</div>
        </div>

        <div className="footer-links">
          {links.map((l) => (
            <a key={l} href="#download">{l}</a>
          ))}
        </div>

        <div className="footer-copy">© 2025 CotaJá. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}

export default Footer;
