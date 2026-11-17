import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './features/auth/context/AuthContext';
import { AppHeader } from './components/AppHeader';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
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
    </AuthProvider>
  </BrowserRouter>
);

export default App;

