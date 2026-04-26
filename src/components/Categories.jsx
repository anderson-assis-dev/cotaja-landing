import React,{useEffect,useState}from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Categories.css';

const API_URL=process.env.REACT_APP_API_URL||'https://app.cotaja.io';

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

const STYLES=[
{emoji:'💻',bg:'#eff6ff',color:'#2563eb'},
{emoji:'🎨',bg:'#fefce8',color:'#d97706'},
{emoji:'🌿',bg:'#f0fdf4',color:'#16a34a'},
{emoji:'🎉',bg:'#fff1f2',color:'#e11d48'},
{emoji:'📷',bg:'#fdf4ff',color:'#9333ea'},
{emoji:'❄️',bg:'#f0fdfa',color:'#0d9488'},
{emoji:'🚚',bg:'#fff7ed',color:'#c2410c'},
{emoji:'📚',bg:'#eef2ff',color:'#3730a3'},
{emoji:'✏️',bg:'#faf5ff',color:'#7c3aed'},
{emoji:'🛠️',bg:'#f3f4f6',color:'#111827'},
];

function Categories() {
  const navigate = useNavigate();
  const [chips,setChips]=useState([]);

  const go = (label) => navigate(`/buscar?q=${encodeURIComponent(label)}`);

  useEffect(()=>{
    let active=true;
    (async()=>{
      try{
        const res=await fetch(`${API_URL}/api/providers/categories?limit=24`);
        const json=await res.json();
        const list=json&&json.success&&Array.isArray(json.data)?json.data:[];
        const next=list.map((c,i)=>({label:c.label,...STYLES[i%STYLES.length]}));
        if(active)setChips(next);
      }catch{
        if(active)setChips([]);
      }
    })();
    return()=>{active=false;};
  },[]);

  return (
    <section className="categories" id="categorias">
      <h2 className="categories-title">O que você precisa?</h2>

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

      <div className="cat-grid">
        {chips.map((c) => (
          <button key={c.label} className="cat-chip" onClick={() => go(c.label)}>
            <div className="cat-chip-icon" style={{ background: c.bg }}>
              {c.emoji}
            </div>
            <span className="cat-chip-label">{c.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
