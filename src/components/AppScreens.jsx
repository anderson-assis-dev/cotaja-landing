import React from 'react';
import './AppScreens.css';

const features = [
  {
    icon: '📬',
    title: 'Chat Integrado',
    desc: 'Comunicação direta com o prestador dentro do pedido, com histórico, agendamento e informações organizadas em abas.',
  },
  {
    icon: '📎',
    title: 'Anexos e Documentos',
    desc: 'Envie imagens e arquivos diretamente no pedido para detalhar sua demanda e acelerar as propostas recebidas.',
  },
  {
    icon: '🔔',
    title: 'Notificações por E-mail',
    desc: 'Receba alertas imediatos quando sua proposta for aceita, com todos os detalhes do pedido e valor confirmado.',
  },
  {
    icon: '⭐',
    title: 'Avaliação de Prestadores',
    desc: 'Avalie o serviço recebido e consulte o histórico de reputação de qualquer prestador antes de contratar.',
  },
];

const bids = [
  { initials: 'AT', name: 'Andre Teste', sub: '⭐ 4.9 · Score IA 97', price: 'R$ 150.000', prazo: '10 dias', winner: true, color: 'var(--grad)' },
  { initials: 'AN', name: 'Anderson', sub: '⭐ 4.7 · Score IA 91', price: 'R$ 160.000', prazo: '12 dias', winner: false, color: 'linear-gradient(135deg,#8B5CF6,#5B6BE8)' },
  { initials: 'CL', name: 'CleanPro SP', sub: '⭐ 4.5 · Score IA 85', price: 'R$ 175.000', prazo: '15 dias', winner: false, color: 'linear-gradient(135deg,#10B981,#059669)' },
];

function AppScreens() {
  return (
    <section className="screens" id="recursos">
      <div className="container">
        <div className="screens-grid">
          {/* Features list */}
          <div className="screens-content reveal">
            <div>
              <span className="s-eye">Recursos da plataforma</span>
              <h2 className="s-title">Gestão completa de pedidos e propostas</h2>
              <p className="s-sub" style={{ marginBottom: '32px' }}>
                Ferramentas poderosas tanto para quem contrata quanto para quem presta serviços.
              </p>
            </div>

            {features.map((f, i) => (
              <div key={i} className="feat-row">
                <div className="feat-ico">{f.icon}</div>
                <div className="feat-txt">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard */}
          <div className="reveal">
            <div className="dash-card">
              <div className="dash-top">
                <div>
                  <div className="dt-lbl">Leilão em andamento</div>
                  <div className="dt-val">Limpeza Comercial</div>
                </div>
                <div className="dt-badge">Em andamento</div>
              </div>
              <div className="dash-body">
                <div className="dlbl">Propostas recebidas · {bids.length}</div>
                <div className="dbids">
                  {bids.map((b, i) => (
                    <div key={i} className="dbid">
                      <div className="dbid-l">
                        <div className="dbid-av" style={{ background: b.color }}>{b.initials}</div>
                        <div>
                          <div className="dbid-name">{b.name}</div>
                          <div className="dbid-sub">{b.sub}</div>
                          {b.winner && <div className="winner">✓ Melhor proposta</div>}
                        </div>
                      </div>
                      <div>
                        <div className="dbid-price">{b.price}</div>
                        <div className="dbid-prazo">⏱ {b.prazo}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dash-btn">📋 Gerenciar Pedido →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppScreens;
