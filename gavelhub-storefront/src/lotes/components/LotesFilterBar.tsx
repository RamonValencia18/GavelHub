import React from 'react';
import './LotesFilterBar.css';

interface LotesFilterBarProps {
  busqueda: string;
  onBusquedaChange: (val: string) => void;
  filtroEstado: string;
  onFiltroEstadoChange: (estado: string) => void;
  orden: string;
  onOrdenChange: (orden: string) => void;
}

export const LotesFilterBar: React.FC<LotesFilterBarProps> = ({
  busqueda,
  onBusquedaChange,
  filtroEstado,
  onFiltroEstadoChange,
  orden,
  onOrdenChange,
}) => {
  const estados = [
    { value: 'TODOS', label: 'Todos los lotes' },
    { value: 'ABIERTO', label: 'Abiertos' },
    { value: 'PUBLICADO', label: 'Abren pronto' },
    { value: 'CERRADO', label: 'Cerrados' },
  ];

  return (
    <div className="catalog-filters">
      <div className="catalog-filters__search-row">
        <input
          type="search"
          className="catalog-filters__input"
          placeholder="Buscar por palabra clave o descripción..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />

        <select
          className="catalog-filters__select"
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value)}
        >
          <option value="proximo">Cierre más próximo</option>
          <option value="oferta-asc">Precio: menor a mayor</option>
          <option value="oferta-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="catalog-filters__chips">
        {estados.map((est) => (
          <button
            key={est.value}
            type="button"
            className={`chip ${filtroEstado === est.value ? 'chip--active' : ''}`}
            onClick={() => onFiltroEstadoChange(est.value)}
          >
            {est.label}
          </button>
        ))}
      </div>
    </div>
  );
};