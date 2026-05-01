import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  DollarSign, Users, Clock, Shield, TrendingUp, Smartphone,
  ChevronDown, ArrowRight, Star, Zap, Eye, EyeOff,
  CheckCircle2, AlertCircle, X,
} from 'lucide-react';
import './ProviderRegister.css';
import './HowItWorks.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://app.cotaja.io';

const BENEFITS = [
  { icon: <DollarSign size={22} />, title: 'Renda extra garantida', desc: 'Receba propostas de clientes próximos a você e aumente seu faturamento.' },
  { icon: <Users size={22} />, title: 'Base de clientes crescente', desc: 'Nossa plataforma conecta você a quem já está buscando o que você oferece.' },
  { icon: <Shield size={22} />, title: 'Pagamentos diretos', desc: 'Você negocia e recebe diretamente do cliente, sem intermediação financeira.' },
  { icon: <TrendingUp size={22} />, title: 'Reputação que vende', desc: 'Avaliações verificadas constroem sua credibilidade.' },
  { icon: <Smartphone size={22} />, title: 'Tudo pelo app', desc: 'Gerencie propostas e pagamentos pelo celular onde quiser.' },
  { icon: <Clock size={22} />, title: 'Sem custo obrigatório', desc: 'O uso é gratuito. O plano premium é opcional para quem quer mais destaque e recursos.' },
];

const STEPS = [
  { n: '1', title: 'Crie sua conta', desc: 'Preencha seus dados. Leva menos de 3 minutos.' },
  { n: '2', title: 'Monte seu perfil', desc: 'Adicione especialidades e área de atendimento.' },
  { n: '3', title: 'Receba pedidos', desc: 'Envie propostas e feche contratos direto no app.' },
];

const FAQS = [
  { q: 'É gratuito se cadastrar?', a: 'Sim! O cadastro é totalmente gratuito. Não cobramos comissão. Existe um plano premium opcional para quem quer mais benefícios.' },
  { q: 'Que tipos de serviços posso oferecer?', a: 'Diversas categorias: limpeza, reparos, reformas, elétrica, hidráulica, pintura, jardinagem, tecnologia, e muito mais.' },
  { q: 'Como recebo pelos serviços realizados?', a: 'O pagamento é acordado diretamente com o cliente — prazo, forma e valor são definidos entre vocês. O CotaJá conecta as partes, mas não intermedia o pagamento.' },
  { q: 'Posso trabalhar em mais de uma cidade?', a: 'Sim. Você define sua área de atendimento e pode ampliar ou reduzir conforme sua disponibilidade.' },
  { q: 'Como funciona o sistema de avaliações?', a: 'Após cada serviço, o cliente avalia você. Avaliações positivas aumentam sua visibilidade na plataforma.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pr-faq-item">
      <button className="pr-faq-q" onClick={() => setOpen(!open)}>
        {q}
        <ChevronDown size={18} className={`pr-faq-icon${open ? ' open' : ''}`} />
      </button>
      {open && <div className="pr-faq-a">{a}</div>}
    </div>
  );
}

const formatPhone = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};

const formatCpf = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 14);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  if (d.length <= 11) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
  if (d.length <= 12) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8)}`;
  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`;
};

