import React from 'react';
import { FileText, Zap, Handshake } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    icon: <FileText size={24} strokeWidth={1.5} />,
    title: 'Crie seu pedido',
    desc: 'Descreva o serviço, defina orçamento, prazo e localização. Nossa IA ajuda a montar um briefing completo para atrair os melhores fornecedores.',
  },
  {
    num: '02',
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: 'Receba propostas',
    desc: 'Prestadores qualificados competem pelo seu projeto via leilão reverso. A IA classifica e filtra as melhores propostas automaticamente.',
  },
  {
    num: '03',
    icon: <Handshake size={24} strokeWidth={1.5} />,
    title: 'Contrate com segurança',
    desc: 'Aceite a proposta ideal, comunique-se via chat integrado, acompanhe o andamento e pague com proteção garantida pela plataforma.',
  },
];

function HowItWorks() {
  return (
    <section className="how" id="como-funciona">
      <div className="container">
        <div className="how-head reveal">
          <span className="s-eye">Processo simplificado</span>
          <h2 className="s-title">Contrate em 3 passos</h2>
          <p className="s-sub">Do pedido à contratação — rápido, transparente e inteligente.</p>
        </div>

        <div className="steps reveal">
          {steps.map((step, i) => (
            <div key={i} className="step">
              <div className="step-n">{step.num}</div>
              <div className="step-ico">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
