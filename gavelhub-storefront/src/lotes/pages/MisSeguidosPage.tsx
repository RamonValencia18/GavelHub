import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarLotes } from '../services/lotesService';
import { LoteCard } from '../components/LoteCard';
import type { Lote } from '../types/lote';
import '../css/ExplorarLotesPage.css';

const CLAVE_SEGUIDOS = 'gavelhub_seguidos';

export const MisSeguidosPage: React.FC = () => {
  const navigate = useNavigate();
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const ids: string[] = JSON.parse(localStorage.getItem(CLAVE_SEGUIDOS) || '[]');
        if (ids.length === 0) {
          setLotes([]);
          return;
        }
        const datos = await listarLotes();
        setLotes(datos.filter((lote: Lote) => ids.includes(lote.id)));
        setError(null);
      } catch {
        setError('No fue posible cargar tus lotes seguidos.');
      } finally {
        setCargando(false);
      }
    };
    void cargar();
  }, []);

  const quitar = (id: string) => {
    const ids: string[] = JSON.parse(localStorage.getItem(CLAVE_SEGUIDOS) || '[]');
    localStorage.setItem(CLAVE_SEGUIDOS, JSON.stringify(ids.filter((loteId) => loteId !== id)));
    setLotes((actuales) => actuales.filter((lote) => lote.id !== id));
  };

  return (
    <div className="explorar-lotes-container">
      <header className="catalog-header">
        <h1 className="catalog-header__title">Mis lotes seguidos</h1>
        <p className="catalog-header__subtitle">Seguimiento directo de tus lotes desde el catálogo.</p>
      </header>
      {cargando && <div className="catalog-state"><p>Cargando seguimiento...</p></div>}
      {!cargando && error && <div className="catalog-state catalog-state--error"><p>{error}</p></div>}
      {!cargando && !error && lotes.length === 0 && (
        <div className="catalog-state catalog-state--empty"><h3>No tienes lotes seguidos</h3></div>
      )}
      {!cargando && !error && lotes.length > 0 && (
        <div className="lot-grid">
          {lotes.map((lote) => (
            <LoteCard key={lote.id} lote={lote} esFavorito onVerDetalle={(id) => navigate(`/lotes/${id}`)} onToggleFavorito={quitar} />
          ))}
        </div>
      )}
    </div>
  );
};
