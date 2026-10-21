import { Inject, Injectable } from '@nestjs/common';
import type { VentaRepository } from '../ventas/dominio/ventas.repository';
import { VENTA_REPOSITORY } from './ventas.tokens';
import { EstadoPago, Venta } from '../ventas/dominio/entidades';
import { LotesService } from '../lotes/lotes.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { LoteNoEncontradoError } from '../lotes/dominio/errores';
import { VentaExistenteError, VentaNoEncontradaError } from './dominio/errores';

@Injectable()
export class VentasService {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly ventaRepo: VentaRepository,
    private readonly lotesService: LotesService,
  ) {}

  async buscarPorLote(loteId: string): Promise<Venta | null> {
    return this.ventaRepo.buscarPorLote(loteId);
  }

  async crear(dto: CrearVentaDto): Promise<Venta> {
    const { loteId, usuarioId } = dto;
    const lote = await this.lotesService.buscarPorId(loteId);
    if (!lote) {
      throw new LoteNoEncontradoError(loteId);
    }

    const ventaExistente = await this.ventaRepo.buscarPorLote(loteId);
    if (ventaExistente) {
      throw new VentaExistenteError(loteId);
    }

    return this.ventaRepo.guardar({
      estadoPago: 'PENDIENTE',
      loteId,
      usuarioId,
    });
  }

  async actualizarEstadoPago(
    id: string,
    estadoPago: EstadoPago,
  ): Promise<Venta> {
    const venta = await this.ventaRepo.actualizarEstadoPago(id, estadoPago);
    if (!venta) {
      throw new VentaNoEncontradaError(id);
    }
    return venta;
  }
}
