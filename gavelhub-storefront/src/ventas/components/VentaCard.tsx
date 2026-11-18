import React from 'react';
import { formatCurrency } from '../../common/utils/formatters';
import { getEstadoPagoLabel, getEstadoPagoMensaje } from '../../common/utils/ventaUtils';
import type { VentaConDetalle } from '../types/venta';
import '../css/VentaCard.css';

interface VentaCardProps {
  venta: VentaConDetalle;
  onVerLote: (id: string) => void;
}

export const VentaCard: React.FC<VentaCardProps> = ({ venta, onVerLote }) => {
  const { lote, estadoPago, monto, loteId } = venta;
  const imagen = lote?.mediaList?.[0]?.url;
  const titulo = lote?.descripcion ?? 'Lote no disponible';

  return (
    <article className="venta-card">
      <div className="venta-card__media">
        {imagen ? (
          <img src={imagen} alt={titulo} className="venta-card__image" />
        ) : (
          <div className="venta-card__placeholder">Sin imagen</div>
        )}
        <span className={`venta-card__badge venta-card__badge--${estadoPago.toLowerCase()}`}>
          {getEstadoPagoLabel(estadoPago)}
        </span>
      </div>

      <div className="venta-card__body">
        <h3 className="venta-card__title">{titulo}</h3>
        <div className="venta-card__amount">
          <span className="venta-card__amount-label">Monto adjudicado</span>
          <span className="venta-card__amount-value">
            {monto !== undefined ? formatCurrency(monto) : 'No disponible'}
          </span>
        </div>
        <p className="venta-card__note">{getEstadoPagoMensaje(estadoPago)}</p>
      </div>

      <div className="venta-card__footer">
        <button type="button" className="venta-card__action" onClick={() => onVerLote(loteId)}>
          Ver lote
        </button>
      </div>
    </article>
  );
};