import React, { useState, useEffect } from 'react';
import { LoteCard } from '../components/LoteCard';
import { LotesFilterBar } from '../components/LotesFilterBar';
import type { Lote } from '../types/lote';
import '../css/ExplorarLotesPage.css';

export const ExplorarLotesPage: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [orden, setOrden] = useState('proximo');
  const [favoritos, setFavoritos] = useState<Record<string, boolean>>({});

  // Estados de carga y consulta (los 4 casos de UI)
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulamos la llamada a la API (en producción se usa lotes/services)
    const cargarLotes = async () => {
      try {
        setCargando(true);
        setError(null);

        // Simulamos retardo de red
        await new Promise((res) => setTimeout(res, 800));

        // Datos mapeados bajo el schema Prisma
        const datosPrisma: Lote[] = [
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            descripcion: 'Pluma Fuente Antigua de Colección Celuloide',
            estado: 'ABIERTO',
            precioSalida: 15000,
            incrementoMinimo: 500,
            precioReserva: 20000,
            fechaHoraApertura: new Date().toISOString(),
            fechaHoraCierre: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
            mediaList: [],
            ofertas: [],
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440002',
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
            id: '550e8400-e29b-41d4-a716-446655440003',
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
        setError('No fue posible conectar con el servidor de subastas. Verifique su conexión.');
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
    console.log(`Navegando a /auctions/${id}`);
  };

  // Filtrado de lotes en el frontend
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