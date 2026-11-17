import React, { createContext, useContext, useState, useEffect } from 'react';

interface Usuario {
  id: string;
  correo: string;
  rol: 'ADMIN' | 'USER';
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  estaAutenticado: boolean;
  cargandoSesion: boolean;
  login: (token: string, usuarioData?: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('gavelhub_token'));
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargandoSesion, setCargandoSesion] = useState<boolean>(true);

  const login = (newToken: string, usuarioData?: Usuario) => {
    localStorage.setItem('gavelhub_token', newToken);
    setToken(newToken);

    // Si no enviamos usuarioData explícito, podemos intentar extraer el correo del payload del JWT
    if (usuarioData) {
      setUsuario(usuarioData);
    } else {
      try {
        const payloadBase64 = newToken.split('.')[1];
        const payloadDecodificado = JSON.parse(atob(payloadBase64));
        if (payloadDecodificado?.correo) {
          setUsuario({
            id: payloadDecodificado.sub,
            correo: payloadDecodificado.correo,
            rol: payloadDecodificado.rol || 'USER',
          });
        }
      } catch (e) {
        console.error('No se pudo decodificar el payload del JWT:', e);
      }
    }
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
    };

    window.addEventListener('session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    // Si hay token guardado al iniciar la app, consideramos activa la sesión
    if (token) {
      setCargandoSesion(false);
    } else {
      setCargandoSesion(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        estaAutenticado: !!token,
        cargandoSesion,
        login,
        logout,
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