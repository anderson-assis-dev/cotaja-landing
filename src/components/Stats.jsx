import React from 'react';
import './Stats.css';

const stats = [
  { num: '+50k', label: 'Prestadores ativos' },
  { num: 'R$2B', label: 'Em contratos fechados' },
  { num: '40%', label: 'Economia média por cotação' },
  { num: '4.9★', label: 'Avaliação nas lojas' },
];

function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-bar reveal">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <span className="stat-n">{s.num}</span>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
