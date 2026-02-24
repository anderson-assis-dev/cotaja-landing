import React from 'react';
import './AISection.css';

const cards = [
  { icon: '🧠', title: 'Score de Fornecedores', desc: 'Avaliação automática baseada em histórico, capacidade técnica, pontualidade e satisfação de clientes anteriores.' },
  { icon: '💬', title: 'Assistente de Especificação', desc: 'IA conversacional que auxilia na criação de briefings completos e precisos para atrair as melhores propostas.' },
  { icon: '🔍', title: 'Detecção de Anomalias', desc: 'Identifica propostas suspeitas e preços fora do padrão de mercado antes que cheguem até você.' },
  { icon: '🎯', title: 'Matching Preditivo', desc: 'Notifica proativamente os prestadores mais adequados para o seu perfil de demanda automaticamente.' },
];

const scoreItems = [
  { label: 'Reputação', pct: 98 },
  { label: 'Pontualidade', pct: 95 },
  { label: 'Qualidade', pct: 96 },
  { label: 'Preço justo', pct: 92 },
  { label: 'Comunicação', pct: 99 },
];

function AISection() {
  return (
    <section className="ia" id="ia">
      <div className="container">
        <div className="ia-inner">
          {/* Left */}
          <div className="reveal">
            <span className="s-eye">Inteligência Artificial</span>
            <h2 className="s-title">IA que trabalha<br />pelo seu negócio</h2>
            <p className="s-sub" style={{ marginBottom: '36px' }}>
              Algoritmos proprietários analisam cada variável para garantir que você
              sempre contrate a melhor opção disponível.
            </p>
            <div className="ia-cards">
              {cards.map((c, i) => (
                <div key={i} className="ia-card">
                  <div className="ia-ico">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score visual */}
          <div className="reveal">
            <div className="score-visual">
              <div className="score-ring">
                <span className="score-num">97</span>
              </div>
              <div className="score-label">Score IA do fornecedor</div>
              <div className="score-items">
                {scoreItems.map((s, i) => (
                  <div key={i} className="score-item">
                    <span className="score-item-l">{s.label}</span>
                    <div className="sbar">
                      <div className="sbar-fill" style={{ width: `${s.pct}%` }}></div>
                    </div>
                    <span className="spct">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AISection;
