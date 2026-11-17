import React from 'react';
import { ExplorarLotesPage } from './lotes/pages/ExplorarLotesPage';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="app-shell">
      {/* Encabezado global del Storefront */}
      <header className="app-header">
        <div className="app-header__container">
          <div className="app-header__brand">
            <span className="app-header__logo">⚖</span>
            <span className="app-header__title">GavelHub</span>
          </div>
          
          <nav className="app-header__nav">
            <a href="#" className="app-header__link app-header__link--active">
              Explorar
            </a>
            <a href="#" className="app-header__link">
              Mis seguidos
            </a>
            <a href="#" className="app-header__link">
              Mis ganados
            </a>
          </nav>

          <div className="app-header__user">
            <span className="app-header__user-badge">Postor #4082</span>
          </div>
        </div>
      </header>

      {/* Contenido principal de la aplicación */}
      <main className="app-main">
        <ExplorarLotesPage />
      </main>

      {/* Pie de página del Storefront */}
      <footer className="app-footer">
        <div className="app-footer__container">
          <p>© 2026 GavelHub Casa de Subastas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;