import React from 'react';
import './AppDownload.css';
import { APPLE_APP_URL, GOOGLE_PLAY_URL } from '../utils/appLinks';

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M3.18 23.83A2 2 0 0 1 2 22.06V1.94A2 2 0 0 1 3.18.17L13.9 12 3.18 23.83zm17.09-9.93l-2.98 1.72L14.6 12l2.7-2.7 2.97 1.72a1.5 1.5 0 0 1 0 2.58zM4.34.8l10.3 11.07-2.54 2.54L4.34.8zm0 22.4l7.76-13.61L9.56 12l-5.22 11.2z"/>
  </svg>
);

function AppDownload() {
  return (
    <section className="app-download" id="download">
      <div className="app-download-inner reveal">
        <div className="app-download-text">
          <span className="s-eye">Disponível agora</span>
          <h2 className="s-title">
            Baixe o app <span className="grad-text">CotaJá</span>
          </h2>
          <p className="s-sub">
            Contrate serviços ou ofereça os seus diretamente pelo celular.
            Rápido, seguro e gratuito para baixar.
          </p>
          <div className="app-download-badges">
            <a
              href={APPLE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-badge apple"
              aria-label="Baixar na App Store"
            >
              <AppleIcon />
              <span>
                <small>Disponível na</small>
                App Store
              </span>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-badge google"
              aria-label="Baixar no Google Play"
            >
              <PlayIcon />
              <span>
                <small>Disponível no</small>
                Google Play
              </span>
            </a>
          </div>
        </div>

        <div className="app-download-art">
          <div className="app-download-circle app-download-circle-1" />
          <div className="app-download-circle app-download-circle-2" />
          <div className="app-download-phone">
            <img
              src="/assets/images/home-client-app.jpeg"
              alt="Tela inicial do app CotaJá"
              className="app-download-screenshot"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppDownload;
