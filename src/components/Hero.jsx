import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ShieldCheck, Zap } from 'lucide-react';
import './Hero.css';

function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/buscar?q=${encodeURIComponent(query.trim())}` : '/buscar');
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot" />{' '}
          Marketplace de serviços com IA
        </div>

        <h1>
          Que serviço você<br />
          <span className="grad-text">precisa hoje?</span>
        </h1>

        <p className="hero-desc">
          Descreva o que você precisa e receba propostas de profissionais verificados em minutos.
        </p>

        <form className="hero-search" onSubmit={handleSearch}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Ex: Limpeza, Elétrica, Pintura..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="hero-search-btn">Buscar</button>
        </form>

        <div className="hero-trust">
          <div className="hero-trust-item">
            <Star size={14} fill="currentColor" />
            4.8 de avaliação
          </div>
          <div className="hero-trust-sep" />
          <div className="hero-trust-item">
            <ShieldCheck size={14} />
            Prestadores verificados
          </div>
          <div className="hero-trust-sep" />
          <div className="hero-trust-item">
            <Zap size={14} />
            Propostas em minutos
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
