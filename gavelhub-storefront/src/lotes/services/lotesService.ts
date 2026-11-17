import { api } from '../../common/api/client'
import type { Lote } from '../types/lote'
export async function listarLotes(): Promise<Lote[]> {
  const respuesta = await api.get<Lote[]>('/lotes');
  return respuesta.data;
}

export async function obtenerLote(id: string): Promise<Lote> {
  const respuesta = await api.get<Lote>(`/lotes/${id}`);
  return respuesta.data;
}