const formatDate = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0,2)}/${d.slice(2)}`;
  return `${d.slice(0,2)}/${d.slice(2,4)}/${d.slice(4)}`;
};

const parseDateToISO = (ddmmyyyy) => {
  const parts = ddmmyyyy.split('/');
  if (parts.length !== 3 || parts[2].length < 4) return ddmmyyyy;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', confirmPassword: '', cpf: '', mother_name: '', birth_date: '' };

function RegisterModal({ open, onClose, initialEmail }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [catSearch, setCatSearch] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialEmail) setForm(f => ({ ...f, email: initialEmail }));
  }, [initialEmail]);

  useEffect(() => {
    fetch(`${API_URL}/api/providers/categories?limit=60`)
      .then(r => r.json())
      .then(j => { if (j.success && Array.isArray(j.data)) setCategories(j.data.map(c => c.label)); })
      .catch(() => {});
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') { setForm(f => ({ ...f, phone: formatPhone(value) })); return; }
    if (name === 'cpf') { setForm(f => ({ ...f, cpf: formatCpf(value) })); return; }
    if (name === 'birth_date') { setForm(f => ({ ...f, birth_date: formatDate(value) })); return; }
    setForm(f => ({ ...f, [name]: value }));
  };

  const toggleCat = (cat) =>
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const filteredCats = categories.filter(c => c.toLowerCase().includes(catSearch.toLowerCase()));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    if (form.password !== form.confirmPassword) {
      setResult({ ok: false, msg: 'As senhas não coincidem.' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone.replaceAll(/\D/g, ''),
        password: form.password,
        password_confirmation: form.confirmPassword,
        profile_type: 'provider',
        cpf: form.cpf.replaceAll(/\D/g, '') || undefined,
        mother_name: form.mother_name,
        birth_date: parseDateToISO(form.birth_date),
        service_categories: selectedCats.length ? JSON.stringify(selectedCats) : undefined,
        ref_code: localStorage.getItem('cotaja_ref') || undefined,
      };
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setResult({ ok: true, msg: json.message });
        setForm(EMPTY_FORM);
        setSelectedCats([]);
      } else {
        setResult({ ok: false, msg: json.message || 'Erro ao criar conta. Tente novamente.' });
      }
    } catch {
      setResult({ ok: false, msg: 'Erro de conexão. Verifique sua internet e tente novamente.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog ref={dialogRef} className="pr-modal" aria-labelledby="pr-modal-title">
      <div className="pr-modal-head">
        <div>
          <div id="pr-modal-title" className="pr-modal-title">Criar conta de prestador</div>
          <div className="pr-modal-sub">Preencha seus dados — é grátis</div>
        </div>
        <button className="pr-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
      </div>

        <div className="pr-modal-body">
          {result && (
            <div className={`pr-alert ${result.ok ? 'pr-alert-ok' : 'pr-alert-err'}`}>
              {result.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {result.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="pr-modal-grid">
              <div className="pr-field">
                <label htmlFor="pr-name">Nome completo</label>
                <input id="pr-name" name="name" type="text" placeholder="Seu nome completo"
                  value={form.name} onChange={handleChange} required />
              </div>

              <div className="pr-field">
                <label htmlFor="pr-email">E-mail</label>
                <input id="pr-email" name="email" type="email" placeholder="seu@email.com"
                  value={form.email} onChange={handleChange} required />
              </div>

              <div className="pr-field">
                <label htmlFor="pr-phone">WhatsApp / Telefone</label>
                <input id="pr-phone" name="phone" type="tel" placeholder="(00) 00000-0000"
                  value={form.phone} onChange={handleChange} required />
              </div>

              <div className="pr-field">
                <label htmlFor="pr-cpf">CPF / CNPJ</label>
                <input id="pr-cpf" name="cpf" type="text" inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={form.cpf} onChange={handleChange} />
              </div>

              <div className="pr-field">
                <label htmlFor="pr-mother">Nome da mãe</label>
                <input id="pr-mother" name="mother_name" type="text" placeholder="Nome completo da sua mãe"
                  value={form.mother_name} onChange={handleChange} required />
              </div>

              <div className="pr-field">
                <label htmlFor="pr-birth">Data de nascimento</label>
                <input id="pr-birth" name="birth_date" type="text" inputMode="numeric"
                  placeholder="DD/MM/AAAA"
                  value={form.birth_date} onChange={handleChange} required />
              </div>

              <div className="pr-field">
                <label htmlFor="pr-pass">Senha</label>
                <div className="pr-pass-wrap">
                  <input id="pr-pass" name="password" type={showPass ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={form.password} onChange={handleChange} required minLength={6} />
                  <button type="button" className="pr-pass-eye" onClick={() => setShowPass(v => !v)} aria-label="Mostrar senha">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pr-field">
                <label htmlFor="pr-confirm">Confirmar senha</label>
                <div className="pr-pass-wrap">
                  <input id="pr-confirm" name="confirmPassword" type={showConfirm ? 'text' : 'password'}
                    placeholder="Repita a senha"
                    value={form.confirmPassword} onChange={handleChange} required minLength={6} />
                  <button type="button" className="pr-pass-eye" onClick={() => setShowConfirm(v => !v)} aria-label="Mostrar senha">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pr-field" style={{ marginTop: 4 }}>
              <label htmlFor="pr-cat-search">Categorias de serviço</label>
              <div className="pr-cat-search-wrap">
                <input id="pr-cat-search" type="text" placeholder="Buscar ou digitar nova categoria..."
                  value={catSearch}
                  onChange={e => setCatSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = catSearch.trim();
                      if (val && !selectedCats.includes(val)) {
                        setSelectedCats(prev => [...prev, val]);
                        setCatSearch('');
                      }
                    }
                  }}
                />
                {catSearch.trim() && !categories.some(c => c.toLowerCase() === catSearch.trim().toLowerCase()) && (
                  <button
                    type="button"
                    className="pr-cat-add-btn"
                    onClick={() => {
                      const val = catSearch.trim();
                      if (val && !selectedCats.includes(val)) {
                        setSelectedCats(prev => [...prev, val]);
                        setCatSearch('');
                      }
                    }}
                  >
                    + Adicionar "{catSearch.trim()}"
                  </button>
                )}
              </div>
              {selectedCats.length > 0 && (
                <div className="pr-cats-selected">
                  {selectedCats.map(c => (
                    <span key={c} className="pr-cat-chip selected">
                      {c}
                      <button type="button" onClick={() => toggleCat(c)} aria-label={`Remover ${c}`}>
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="pr-cats-list">
                {filteredCats.slice(0, 24).map(c => (
                  <button type="button" key={c}
                    className={`pr-cat-chip${selectedCats.includes(c) ? ' selected' : ''}`}
                    onClick={() => toggleCat(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="pr-submit" disabled={submitting} style={{ marginTop: 20 }}>
              {submitting ? 'Criando conta...' : 'Criar minha conta grátis'}
            </button>
          </form>

          <p className="pr-form-note" style={{ marginTop: 12 }}>
            Ao continuar você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </div>
    </dialog>
  );
}

export default function ProviderRegister() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');
  const [bottomEmail, setBottomEmail] = useState('');

  const openModal = useCallback((email = '') => {
    setInitialEmail(email);
    setModalOpen(true);
  }, []);

  const handleBottomSubmit = (e) => {
    e.preventDefault();
    openModal(bottomEmail);
    setBottomEmail('');
  };

  return (
    <div>
      {/* Hero — centered, no form card */}
      <section className="pr-hero pr-hero-centered">
        <div className="pr-hero-center">
          <div className="pr-hero-badge">
            <Zap size={12} />
            Para profissionais e empresas
          </div>
          <h1>Leve seu negócio para o próximo nível</h1>
          <p className="pr-hero-sub">
            Cadastre-se no CotaJá e comece a receber pedidos de clientes próximos a você.
            Mais de 1.200 prestadores já aumentaram sua renda com a plataforma.
          </p>
          <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => openModal()}>
            Quero me cadastrar <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="pr-stats">
        <div className="pr-stats-inner">
          <div>
            <div className="pr-stat-val">1.200+</div>
            <div className="pr-stat-label">prestadores ativos</div>
          </div>
          <div>
            <div className="pr-stat-val">8.500+</div>
            <div className="pr-stat-label">serviços realizados</div>
          </div>
          <div>
            <div className="pr-stat-val">4.8 <Star size={20} style={{ display: 'inline', verticalAlign: 'middle' }} /></div>
            <div className="pr-stat-label">avaliação média</div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <div className="pr-benefits">
          <div className="pr-benefits-head">
            <span className="s-eye">Vantagens</span>
            <h2 className="s-title">Por que escolher o CotaJá?</h2>
            <p className="s-sub">Tudo que você precisa para crescer como profissional autônomo ou empresa.</p>
          </div>
          <div className="pr-benefits-grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="pr-benefit">
                <div className="pr-benefit-icon">{b.icon}</div>
                <div className="pr-benefit-title">{b.title}</div>
                <div className="pr-benefit-desc">{b.desc}</div>
              </div>
            ))}
          </div>
          <div className="pr-benefits-cta">
            <button className="btn-primary" onClick={() => openModal()}>
              Cadastrar minha empresa <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="pr-steps-section">
        <div className="pr-steps-inner">
          <div className="pr-steps-head">
            <span className="s-eye">Como se cadastrar</span>
            <h2 className="s-title">Simples e rápido</h2>
            <p className="s-sub">Em poucos passos seu negócio já aparece para clientes da sua região.</p>
          </div>
          <div className="pr-steps-grid">
            {STEPS.map((s) => (
              <div key={s.n} className="pr-step">
                <div className="pr-step-num">{s.n}</div>
                <div className="pr-step-title">{s.title}</div>
                <p className="pr-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pr-faq">
        <h2 className="pr-faq-title">Perguntas frequentes</h2>
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="pr-bottom-cta">
        <div className="pr-bottom-cta-inner">
          <h2>Pronto para começar?</h2>
          <p>Coloque seu negócio no CotaJá e receba pedidos ainda hoje.</p>
          <form className="pr-bottom-form" onSubmit={handleBottomSubmit}>
            <input type="email" placeholder="Seu melhor e-mail"
              value={bottomEmail} onChange={(e) => setBottomEmail(e.target.value)} required />
            <button type="submit">Cadastrar grátis</button>
          </form>
        </div>
      </section>

      {modalOpen&&(
        <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} initialEmail={initialEmail} />
      )}
    </div>
  );
}
