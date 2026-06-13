import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Zap, ArrowRight, TrendingUp, Crown, Star, Clock, BarChart2,
  Check, X, Eye, EyeOff, AlertCircle, ChevronDown,
  Flame, ShieldCheck, AlertTriangle, Rocket, Apple, Play, Lock, CreditCard,
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './RendaExtra.css';
import { getAppUrl, APPLE_APP_URL, GOOGLE_PLAY_URL } from '../utils/appLinks';

const API_URL = process.env.REACT_APP_API_URL || 'https://app.cotaja.io';
const STRIPE_PK = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : null;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#111827',
      fontFamily: 'inherit',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444' },
  },
};

const PAINS = [
  { icon: <AlertTriangle size={20} />, text: 'Você é bom no que faz, mas o telefone fica em silêncio dias inteiros.' },
  { icon: <AlertTriangle size={20} />, text: 'Depende de indicação e do "boca a boca" que nunca vem na hora que você precisa.' },
  { icon: <AlertTriangle size={20} />, text: 'Vê concorrente com menos experiência fechando os trabalhos que deveriam ser seus.' },
  { icon: <AlertTriangle size={20} />, text: 'No fim do mês as contas chegam, mas o faturamento não acompanha.' },
];

const PREMIUM_BENEFITS = [
  { icon: <TrendingUp size={22} />, title: 'Prioridade no feed', desc: 'Suas propostas aparecem PRIMEIRO para o cliente. Quem aparece primeiro fecha mais.' },
  { icon: <Zap size={22} />, title: 'Propostas ilimitadas', desc: 'No plano gratuito são até 10/mês. No Premium, envie quantas quiser e não perca nenhum cliente.' },
  { icon: <Clock size={22} />, title: 'Acesso antecipado', desc: 'Veja novas cotações 30 minutos antes dos outros e chegue na frente da concorrência.' },
  { icon: <ShieldCheck size={22} />, title: 'Selo de verificado', desc: 'Badge de prestador verificado que gera confiança e faz o cliente escolher você.' },
  { icon: <BarChart2 size={22} />, title: 'Métricas de performance', desc: 'Visualizações, taxa de resposta e dados para vender cada vez mais.' },
  { icon: <Crown size={22} />, title: 'Destaque premium', desc: 'Seu perfil ganha posição de destaque e atenção de mais clientes na sua região.' },
];

const TESTIMONIALS = [
  { name: 'Carlos M.', role: 'Eletricista · SP', text: 'Fiquei Premium num domingo. Na terça já tinha fechado 2 serviços que pagaram o ano inteiro de assinatura.', stars: 5 },
  { name: 'Juliana R.', role: 'Diarista · RJ', text: 'Antes eu esperava indicação. Agora os clientes chegam até mim. Minha agenda não para.', stars: 5 },
  { name: 'Anderson L.', role: 'Pintor · MG', text: 'A prioridade no feed mudou tudo. Minhas propostas aparecem na frente e eu fecho muito mais.', stars: 5 },
];

const FAQS = [
  { q: 'Quanto custa para ser Premium?', a: 'Apenas R$ 9,90 por mês. Menos que uma pizza — e basta fechar um único serviço para pagar o ano inteiro de assinatura.' },
  { q: 'Preciso pagar para usar o CotaJá?', a: 'Não. O cadastro é grátis. O Premium é opcional, mas é ele que coloca você na frente da concorrência e multiplica seus clientes.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim. Sem fidelidade, sem multa. Cancele com um toque e mantém o acesso até o fim do período já pago.' },
  { q: 'Como recebo pelos serviços?', a: 'O pagamento é combinado direto com o cliente. O CotaJá conecta vocês e não cobra comissão sobre seus trabalhos.' },
  { q: 'Em quanto tempo começo a receber pedidos?', a: 'Assim que seu perfil estiver ativo você já aparece para clientes da sua região buscando o que você faz.' },
];

const formatPhone = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const formatCpf = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

const formatDate = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
};

const parseDateToISO = (ddmmyyyy) => {
  const parts = ddmmyyyy.split('/');
  if (parts.length !== 3 || parts[2].length < 4) return ddmmyyyy;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', confirmPassword: '', cpf: '', mother_name: '', birth_date: '' };

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="re-faq-item">
      <button className="re-faq-q" onClick={() => setOpen(!open)}>
        {q}
        <ChevronDown size={18} className={`re-faq-icon${open ? ' open' : ''}`} />
      </button>
      {open && <div className="re-faq-a">{a}</div>}
    </div>
  );
}

