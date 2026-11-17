import React, { useState, useEffect } from 'react';
import type { Lote } from '../../lotes/types/lote';
import './ConsolaOferta.css';

interface ConsolaOfertaProps {
  lote: Lote;
  ofertaActual?: number;
  totalOfertas?: number;
  usuarioActualId?: string;
  onEnviarOferta: (monto: number) => Promise<void>;
  onToggleFavorito: (id: string) => void;
  esFavorito?: boolean;
}

export const ConsolaOferta: React.FC<ConsolaOfertaProps> = ({
  lote,
  ofertaActual,
  totalOfertas = 0,
  usuarioActualId,
  onEnviarOferta,
  onToggleFavorito,
  esFavorito = false,
}) => {
  const { id, estado, precioSalida, incrementoMinimo, fechaHoraCierre } = lote;

  const montoVigente = ofertaActual ?? precioSalida;
  const minimoRequerido = montoVigente + incrementoMinimo;

  const [montoOferta, setMontoOferta] = useState<number>(minimoRequerido);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
  const [enviando, setEnviando] = useState<boolean>(false);

  // Sincronizar monto si cambia la oferta actual
  useEffect(() => {
    setMontoOferta(minimoRequerido);
  }, [minimoRequerido]);

  const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(monto);
  };

  const handleIncrementar = () => {
    setErrorValidacion(null);
    setMontoOferta((prev) => prev + incrementoMinimo);
  };

  const handleDecrementar = () => {
    if (montoOferta - incrementoMinimo >= minimoRequerido) {
      setErrorValidacion(null);
      setMontoOferta((prev) => prev - incrementoMinimo);
    }
  };

  const handleMontoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorLimpio = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setErrorValidacion(null);

    if (isNaN(valorLimpio)) {
      setMontoOferta(minimoRequerido);
    } else {
      setMontoOferta(valorLimpio);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regla de negocio en el cliente antes de enviar al servidor
    if (montoOferta < minimoRequerido) {
      setErrorValidacion(
        `La oferta no se aceptó porque la oferta actual (${formatearMoneda(
          montoVigente
        )}) más el incremento de ${formatearMoneda(
          incrementoMinimo
        )} es ${formatearMoneda(minimoRequerido)}.`
      );
      return;
    }

    try {
      setEnviando(true);
      setErrorValidacion(null);
      await onEnviarOferta(montoOferta);
    } catch (err: any) {
      setErrorValidacion(err.message || 'Ocurrió un error al registrar la oferta.');
    } finally {
      setEnviando(false);
    }
  };

  const estaCerrado = estado === 'CERRADO' || estado === 'RETIRADO';

  return (
    <div className="bidding-console">
      <div className="bidding-console__header">
        <div className="bidding-console__status-tag">
          <span className="pulse-dot"></span>
          <span>{estaCerrado ? 'Subasta Finalizada' : 'Subasta en curso'}</span>
        </div>
        <span className="bidding-console__lot-id">Lote {lote.id.slice(0, 4)}</span>
      </div>

      {/* Reloj de Cierre */}
      <div className="bidding-console__timer-block">
        <span className="bidding-console__label">Cierre de la subasta</span>
        <div className="bidding-console__timer-grid">
          <div className="timer-unit">
            <span className="timer-unit__value">02</span>
            <span className="timer-unit__label">días</span>
          </div>
          <span className="timer-divider">:</span>
          <div className="timer-unit">
            <span className="timer-unit__value">07</span>
            <span className="timer-unit__label">h</span>
          </div>
          <span className="timer-divider">:</span>
          <div className="timer-unit">
            <span className="timer-unit__value">59</span>
            <span className="timer-unit__label">min</span>
          </div>
          <span className="timer-divider">:</span>
          <div className="timer-unit">
            <span className="timer-unit__value timer-unit__value--active">55</span>
            <span className="timer-unit__label">s</span>
          </div>
        </div>
      </div>

      {/* Oferta Actual */}
      <div className="bidding-console__current-price">
        <span className="bidding-console__label">Oferta actual</span>
        <div className="bidding-console__price-row">
          <span className="bidding-console__amount">
            {formatearMoneda(montoVigente)}
          </span>
        </div>
        <div className="bidding-console__leader-badge">
          <span>✓ Liderada por ti</span>
        </div>
      </div>

      <div className="bidding-console__min-required">
        <span>Mínimo requerido:</span>
        <strong>{formatearMoneda(minimoRequerido)}</strong>
      </div>

      {/* Formulario de Puja */}
      <form onSubmit={handleSubmit} className="bidding-console__form">
        <div className="bidding-console__quick-bids">
          <span className="bidding-console__label">Incrementos rápidos</span>
          <div className="quick-bids-grid">
            <button
              type="button"
              className="quick-bid-btn"
              onClick={() => setMontoOferta(minimoRequerido)}
            >
              +{formatearMoneda(incrementoMinimo)}
            </button>
            <button
              type="button"
              className="quick-bid-btn"
              onClick={() => setMontoOferta(minimoRequerido + incrementoMinimo)}
            >
              +{formatearMoneda(incrementoMinimo * 2)}
            </button>
            <button
              type="button"
              className="quick-bid-btn"
              onClick={() => setMontoOferta(minimoRequerido + incrementoMinimo * 3)}
            >
              +{formatearMoneda(incrementoMinimo * 4)}
            </button>
          </div>
        </div>

        <div className="bidding-console__input-group">
          <label htmlFor="bid-input" className="bidding-console__label">
            Monto a ofertar
          </label>
          <div className="bid-stepper">
            <button
              type="button"
              className="bid-stepper__btn"
              onClick={handleDecrementar}
              disabled={estaCerrado || montoOferta <= minimoRequerido}
            >
              −
            </button>
            <input
              id="bid-input"
              type="text"
              className="bid-stepper__input"
              value={formatearMoneda(montoOferta)}
              onChange={handleMontoInputChange}
              disabled={estaCerrado}
            />
            <button
              type="button"
              className="bid-stepper__btn"
              onClick={handleIncrementar}
              disabled={estaCerrado}
            >
              +
            </button>
          </div>
        </div>

        {/* Alerta de Error de Validación */}
        {errorValidacion && (
          <div className="bidding-console__alert-error" role="alert">
            <span className="alert-icon">⚠️</span>
            <p>{errorValidacion}</p>
          </div>
        )}

        <div className="bidding-console__actions">
          <button
            type="submit"
            className="btn-submit-bid"
            disabled={estaCerrado || enviando}
          >
            ⚖ {enviando ? 'Enviando oferta...' : `Ofertar ${formatearMoneda(montoOferta)}`}
          </button>

          <button
            type="button"
            className={`btn-follow ${esFavorito ? 'btn-follow--active' : ''}`}
            onClick={() => onToggleFavorito(id)}
          >
            ★ {esFavorito ? 'Siguiendo lote' : 'Seguir lote'}
          </button>
        </div>
      </form>

      <div className="bidding-console__footer-note">
        <span className="note-title">ℹ Regla del servidor central</span>
        <p>
          La hora de cierre la decide el servidor central y una oferta recibida después del cierre no es válida, aunque sea más alta.
        </p>
      </div>
    </div>
  );
};