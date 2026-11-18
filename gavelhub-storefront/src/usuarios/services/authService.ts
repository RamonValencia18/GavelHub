import { api, obtenerDatos } from '../../common/api/client';
import type { Usuario } from '../types/usuario';

export interface AuthCredentialsPayload {
    correo: string;
    password: string;
}

interface LoginTokenResponse {
    accessToken?: string;
    token?: string;
}

export const authService = {
    async login(credenciales: AuthCredentialsPayload): Promise<string> {
        const response = await api.post<LoginTokenResponse>('/auth/login', {
            correo: credenciales.correo.trim(),
            password: credenciales.password,
        });

        const data = obtenerDatos(response);
        const token = data?.accessToken || data?.token;

        if (!token || typeof token !== 'string') {
            throw new Error('El servidor no devolvió una credencial de acceso válida.');
        }

        return token;
    },

    async registrar(credenciales: AuthCredentialsPayload): Promise<string> {
        await api.post('/auth/registrar', {
            correo: credenciales.correo.trim(),
            password: credenciales.password,
        });

        return await this.login(credenciales);
    },

    async obtenerPerfil(): Promise<Usuario> {
        const response = await api.get<{
            sub?: string;
            id?: string;
            correo: string;
            rol: 'ADMIN' | 'USER';
        }>('/auth/perfil');

        const data = obtenerDatos(response);
        return {
            id: data.id || data.sub || '',
            correo: data.correo,
            rol: data.rol || 'USER',
        };
    },
};