function CountdownPill() {
  const [secs, setSecs] = useState(15 * 60);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <span className="re-count">
      <Flame size={14} /> Oferta termina em {mm}:{ss}
    </span>
  );
}

function CheckoutFlow({ initialEmail }) {
  const stripe = useStripe();
  const elements = useElements();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [catSearch, setCatSearch] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (initialEmail) setForm((f) => ({ ...f, email: initialEmail }));
  }, [initialEmail]);

  useEffect(() => {
    fetch(`${API_URL}/providers/categories?limit=60`)
      .then((r) => r.json())
      .then((j) => { if (j.success && Array.isArray(j.data)) setCategories(j.data.map((c) => c.label)); })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') { setForm((f) => ({ ...f, phone: formatPhone(value) })); return; }
    if (name === 'cpf') { setForm((f) => ({ ...f, cpf: formatCpf(value) })); return; }
    if (name === 'birth_date') { setForm((f) => ({ ...f, birth_date: formatDate(value) })); return; }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleCat = (cat) =>
    setSelectedCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));

  const filteredCats = categories.filter((c) => c.toLowerCase().includes(catSearch.toLowerCase()));

  const goToPayment = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setStep(2);
  };

  const buildPayload = (paymentMethodId) => ({
    name: form.name,
    email: form.email,
    phone: form.phone.replaceAll(/\D/g, ''),
    password: form.password,
    cpf: form.cpf.replaceAll(/\D/g, '') || undefined,
    mother_name: form.mother_name,
    birth_date: parseDateToISO(form.birth_date),
    service_categories: selectedCats.length ? JSON.stringify(selectedCats) : undefined,
    ref_code: localStorage.getItem('cotaja_ref') || undefined,
    payment_method_id: paymentMethodId,
  });

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');
    if (!stripe || !elements) {
      setError('Pagamento indisponível no momento. Tente novamente.');
      return;
    }
    setSubmitting(true);
    try {
      const card = elements.getElement(CardElement);
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: { name: form.name, email: form.email },
      });
      if (pmError) {
        setError(pmError.message || 'Não foi possível validar seu cartão.');
        setSubmitting(false);
        return;
      }

      const res = await fetch(`${API_URL}/checkout/premium`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(paymentMethod.id)),
      });
      const json = await res.json();

      if (json.success) {
        setSuccess({ alreadyPremium: !!json.already_premium });
        setSubmitting(false);
        return;
      }

      if (json.requires_action && json.payment_intent_client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(json.payment_intent_client_secret);
        if (confirmError) {
          setError(confirmError.message || 'Autenticação do cartão não concluída.');
          setSubmitting(false);
          return;
        }
        const confirmRes = await fetch(`${API_URL}/checkout/premium/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, subscription_id: json.subscription_id }),
        });
        const confirmJson = await confirmRes.json();
        if (confirmJson.success) {
          setSuccess({ alreadyPremium: false });
        } else {
          setError(confirmJson.message || 'Não foi possível confirmar o pagamento.');
        }
        setSubmitting(false);
        return;
      }

      if (json.account_exists) {
        setError(json.message || 'E-mail já cadastrado. Informe a senha correta.');
        setStep(1);
        setSubmitting(false);
        return;
      }

      setError(json.message || 'Não foi possível concluir o pagamento.');
      setSubmitting(false);
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
      setSubmitting(false);
    }
  };

  const appUrl = getAppUrl();

  if (success) {
    return (
      <div className="re-success">
        <div className="re-success-icon"><Crown size={40} /></div>
        <h3>{success.alreadyPremium ? 'Você já é Premium!' : 'Premium ativado! 🎉'}</h3>
        <p>
          Sua conta de profissional está <strong>ativa e Premium</strong>. Baixe o app do CotaJá,
          faça login com seu e-mail e senha e comece a aparecer na frente da concorrência agora mesmo.
        </p>
        <div className="re-store-row">
          <a href={APPLE_APP_URL} target="_blank" rel="noopener noreferrer" className="re-store-btn">
            <Apple size={18} /> App Store
          </a>
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="re-store-btn">
            <Play size={18} /> Google Play
          </a>
        </div>
        <a href={appUrl} target="_blank" rel="noopener noreferrer" className="re-cta-btn re-cta-gold" style={{ marginTop: 14 }}>
          <ArrowRight size={18} /> Abrir o app
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="re-steps">
        <span className={`re-step-dot${step >= 1 ? ' active' : ''}`}>1 · Seus dados</span>
        <span className="re-step-line" />
        <span className={`re-step-dot${step >= 2 ? ' active' : ''}`}>2 · Pagamento</span>
      </div>

      {error && (
        <div className="re-alert re-alert-err">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={goToPayment}>
          <div className="re-modal-grid">
            <div className="re-field">
              <label htmlFor="re-name">Nome completo</label>
              <input id="re-name" name="name" type="text" placeholder="Seu nome completo"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="re-field">
              <label htmlFor="re-email">E-mail</label>
              <input id="re-email" name="email" type="email" placeholder="seu@email.com"
                value={form.email} onChange={handleChange} required />
            </div>
            <div className="re-field">
              <label htmlFor="re-phone">WhatsApp / Telefone</label>
              <input id="re-phone" name="phone" type="tel" placeholder="(00) 00000-0000"
                value={form.phone} onChange={handleChange} required />
            </div>
            <div className="re-field">
              <label htmlFor="re-cpf">CPF</label>
              <input id="re-cpf" name="cpf" type="text" inputMode="numeric" placeholder="000.000.000-00"
                value={form.cpf} onChange={handleChange} />
            </div>
            <div className="re-field">
              <label htmlFor="re-mother">Nome da mãe</label>
              <input id="re-mother" name="mother_name" type="text" placeholder="Nome completo da sua mãe"
                value={form.mother_name} onChange={handleChange} required />
            </div>
            <div className="re-field">
              <label htmlFor="re-birth">Data de nascimento</label>
              <input id="re-birth" name="birth_date" type="text" inputMode="numeric" placeholder="DD/MM/AAAA"
                value={form.birth_date} onChange={handleChange} required />
            </div>
            <div className="re-field">
              <label htmlFor="re-pass">Senha</label>
              <div className="re-pass-wrap">
                <input id="re-pass" name="password" type={showPass ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} required minLength={6} />
                <button type="button" className="re-pass-eye" onClick={() => setShowPass((v) => !v)} aria-label="Mostrar senha">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="re-field">
              <label htmlFor="re-confirm">Confirmar senha</label>
              <div className="re-pass-wrap">
                <input id="re-confirm" name="confirmPassword" type={showPass ? 'text' : 'password'}
                  placeholder="Repita a senha" value={form.confirmPassword} onChange={handleChange} required minLength={6} />
              </div>
            </div>
          </div>

          <div className="re-field" style={{ marginTop: 4 }}>
            <label htmlFor="re-cat-search">O que você faz?</label>
            <div className="re-cat-search-wrap">
              <input id="re-cat-search" type="text" placeholder="Buscar ou digitar sua especialidade..."
                value={catSearch}
                onChange={(e) => setCatSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = catSearch.trim();
                    if (val && !selectedCats.includes(val)) {
                      setSelectedCats((prev) => [...prev, val]);
                      setCatSearch('');
                    }
                  }
                }}
              />
            </div>
            {selectedCats.length > 0 && (
              <div className="re-cats-selected">
                {selectedCats.map((c) => (
                  <span key={c} className="re-cat-chip selected">
                    {c}
                    <button type="button" onClick={() => toggleCat(c)} aria-label={`Remover ${c}`}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="re-cats-list">
              {filteredCats.slice(0, 18).map((c) => (
                <button type="button" key={c}
                  className={`re-cat-chip${selectedCats.includes(c) ? ' selected' : ''}`}
                  onClick={() => toggleCat(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="re-cta-btn re-cta-gold" style={{ marginTop: 20, width: '100%' }}>
            Continuar para o pagamento <ArrowRight size={16} />
          </button>
          <p className="re-form-note">
            Ao continuar você concorda com os Termos de Uso e a Política de Privacidade.
          </p>
        </form>
      ) : (
        <form onSubmit={handlePay}>
          <div className="re-pay-summary">
            <div>
              <div className="re-pay-plan"><Crown size={16} /> Plano Premium</div>
              <div className="re-pay-desc">Cobrança mensal · cancele quando quiser</div>
            </div>
            <div className="re-pay-price">R$ 9,90<span>/mês</span></div>
          </div>

          <div className="re-field" style={{ marginTop: 16 }}>
            <label><CreditCard size={14} /> Dados do cartão</label>
            <div className="re-card-box">
              <CardElement options={CARD_ELEMENT_OPTIONS} onChange={(ev) => setCardReady(ev.complete)} />
            </div>
          </div>

          <button type="submit" className="re-cta-btn re-cta-gold" disabled={submitting || !cardReady || !stripe}
            style={{ marginTop: 18, width: '100%' }}>
            {submitting ? 'Processando pagamento...' : <><Lock size={16} /> Pagar R$ 9,90 e ativar Premium</>}
          </button>

          <button type="button" className="re-back-btn" onClick={() => { setError(''); setStep(1); }} disabled={submitting}>
            Voltar
          </button>

          <p className="re-form-note">
            <Lock size={12} /> Pagamento seguro processado pela Stripe. Não armazenamos os dados do seu cartão.
          </p>
        </form>
      )}
    </>
  );
}

function RegisterModal({ open, onClose, initialEmail }) {
  const dialogRef = useRef(null);

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

  return (
    <dialog ref={dialogRef} className="re-modal" aria-labelledby="re-modal-title">
      <div className="re-modal-head">
        <div>
          <div id="re-modal-title" className="re-modal-title">Tornar-se Premium</div>
          <div className="re-modal-sub">Crie sua conta e ative o Premium por R$ 9,90/mês</div>
        </div>
        <button className="re-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
      </div>

      <div className="re-modal-body">
        {stripePromise != null ? (
          <Elements stripe={stripePromise}>
            <CheckoutFlow initialEmail={initialEmail} />
          </Elements>
        ) : (
          <div className="re-alert re-alert-err">
            <AlertCircle size={16} /> Pagamento não configurado. Defina REACT_APP_STRIPE_PUBLISHABLE_KEY.
          </div>
        )}
      </div>
    </dialog>
  );
}

export default function RendaExtra() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  const openModal = useCallback((email = '') => {
    setInitialEmail(email);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    function onEntry(entry, i) {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => onEntry(e, i)),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="re-page">
      <section className="re-hero">
        <div className="re-hero-inner">
          <span className="re-badge"><Zap size={13} /> Para profissionais e autônomos</span>
          <h1>
            Pare de esperar o telefone tocar.
            <span className="re-grad"> Faça os clientes virem até você.</span>
          </h1>
          <p className="re-hero-sub">
            Todo dia centenas de pessoas estão buscando exatamente o serviço que você oferece.
            Por <strong>R$ 9,90/mês</strong> você aparece na frente da concorrência no CotaJá e transforma
            seu talento em uma <strong>renda extra previsível</strong>.
          </p>
          <div className="re-hero-cta">
            <button className="re-cta-btn re-cta-gold re-cta-lg" onClick={() => openModal()}>
              <Crown size={18} /> Quero ser Premium por R$ 9,90
            </button>
            <CountdownPill />
          </div>
          <div className="re-trust">
            <span><Check size={14} /> Sem fidelidade</span>
            <span><Check size={14} /> Cancele quando quiser</span>
            <span><Check size={14} /> Cadastro grátis</span>
          </div>
        </div>
      </section>

      <section className="re-stats reveal">
        <div className="re-stats-inner">
          <div><div className="re-stat-val">1.200+</div><div className="re-stat-label">profissionais ativos</div></div>
          <div><div className="re-stat-val">8.500+</div><div className="re-stat-label">serviços fechados</div></div>
          <div><div className="re-stat-val">4.8 <Star size={18} className="re-inline-star" /></div><div className="re-stat-label">avaliação média</div></div>
          <div><div className="re-stat-val">R$ 9,90</div><div className="re-stat-label">por mês, sem comissão</div></div>
        </div>
      </section>

      <section className="re-section re-pain reveal">
        <div className="re-section-inner">
          <span className="re-eye">A real verdade</span>
          <h2 className="re-h2">Não falta talento. Falta cliente chegando até você.</h2>
          <p className="re-lead">
            Você domina o seu serviço — mas competência sem visibilidade não paga as contas.
            Reconhece alguma dessas situações?
          </p>
          <div className="re-pain-grid">
            {PAINS.map((p, i) => (
              <div key={i} className="re-pain-card">
                <span className="re-pain-icon">{p.icon}</span>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <p className="re-pain-foot">
            O problema <strong>não é você</strong>. É que você está invisível para quem está com dinheiro na mão,
            pronto para contratar agora.
          </p>
        </div>
      </section>

      <section className="re-section re-turn reveal">
        <div className="re-section-inner re-turn-inner">
          <span className="re-eye re-eye-gold">A virada de chave</span>
          <h2 className="re-h2">O CotaJá coloca você na frente de quem quer contratar</h2>
          <p className="re-lead">
            Enquanto você espera indicação, o cliente já está abrindo o app buscando o seu serviço.
            Com o <strong>Premium</strong>, sua proposta é a primeira que ele vê — e quem aparece primeiro, fecha.
          </p>
          <div className="re-insight-card">
            <Rocket size={26} className="re-insight-icon" />
            <div>
              <div className="re-insight-title">A conta que muda o seu mês</div>
              <p>
                R$ 9,90/mês equivale a <strong>R$ 0,33 por dia</strong>. Um único serviço fechado de R$ 150
                paga <strong>mais de 1 ano</strong> de Premium. Tudo o que vier depois é lucro no seu bolso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="re-section re-benefits reveal">
        <div className="re-section-inner">
          <span className="re-eye">O que você desbloqueia</span>
          <h2 className="re-h2">Tudo o que o Premium faz pelo seu faturamento</h2>
          <div className="re-benefits-grid">
            {PREMIUM_BENEFITS.map((b) => (
              <div key={b.title} className="re-benefit">
                <div className="re-benefit-icon">{b.icon}</div>
                <div className="re-benefit-title">{b.title}</div>
                <div className="re-benefit-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="re-section re-compare reveal">
        <div className="re-section-inner">
          <span className="re-eye">Grátis x Premium</span>
          <h2 className="re-h2">A diferença entre esperar e faturar</h2>
          <div className="re-compare-grid">
            <div className="re-compare-col re-compare-free">
              <div className="re-compare-head">Plano Grátis</div>
              <ul>
                <li><X size={15} /> Até 10 propostas por mês</li>
                <li><X size={15} /> Aparece depois da concorrência</li>
                <li><X size={15} /> Sem selo de verificado</li>
                <li><X size={15} /> Sem acesso antecipado</li>
                <li><X size={15} /> Sem métricas de performance</li>
              </ul>
            </div>
            <div className="re-compare-col re-compare-prem">
              <div className="re-compare-head"><Crown size={16} /> Premium · R$ 9,90/mês</div>
              <ul>
                <li><Check size={15} /> Propostas ilimitadas</li>
                <li><Check size={15} /> Prioridade no feed de cotações</li>
                <li><Check size={15} /> Selo de verificado que vende</li>
                <li><Check size={15} /> 30 min de acesso antecipado</li>
                <li><Check size={15} /> Métricas para vender mais</li>
              </ul>
              <button className="re-cta-btn re-cta-gold" onClick={() => openModal()} style={{ width: '100%', marginTop: 16 }}>
                <Crown size={16} /> Quero o Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="re-section re-testimonials reveal">
        <div className="re-section-inner">
          <span className="re-eye">Quem já virou o jogo</span>
          <h2 className="re-h2">Profissionais como você, faturando mais</h2>
          <div className="re-testi-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="re-testi-card">
                <div className="re-testi-stars">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={15} />)}
                </div>
                <p className="re-testi-text">“{t.text}”</p>
                <div className="re-testi-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="re-offer reveal">
        <div className="re-offer-card">
          <span className="re-badge re-badge-gold"><Flame size={13} /> Oferta para novos profissionais</span>
          <h2>Sua agenda cheia começa por R$ 9,90</h2>
          <div className="re-price">
            <span className="re-price-old">R$ 49,90</span>
            <div className="re-price-now">
              R$ 9<span className="re-price-cents">,90</span>
              <span className="re-price-period">/mês</span>
            </div>
          </div>
          <p className="re-offer-sub">
            Menos que um lanche. O suficiente para colocar seu negócio na frente de centenas de clientes.
          </p>
          <ul className="re-offer-list">
            <li><Check size={16} /> Prioridade no feed e propostas ilimitadas</li>
            <li><Check size={16} /> Selo de verificado e acesso antecipado</li>
            <li><ShieldCheck size={16} /> Cancele quando quiser, sem multa</li>
          </ul>
          <button className="re-cta-btn re-cta-gold re-cta-lg" onClick={() => openModal()} style={{ width: '100%' }}>
            <Crown size={18} /> Quero ser Premium agora
          </button>
          <CountdownPill />
        </div>
      </section>

      <section className="re-section re-faq reveal">
        <div className="re-section-inner">
          <h2 className="re-h2" style={{ textAlign: 'center' }}>Perguntas frequentes</h2>
          <div className="re-faq-list">
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <section className="re-final reveal">
        <div className="re-final-inner">
          <h2>A próxima cotação pode ser sua.</h2>
          <p>Cadastre-se agora, ative o Premium por R$ 9,90 e apareça na frente já no próximo cliente.</p>
          <button className="re-cta-btn re-cta-gold re-cta-lg" onClick={() => openModal()}>
            <Crown size={18} /> Começar por R$ 9,90/mês
          </button>
        </div>
      </section>

      {modalOpen && (
        <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} initialEmail={initialEmail} />
      )}
    </div>
  );
}
