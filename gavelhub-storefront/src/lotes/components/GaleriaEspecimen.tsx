import React, { useState } from 'react';
import type { LoteMedia } from '../types/lote';
import './GaleriaEspecimen.css';

interface GaleriaEspecimenProps {
  numeroLote: string | number;
  descripcion: string;
  mediaList?: LoteMedia[];
}

export const GaleriaEspecimen: React.FC<GaleriaEspecimenProps> = ({
  numeroLote,
  descripcion,
  mediaList = [],
}) => {
  const [indiceSeleccionado, setIndiceSeleccionado] = useState<number>(0);

  const imagenActual = mediaList[indiceSeleccionado]?.url || '';
  const tituloImagen = mediaList[indiceSeleccionado]?.descripcion || 'Vista principal';

  return (
    <section className="specimen-gallery">
      <div className="specimen-gallery__main-view">
        {imagenActual ? (
          <img
            src={imagenActual}
            alt={descripcion}
            className="specimen-gallery__main-image"
          />
        ) : (
          <div className="specimen-gallery__placeholder">
            Sin imagen disponible
          </div>
        )}

        <div className="specimen-gallery__macro-badge">
          <span className="specimen-gallery__macro-icon">🔍</span>
          <span>Vista macro 1:1 • Alta resolución</span>
        </div>

        <div className="specimen-gallery__lot-number">
          Lote {numeroLote}
        </div>
      </div>

      {mediaList.length > 0 && (
        <div className="specimen-gallery__thumbnails">
          {mediaList.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              className={`specimen-thumb ${
                indiceSeleccionado === idx ? 'specimen-thumb--active' : ''
              }`}
              onClick={() => setIndiceSeleccionado(idx)}
              aria-label={`Ver ${item.descripcion}`}
            >
              <div className="specimen-thumb__image-wrapper">
                <img
                  src={item.url}
                  alt={item.descripcion}
                  className="specimen-thumb__image"
                />
              </div>
              <span className="specimen-thumb__label">{item.descripcion}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};