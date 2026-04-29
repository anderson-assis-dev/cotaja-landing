import React, { useState, useRef } from 'react';
import { Check, ArrowRight, Smartphone, ShoppingBag, Crown, TrendingUp, Users, DollarSign, Zap, Star } from 'lucide-react';
import './Affiliate.css';

const API = process.env.REACT_APP_API_URL || 'https://api.cotaja.com.br/api';

const COMMISSIONS = [
  {
    icon: <Smartphone size={32} />,
    label: 'Instalação validada',
    value: 'R$ 1',
    cents: ',00',
    desc: 'Cadastro completo pelo seu link',
    color: '#4f46e5',
    grad: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
  },
  {
    icon: <ShoppingBag size={32} />,
    label: 'Primeiro pedido',
    value: 'R$ 3',
    cents: ',00',
    desc: 'Cliente indicado abre o 1º pedido',
    color: '#0891b2',
    grad: 'linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)',
    featured: true,
  },
  {
    icon: <Crown size={32} />,
    label: 'Prestador Premium',
    value: 'R$ 5',
    cents: ',00',
    desc: 'Prestador indicado assina o Premium',
    color: '#d97706',
    grad: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
  },
];

const STEPS = [
  { n: '01', icon: <Users size={22} />, title: 'Inscreva-se grátis', desc: 'Preencha o formulário e escolha seu código exclusivo. Aprovação em até 2 dias úteis.' },
  { n: '02', icon: <Zap size={22} />, title: 'Receba seu link', desc: 'Link personalizado + painel para acompanhar seus cliques, conversões e saldo em tempo real.' },
  { n: '03', icon: <DollarSign size={22} />, title: 'Indique e saque', desc: 'Compartilhe nas redes, grupos e stories. Saque via Pix assim que atingir R$ 20,00.' },
];

