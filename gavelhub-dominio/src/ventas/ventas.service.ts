import { Inject, Injectable } from '@nestjs/common';
import type { VentaRepository } from '../dominio/ventas.repository';
import { VENTA_REPOSITORY } from './ventas.tokens';
import { EstadoPago, Venta } from '../dominio/entidades';
import { LotesService } from '../lotes/lotes.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { LoteNoEncontradoError } from '../dominio/errores';

export class VentaExistenteError extends Error {
  constructor(loteId: number) {
    super(`El lote con id ${loteId} ya tiene una venta registrada`);
  }
}

export class VentaNoEncontradaError extends Error {
  constructor(id: number) {
    super(`No se encontró la venta con id ${id}`);
  }
}

@Injectable()
export class VentasService {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly ventaRepo: VentaRepository,
    private readonly lotesService: LotesService,
  ) {}

  async buscarPorLote(loteId: number): Promise<Venta | null> {
    return this.ventaRepo.buscarPorLote(loteId);
  }

  async crear(dto: CrearVentaDto): Promise<Venta> {
    const lote = await this.lotesService.buscarPorId(dto.loteId);
    if (!lote) {
      throw new LoteNoEncontradoError(dto.loteId);
    }

    const ventaExistente = await this.ventaRepo.buscarPorLote(dto.loteId);
    if (ventaExistente) {
      throw new VentaExistenteError(dto.loteId);
    }

    return this.ventaRepo.guardar({
      estadoPago: 'Pendiente',
    });
  }

  async actualizarEstadoPago(id: number, estadoPago: EstadoPago): Promise<Venta> {
    const venta = await this.ventaRepo.actualizarEstadoPago(id, estadoPago);
    if (!venta) {
      throw new VentaNoEncontradaError(id);
    }
    return venta;
  }
}