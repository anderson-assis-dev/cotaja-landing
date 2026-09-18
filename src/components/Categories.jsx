import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Zap, Layers, Cpu, Hammer, Paintbrush, Droplets,
  Package, Wind, Wrench, Monitor, Briefcase, Sparkles, PenTool,
  Palette, Shield, ShieldCheck, LayoutGrid, KeyRound, Cake, Leaf,
  Home, Scissors, Thermometer, Camera, Settings, HardHat, Waves,
  Building2, Dumbbell, Truck, TreePine, Star,
} from 'lucide-react';
import './Categories.css';
import { apiGet } from '../utils/api';
import { FALLBACK_CATEGORY_LABELS } from '../data/categories';

const FEATURED = [
  {
    id: 'limpeza',
    label: 'Limpeza & Organização',
    sub: 'Residencial, comercial e muito mais',
    bg: 'linear-gradient(135deg, #4f46e5, #818cf8)',
    cta: 'Ver serviços',
  },
  {
    id: 'reparos',
    label: 'Reparos & Reformas',
    sub: 'Elétrica, hidráulica, alvenaria',
    bg: 'linear-gradient(135deg, #059669, #34d399)',
    cta: 'Ver serviços',
  },
];

const ICON_MAP = [
  { match: /elétric|eletric/i,       icon: Zap,         bg: '#fef9c3', color: '#b45309' },
  { match: /alvenar/i,               icon: Layers,      bg: '#f3f4f6', color: '#4b5563' },
  { match: /automação|automacao/i,   icon: Cpu,         bg: '#eff6ff', color: '#2563eb' },
  { match: /carpint/i,               icon: Hammer,      bg: '#fff7ed', color: '#c2410c' },
  { match: /pintura/i,               icon: Paintbrush,  bg: '#fdf4ff', color: '#9333ea' },
  { match: /encanador/i,             icon: Droplets,    bg: '#eff6ff', color: '#0284c7' },
  { match: /montagem|móveis|moveis/i,icon: Package,     bg: '#eef2ff', color: '#4f46e5' },
  { match: /pedreiro/i,              icon: HardHat,     bg: '#fef9c3', color: '#92400e' },
  { match: /ar condic/i,             icon: Wind,        bg: '#f0fdfa', color: '#0d9488' },
  { match: /construção|construcao/i, icon: Building2,   bg: '#f1f5f9', color: '#475569' },
  { match: /manutenção|manutencao|predial/i, icon: Wrench, bg: '#f3f4f6', color: '#374151' },
  { match: /marcenaria/i,            icon: TreePine,    bg: '#f0fdf4', color: '#15803d' },
  { match: /assistência|assistencia|técnica|tecnica/i, icon: Monitor, bg: '#eff6ff', color: '#2563eb' },
  { match: /hidráulic|hidraulic/i,   icon: Waves,       bg: '#eff6ff', color: '#0369a1' },
  { match: /serviços gerais|servicos gerais/i, icon: Briefcase, bg: '#f3f4f6', color: '#374151' },
  { match: /diarista/i,              icon: Sparkles,    bg: '#fff1f2', color: '#e11d48' },
  { match: /arquitetura/i,           icon: PenTool,     bg: '#faf5ff', color: '#6d28d9' },
  { match: /decoração|decoracao/i,   icon: Palette,     bg: '#fdf4ff', color: '#a21caf' },
  { match: /impermeabil/i,           icon: Shield,      bg: '#f0fdfa', color: '#0d9488' },
  { match: /limpeza/i,               icon: Sparkles,    bg: '#eff6ff', color: '#0284c7' },
  { match: /piso|revestimento/i,     icon: LayoutGrid,  bg: '#fef9c3', color: '#92400e' },
  { match: /segurança|seguranca/i,   icon: ShieldCheck, bg: '#eef2ff', color: '#4338ca' },
  { match: /serralheria/i,           icon: KeyRound,    bg: '#fff7ed', color: '#ea580c' },
  { match: /confeitaria|bolo|doce/i, icon: Cake,        bg: '#fff1f2', color: '#db2777' },
  { match: /jardinagem|paisagismo/i, icon: Leaf,        bg: '#f0fdf4', color: '#16a34a' },
  { match: /câmera|camera|cftv/i,    icon: Camera,      bg: '#eef2ff', color: '#4338ca' },
  { match: /gás|gas/i,               icon: Thermometer, bg: '#fff7ed', color: '#dc2626' },
  { match: /dedetiz|pest/i,          icon: Shield,      bg: '#f0fdf4', color: '#16a34a' },
  { match: /mudança|frete/i,         icon: Truck,       bg: '#fff7ed', color: '#c2410c' },
  { match: /academia|fitness/i,      icon: Dumbbell,    bg: '#eff6ff', color: '#2563eb' },
  { match: /cabeleir|barbeir|estét|estet/i, icon: Scissors, bg: '#fff1f2', color: '#db2777' },
  { match: /residencial|casa|home/i, icon: Home,        bg: '#f0fdf4', color: '#16a34a' },
];

