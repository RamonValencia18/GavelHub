import React, { useState } from 'react';
import { Gavel, RefreshCw } from 'lucide-react';
import type { Oferta } from '../types/oferta';
import './HistorialOfertas.css';

interface HistorialOfertasProps {
  ofertas?: Oferta[];
  precioSalida: number;
  usuarioActualId?: string;
  onRecargar?: () => Promise<void> | void;
}

export const HistorialOfertas: React.FC<HistorialOfertasProps> = ({
  ofertas = [],
  precioSalida,
  usuarioActualId,
  onRecargar,
}) => {
  const [actualizando, setActualizando] = useState<boolean>(false);

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

  const handleRecargarManual = async () => {
    if (!onRecargar || actualizando) return;
    try {
      setActualizando(true);
      await onRecargar();
    } catch (err) {
      console.error('Error al recargar el historial de ofertas:', err);
    } finally {
      setActualizando(false);
    }
  };

  return (
    <section className="bid-history">
      <div className="bid-history__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="bid-history__title-block">
            <span className="bid-history__gavel-icon"><Gavel size={17} /></span>
            <h2 className="bid-history__title">Historial público de ofertas</h2>
          </div>
          <p className="bid-history__subtitle">
            Registro ordenado por hora exacta de recepción de ofertas.
          </p>
        </div>

        {/* Botón Institucional de Recarga Manual */}
        {onRecargar && (
          <button
            type="button"
            onClick={handleRecargarManual}
            disabled={actualizando}
            className="bid-history__refresh-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'transparent',
              border: '1px solid currentColor',
              borderRadius: '4px',
              cursor: actualizando ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
              color: 'inherit',
              opacity: actualizando ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ display: 'inline-block', transform: actualizando ? 'rotate(360deg)' : 'none', transition: 'transform 0.6s ease' }}>
              <RefreshCw size={14} />
            </span>
            <span>{actualizando ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        )}
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
                        ? `Postor #${oferta.usuarioId ? oferta.usuarioId.slice(0, 4) : 'Tú'} (Tú)`
                        : `Postor #${oferta.usuarioId ? oferta.usuarioId.slice(0, 4) : 'Anon'}`}
                    </span>
                  </td>

                  <td className="bid-history__amount-cell">
                    {formatearMoneda(oferta.cantidad || 0)}
                  </td>

                  <td className="bid-history__time-cell hidden-mobile">
                    {formatearHora(oferta.fechaHora || new Date())}
                  </td>

                  <td className="bid-history__status-cell text-right">
                    {esLider ? (
                      <span className="badge-status badge-status--winning">
                        <span className="pulse-dot"></span>
                        Ganando
                      </span>
                    ) : (
                      <span className="badge-status badge-status--outbid">
                        {oferta.estado || 'SUPERADA'}
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