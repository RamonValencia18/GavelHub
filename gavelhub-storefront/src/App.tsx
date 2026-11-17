import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div className="app-header__container">
            <div className="app-header__brand">
              <span className="app-header__logo">⚖</span>
              <span className="app-header__title">GavelHub</span>
            </div>
            
            <nav className="app-header__nav">
              <a href="/lotes" className="app-header__link app-header__link--active">
                Explorar
              </a>
              <a href="#" className="app-header__link">Mis seguidos</a>
              <a href="#" className="app-header__link">Mis ganados</a>
            </nav>

            <div className="app-header__user">
              <span className="app-header__user-badge">Postor #4082</span>
            </div>
          </div>
        </header>

        <main className="app-main">
          <AppRoutes />
        </main>

        <footer className="app-footer">
          <div className="app-footer__container">
            <p>© 2026 GavelHub Casa de Subastas.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;