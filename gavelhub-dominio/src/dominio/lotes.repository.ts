import { Lote, LoteMedia } from "./entidades";

export interface LoteRepository {
  listar(): Promise<Lote[]>;
  buscarPorId(id: number): Promise<Lote | null>;
  guardar(lote: Omit<Lote, 'id'>): Promise<Lote>;
  actualizarEstado(id: number, estado: Lote['estado']): Promise<Lote | null>;
  buscarImagenesPorLote(loteId: number): Promise<LoteMedia[]>;
  guardarImagenes(media: Omit<LoteMedia, 'id'>): Promise<LoteMedia>;
}