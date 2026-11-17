import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Usuario } from '../../../usuarios/types/usuario';

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  estaAutenticado: boolean;
  cargandoSesion: boolean;
  avisoSesion: string | null;
  login: (token: string, usuarioData?: Usuario) => void;
  logout: () => void;
  limpiarAvisoSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function extraerUsuarioDeJwt(jwtToken: string): Usuario | null {
  try {
    const payloadBase64 = jwtToken.split('.')[1];
    const payloadDecodificado = JSON.parse(atob(payloadBase64));
    if (payloadDecodificado?.correo || payloadDecodificado?.sub) {
      return {
        id: String(payloadDecodificado.sub || payloadDecodificado.id || ''),
        correo: payloadDecodificado.correo || '',
        rol: payloadDecodificado.rol || 'USER',
      };
    }
  } catch (e) {
    console.error('No se pudo decodificar el payload del JWT:', e);
  }
  return null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('gavelhub_token')
  );
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const savedToken = localStorage.getItem('gavelhub_token');
    return savedToken ? extraerUsuarioDeJwt(savedToken) : null;
  });
  const [cargandoSesion, setCargandoSesion] = useState<boolean>(false);
  const [avisoSesion, setAvisoSesion] = useState<string | null>(null);

  const login = (newToken: string, usuarioData?: Usuario) => {
    localStorage.setItem('gavelhub_token', newToken);
    setToken(newToken);
    setAvisoSesion(null);
    setUsuario(usuarioData ?? extraerUsuarioDeJwt(newToken));
  };

  const logout = () => {
    localStorage.removeItem('gavelhub_token');
    setToken(null);
    setUsuario(null);
  };

  // Escuchar la expiración automática del token desde client.ts (401 Unauthorized)
  useEffect(() => {
    const handleSessionExpired = () => {
      logout();
      setAvisoSesion(
        'Tu sesión ha expirado o la credencial ya no es válida. Por favor, inicia sesión nuevamente.'
      );
    };

    window.addEventListener('session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    setCargandoSesion(false);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        estaAutenticado: !!token,
        cargandoSesion,
        avisoSesion,
        login,
        logout,
        limpiarAvisoSesion: () => setAvisoSesion(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};