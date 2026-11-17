import { Navigate, Route, Routes } from 'react-router-dom'
import {ExplorarLotesPage} from './lotes/pages/ExplorarLotesPage'

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './features/auth/context/AuthContext';
import { AppHeader } from './components/AppHeader';
import './App.css';

function App() {
  return (

    <Routes>
      <Route path="/lotes" element={<ExplorarLotesPage />} />
      <Route path="/" element={<Navigate to="/lotes" replace />} />
      <Route path="*" element={<Navigate to="/lotes" replace />} />
    </Routes>
  )
}

export default App
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

