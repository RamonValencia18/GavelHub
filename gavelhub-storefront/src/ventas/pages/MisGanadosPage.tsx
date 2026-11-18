import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ventasService } from '../services/ventasService';
import { listarLotes } from '../../lotes/services/lotesService';
import { useAuth } from '../../features/auth/context/AuthContext';
import { LoteCard } from '../../lotes/components/LoteCard';
import type { Lote } from '../../lotes/types/lote';
import '../../lotes/css/ExplorarLotesPage.css';

export const MisGanadosPage: React.FC = () => {
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!estaAutenticado) {
      setCargando(false);
      return;
    }
    const cargar = async () => {
      try {
        const ventas = await ventasService.listarMisLotes();
        const todos = await listarLotes();
        const ids = new Set((Array.isArray(ventas) ? ventas : []).map((venta: { loteId: string }) => venta.loteId));
        setLotes((Array.isArray(todos) ? todos : []).filter((lote: Lote) => ids.has(lote.id)));
        setError(null);
      } catch {
        setError('No fue posible cargar tus lotes ganados.');
      } finally {
        setCargando(false);
      }
    };
    void cargar();
  }, [estaAutenticado]);

  return (
    <div className="explorar-lotes-container">
      <header className="catalog-header">
        <h1 className="catalog-header__title">Mis lotes ganados</h1>
        <p className="catalog-header__subtitle">Subastas adjudicadas a tu cuenta.</p>
      </header>
      {!estaAutenticado && <div className="catalog-state catalog-state--empty"><h3>Inicia sesión para consultar tus adjudicaciones</h3></div>}
      {cargando && estaAutenticado && <div className="catalog-state"><p>Cargando adjudicaciones...</p></div>}
      {!cargando && error && <div className="catalog-state catalog-state--error"><p>{error}</p></div>}
      {!cargando && estaAutenticado && !error && lotes.length === 0 && (
        <div className="catalog-state catalog-state--empty"><h3>Aún no tienes lotes ganados</h3></div>
      )}
      {!cargando && estaAutenticado && !error && lotes.length > 0 && (
        <div className="lot-grid">
          {lotes.map((lote) => (
            <LoteCard key={lote.id} lote={lote} onVerDetalle={(id) => navigate(`/lotes/${id}`)} onToggleFavorito={() => undefined} />
          ))}
        </div>
      )}
    </div>
  );
};
