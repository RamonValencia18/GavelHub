import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ExplorarLotesPage } from '../lotes/pages/ExplorarLotesPage';
import { DetalleLotePage } from '../lotes/pages/DetalleLotePage';
import { LoginPage } from '../usuarios/pages/LoginPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirección del inicio al catálogo */}
      <Route path="/" element={<Navigate to="/lotes" replace />} />

      {/* Vista de exploración de catálogo */}
      <Route path="/lotes" element={<ExplorarLotesPage />} />

      {/* Vista de detalle de un lote específico */}
      <Route path="/lotes/:id" element={<DetalleLotePage />} />

      {/* Vista al formulario de inicio de sesión*/}
      <Route path="/login" element={<LoginPage />} />

      {/* Pantalla 404 para rutas inexistentes */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>404 - Página no encontrada</h2>
            <p>La dirección especificada no corresponde a ningún lote o sección.</p>
          </div>
        }
      />
    </Routes>
  );
};