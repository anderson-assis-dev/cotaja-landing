import React from 'react';
import './Hero.css';

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M3.18 23.76c.3.17.64.24.99.2l12.37-12.37-2.63-2.63L3.18 23.76zm17.62-10.09L17.97 12l2.83-1.67-7.2-12.08A.98.98 0 0012.7 0l-8.7 21.79 2.83-2.83 14-5.29zm.8-3.54L19.26 9l.34.2L21.6 10c.45.27.72.77.72 1.3s-.27 1.03-.72 1.3l-1.7 1-.35.2 1.05.61zM5.93.23A.98.98 0 004.7.04L3.18.92l10.73 10.73 2.63-2.63L5.93.23z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-outer">
      <div className="phone-screen">
        {/* Status bar */}
        <div className="ps-status">
          <span className="ps-time">15:03</span>
          <span className="ps-icons">78%</span>
        </div>

        {/* Header */}
        <div className="ps-header">
          <span className="ps-title">CotaJá</span>
          <span className="ps-chip">● IA Ativa</span>
        </div>

        {/* Body */}
        <div className="ps-body">
          {/* Notification */}
          <div className="pnotif">
            <span style={{ fontSize: '0.9rem' }}>🎉</span>
            <div className="pnotif-t">
              <strong>Proposta Aceita!</strong>
              <span>Teste Serviço · R$ 150.000,00</span>
            </div>
          </div>

          <div className="ps-sec">Serviços</div>

          <div className="ps-grid">
            <div className="pgc">
              <div className="pgc-ico">➕</div>
              <strong>Criar Pedido</strong>
              <span>Solicite um novo serviço</span>
            </div>
            <div className="pgc">
              <div className="pgc-ico">📋</div>
              <strong>Meus Pedidos</strong>
              <span>Acompanhe seus pedidos</span>
            </div>
            <div className="pgc">
              <div className="pgc-ico" style={{ fontSize: '0.8rem' }}>⚖️</div>
              <strong>Leilão em Andamento</strong>
              <span>Veja propostas</span>
            </div>
            <div className="pgc">
              <div className="pgc-ico">⭐</div>
              <strong>Avaliar Prestador</strong>
              <span>Avalie serviços</span>
            </div>
          </div>

          <div className="ps-sec">Últimas Propostas</div>

          <div className="pp">
            <div className="pp-l">
              <div className="pp-av">AT</div>
              <div>
                <div className="pp-n">Andre Teste</div>
                <div className="pp-s">Teste Serviço</div>
              </div>
            </div>
            <div>
              <div className="pp-v">R$ 150.000</div>
              <div className="pp-p">⏱ 10 dias</div>
            </div>
          </div>

          <div className="pp">
            <div className="pp-l">
              <div className="pp-av" style={{ background: 'linear-gradient(135deg,#8B5CF6,#5B6BE8)' }}>AN</div>
              <div>
                <div className="pp-n">Anderson</div>
                <div className="pp-s">Teste Serviço</div>
              </div>
            </div>
            <div>
              <div className="pp-v">R$ 160.000</div>
              <div className="pp-p">⏱ 12 dias</div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="ps-nav">
          <div className="pni active"><HomeIcon />Início</div>
          <div className="pni"><ListIcon />Meus Pedidos</div>
          <div className="pni"><SearchIcon />Buscar</div>
          <div className="pni"><UserIcon />Perfil</div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Marketplace Inteligente com IA
          </div>

          <h1>
            Contrate serviços<br />
            com o melhor<br />
            <span className="grad-text">custo-benefício</span>
          </h1>

          <p className="hero-desc">
            O CotaJá conecta empresas a prestadores qualificados via leilão reverso.
            Nossa IA analisa propostas, avalia fornecedores e garante a contratação
            mais inteligente para o seu negócio.
          </p>

          <div className="hero-stores" id="download">
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

        {/* Right: Phone Mockup */}
        <div className="hero-phone">
          <div className="glow-ring"></div>
          <div className="phone-wrap">
            <PhoneMockup />
            <div className="float-card fc1">
              <span className="fc-ico">⚡</span>
              <div className="fc-t">
                <strong>IA Analisando</strong>
                <span>Score 97/100</span>
              </div>
            </div>
            <div className="float-card fc2">
              <span className="fc-ico">✅</span>
              <div className="fc-t">
                <strong>Proposta Aceita!</strong>
                <span>R$ 150.000 confirmado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
