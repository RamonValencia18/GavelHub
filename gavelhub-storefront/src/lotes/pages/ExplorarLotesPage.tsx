import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoteCard } from '../components/LoteCard';
import { LotesFilterBar } from '../components/LotesFilterBar';
import type { Lote } from '../types/lote';
import '../css/ExplorarLotesPage.css';

export const ExplorarLotesPage: React.FC = () => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('TODOS');
  const [orden, setOrden] = useState<string>('proximo');
  const [favoritos, setFavoritos] = useState<Record<string, boolean>>({});

  // Los 4 estados de UI exigidos
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarLotes = async () => {
      try {
        setCargando(true);
        setError(null);

        // Simulación de respuesta de API alineada con Prisma
        await new Promise((res) => setTimeout(res, 600));

        const datosPrisma: Lote[] = [
          {
            id: '109',
            descripcion: 'Centenario 50 Pesos Oro Ley .900 (1943) NGC MS64',
            estado: 'ABIERTO',
            precioSalida: 50000,
            incrementoMinimo: 1500,
            precioReserva: 65000,
            fechaHoraApertura: new Date().toISOString(),
            fechaHoraCierre: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
            mediaList: [],
            ofertas: [],
          },
          {
            id: '112',
            descripcion: 'Pluma Fuente Antigua de Colección Celuloide',
            estado: 'ABIERTO',
            precioSalida: 15000,
            incrementoMinimo: 500,
            precioReserva: 20000,
            fechaHoraApertura: new Date().toISOString(),
            fechaHoraCierre: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
            mediaList: [],
            ofertas: [],
          },
          {
            id: '108',
            descripcion: 'Omega Speedmaster Professional Pre-Moon Calibre 321',
            estado: 'ABIERTO',
            precioSalida: 90000,
            incrementoMinimo: 2500,
            precioReserva: 120000,
            fechaHoraApertura: new Date().toISOString(),
            fechaHoraCierre: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
            mediaList: [],
            ofertas: [],
          },
          {
            id: '107',
            descripcion: 'Montblanc Meisterstück 149 Plumín Bicolor',
            estado: 'CERRADO',
            precioSalida: 30000,
            incrementoMinimo: 1000,
            precioReserva: 40000,
            fechaHoraApertura: new Date(Date.now() - 86400000).toISOString(),
            fechaHoraCierre: new Date(Date.now() - 3600000).toISOString(),
            mediaList: [],
            ofertas: [],
          },
        ];

        setLotes(datosPrisma);
      } catch (err) {
        setError('No fue posible conectar con el servicio de subastas.');
      } finally {
        setCargando(false);
      }
    };

    cargarLotes();
  }, []);

  const handleToggleFavorito = (id: string) => {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
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
          <span className="catalog-state__icon">⚠️</span>
          <h3>Error al cargar los lotes</h3>
          <p>{error}</p>
          <button
            type="button"
            className="btn-retry"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* CASO 3: LISTA VACÍA */}
      {!cargando && !error && lotesFiltrados.length === 0 && (
        <div className="catalog-state catalog-state--empty">
          <span className="catalog-state__icon">🔍</span>
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