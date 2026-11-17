import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import { Gavel, User } from 'lucide-react';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
  const { usuario, estaAutenticado, logout } = useAuth();
  const location = useLocation();

  // Helper para verificar la pestaña activa
  const esRutaActiva = (ruta: string) => location.pathname === ruta;

  // Formato dinámico del distintivo del usuario
  const obtenerEtiquetaUsuario = () => {
    if (usuario?.correo) {
      return usuario.correo.split('@')[0];
    }
    return 'Postor Activo';
  };

  return (
    <header className="app-header">
      <div className="app-header__container">
        <Link to="/" className="app-header__brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="app-header__logo"><Gavel size={18} /></span>
          <span className="app-header__title">GavelHub</span>
        </Link>
        
        <nav className="app-header__nav">
          <Link 
            to="/lotes" 
            className={`app-header__link ${esRutaActiva('/lotes') || esRutaActiva('/') ? 'app-header__link--active' : ''}`}
          >
            Explorar
          </Link>
          <Link 
            to="/seguimiento" 
            className={`app-header__link ${esRutaActiva('/seguimiento') ? 'app-header__link--active' : ''}`}
          >
            Mis seguidos
          </Link>
          <Link 
            to="/ganados" 
            className={`app-header__link ${esRutaActiva('/ganados') ? 'app-header__link--active' : ''}`}
          >
            Mis ganados
          </Link>
        </nav>

        <div className="app-header__user">
          {estaAutenticado ? (
            <div className="app-header__user-session" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="app-header__user-badge">
                <User size={15} /> {obtenerEtiquetaUsuario()}
              </span>
              <button 
                onClick={logout}
                className="app-header__logout-btn"
                style={{
                  background: 'transparent',
                  border: '1px solid currentColor',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: 'inherit'
                }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="app-header__link app-header__link--login"
              style={{
                padding: '6px 14px',
                backgroundColor: 'var(--color-primary, #000)',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};