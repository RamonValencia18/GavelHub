import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { authService, type AuthCredentialsPayload } from '../services/authService';

export const useRegistro = () => {
    const [cargando, setCargando] = useState<boolean>(false);
    const [errorServidor, setErrorServidor] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const rutaDestino = (location.state as { from?: string })?.from || '/lotes';

    const limpiarError = () => setErrorServidor(null);

    const ejecutarRegistro = async (credenciales: AuthCredentialsPayload): Promise<boolean> => {
        limpiarError();
        setCargando(true);

        try {
            const token = await authService.registrar(credenciales);
            login(token);
            navigate(rutaDestino, { replace: true });
            return true;
        } catch (err: any) {
            const respuestaBackend = err.response?.data?.message;

            if (err.response?.status === 409) {
                setErrorServidor('Ya existe una cuenta registrada con este correo electrónico.');
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
                setErrorServidor('No fue posible completar el registro en este momento.');
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
        ejecutarRegistro,
        limpiarError,
    };
};