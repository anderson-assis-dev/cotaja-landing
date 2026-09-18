import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import './HowItWorks.css';
import { useAuth } from '../contexts/AuthContext';

const STEPS = [
  {
    n: '1',
    title: 'Descreva o serviço',
    desc: 'Diga o que você precisa em poucos segundos — sem formulários complicados.',
  },
  {
    n: '2',
    title: 'Receba propostas',
    desc: 'Prestadores verificados enviam orçamentos. Nossa IA analisa e classifica as melhores.',
  },
  {
    n: '3',
    title: 'Contrate com segurança',
    desc: 'Escolha o profissional ideal, combine os detalhes e pague com proteção total.',
  },
];

function HowItWorks() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="how reveal" id="como-funciona">
      <div className="how-inner">
        <div className="how-head">
          <span className="s-eye">Como funciona</span>
          <h2 className="s-title">Simples, rápido e seguro</h2>
          <p className="s-sub">Em 3 passos você já tem profissionais prontos para te ajudar.</p>
        </div>

        <div className="how-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="how-step">
              <div className="how-num">{s.n}</div>
              <div className="how-step-title">{s.title}</div>
              <p className="how-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="how-cta">
          <Link to={isAuthenticated ? '/app/pedidos/novo' : '/criar-conta'} className="btn-primary">
            <Zap size={16} />
            Solicitar serviço agora
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
