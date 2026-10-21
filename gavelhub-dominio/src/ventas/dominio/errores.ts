export class VentaExistenteError extends Error {
  constructor(loteId: string) {
    super(`El lote con id ${loteId} ya tiene una venta registrada`);
  }
}

export class VentaNoEncontradaError extends Error {
  constructor(id: string) {
    super(`No se encontró la venta con id ${id}`);
  }
}
export class MontoInsuficienteError extends Error {
  constructor(monto: number, montoMinimo: number) {
    super(
      `El monto de la oferta (${monto}) es insuficiente. El monto mínimo requerido es ${montoMinimo}.`,
    );
  }
}
