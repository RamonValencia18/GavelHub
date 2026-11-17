import { randomUUID } from 'node:crypto';
import { EstadoLote, Lote, LoteMedia } from '../dominio/entidades';
import { LoteRepository } from '../dominio/lotes.repository';

export class InMemoryLoteRepository implements LoteRepository {
  constructor(
    private readonly lotes: Lote[] = [],
    private readonly media: LoteMedia[] = [],
  ) {}

  async listar(): Promise<Lote[]> {
    return [...this.lotes];
  }

  async buscarPorId(id: string): Promise<Lote | null> {
    return this.lotes.find((lote) => lote.id === id) ?? null;
  }

  async guardar(lote: Omit<Lote, 'id'>): Promise<Lote> {
    const nuevoLote: Lote = { ...lote, id: randomUUID() };
    this.lotes.push(nuevoLote);
    return nuevoLote;
  }

  async actualizarEstado(
    id: string,
    estado: EstadoLote,
  ): Promise<Lote | null> {
    const lote = this.lotes.find((item) => item.id === id);
    if (!lote) {
      return null;
    }

    lote.estado = estado;
    return lote;
  }

  async buscarImagenesPorLote(loteId: string): Promise<LoteMedia[]> {
    return this.media.filter((item) => item.loteId === loteId);
  }

  async guardarImagenes(media: Omit<LoteMedia, 'id'>): Promise<LoteMedia> {
    const nuevaMedia: LoteMedia = { ...media, id: randomUUID() };
    this.media.push(nuevaMedia);
    return nuevaMedia;
  }
}
