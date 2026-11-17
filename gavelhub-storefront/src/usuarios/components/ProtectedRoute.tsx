import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { estaAutenticado, cargandoSesion } = useAuth();
    const location = useLocation();

    if (cargandoSesion) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p>Verificando sesión de participante...</p>
            </div>
        );
    }

    if (!estaAutenticado) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname + location.search }}
                replace
            />
        );
    }

    return <>{children}</>;
};