const FAQS = [
  { q: 'Quando recebo o pagamento?', a: 'Pagamentos são processados mensalmente via Pix, com saldo mínimo de R$ 20,00.' },
  { q: 'Tem limite de indicações?', a: 'Zero limite. Quanto mais você indica, mais você ganha — sem teto.' },
  { q: 'Preciso ser usuário do app?', a: 'Não. Criadores de conteúdo e qualquer pessoa pode se inscrever como afiliado.' },
  { q: 'Os eventos são acumuláveis?', a: 'Sim! Uma única indicação pode gerar os 3 eventos — até R$ 9,00 por usuário.' },
];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export default function Affiliate() {
  const [form, setForm] = useState({ name: '', email: '', instagram: '', code: '' });
  const [codeStatus, setCodeStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [refs, setRefs] = useState(10);
  const codeTimer = useRef(null);
  const formRef = useRef(null);

  const earning = refs * 1 + refs * 0.4 * 3 + refs * 0.15 * 5;

  function handleChange(e) {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    if (name === 'code') {
      next.code = slugify(value).slice(0, 30);
      setCodeStatus(null);
      clearTimeout(codeTimer.current);
      if (next.code.length >= 3) {
        setCodeStatus('checking');
        codeTimer.current = setTimeout(() => checkCode(next.code), 600);
      }
    }
    setForm(next);
  }

  async function checkCode(code) {
    try {
      const res = await fetch(`${API}/affiliates/check/${code}`);
      const data = await res.json();
      setCodeStatus(data.available ? 'available' : 'taken');
    } catch {
      setCodeStatus(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (codeStatus === 'taken') return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/affiliates/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Erro ao enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="aff">

      {/* ── HERO ── */}
      <section className="aff-hero">
        <div className="aff-hero-bg" />
        <div className="aff-hero-inner">
          <span className="aff-hero-eyebrow">
            <Star size={13} fill="currentColor" /> Programa de afiliados
          </span>
          <h1 className="aff-hero-h1">
            Indique o CotaJá.<br />
            <span className="aff-hero-highlight">Ganhe dinheiro de verdade.</span>
          </h1>
          <p className="aff-hero-sub">
            Compartilhe seu link exclusivo e receba comissões a cada instalação,
            pedido e assinatura Premium. Sem limite de ganhos.
          </p>
          <div className="aff-hero-btns">
            <button className="aff-btn-cta" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Quero ser afiliado <ArrowRight size={16} />
            </button>
          </div>
          <div className="aff-hero-trust">
            <span><Check size={13} /> Grátis para entrar</span>
            <span><Check size={13} /> Pagamento via Pix</span>
            <span><Check size={13} /> Sem teto de comissões</span>
          </div>
        </div>
      </section>

      {/* ── GANHE CARDS ── */}
      <section className="aff-earn">
        <div className="aff-container">
          <div className="aff-earn-label reveal">Quanto você ganha por indicação</div>
          <div className="aff-earn-grid">
            {COMMISSIONS.map((c) => (
              <div
                key={c.label}
                className={`aff-earn-card reveal${c.featured ? ' aff-earn-card--featured' : ''}`}
                style={{ '--grad': c.grad, '--color': c.color }}
              >
                {c.featured && <span className="aff-earn-badge">⚡ Mais rentável</span>}
                <div className="aff-earn-card-top">
                  <div className="aff-earn-icon">{c.icon}</div>
                  <div className="aff-earn-value">
                    <span className="aff-earn-main">{c.value}</span>
                    <span className="aff-earn-cents">{c.cents}</span>
                  </div>
                </div>
                <div className="aff-earn-label-card">{c.label}</div>
                <p className="aff-earn-desc">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="aff-earn-max reveal">
            <DollarSign size={18} />
            <span>Uma indicação pode render até <strong>R$ 9,00</strong> — os 3 eventos são acumuláveis</span>
          </div>
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section className="aff-calc">
        <div className="aff-container">
          <div className="aff-calc-inner reveal">
            <div className="aff-calc-text">
              <span className="s-eye">Simulador</span>
              <h2 className="s-title">Quanto você pode ganhar?</h2>
              <p className="s-sub">Arraste para simular com base no número de indicações por mês.</p>
            </div>
            <div className="aff-calc-card">
              <div className="aff-calc-row">
                <span className="aff-calc-metric">Indicações / mês</span>
                <span className="aff-calc-num">{refs}</span>
              </div>
              <input
                type="range"
                min={1}
                max={200}
                value={refs}
                onChange={(e) => setRefs(Number(e.target.value))}
                className="aff-range"
              />
              <div className="aff-calc-breakdown">
                <div><span>Instalações (100%)</span><strong>R$ {refs.toFixed(2)}</strong></div>
                <div><span>Pedidos (~40%)</span><strong>R$ {(refs * 0.4 * 3).toFixed(2)}</strong></div>
                <div><span>Premium (~15%)</span><strong>R$ {(refs * 0.15 * 5).toFixed(2)}</strong></div>
              </div>
              <div className="aff-calc-total">
                <span>Estimativa mensal</span>
                <strong>R$ {earning.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="aff-how">
        <div className="aff-container">
          <div className="aff-section-head reveal">
            <span className="s-eye">Como funciona</span>
            <h2 className="s-title">3 passos para começar a ganhar</h2>
          </div>
          <div className="aff-how-grid">
            {STEPS.map((s) => (
              <div key={s.n} className="aff-how-card reveal">
                <div className="aff-how-num">{s.n}</div>
                <div className="aff-how-icon">{s.icon}</div>
                <h3 className="aff-how-title">{s.title}</h3>
                <p className="aff-how-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section className="aff-form-section" ref={formRef} id="inscrever">
        <div className="aff-container">
          <div className="aff-form-wrap reveal">
            <div className="aff-form-head">
              <span className="s-eye" style={{ color: '#818cf8' }}>Inscrição gratuita</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                Crie sua conta de afiliado
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Preencha abaixo. Aprovação em até 2 dias úteis.
              </p>
            </div>

            {submitted ? (
              <div className="aff-success">
                <div className="aff-success-icon"><Check size={28} /></div>
                <h3>Candidatura enviada!</h3>
                <p>Entraremos em contato no e-mail informado em até 2 dias úteis.</p>
              </div>
            ) : (
              <form className="aff-form" onSubmit={handleSubmit}>
                <div className="aff-form-row">
                  <label className="aff-label">
                    Nome completo *
                    <input type="text" name="name" className="aff-input" placeholder="Seu nome" value={form.name} onChange={handleChange} required />
                  </label>
                  <label className="aff-label">
                    E-mail *
                    <input type="email" name="email" className="aff-input" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
                  </label>
                </div>
                <div className="aff-form-row">
                  <label className="aff-label">
                    Instagram (opcional)
                    <div className="aff-input-group">
                      <span>@</span>
                      <input type="text" name="instagram" className="aff-input aff-input--inner" placeholder="seuarroba" value={form.instagram} onChange={handleChange} />
                    </div>
                  </label>
                  <label className="aff-label">
                    Seu código exclusivo *
                    <div className={`aff-input-group${codeStatus === 'taken' ? ' aff-input-group--err' : codeStatus === 'available' ? ' aff-input-group--ok' : ''}`}>
                      <span>cotaja/</span>
                      <input type="text" name="code" className="aff-input aff-input--inner" placeholder="seucodigo" value={form.code} onChange={handleChange} required minLength={3} />
                    </div>
                    {codeStatus === 'checking' && <span className="aff-hint">Verificando...</span>}
                    {codeStatus === 'available' && <span className="aff-hint aff-hint--ok"><Check size={11} /> Disponível!</span>}
                    {codeStatus === 'taken' && <span className="aff-hint aff-hint--err">Código já em uso.</span>}
                  </label>
                </div>
                {error && <p className="aff-form-error">{error}</p>}
                <button
                  type="submit"
                  className="aff-btn-submit"
                  disabled={submitting || codeStatus === 'taken' || codeStatus === 'checking'}
                >
                  {submitting ? 'Enviando...' : <><TrendingUp size={16} /> Enviar candidatura</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="aff-faq">
        <div className="aff-container">
          <div className="aff-section-head reveal">
            <span className="s-eye">Dúvidas</span>
            <h2 className="s-title">Perguntas frequentes</h2>
          </div>
          <div className="aff-faq-grid">
            {FAQS.map((f) => (
              <div key={f.q} className="aff-faq-card reveal">
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
