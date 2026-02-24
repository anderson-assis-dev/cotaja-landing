import React from 'react';
import './EmailSection.css';

function EmailSection() {
  return (
    <section className="email-sec">
      <div className="container">
        <div className="email-inner">
          <div className="reveal">
            <span className="s-eye">Notificações em tempo real</span>
            <h2 className="s-title">Você sempre por dentro de cada proposta</h2>
            <p className="s-sub">
              Receba alertas por e-mail e push notification sempre que uma proposta for aceita,
              um pedido atualizado ou uma mensagem enviada no chat integrado.
            </p>
          </div>

          <div className="reveal">
            <div className="email-card">
              <div className="email-hdr">
                <div className="elt">CotaJá</div>
                <div className="els">Marketplace de Serviços</div>
              </div>
              <div className="email-body">
                <div className="email-title">🎉 Sua Proposta foi Aceita!</div>
                <p className="email-p">
                  <strong>Prezado(a) Andre Teste,</strong><br />
                  Ótima notícia! Sua proposta foi aceita pelo cliente. Agora é hora de colocar a mão na obra!
                </p>
                <div className="email-box">
                  <div className="ebt">Detalhes do Pedido</div>
                  <div className="er"><span className="ek">Título:</span><span className="ev">Teste Serviço</span></div>
                  <div className="er"><span className="ek">Categoria:</span><span className="ev">Limpeza</span></div>
                </div>
                <div className="email-box">
                  <div className="ebt">Sua Proposta</div>
                  <div className="er"><span className="ek">Valor:</span><span className="ebig">R$ 150.000,00</span></div>
                  <div className="er"><span className="ek">Prazo:</span><span className="ev">10 dias</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailSection;
