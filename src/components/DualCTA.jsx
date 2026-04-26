import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight,ClipboardList,BriefcaseBusiness } from 'lucide-react';
import './DualCTA.css';
import { getAppUrl } from '../utils/appLinks';

function DualCTA() {
  const appUrl=getAppUrl();
  return (
    <section className="dual-cta" id="prestadores">
      <div className="dual-cta-grid">
        <div className="dual-cta-card client reveal">
          <div className="dual-cta-deco dual-cta-deco-1" />
          <div className="dual-cta-deco dual-cta-deco-2" />
          <div className="dual-cta-icon"><ClipboardList size={26} /></div>
          <h3 className="dual-cta-title">Precisa contratar um serviço?</h3>
          <p className="dual-cta-desc">
            Crie seu pedido gratuitamente e receba orçamentos de profissionais qualificados em minutos.
          </p>
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="dual-cta-btn">
            Criar pedido grátis <ArrowRight size={16} />
          </a>
        </div>

        <div className="dual-cta-card provider reveal">
          <div className="dual-cta-deco dual-cta-deco-1" />
          <div className="dual-cta-deco dual-cta-deco-2" />
          <div className="dual-cta-icon"><BriefcaseBusiness size={26} /></div>
          <h3 className="dual-cta-title">Quer oferecer seus serviços?</h3>
          <p className="dual-cta-desc">
            Cadastre-se como prestador, acesse demandas próximas a você e aumente sua renda.
          </p>
          <Link to="/cadastro/prestador" className="dual-cta-btn">
            Quero ser prestador <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DualCTA;
