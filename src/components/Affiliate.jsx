import React, { useState, useRef } from 'react';
import { Check, DollarSign, Users, Zap, ArrowRight, Smartphone, ShoppingBag, Crown } from 'lucide-react';
import './Affiliate.css';

const API = process.env.REACT_APP_API_URL || 'https://api.cotaja.com.br/api';

const COMMISSIONS = [
  {
    icon: <Smartphone size={28} />,
    event: 'Instalação + cadastro completo',
    value: 'R$ 1,00',
    desc: 'Por cada pessoa que baixar o app e completar o perfil pelo seu link.',
    color: '#4f46e5',
    bg: '#eef2ff',
  },
  {
    icon: <ShoppingBag size={28} />,
    event: 'Primeiro pedido aberto',
    value: 'R$ 3,00',
    desc: 'Quando o cliente indicado criar o primeiro pedido de serviço.',
    color: '#0891b2',
    bg: '#ecfeff',
    featured: true,
  },
  {
    icon: <Crown size={28} />,
    event: 'Prestador vira Premium',
    value: 'R$ 5,00',
    desc: 'Quando um prestador que você indicou assinar o plano Premium.',
    color: '#d97706',
    bg: '#fffbeb',
  },
];

const HOW_STEPS = [
  { n: '1', title: 'Inscreva-se', desc: 'Preencha o formulário abaixo e escolha seu código exclusivo.' },
  { n: '2', title: 'Receba seu link', desc: 'Assim que aprovado, você recebe seu link personalizado para divulgar.' },
  { n: '3', title: 'Indique e ganhe', desc: 'Compartilhe nas redes, grupos e para conhecidos. Cada conversão gera comissão.' },
];

