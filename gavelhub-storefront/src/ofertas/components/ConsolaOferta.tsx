import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Gavel } from 'lucide-react';
import type { Lote } from '../../lotes/types/lote';
import { useRealizarOferta } from '../hooks/useRealizarOferta';
import { useAuth } from '../../features/auth/context/AuthContext';
import { calcularTiempoRestante } from '../../common/utils/loteUtils';
import './ConsolaOferta.css';

interface ConsolaOfertaProps {
  lote: Lote;
  ofertaActual?: number;
  totalOfertas?: number;
  onOfertaRegistradaExitosamente?: () => void;
}

export const ConsolaOferta: React.FC<ConsolaOfertaProps> = ({
  lote,
  ofertaActual,
  onOfertaRegistradaExitosamente,
}) => {
  const { id, estado, precioSalida, incrementoMinimo } = lote;
  const { estaAutenticado } = useAuth();
  const { enviando, errorMensaje, enviarOferta, limpiarError } = useRealizarOferta();

  // Calcular el monto actual y el mínimo requerido
  const montoVigente = ofertaActual ?? precioSalida;
  const minimoRequerido = montoVigente + incrementoMinimo;

  const [montoInput, setMontoInput] = useState<number>(minimoRequerido);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [exitoMensaje, setExitoMensaje] = useState<string | null>(null);
  const [ahora, setAhora] = useState(Date.now());

  useEffect(() => {
    const intervalo = window.setInterval(() => setAhora(Date.now()), 1000);
    return () => window.clearInterval(intervalo);
  }, []);

  // Sincronizar el input si la oferta actual del lote cambia dinámicamente
  useEffect(() => {
    setMontoInput(minimoRequerido);
  }, [ofertaActual, precioSalida, incrementoMinimo]);

  const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(monto);
  };

  const handleIncrementar = () => {
    limpiarError();
    setErrorLocal(null);
    setExitoMensaje(null);

    if (!estaAutenticado) {
      setErrorLocal('Debes iniciar sesión como participante para realizar una oferta.');
      return;
    }
    setMontoInput((prev) => prev + incrementoMinimo);
  };

  const handleDecrementar = () => {
    if (montoInput - incrementoMinimo >= minimoRequerido) {
      limpiarError();
      setErrorLocal(null);
      setExitoMensaje(null);
      setMontoInput((prev) => prev - incrementoMinimo);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    limpiarError();
    setErrorLocal(null);
    setExitoMensaje(null);

    // Validación preventiva en el cliente antes de golpear la red
    if (montoInput < minimoRequerido) {
      setErrorLocal(`La oferta debe ser de al menos ${formatearMoneda(minimoRequerido)}.`);
      return;
    }

    // Enviar oferta al backend NestJS
    const exito = await enviarOferta(id, montoInput, minimoRequerido);
    
    if (exito) {
      // 1. Mostrar banner de éxito visual
      setExitoMensaje(`¡Oferta de ${formatearMoneda(montoInput)} registrada con éxito!`);

      // 2. Notificar de forma segura al componente padre si la prop existe
      onOfertaRegistradaExitosamente?.();

      // 3. Incrementar el stepper para la siguiente postura
      setMontoInput(montoInput + incrementoMinimo);

      // Ocultar la alerta de éxito automáticamente tras 4 segundos
      setTimeout(() => {
        setExitoMensaje(null);
      }, 4000);
    }
  };

  const estaCerrado = estado === 'CERRADO' || estado === 'RETIRADO';
  const mensajeErrorMostrar = errorLocal || errorMensaje;
  const tiempo = calcularTiempoRestante(lote.fechaHoraCierre, ahora);
  const tiempoVisible = tiempo.finalizado
    ? 'Subasta finalizada'
    : `${tiempo.dias > 0 ? `${tiempo.dias}d ` : ''}${String(tiempo.horas).padStart(2, '0')}h ${String(tiempo.minutos).padStart(2, '0')}m ${String(tiempo.segundos).padStart(2, '0')}s`;

  return (
    <div className="bidding-console">
      <div className="bidding-console__header">
        <div className="bidding-console__status-tag">
          <span className="pulse-dot"></span>
          <span>{estaCerrado ? 'Subasta Finalizada' : 'Subasta en curso'}</span>
        </div>
      </div>

      <div className="bidding-console__current-price">
        <span className="bidding-console__label">Oferta actual</span>
        <div className="bidding-console__amount">
          {formatearMoneda(montoVigente)}
        </div>
      </div>

      <div className="bidding-console__min-required">
        <span>Mínimo requerido:</span>
        <strong>{formatearMoneda(minimoRequerido)}</strong>
      </div>

      <div className="bidding-console__timer" aria-live="polite">
        <span>Cierre restante</span>
        <strong>{tiempoVisible}</strong>
      </div>

      <form onSubmit={handleSubmit} className="bidding-console__form">
        <div className="bidding-console__input-group">
          <label htmlFor="bid-input" className="bidding-console__label">
            Monto a ofertar
          </label>
          <div className="bid-stepper">
            <button
              type="button"
              className="bid-stepper__btn"
              onClick={handleDecrementar}
              disabled={estaCerrado || montoInput <= minimoRequerido || enviando}
            >
              −
            </button>
            <input
              id="bid-input"
              type="text"
              className="bid-stepper__input"
              value={formatearMoneda(montoInput)}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                setMontoInput(isNaN(val) ? minimoRequerido : val);
                limpiarError();
                setErrorLocal(null);
                setExitoMensaje(null);
              }}
              disabled={estaCerrado || enviando}
            />
            <button
              type="button"
              className="bid-stepper__btn"
              onClick={handleIncrementar}
              disabled={estaCerrado || enviando}
            >
              +
            </button>
          </div>
        </div>

        {/* Despliegue de Alerta de Éxito */}
        {exitoMensaje && (
          <div 
            className="bidding-console__alert-success" 
            role="status"
            style={{
              padding: '10px 12px',
              backgroundColor: '#f6ffed',
              border: '1px solid #b7eb8f',
              borderRadius: '4px',
              color: '#389e0d',
              fontSize: '0.85rem',
              marginTop: '10px'
            }}
          >
            <p style={{ margin: 0 }}><strong>Confirmación:</strong> {exitoMensaje}</p>
          </div>
        )}

        {/* Despliegue de Alerta de Error */}
        {mensajeErrorMostrar && (
          <div className="bidding-console__alert-error" role="alert">
            <p>
              <AlertTriangle size={15} />
              <span>
                <strong>{!estaAutenticado ? 'Necesitas iniciar sesión' : 'No pudimos registrar la oferta'}</strong>
                <span>{mensajeErrorMostrar}</span>
              </span>
            </p>
            {!estaAutenticado && (
              <Link
                to="/login"
                style={{ display: 'inline-block', marginTop: '8px', fontWeight: 700 }}
              >
                Iniciar sesión para ofertar
              </Link>
            )}
          </div>
        )}

        <button
          type="submit"
          className="btn-submit-bid"
          disabled={estaCerrado || enviando}
          style={{ marginTop: '12px' }}
        >
          <Gavel size={16} /> {enviando ? 'Enviando oferta...' : `Ofertar ${formatearMoneda(montoInput)}`}
        </button>
      </form>
    </div>
  );
};