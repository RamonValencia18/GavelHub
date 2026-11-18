import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Trophy } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useMisVentas } from '../hooks/useMisVentas';
import { VentaCard } from '../components/VentaCard';
import '../../lotes/css/ExplorarLotesPage.css';

export const MisGanadosPage: React.FC = () => {
  const navigate = useNavigate();
  const { estaAutenticado } = useAuth();
  const { ventas, cargando, error, recargar } = useMisVentas(estaAutenticado);

  return (
    <div className="explorar-lotes-container">
      <header className="catalog-header">
        <h1 className="catalog-header__title">Mis lotes ganados</h1>
        <p className="catalog-header__subtitle">
          Las subastas que se adjudicaron a tu cuenta y el estado de su pago.
        </p>
      </header>

      {/* 0. SIN SESIÓN */}
      {!estaAutenticado && (
        <div className="catalog-state catalog-state--empty">
          <h3>Inicia sesión para consultar tus adjudicaciones</h3>
        </div>
      )}

      {/* 1. CARGANDO */}
      {estaAutenticado && cargando && (
        <div className="catalog-state catalog-state--loading">
          <div className="spinner"></div>
          <p>Cargando tus lotes ganados...</p>
        </div>
      )}

      {/* 2. ERROR */}
      {estaAutenticado && !cargando && error && (
        <div className="catalog-state catalog-state--error">
          <div className="catalog-state__icon"><AlertTriangle size={26} /></div>
          <div className="catalog-state__copy">
            <span className="catalog-state__eyebrow">No se pudo completar la consulta</span>
            <h3>Tus lotes ganados no pudieron cargarse</h3>
            <p>{error}</p>
            <button type="button" className="btn-retry" onClick={() => void recargar()}>
              <RefreshCw size={16} />
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* 3. VACÍO */}
      {estaAutenticado && !cargando && !error && ventas.length === 0 && (
        <div className="catalog-state catalog-state--empty">
          <span className="catalog-state__icon"><Trophy size={22} /></span>
          <h3>Aún no has ganado ninguna subasta</h3>
          <p>
            Cuando una subasta se adjudique a tu cuenta, aparecerá aquí con el estado de su pago.
            Explora los lotes abiertos y haz tu primera oferta.
          </p>
          <Link to="/lotes" className="btn-retry">Explorar lotes</Link>
        </div>
      )}

      {/* 4. CON DATOS */}
      {estaAutenticado && !cargando && !error && ventas.length > 0 && (
        <div className="venta-grid">
          {ventas.map((venta) => (
            <VentaCard key={venta.id} venta={venta} onVerLote={(id) => navigate(`/lotes/${id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};