const FAQS = [
  { q: 'Quando recebo o pagamento?', a: 'Pagamentos são processados mensalmente, assim que o saldo aprovado atingir R$ 20,00.' },
  { q: 'Como é feito o pagamento?', a: 'Via Pix para a chave cadastrada. Simples e rápido.' },
  { q: 'Posso ser afiliado sem ser usuário do app?', a: 'Sim! Criadores de conteúdo, influenciadores e qualquer pessoa pode se inscrever.' },
  { q: 'Tem limite de indicações?', a: 'Não. Quanto mais você indica, mais você ganha — sem teto de comissões.' },
];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function Affiliate() {
  const [form, setForm] = useState({ name: '', email: '', instagram: '', code: '' });
  const [codeStatus, setCodeStatus] = useState(null); // null | 'checking' | 'available' | 'taken'
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const codeTimer = useRef(null);
  const formRef = useRef(null);

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

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="aff-page">

      {/* HERO */}
      <section className="aff-hero">
        <div className="aff-hero-inner">
          <span className="s-eye">Programa de afiliados</span>
          <h1 className="aff-hero-title">
            Indique o CotaJá e<br />
            <span className="grad-text">ganhe por cada conversão</span>
          </h1>
          <p className="aff-hero-sub">
            Compartilhe seu link, acompanhe suas indicações e receba comissões toda vez
            que alguém se cadastrar, abrir um pedido ou virar Premium.
          </p>
          <div className="aff-hero-actions">
            <button className="btn-primary" onClick={scrollToForm}>
              Quero ser afiliado <ArrowRight size={16} />
            </button>
          </div>
          <div className="aff-hero-pills">
            <span><Check size={13} /> Gratuito para entrar</span>
            <span><Check size={13} /> Pagamento via Pix</span>
            <span><Check size={13} /> Sem limite de ganhos</span>
          </div>
        </div>
      </section>

      {/* COMISSÕES */}
      <section className="aff-commissions">
        <div className="aff-section-inner">
          <div className="aff-section-head reveal">
            <span className="s-eye">Modelo de comissão</span>
            <h2 className="s-title">Quanto você ganha?</h2>
            <p className="s-sub">Três eventos, três formas de receber — acumuláveis na mesma indicação.</p>
          </div>

          <div className="aff-comm-grid">
            {COMMISSIONS.map((c) => (
              <div
                key={c.event}
                className={`aff-comm-card reveal${c.featured ? ' aff-comm-card--featured' : ''}`}
                style={{ '--accent': c.color, '--accent-bg': c.bg }}
              >
                {c.featured && <span className="aff-comm-badge">Mais importante</span>}
                <div className="aff-comm-icon">{c.icon}</div>
                <div className="aff-comm-value">{c.value}</div>
                <div className="aff-comm-event">{c.event}</div>
                <p className="aff-comm-desc">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="aff-comm-note reveal">
            <DollarSign size={15} />
            Uma mesma indicação pode gerar os 3 eventos — até <strong>R$ 9,00 por usuário</strong>.
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="aff-how">
        <div className="aff-section-inner">
          <div className="aff-section-head reveal">
            <span className="s-eye">Como funciona</span>
            <h2 className="s-title">Em 3 passos simples</h2>
          </div>
          <div className="aff-how-steps">
            {HOW_STEPS.map((s) => (
              <div key={s.n} className="aff-how-step reveal">
                <div className="aff-how-num">{s.n}</div>
                <div className="aff-how-title">{s.title}</div>
                <p className="aff-how-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="aff-form-section" ref={formRef} id="inscrever">
        <div className="aff-section-inner">
          <div className="aff-section-head reveal">
            <span className="s-eye">Inscrição</span>
            <h2 className="s-title">Comece agora</h2>
            <p className="s-sub">Preencha abaixo. Nossa equipe revisa e você recebe a confirmação por e-mail.</p>
          </div>

          {submitted ? (
            <div className="aff-success reveal">
              <div className="aff-success-icon"><Check size={32} /></div>
              <h3>Candidatura enviada!</h3>
              <p>Entraremos em contato no e-mail informado em até 2 dias úteis.</p>
            </div>
          ) : (
            <form className="aff-form reveal" onSubmit={handleSubmit}>
              <div className="aff-form-row">
                <label className="aff-label">
                  Nome completo *
                  <input
                    type="text"
                    name="name"
                    className="aff-input"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="aff-label">
                  E-mail *
                  <input
                    type="email"
                    name="email"
                    className="aff-input"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="aff-form-row">
                <label className="aff-label">
                  Instagram (opcional)
                  <div className="aff-input-prefix">
                    <span>@</span>
                    <input
                      type="text"
                      name="instagram"
                      className="aff-input aff-input--prefixed"
                      placeholder="seuarroba"
                      value={form.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <label className="aff-label">
                  Seu código exclusivo *
                  <div className="aff-input-prefix">
                    <span>cotaja.com/</span>
                    <input
                      type="text"
                      name="code"
                      className={`aff-input aff-input--prefixed${
                        codeStatus === 'taken' ? ' aff-input--error' : codeStatus === 'available' ? ' aff-input--ok' : ''
                      }`}
                      placeholder="seucodigo"
                      value={form.code}
                      onChange={handleChange}
                      required
                      minLength={3}
                    />
                  </div>
                  {codeStatus === 'checking' && <span className="aff-code-hint">Verificando...</span>}
                  {codeStatus === 'available' && <span className="aff-code-hint aff-code-hint--ok"><Check size={12} /> Disponível!</span>}
                  {codeStatus === 'taken' && <span className="aff-code-hint aff-code-hint--err">Código já em uso. Escolha outro.</span>}
                </label>
              </div>

              {error && <p className="aff-form-error">{error}</p>}

              <button
                type="submit"
                className="btn-primary aff-submit"
                disabled={submitting || codeStatus === 'taken' || codeStatus === 'checking'}
              >
                {submitting ? 'Enviando...' : <>Enviar candidatura <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="aff-faq">
        <div className="aff-section-inner">
          <div className="aff-section-head reveal">
            <span className="s-eye">Dúvidas</span>
            <h2 className="s-title">Perguntas frequentes</h2>
          </div>
          <div className="aff-faq-grid">
            {FAQS.map((f) => (
              <div key={f.q} className="aff-faq-item reveal">
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

export default Affiliate;
