import { api, type Sobre } from '../../common/services/api'
import type { Lote } from '../types/lote'


export async function listarLotes(): Promise<Lote[]> {
  const respuesta = await api.get<Sobre<Lote[]>>('/lotes');
  return respuesta.data.data;
}
