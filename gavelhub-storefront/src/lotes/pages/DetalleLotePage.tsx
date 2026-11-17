import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../common/api/client';
import { GaleriaEspecimen } from '../components/GaleriaEspecimen';
import { HistorialOfertas } from '../../ofertas/components/HistorialOfertas';
import { ConsolaOferta } from '../../ofertas/components/ConsolaOferta';
import type { Lote } from '../types/lote';
import type { Oferta } from '../../ofertas/types/oferta';
import '../css/DetalleLotePage.css';

export const DetalleLotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [lote, setLote] = useState<Lote | null>(null);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [esFavorito, setEsFavorito] = useState<boolean>(false);

  // Estado para la confirmación explícita en la pantalla del detalle
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState<string | null>(null);

  // Función para obtener el lote y sus ofertas desde el backend NestJS (Observer)
  const cargarDetalleYOfertas = useCallback(async () => {
    if (!id) return;

    try {
      setCargando(true);
      setError(null);

      // 1. Petición HTTP real para obtener los datos del lote
      const resLote = await api.get(`/lotes/${id}`);
      const datosLote = resLote.data?.datos || resLote.data;
      setLote(datosLote);

      // 2. Petición HTTP real para obtener el historial de ofertas
      try {
        const resOfertas = await api.get(`/lotes/${id}/ofertas`);
        const listaOfertas = resOfertas.data?.datos || resOfertas.data || [];
        setOfertas(Array.isArray(listaOfertas) ? listaOfertas : []);
      } catch (errOfertas) {
        setOfertas([]);
      }
    } catch (err: any) {
      console.error('Error al consultar el lote:', err);
      const msg = err.response?.data?.message || 'No fue posible obtener la información del lote solicitado.';
      setError(Array.isArray(msg) ? msg.join(' • ') : msg);
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      cargarDetalleYOfertas();
    }
  }, [id, cargarDetalleYOfertas]);

  // Manejador del evento de oferta exitosa
  const handleOfertaExitosa = () => {
    // 1. Re-consultar los datos del backend para actualizar el historial en vivo
    cargarDetalleYOfertas();

    // 2. Desplegar el mensaje de confirmación explícito en el encabezado del detalle
    setMensajeConfirmacion('¡Su postura ha sido registrada y validada oficialmente por el servidor central!');

    // Ocultar la confirmación automáticamente después de 6 segundos
    setTimeout(() => {
      setMensajeConfirmacion(null);
    }, 6000);
  };

  // Extraer el monto de la oferta más alta
  const ofertaMasAlta = ofertas.length > 0
    ? Math.max(...ofertas.map((o) => o.cantidad || 0))
    : undefined;

  return (
    <div className="lote-detalle-page">
      {/* Miga de pan / Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/" className="breadcrumbs__link">Inicio</Link>
        <span className="breadcrumbs__separator">›</span>
        <Link to="/lotes" className="breadcrumbs__link">Explorar</Link>
        <span className="breadcrumbs__separator">›</span>
        <span className="breadcrumbs__current">Lote {id}</span>
      </nav>

      {/* BANNER DE CONFIRMACIÓN DE PUJA EXITOSA */}
      {mensajeConfirmacion && (
        <div
          className="lote-confirmacion-banner"
          style={{
            marginBottom: '20px',
            padding: '14px 18px',
            backgroundColor: '#e6f7ff',
            border: '1px solid #91d5ff',
            borderRadius: '6px',
            color: '#0050b3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Postura Confirmada</strong>
              <span style={{ fontSize: '0.85rem' }}>{mensajeConfirmacion}</span>
            </div>
          </div>
          <button
            onClick={() => setMensajeConfirmacion(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#0050b3'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* CASO 1: CARGANDO */}
      {cargando && (
        <div className="lote-state lote-state--loading">
          <div className="spinner"></div>
          <p>Cargando expediente del lote...</p>
        </div>
      )}

      {/* CASO 2: ERROR */}
      {!cargando && error && (
        <div className="lote-state lote-state--error">
          <span className="lote-state__icon">⚠️</span>
          <h3>Error de Conexión</h3>
          <p>{error}</p>
        </div>
      )}

      {/* CASO 3: LOTE VACÍO / NO ENCONTRADO */}
      {!cargando && !error && !lote && (
        <div className="lote-state lote-state--empty">
          <span className="lote-state__icon">🔍</span>
          <h3>Lote no encontrado</h3>
          <p>El lote especificado no existe o ha sido retirado de la subasta.</p>
        </div>
      )}

      {/* CASO 4: ÉXITO */}
      {!cargando && !error && lote && (
        <div className="lote-detalle-grid">
          {/* Columna Izquierda (~65%): Galería, Descripción e Historial Auditable */}
          <div className="lote-detalle-left">
            <GaleriaEspecimen
              numeroLote={lote.id}
              descripcion={lote.descripcion}
              mediaList={lote.mediaList || []}
            />

            <section className="lote-info-panel">
              <span className="lote-info-panel__category">Numismática</span>
              <h1 className="lote-info-panel__title">{lote.descripcion}</h1>

              <div className="lote-info-panel__specs">
                <div className="spec-card">
                  <span className="spec-card__label">Precio de Salida</span>
                  <strong className="spec-card__value">
                    ${lote.precioSalida.toLocaleString('es-MX')} MXN
                  </strong>
                </div>
                <div className="spec-card">
                  <span className="spec-card__label">Incremento Mínimo</span>
                  <strong className="spec-card__value">
                    ${lote.incrementoMinimo.toLocaleString('es-MX')} MXN
                  </strong>
                </div>
              </div>
            </section>

            <HistorialOfertas
              ofertas={ofertas}
              precioSalida={lote.precioSalida}
              usuarioActualId="4082"
              onRecargar={cargarDetalleYOfertas}
            />
          </div>

          {/* Columna Derecha (~35%): Consola Sticky de Puja */}
          <div className="lote-detalle-right">
            <ConsolaOferta
              lote={lote}
              ofertaActual={ofertaMasAlta}
              totalOfertas={ofertas.length}
              onOfertaRegistradaExitosamente={handleOfertaExitosa}
            />
          </div>
        </div>
      )}
    </div>
  );
};