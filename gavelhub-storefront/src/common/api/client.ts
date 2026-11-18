import axios, { type AxiosResponse } from 'axios';

// La URL base es configurable mediante variables de entorno (Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RespuestaUniforme<T> {
  exito: boolean;
  datos: T;
  timestamp: string;
}

export function obtenerDatos<T>(respuesta: AxiosResponse<T | RespuestaUniforme<T>>): T {
  const contenido = respuesta.data;

  if (
    contenido &&
    typeof contenido === 'object' &&
    'exito' in contenido &&
    'datos' in contenido
  ) {
    return contenido.datos;
  }

  return contenido as T;
}

/**
 * Interceptor de Peticiones:
 * Inyecta automáticamente el token de autenticación Bearer JWT si existe en el almacenamiento local.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gavelhub_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor de Respuestas:
 * Detecta cuando el servidor central rechaza la credencial (HTTP 401)
 * para limpiar la sesión expirada y notificar globalmente a la aplicación.
 */
api.interceptors.response.use(
  (response) => {
    response.data = obtenerDatos(response);
    return response;
  },
  (error) => {
    const requestUrl: string = error.config?.url || '';
    // Si responde 401 y no es el intento de login, la credencial expiró
    if (error.response?.status === 401 && !requestUrl.includes('/auth/login')) {
      localStorage.removeItem('gavelhub_token');
      // Emite un evento global para que la app reaccione y redirija al login
      window.dispatchEvent(new Event('session-expired'));
    }
    return Promise.reject(error);
  }
);