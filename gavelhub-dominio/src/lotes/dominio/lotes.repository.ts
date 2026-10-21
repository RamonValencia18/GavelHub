import { Lote, LoteMedia } from './entidades';

export interface LoteRepository {
  listar(): Promise<Lote[]>;
  buscarPorId(id: string): Promise<Lote | null>;
  guardar(lote: Omit<Lote, 'id'>): Promise<Lote>;
  actualizarEstado(id: string, estado: Lote['estado']): Promise<Lote | null>;
  buscarImagenesPorLote(loteId: string): Promise<LoteMedia[]>;
  guardarImagenes(media: Omit<LoteMedia, 'id'>): Promise<LoteMedia>;
}
