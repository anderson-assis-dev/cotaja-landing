import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  PlusCircle,
  Search,
  User,
  Wrench,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BRAND_NAME, LOGO_SRC } from '../utils/brand';
import './AppLayout.css';

const CLIENT_NAV = [
  { to: '/app', label: 'Início', icon: Home, end: true },
  { to: '/app/pedidos/novo', label: 'Novo pedido', icon: PlusCircle },
  { to: '/app/pedidos', label: 'Meus pedidos', icon: ClipboardList, exclude: '/app/pedidos/novo' },
  { to: '/app/buscar', label: 'Buscar', icon: Search },
  { to: '/app/perfil', label: 'Perfil', icon: User },
];

const PROVIDER_NAV = [
  { to: '/app', label: 'Início', icon: Home, end: true },
  { to: '/app/demandas', label: 'Demandas', icon: Briefcase },
  { to: '/app/propostas', label: 'Propostas', icon: FileText },
  { to: '/app/servicos', label: 'Serviços', icon: Wrench },
  { to: '/app/perfil', label: 'Perfil', icon: User },
];

const isItemActive = (pathname, { to, end, exclude }) => {
  if (end) return pathname === to;
  if (exclude && pathname.startsWith(exclude)) return false;
  return pathname === to || pathname.startsWith(`${to}/`);
};

export default function AppLayout() {
  const { user, isProvider, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [signingOut, setSigningOut] = useState(false);
  const items = isProvider ? PROVIDER_NAV : CLIENT_NAV;

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate('/', { replace: true });
  };

  const initials = (user?.name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <div className="app-shell">
      <aside className="app-side">
        <Link to="/" className="app-side-brand">
          <img src={LOGO_SRC} alt={BRAND_NAME} />
        </Link>

        <nav className="app-side-nav">
          {items.map((item) => {
            const { to, label, icon: Icon } = item;
            const active = isItemActive(pathname, item);
            return (
              <Link
                key={to}
                to={to}
                className={`app-side-link${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={19} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="app-side-foot">
          <div className="app-user">
            {user?.avatar_base64 ? (
              <img src={user.avatar_base64} alt="" className="app-user-avatar" />
            ) : (
              <span className="app-user-initials">{initials}</span>
            )}
            <div className="app-user-info">
              <strong>{user?.name}</strong>
              <span>{isProvider ? 'Prestador' : 'Cliente'}</span>
            </div>
          </div>
          <button type="button" className="app-signout" onClick={handleSignOut} disabled={signingOut}>
            <LogOut size={16} />
            {signingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <Link to="/" className="app-topbar-brand">
            <img src={LOGO_SRC} alt={BRAND_NAME} />
          </Link>
          <Link to="/app/perfil" className="app-topbar-user" aria-label="Perfil">
            {user?.avatar_base64 ? (
              <img src={user.avatar_base64} alt="" />
            ) : (
              <span>{initials}</span>
            )}
          </Link>
        </header>

        <main className="app-content">
          <Outlet />
        </main>

        <nav className="app-tabbar">
          {items.map((item) => {
            const { to, label, icon: Icon } = item;
            const active = isItemActive(pathname, item);
            return (
              <Link
                key={to}
                to={to}
                className={`app-tab${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
