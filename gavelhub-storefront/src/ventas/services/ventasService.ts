import { api, obtenerDatos } from '../../common/api/client';
import type { Venta } from '../types/venta';

export const ventasService = {
  async listarMisLotes(): Promise<Venta[]> {
    const respuesta = await api.get<Venta[]>('/ventas/mis-lotes');
    return obtenerDatos(respuesta);
  },
};
