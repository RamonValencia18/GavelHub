import React from 'react';
import type { Lote } from '../types/lote';
import type { EstadoLote } from '../../common/types/enums';
import './LoteCard.css';

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

  const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(monto);
  };

  const obtenerEtiquetaEstado = (est: EstadoLote) => {
    switch (est) {
      case 'ABIERTO':
        return 'Abierto';
      case 'PUBLICADO':
        return 'Abre pronto';
      case 'CERRADO':
        return 'Cerrado';
      case 'RETIRADO':
        return 'Retirado';
      default:
        return est;
    }
  };

  const calcularTiempoRestante = (cierre: string | Date) => {
    const ahora = new Date().getTime();
    const limite = new Date(cierre).getTime();
    const diferencia = limite - ahora;

    if (diferencia <= 0) return 'Finalizado';

    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return `Quedan ${horas}h ${minutos}m`;
  };

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
          {obtenerEtiquetaEstado(estado)}
        </span>

        <button
          type="button"
          className={`lot-card__fav-btn ${esFavorito ? 'lot-card__fav-btn--active' : ''}`}
          onClick={() => onToggleFavorito(id)}
          aria-label="Seguir lote"
        >
          ★
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
              {formatearMoneda(montoVigente)}
            </span>
          </div>
          <span className="lot-card__bids-count">{totalOfertas} ofertas</span>
        </div>

        <div className="lot-card__timer">
          <span className="lot-card__timer-icon">⏱</span>
          <span>{calcularTiempoRestante(fechaHoraCierre)}</span>
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