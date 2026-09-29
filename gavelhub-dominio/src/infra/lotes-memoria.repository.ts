import { Injectable } from "@nestjs/common";
import { LOTES_SEED, MEDIA_SEED} from "src/datos/gavelhub.seed";
import { Lote, LoteMedia } from "src/dominio/entidades";
import { LoteRepository } from "src/dominio/lotes.repository";

@Injectable()
export class LoteMemoriaRepository implements LoteRepository {
  private lotes: Lote[] = [...LOTES_SEED];
  private siguienteId = 1;
  private medias: LoteMedia[] = [...MEDIA_SEED];
  private siguienteMediaId = 1;

  async listar(): Promise<Lote[]> {
    return this.lotes;
  }

  async buscarPorId(id: number): Promise<Lote | null> {
    return this.lotes.find((l) => l.id === id) ?? null;
  }

  async guardar(datos: Omit<Lote, 'id'>): Promise<Lote> {
    const nuevo: Lote = { id: this.siguienteId++, ...datos };
    this.lotes.push(nuevo);
    return nuevo;
  }

  async actualizarEstado(id: number, estado: Lote['estado']): Promise<Lote | null> {
    const lote = await this.buscarPorId(id);
    if (!lote) return null;
    lote.estado = estado;
    return lote;
  }

  async buscarImagenesPorLote(loteId: number): Promise<LoteMedia[]> {
    return this.medias.filter((m) => m.id === loteId);
  }

  async guardarImagenes(datos: Omit<LoteMedia, 'id'>): Promise<LoteMedia> {
    const nueva: LoteMedia = { id: this.siguienteMediaId++, ...datos };
    this.medias.push(nueva);
    return nueva;
  }
}