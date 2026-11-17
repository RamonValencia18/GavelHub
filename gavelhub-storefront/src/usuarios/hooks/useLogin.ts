import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { authService, type AuthCredentialsPayload } from '../services/authService';

export const useLogin = () => {
    const [cargando, setCargando] = useState<boolean>(false);
    const [errorServidor, setErrorServidor] = useState<string | null>(null);

    const { login, limpiarAvisoSesion } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const rutaDestino = (location.state as { from?: string })?.from || '/lotes';

    const limpiarError = () => setErrorServidor(null);

    const ejecutarLogin = async (credenciales: AuthCredentialsPayload): Promise<boolean> => {
        limpiarError();
        limpiarAvisoSesion();
        setCargando(true);

        try {
            const token = await authService.login(credenciales);
            login(token);
            navigate(rutaDestino, { replace: true });
            return true;
        } catch (err: any) {
            const respuestaBackend = err.response?.data?.message;

            if (err.response?.status === 401) {
                setErrorServidor('Correo o contraseña incorrectos. Verifique sus credenciales.');
            } else if (respuestaBackend) {
                setErrorServidor(
                    Array.isArray(respuestaBackend)
                        ? respuestaBackend.join(' • ')
                        : respuestaBackend
                );
            } else if (!err.response) {
                setErrorServidor(
                    'No se pudo establecer conexión con el servidor central de GavelHub.'
                );
            } else {
                setErrorServidor('Ocurrió un error inesperado al procesar la solicitud.');
            }
            return false;
        } finally {
            setCargando(false);
        }
    };

    return {
        cargando,
        errorServidor,
        rutaDestino,
        ejecutarLogin,
        limpiarError,
    };
};