import React from 'react';
import './CTA.css';

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M3.18 23.76c.3.17.64.24.99.2l12.37-12.37-2.63-2.63L3.18 23.76zm17.62-10.09L17.97 12l2.83-1.67-7.2-12.08A.98.98 0 0012.7 0l-8.7 21.79 2.83-2.83 14-5.29zm.8-3.54L19.26 9l.34.2L21.6 10c.45.27.72.77.72 1.3s-.27 1.03-.72 1.3l-1.7 1-.35.2 1.05.61zM5.93.23A.98.98 0 004.7.04L3.18.92l10.73 10.73 2.63-2.63L5.93.23z" />
    </svg>
  );
}

function CTA() {
  return (
    <section className="cta-sec">
      <div className="container">
        <div className="cta-box reveal">
          <span className="s-eye" style={{ marginBottom: '14px' }}>Baixe agora — Gratuito</span>
          <h2>Comece a economizar<br />na próxima contratação</h2>
          <p className="s-sub">
            Mais de 50 mil empresas já usam o CotaJá para contratar de forma inteligente, rápida e segura.
          </p>
          <div className="cta-stores">
            <a href="#download" className="btn-store">
              <AppleIcon />
              <div className="bsl">
                <small>Baixar na</small>
                <strong>App Store</strong>
              </div>
            </a>
            <a href="#download" className="btn-store">
              <PlayIcon />
              <div className="bsl">
                <small>Disponível no</small>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
