import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './features/auth/context/AuthContext';
import { AppHeader } from './components/AppHeader';
import './App.css';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <AppHeader />

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
    </AuthProvider>
  );
};

export default App;