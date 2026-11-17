import React, { useEffect, useState } from 'react';
import { Clock3, Star } from 'lucide-react';
import type { Lote } from '../types/lote';
import { formatCurrency } from '../../common/utils/formatters';
import {
  getEstadoLoteLabel,
  calcularTiempoRestante,
} from '../../common/utils/loteUtils';
import '../css/LoteCard.css';

interface LoteCardProps {
  lote: Lote;
  ofertaMasAlta?: number;
  totalOfertas?: number;
  esFavorito?: boolean;
  onVerDetalle: (id: string) => void;
  onToggleFavorito: (id: string) => void;
}

export const LoteCard: React.FC<LoteCardProps> = ({
  lote,
  ofertaMasAlta,
  totalOfertas = 0,
  esFavorito = false,
  onVerDetalle,
  onToggleFavorito,
}) => {
  const { id, descripcion, estado, precioSalida, fechaHoraCierre, mediaList } = lote;

  const imagenPrincipal = mediaList && mediaList.length > 0 ? mediaList[0].url : '';
  const montoVigente = ofertaMasAlta ?? precioSalida;
  const [ahora, setAhora] = useState(Date.now());

  useEffect(() => {
    const intervalo = window.setInterval(() => setAhora(Date.now()), 1000);
    return () => window.clearInterval(intervalo);
  }, []);

  const tiempo = calcularTiempoRestante(fechaHoraCierre, ahora);
  const tiempoVisible = tiempo.finalizado
    ? 'Subasta finalizada'
    : tiempo.dias > 0
      ? `Quedan ${tiempo.dias}d ${tiempo.horas}h ${tiempo.minutos}m ${tiempo.segundos}s`
      : `Quedan ${tiempo.horas}h ${tiempo.minutos}m ${tiempo.segundos}s`;

  return (
    <article className="lot-card">
      <div className="lot-card__media">
        {imagenPrincipal ? (
          <img
            src={imagenPrincipal}
            alt={descripcion}
            className="lot-card__image"
          />
        ) : (
          <div className="lot-card__image-placeholder">Sin imagen</div>
        )}

        <span className={`lot-card__badge lot-card__badge--${estado.toLowerCase()}`}>
          {getEstadoLoteLabel(estado)}
        </span>

        <button
          type="button"
          className={`lot-card__fav-btn ${esFavorito ? 'lot-card__fav-btn--active' : ''}`}
          onClick={() => onToggleFavorito(id)}
          aria-label="Seguir lote"
        >
          <Star size={16} fill={esFavorito ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="lot-card__body">
        <h3 className="lot-card__title">{descripcion}</h3>

        <div className="lot-card__pricing">
          <div className="lot-card__price-block">
            <span className="lot-card__price-label">
              {estado === 'CERRADO' ? 'Monto final' : 'Oferta actual'}
            </span>
            <span className="lot-card__price-amount">
              {formatCurrency(montoVigente)}
            </span>
          </div>
          <span className="lot-card__bids-count">{totalOfertas} ofertas</span>
        </div>

        <div className="lot-card__timer">
          <span className="lot-card__timer-icon"><Clock3 size={14} /></span>
          <span>{tiempoVisible}</span>
        </div>
      </div>

      <div className="lot-card__footer">
        <button
          type="button"
          className="lot-card__action-btn"
          onClick={() => onVerDetalle(id)}
        >
          Ver lote
        </button>
      </div>
    </article>
  );
};