const FALLBACK_STYLES = [
  { icon: Settings,   bg: '#f3f4f6', color: '#374151' },
  { icon: Briefcase,  bg: '#eef2ff', color: '#4f46e5' },
  { icon: Star,       bg: '#fef9c3', color: '#d97706' },
  { icon: Home,       bg: '#f0fdf4', color: '#16a34a' },
  { icon: Wrench,     bg: '#fff7ed', color: '#c2410c' },
];

function resolveIcon(label) {
  const match = ICON_MAP.find((m) => m.match.test(label));
  if (match) return { icon: match.icon, bg: match.bg, color: match.color };
  const idx = (label.codePointAt(0) ?? 0) % FALLBACK_STYLES.length;
  return FALLBACK_STYLES[idx];
}

const toChips = (labels) => labels.map((label) => ({ label, ...resolveIcon(label) }));

function Categories() {
  const navigate = useNavigate();
  const [chips, setChips] = useState(() => toChips(FALLBACK_CATEGORY_LABELS));
  const trackRef = useRef(null);

  const go = (label) => navigate(`/buscar?q=${encodeURIComponent(label)}`);

  const scrollByAmount = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await apiGet('/api/providers/categories');
        const labels = Array.isArray(data) ? data.map((c) => c.label).filter(Boolean) : [];
        if (active && labels.length) setChips(toChips(labels));
      } catch {
        // mantém as categorias de reserva
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section className="categories" id="categorias">
      <div className="categories-head">
        <h2 className="categories-title">O que você precisa?</h2>
        <button type="button" className="categories-all" onClick={() => navigate('/buscar')}>
          Ver todos os prestadores <ChevronRight size={15} />
        </button>
      </div>

      <div className="cat-featured">
        {FEATURED.map((f) => (
          <button key={f.id} className="cat-card-big" style={{ background: f.bg }} onClick={() => go(f.id)}>
            <div className="cat-deco cat-deco-1" />
            <div className="cat-deco cat-deco-2" />
            <div>
              <div className="cat-card-big-label">{f.label}</div>
              <div className="cat-card-big-sub">{f.sub}</div>
            </div>
            <div className="cat-card-big-btn">
              {f.cta} <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>

      <div className="cat-carousel">
        <button
          type="button"
          className="cat-carousel-btn cat-carousel-btn-prev"
          onClick={() => scrollByAmount(-1)}
          aria-label="Categorias anteriores"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="cat-grid" ref={trackRef}>
          {chips.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.label} className="cat-chip" onClick={() => go(c.label)}>
                <div className="cat-chip-icon" style={{ background: c.bg }}>
                  <Icon size={22} color={c.color} strokeWidth={1.75} />
                </div>
                <span className="cat-chip-label">{c.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="cat-carousel-btn cat-carousel-btn-next"
          onClick={() => scrollByAmount(1)}
          aria-label="Próximas categorias"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default Categories;
