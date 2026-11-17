import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, RefreshCw, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../common/api/client';
import { LoteCard } from '../components/LoteCard';
import { LotesFilterBar } from '../components/LotesFilterBar';
import type { Lote } from '../types/lote';
import '../css/ExplorarLotesPage.css';

export const ExplorarLotesPage: React.FC = () => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('TODOS');
  const [orden, setOrden] = useState<string>('proximo');
  const [favoritos, setFavoritos] = useState<Record<string, boolean>>(() => {
    const ids: string[] = JSON.parse(localStorage.getItem('gavelhub_seguidos') || '[]');
    return Object.fromEntries(ids.map((id) => [id, true]));
  });

  // Los 4 estados de UI exigidos
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarLotes = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);

      const respuesta = await api.get('/lotes');
      const datos = respuesta.data?.datos ?? respuesta.data;
      setLotes(Array.isArray(datos) ? datos : []);
    } catch {
      setError('GavelHub no pudo consultar el catálogo en este momento.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarLotes();
  }, [cargarLotes]);

  const handleToggleFavorito = (id: string) => {
    setFavoritos((prev) => {
      const siguiente = { ...prev, [id]: !prev[id] };
      const ids = Object.entries(siguiente).filter(([, activo]) => activo).map(([loteId]) => loteId);
      localStorage.setItem('gavelhub_seguidos', JSON.stringify(ids));
      return siguiente;
    });
  };

  const handleVerDetalle = (id: string) => {
    navigate(`/lotes/${id}`); // Redirección nativa de React Router
  };

  const lotesFiltrados = lotes.filter((lote) => {
    const coincideBusqueda = lote.descripcion
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === 'TODOS' || lote.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="explorar-lotes-container">
      <header className="catalog-header">
        <h1 className="catalog-header__title">Explorar lotes</h1>
        <p className="catalog-header__subtitle">
          Lotes curados con registro formal de ofertas en tiempo real.
        </p>
      </header>

      <LotesFilterBar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        filtroEstado={filtroEstado}
        onFiltroEstadoChange={setFiltroEstado}
        orden={orden}
        onOrdenChange={setOrden}
      />

      {/* CASO 1: CARGANDO */}
      {cargando && (
        <div className="catalog-state catalog-state--loading">
          <div className="spinner"></div>
          <p>Cargando catálogo de subastas...</p>
        </div>
      )}

      {/* CASO 2: ERROR */}
      {!cargando && error && (
        <div className="catalog-state catalog-state--error">
          <div className="catalog-state__icon"><AlertTriangle size={26} /></div>
          <div className="catalog-state__copy">
            <span className="catalog-state__eyebrow">Servicio temporalmente no disponible</span>
            <h3>El catálogo no pudo cargarse</h3>
            <p>{error}</p>
            <button
              type="button"
              className="btn-retry"
              onClick={() => void cargarLotes()}
              disabled={cargando}
            >
              <RefreshCw size={16} />
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* CASO 3: LISTA VACÍA */}
      {!cargando && !error && lotesFiltrados.length === 0 && (
        <div className="catalog-state catalog-state--empty">
          <span className="catalog-state__icon"><Search size={22} /></span>
          <h3>No se encontraron lotes</h3>
          <p>
            No hay subastas que coincidan con los criterios de búsqueda o el filtro seleccionado.
          </p>
        </div>
      )}

      {/* CASO 4: ÉXITO (LISTA CON DATOS) */}
      {!cargando && !error && lotesFiltrados.length > 0 && (
        <div className="lot-grid">
          {lotesFiltrados.map((lote) => (
            <LoteCard
              key={lote.id}
              lote={lote}
              esFavorito={!!favoritos[lote.id]}
              onVerDetalle={handleVerDetalle}
              onToggleFavorito={handleToggleFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
};