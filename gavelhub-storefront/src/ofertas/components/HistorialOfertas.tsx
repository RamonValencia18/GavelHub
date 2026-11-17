import React from 'react';
import type { Oferta } from '../types/oferta';
import './HistorialOfertas.css';

interface HistorialOfertasProps {
  ofertas?: Oferta[];
  precioSalida: number;
  usuarioActualId?: string;
}

export const HistorialOfertas: React.FC<HistorialOfertasProps> = ({
  ofertas = [],
  precioSalida,
  usuarioActualId,
}) => {
  const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(monto);
  };

  const formatearHora = (fechaHora: string | Date) => {
    return new Date(fechaHora).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + ' UTC-6';
  };

  return (
    <section className="bid-history">
      <div className="bid-history__header">
        <div className="bid-history__title-block">
          <span className="bid-history__gavel-icon">⚖</span>
          <h2 className="bid-history__title">Historial público de ofertas</h2>
        </div>
        <p className="bid-history__subtitle">
          Registro ordenado por hora exacta de recepción de ofertas.
        </p>
      </div>

      <div className="bid-history__table-wrapper">
        <table className="bid-history__table">
          <thead>
            <tr>
              <th>Participante</th>
              <th className="text-right">Monto</th>
              <th className="hidden-mobile">Hora exacta</th>
              <th className="text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((oferta, idx) => {
              const esLider = idx === 0 && oferta.estado === 'ACEPTADA';
              const esMio = oferta.usuarioId === usuarioActualId;

              return (
                <tr
                  key={oferta.id}
                  className={`bid-history__row ${
                    esLider ? 'bid-history__row--winning' : ''
                  }`}
                >
                  <td className="bid-history__user-cell">
                    {esLider && (
                      <span className="bid-history__indicator"></span>
                    )}
                    <span className="bid-history__user-name">
                      {esMio
                        ? `Postor #${oferta.usuarioId.slice(0, 4)} (Tú)`
                        : `Postor #${oferta.usuarioId.slice(0, 4)}`}
                    </span>
                  </td>

                  <td className="bid-history__amount-cell">
                    {formatearMoneda(oferta.cantidad)}
                  </td>

                  <td className="bid-history__time-cell hidden-mobile">
                    {formatearHora(oferta.fechaHora)}
                  </td>

                  <td className="bid-history__status-cell text-right">
                    {esLider ? (
                      <span className="badge-status badge-status--winning">
                        <span className="pulse-dot"></span>
                        Ganando
                      </span>
                    ) : (
                      <span className="badge-status badge-status--outbid">
                        {oferta.estado}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* Fila base de la subasta */}
            <tr className="bid-history__row bid-history__row--base">
              <td className="bid-history__user-cell">Oferta inicial</td>
              <td className="bid-history__amount-cell">
                {formatearMoneda(precioSalida)}
              </td>
              <td className="bid-history__time-cell hidden-mobile">--:--:--</td>
              <td className="bid-history__status-cell text-right">
                <span className="badge-status badge-status--base">Base</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};