import { api, obtenerDatos } from '../../common/api/client'
import type { Lote } from '../types/lote'
export async function listarLotes(): Promise<Lote[]> {
  const respuesta = await api.get<Lote[]>('/lotes');
  return obtenerDatos(respuesta);
}

export async function obtenerLote(id: string): Promise<Lote> {
  const respuesta = await api.get<Lote>(`/lotes/${id}`);
  return obtenerDatos(respuesta);
}
