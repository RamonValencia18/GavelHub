import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  useEffect(() => {
    const cargarDetalleLote = async () => {
      try {
        setCargando(true);
        setError(null);

        await new Promise((res) => setTimeout(res, 500));

        // En producción se realiza la petición GET /api/lotes/:id usando el id de useParams
        const loteMock: Lote = {
          id: id || '109',
          descripcion: 'Centenario 50 Pesos Oro Ley .900 (1943) NGC MS64',
          estado: 'ABIERTO',
          precioSalida: 50000,
          incrementoMinimo: 1500,
          precioReserva: 65000,
          fechaHoraApertura: '2026-11-16T09:00:00Z',
          fechaHoraCierre: '2026-11-18T22:32:00Z',
          mediaList: [
            { id: 'm1', url: '', descripcion: 'Anverso', loteId: id || '109' },
            { id: 'm2', url: '', descripcion: 'Reverso', loteId: id || '109' },
            { id: 'm3', url: '', descripcion: 'Canto', loteId: id || '109' },
            { id: 'm4', url: '', descripcion: 'Cápsula NGC', loteId: id || '109' },
          ],
        };

        const ofertasMock: Oferta[] = [
          {
            id: 'o1',
            cantidad: 68000,
            estado: 'ACEPTADA',
            fechaHora: '2026-11-16T14:28:43Z',
            usuarioId: '4082',
            loteId: id || '109',
          },
          {
            id: 'o2',
            cantidad: 66500,
            estado: 'SUPERADA',
            fechaHora: '2026-11-16T14:21:10Z',
            usuarioId: '2904',
            loteId: id || '109',
          },
        ];

        setLote(loteMock);
        setOfertas(ofertasMock);
      } catch (err) {
        setError('No fue posible obtener la información del lote solicitado.');
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      cargarDetalleLote();
    }
  }, [id]);

  const handleEnviarOferta = async (monto: number) => {
    // Registro de la oferta enviada por el usuario
    const nuevaOferta: Oferta = {
      id: `o-${Date.now()}`,
      cantidad: monto,
      estado: 'ACEPTADA',
      fechaHora: new Date().toISOString(),
      usuarioId: '4082',
      loteId: lote?.id || '',
    };

    setOfertas((prev) => [
      nuevaOferta,
      ...prev.map((o) => ({ ...o, estado: 'SUPERADA' as const })),
    ]);
  };

  const ofertaMasAlta = ofertas.length > 0 ? ofertas[0].cantidad : undefined;

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
              mediaList={lote.mediaList}
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
            />
          </div>

          {/* Columna Derecha (~35%): Consola Sticky de Puja */}
          <div className="lote-detalle-right">
            <ConsolaOferta
              lote={lote}
              ofertaActual={ofertaMasAlta}
              totalOfertas={ofertas.length}
              usuarioActualId="4082"
              onEnviarOferta={handleEnviarOferta}
              onToggleFavorito={() => setEsFavorito(!esFavorito)}
              esFavorito={esFavorito}
            />
          </div>
        </div>
      )}
    </div>
  );
};