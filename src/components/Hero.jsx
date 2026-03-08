import React from 'react';
import { Plus, ClipboardList, Scale, Star, Clock, Zap, CheckCircle, Bell } from 'lucide-react';
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
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M2 2 L12 7 L12 12 L2 12 Z" fill="#4285F4"/>
      <path d="M2 12 L12 12 L12 17 L2 22 Z" fill="#34A853"/>
      <path d="M12 7 L22 12 L12 12 Z" fill="#FBBC04"/>
      <path d="M12 12 L22 12 L12 17 Z" fill="#EA4335"/>
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
          <span className="ps-title">Olá, Anderson!</span>
          <span className="ps-subtitle">Como podemos ajudar você hoje?</span>
        </div>

        {/* Body */}
        <div className="ps-body">
          {/* Notification */}
          <div className="pnotif">
            <Bell size={14} strokeWidth={1.5} style={{ color: '#10b981', flexShrink: 0 }} />
            <div className="pnotif-t">
              <strong>Nova Proposta Recebida!</strong>
              <span>Limpeza de carro · R$ 420,00</span>
            </div>
          </div>

          <div className="ps-sec">Serviços</div>

          <div className="ps-grid">
            <div className="pgc">
              <div className="pgc-ico"><Plus size={14} strokeWidth={2} /></div>
              <strong>Criar Pedido</strong>
              <span>Solicite um serviço</span>
            </div>
            <div className="pgc">
              <div className="pgc-ico"><ClipboardList size={14} strokeWidth={1.5} /></div>
              <strong>Meus Pedidos</strong>
              <span>Acompanhe pedidos</span>
            </div>
            <div className="pgc">
              <div className="pgc-ico"><Scale size={14} strokeWidth={1.5} /></div>
              <strong>Leilão Ativo</strong>
              <span>Ver propostas</span>
            </div>
            <div className="pgc">
              <div className="pgc-ico"><Star size={14} strokeWidth={1.5} /></div>
              <strong>Avaliar</strong>
              <span>Avalie prestadores</span>
            </div>
          </div>

          <div className="ps-sec">Últimas Propostas</div>

          <div className="pp">
            <div className="pp-l">
              <div className="pp-av">AG</div>
              <div>
                <div className="pp-n">Angela Assis</div>
                <div className="pp-s">Limpeza de carro</div>
              </div>
            </div>
            <div>
              <div className="pp-v">R$ 420,00</div>
              <div className="pp-p"><Clock size={9} strokeWidth={1.5} /> 2 dias</div>
            </div>
          </div>

          <div className="pp">
            <div className="pp-l">
              <div className="pp-av" style={{ background: 'linear-gradient(135deg,#818cf8,#4f46e5)' }}>CS</div>
              <div>
                <div className="pp-n">Carlos Silva</div>
                <div className="pp-s">Limpeza de carro</div>
              </div>
            </div>
            <div>
              <div className="pp-v">R$ 380,00</div>
              <div className="pp-p"><Clock size={9} strokeWidth={1.5} /> 1 dia</div>
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
              <span className="fc-ico"><Zap size={16} strokeWidth={1.5} /></span>
              <div className="fc-t">
                <strong>IA Analisando</strong>
                <span>Score 97/100</span>
              </div>
            </div>
            <div className="float-card fc2">
              <span className="fc-ico"><CheckCircle size={16} strokeWidth={1.5} /></span>
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
