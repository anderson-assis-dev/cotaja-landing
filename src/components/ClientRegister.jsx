import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, X } from 'lucide-react';
import './ProviderRegister.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://app.cotaja.io/api';

const formatPhone = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};

const formatCpf = (v) => {
  const d = v.replaceAll(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
};

const EMPTY_FORM = { name: '', email: '', phone: '', cpf: '', password: '', confirmPassword: '' };

export default function ClientRegisterModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

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
    setForm(f => ({ ...f, [name]: value }));
  };

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
        profile_type: 'client',
        cpf: form.cpf.replaceAll(/\D/g, '') || undefined,
        ref_code: localStorage.getItem('cotaja_ref') || undefined,
      };
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setResult({ ok: true, msg: json.message });
        setForm(EMPTY_FORM);
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
    <dialog ref={dialogRef} className="pr-modal" aria-labelledby="cr-modal-title">
      <div className="pr-modal-head">
        <div>
          <div id="cr-modal-title" className="pr-modal-title">Criar conta</div>
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
              <label htmlFor="cr-name">Nome completo</label>
              <input id="cr-name" name="name" type="text" placeholder="Seu nome completo"
                value={form.name} onChange={handleChange} required />
            </div>

            <div className="pr-field">
              <label htmlFor="cr-email">E-mail</label>
              <input id="cr-email" name="email" type="email" placeholder="seu@email.com"
                value={form.email} onChange={handleChange} required />
            </div>

            <div className="pr-field">
              <label htmlFor="cr-phone">WhatsApp / Telefone</label>
              <input id="cr-phone" name="phone" type="tel" placeholder="(00) 00000-0000"
                value={form.phone} onChange={handleChange} required />
            </div>

            <div className="pr-field">
              <label htmlFor="cr-cpf">CPF <span style={{ fontWeight: 400, color: '#8892a4' }}>(opcional)</span></label>
              <input id="cr-cpf" name="cpf" type="text" inputMode="numeric"
                placeholder="000.000.000-00"
                value={form.cpf} onChange={handleChange} />
            </div>

            <div className="pr-field">
              <label htmlFor="cr-pass">Senha</label>
              <div className="pr-pass-wrap">
                <input id="cr-pass" name="password" type={showPass ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={form.password} onChange={handleChange} required minLength={6} />
                <button type="button" className="pr-pass-eye" onClick={() => setShowPass(v => !v)} aria-label="Mostrar senha">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pr-field">
              <label htmlFor="cr-confirm">Confirmar senha</label>
              <div className="pr-pass-wrap">
                <input id="cr-confirm" name="confirmPassword" type={showConfirm ? 'text' : 'password'}
                  placeholder="Repita a senha"
                  value={form.confirmPassword} onChange={handleChange} required minLength={6} />
                <button type="button" className="pr-pass-eye" onClick={() => setShowConfirm(v => !v)} aria-label="Mostrar senha">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="pr-submit" disabled={submitting} style={{ marginTop: 20 }}>
            {submitting ? 'Criando conta...' : 'Criar minha conta grátis'}
          </button>
        </form>

        <p className="pr-form-note" style={{ marginTop: 12 }}>
          Ao continuar você concorda com nossos <a href="/termos">Termos de Uso</a> e <a href="/privacidade">Política de Privacidade</a>.
        </p>
      </div>
    </dialog>
  );
}
