import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DollarSign, Users, Zap, Star, ArrowRight,
  Smartphone, ShoppingBag, Crown, ChevronDown,
  Check, CheckCircle2, AlertCircle, X, TrendingUp,
} from 'lucide-react';
import './Affiliate.css';

const API = process.env.REACT_APP_API_URL || 'https://app.cotaja.io/api';

const COMMISSIONS = [
  {
    icon: <Smartphone size={22} />,
    title: 'Instalação validada',
    value: 'R$ 0,50',
    desc: 'Por cada pessoa que baixar o app e completar o cadastro pelo seu link.',
  },
  {
    icon: <ShoppingBag size={22} />,
    title: 'Primeiro pedido aberto',
    value: 'R$ 1,50',
    desc: 'Quando o cliente indicado criar o primeiro pedido de serviço na plataforma.',
    featured: true,
  },
  {
    icon: <Crown size={22} />,
    title: 'Prestador vira Premium',
    value: 'R$ 2,50',
    desc: 'Quando um prestador que você indicou assinar o plano Premium.',
  },
];

const PERKS = [
  { icon: <DollarSign size={22} />, title: 'Pagamento via Pix', desc: 'Saque seu saldo mensalmente direto na sua chave Pix, sem burocracia.' },
  { icon: <TrendingUp size={22} />, title: 'Sem limite de ganhos', desc: 'Quanto mais você indica, mais você ganha. Não existe teto de comissões.' },
  { icon: <Users size={22} />, title: 'Link exclusivo', desc: 'Código e link personalizados para rastrear cada indicação em tempo real.' },
  { icon: <Zap size={22} />, title: 'Aprovação rápida', desc: 'Candidatura analisada em até 2 dias úteis. Você recebe confirmação por e-mail.' },
];

const STEPS = [
  { n: '1', title: 'Inscreva-se grátis', desc: 'Preencha o formulário abaixo e escolha seu código exclusivo.' },
  { n: '2', title: 'Receba seu link', desc: 'Após aprovação, você recebe seu link personalizado para divulgar.' },
  { n: '3', title: 'Indique e saque', desc: 'Compartilhe nas redes. Saque via Pix ao atingir R$ 20,00.' },
];

const FAQS = [
  { q: 'Quando recebo o pagamento?', a: 'Pagamentos são processados mensalmente via Pix para a chave cadastrada, desde que o saldo aprovado seja de pelo menos R$ 20,00.' },
  { q: 'Tem limite de indicações?', a: 'Não existe limite. Quanto mais você indica, mais você ganha — sem teto de comissões.' },
  { q: 'Preciso ser usuário do app?', a: 'Não. Criadores de conteúdo, influenciadores e qualquer pessoa pode se inscrever como afiliado, independentemente de usar o app.' },
  { q: 'Os eventos são acumuláveis?', a: 'Sim! Uma única indicação pode gerar os 3 eventos — instalação, primeiro pedido e Premium — rendendo até R$ 4,50 por usuário indicado.' },
  { q: 'Como acompanho minhas indicações?', a: 'Após aprovação você recebe acesso ao painel de afiliado, onde visualiza cliques, conversões e saldo em tempo real.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="af-faq-item">
      <button className="af-faq-q" onClick={() => setOpen(!open)}>
        {q}
        <ChevronDown size={18} className={`af-faq-icon${open ? ' open' : ''}`} />
      </button>
      {open && <div className="af-faq-a">{a}</div>}
    </div>
  );
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/[̀-ͯ]/g, '')
    .replaceAll(/[^a-z0-9]/g, '');
}

function AffiliateModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', instagram: '', code: '' });
  const [codeStatus, setCodeStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const codeTimer = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
    if (dialog.open) dialog.close();
    document.body.style.overflow = '';
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e) => { e.preventDefault(); onClose(); };
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, [onClose]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'code') {
      const clean = slugify(value).slice(0, 30);
      setForm(f => ({ ...f, code: clean }));
      setCodeStatus(null);
      clearTimeout(codeTimer.current);
      if (clean.length >= 3) {
        setCodeStatus('checking');
        codeTimer.current = setTimeout(() => checkCode(clean), 600);
      }
      return;
    }
    setForm(f => ({ ...f, [name]: value }));
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
    setResult(null);
    try {
      const res = await fetch(`${API}/affiliates/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ ok: true, msg: 'Candidatura enviada! Entraremos em contato em até 2 dias úteis.' });
        setForm({ name: '', email: '', instagram: '', code: '' });
        setCodeStatus(null);
      } else {
        setResult({ ok: false, msg: data.message || 'Erro ao enviar candidatura.' });
      }
    } catch {
      setResult({ ok: false, msg: 'Erro de conexão. Verifique sua internet e tente novamente.' });
    } finally {
      setSubmitting(false);
    }
  }

  let codeGroupClass = 'af-input-group';
  if (codeStatus === 'taken') codeGroupClass += ' af-input-group--err';
  else if (codeStatus === 'available') codeGroupClass += ' af-input-group--ok';

  return (
    <dialog ref={dialogRef} className="af-modal" aria-labelledby="af-modal-title">
      <div className="af-modal-head">
        <div>
          <div id="af-modal-title" className="af-modal-title">Inscrição no programa de afiliados</div>
          <div className="af-modal-sub">Preencha seus dados — é gratuito</div>
        </div>
        <button className="af-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
      </div>

      <div className="af-modal-body">
        {result && (
          <div className={`af-alert${result.ok ? ' af-alert-ok' : ' af-alert-err'}`}>
            {result.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {result.msg}
          </div>
        )}

        {!result?.ok && (
          <form onSubmit={handleSubmit}>
            <div className="af-modal-grid">
              <div className="af-field">
                <label htmlFor="af-name">Nome completo *</label>
                <input id="af-name" name="name" type="text" placeholder="Seu nome completo"
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="af-field">
                <label htmlFor="af-email">E-mail *</label>
                <input id="af-email" name="email" type="email" placeholder="seu@email.com"
                  value={form.email} onChange={handleChange} required />
              </div>
              <div className="af-field">
                <label htmlFor="af-instagram">Instagram (opcional)</label>
                <div className="af-pass-wrap">
                  <span className="af-prefix">@</span>
                  <input id="af-instagram" name="instagram" type="text" placeholder="seuarroba"
                    value={form.instagram} onChange={handleChange} className="af-prefixed" />
                </div>
              </div>
              <div className="af-field">
                <label htmlFor="af-code">Seu código exclusivo *</label>
                <div className={codeGroupClass}>
                  <span className="af-prefix">cotaja/</span>
                  <input id="af-code" name="code" type="text" placeholder="seucodigo"
                    value={form.code} onChange={handleChange} required minLength={3} className="af-prefixed" />
                </div>
                {codeStatus === 'checking' && <span className="af-code-hint">Verificando...</span>}
                {codeStatus === 'available' && <span className="af-code-hint af-hint-ok"><Check size={11} /> Disponível!</span>}
                {codeStatus === 'taken' && <span className="af-code-hint af-hint-err">Código já em uso. Escolha outro.</span>}
              </div>
            </div>

            <button type="submit" className="af-submit"
              disabled={submitting || codeStatus === 'taken' || codeStatus === 'checking'}>
              {submitting ? 'Enviando...' : 'Enviar candidatura'}
            </button>
            <p className="af-form-note">
              Ao continuar você concorda com nossos Termos de Uso e Política de Privacidade.
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}

export default function Affiliate() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bottomEmail, setBottomEmail] = useState('');
  const [refs, setRefs] = useState(20);

  const openModal = useCallback(() => setModalOpen(true), []);

  function handleBottomSubmit(e) {
    e.preventDefault();
    openModal();
    setBottomEmail('');
  }

  return (
    <div>
      {/* ── HERO ── */}
      <section className="af-hero">
        <div className="af-hero-center">
          <div className="af-hero-badge">
            <Star size={12} fill="currentColor" />
            Programa de afiliados
          </div>
          <h1>Indique o CotaJá.<br />Ganhe dinheiro de verdade.</h1>
          <p className="af-hero-sub">
            Compartilhe seu link exclusivo e receba comissões a cada instalação,
            pedido e assinatura Premium. Sem limite de ganhos, saque via Pix.
          </p>
          <button className="btn-primary" style={{ marginTop: 28 }} onClick={openModal}>
            Quero ser afiliado <ArrowRight size={16} />
          </button>
          <div className="af-hero-trust">
            <span><Check size={13} /> Grátis para entrar</span>
            <span><Check size={13} /> Pagamento via Pix</span>
            <span><Check size={13} /> Sem teto de comissões</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="af-stats">
        <div className="af-stats-inner">
          <div>
            <div className="af-stat-val">R$ 4,50</div>
            <div className="af-stat-label">por indicação completa</div>
          </div>
          <div>
            <div className="af-stat-val">3</div>
            <div className="af-stat-label">eventos de comissão</div>
          </div>
          <div>
            <div className="af-stat-val">Pix</div>
            <div className="af-stat-label">forma de pagamento</div>
          </div>
        </div>
      </section>

      {/* ── COMISSÕES ── */}
      <section>
        <div className="af-commissions">
          <div className="af-section-head">
            <span className="s-eye">Modelo de comissão</span>
            <h2 className="s-title">Quanto você ganha?</h2>
            <p className="s-sub">Três eventos acumuláveis — uma mesma indicação pode gerar os três.</p>
          </div>
          <div className="af-comm-grid">
            {COMMISSIONS.map((c) => (
              <div key={c.title} className={`af-comm-card${c.featured ? ' af-comm-card--featured' : ''}`}>
                {c.featured && <span className="af-comm-badge">Mais rentável</span>}
                <div className="af-comm-icon">{c.icon}</div>
                <div className="af-comm-value">{c.value}</div>
                <div className="af-comm-title">{c.title}</div>
                <p className="af-comm-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="af-comm-note">
            <DollarSign size={15} />
            Uma indicação completa rende até <strong>R$ 4,50</strong> — os 3 eventos são acumuláveis
          </div>
        </div>
      </section>

      {/* ── VANTAGENS ── */}
      <section>
        <div className="af-perks">
          <div className="af-section-head">
            <span className="s-eye">Vantagens</span>
            <h2 className="s-title">Por que ser afiliado CotaJá?</h2>
            <p className="s-sub">Tudo que você precisa para começar a ganhar dinheiro com suas indicações.</p>
          </div>
          <div className="af-perks-grid">
            {PERKS.map((p) => (
              <div key={p.title} className="af-perk">
                <div className="af-perk-icon">{p.icon}</div>
                <div className="af-perk-title">{p.title}</div>
                <div className="af-perk-desc">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="af-perks-cta">
            <button className="btn-primary" onClick={openModal}>
              Quero me inscrever <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── SIMULADOR ── */}
      <section className="af-sim-section">
        <div className="af-sim-inner">
          <div className="af-sim-text">
            <span className="s-eye">Simulador</span>
            <h2 className="s-title">Quanto você pode ganhar?</h2>
            <p className="s-sub">
              Ajuste o número de indicações por mês e veja a estimativa de ganhos.
            </p>
          </div>
          <div className="af-sim-card">
            <div className="af-sim-header">
              <span className="af-sim-label">Indicações / mês</span>
              <span className="af-sim-count">{refs}</span>
            </div>
            <input
              type="range" min={1} max={200} value={refs}
              onChange={(e) => setRefs(Number(e.target.value))}
              className="af-range"
            />
            <div className="af-sim-breakdown">
              <div className="af-sim-row">
                <span>Instalações <small>(100%)</small></span>
                <strong>R$ {(refs * 0.5).toFixed(2)}</strong>
              </div>
              <div className="af-sim-row">
                <span>Primeiros pedidos <small>(~40%)</small></span>
                <strong>R$ {(refs * 0.4 * 1.5).toFixed(2)}</strong>
              </div>
              <div className="af-sim-row">
                <span>Prestadores Premium <small>(~15%)</small></span>
                <strong>R$ {(refs * 0.15 * 2.5).toFixed(2)}</strong>
              </div>
            </div>
            <div className="af-sim-total">
              <span>Estimativa mensal</span>
              <strong>R$ {(refs * 0.5 + refs * 0.4 * 1.5 + refs * 0.15 * 2.5).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="af-steps-section">
        <div className="af-steps-inner">
          <div className="af-section-head">
            <span className="s-eye">Como funciona</span>
            <h2 className="s-title">3 passos para começar a ganhar</h2>
            <p className="s-sub">Em poucos minutos você já pode estar divulgando seu link.</p>
          </div>
          <div className="af-steps-grid">
            {STEPS.map((s) => (
              <div key={s.n} className="af-step">
                <div className="af-step-num">{s.n}</div>
                <div className="af-step-title">{s.title}</div>
                <p className="af-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="af-faq">
        <h2 className="af-faq-title">Perguntas frequentes</h2>
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="af-bottom-cta">
        <div className="af-bottom-cta-inner">
          <h2>Pronto para começar a ganhar?</h2>
          <p>Inscreva-se agora e receba seu link exclusivo em até 2 dias úteis.</p>
          <form className="af-bottom-form" onSubmit={handleBottomSubmit}>
            <input type="email" placeholder="Seu melhor e-mail"
              value={bottomEmail} onChange={(e) => setBottomEmail(e.target.value)} required />
            <button type="submit">Inscrever grátis</button>
          </form>
        </div>
      </section>

      {modalOpen && (
        <AffiliateModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
