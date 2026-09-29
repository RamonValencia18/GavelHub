import { LoteMemoriaRepository } from './infra/lotes-memoria.repository';
import { OfertaMemoriaRepository } from './infra/ofertas-memoria.repository';
import { UsuarioMemoriaRepository } from './infra/usuarios-memoria.repository';
import { OfertasService } from './ofertas/ofertas.service';
import { LotesService } from './lotes/lotes.service';
import { UsuariosService } from './usuarios/usuarios.service';

async function ejecutarPruebas() {
  console.log('=== INICIANDO PRUEBAS DE REGLAS DE NEGOCIO ===\n');

  // 1. Inicialización del entorno
  const usuarioRepo = new UsuarioMemoriaRepository();
  const loteRepo = new LoteMemoriaRepository();
  const ofertaRepo = new OfertaMemoriaRepository();

  const usuariosService = new UsuariosService(usuarioRepo);
  const lotesService = new LotesService(loteRepo);
  const ofertasService = new OfertasService(ofertaRepo, lotesService, usuariosService);

  // -------------------------------------------------------------
  // ESCENARIO 1: ÉXITO - Oferta válida sobre lote abierto
  // (Lote 1 inicia en 1000 y está Abierto)
  // -------------------------------------------------------------
  try {
    console.log('[ESCENARIO 1] Enviando oferta válida de $1,100 para Lote 1...');
    const ofertaValida = await ofertasService.crear(1, { usuarioId: 2, cantidad: 1100 });
    console.log(` SUCCESS: Oferta aceptada con ID: ${ofertaValida.id}, Monto: $${ofertaValida.cantidad}\n`);
  } catch (error: any) {
    console.error(` FAILED: No debería fallar -> ${error.message}\n`);
  }

  // -------------------------------------------------------------
  // ESCENARIO 2: RECHAZO - Oferta por debajo del incremento mínimo
  // (Lote 1 requiere actual ($1100) + incremento ($100) = $1200 mínimo)
  // -------------------------------------------------------------
  try {
    console.log('[ESCENARIO 2] Intentando ofertar $1,150 (Mínimo requerido $1,200)...');
    await ofertasService.crear(1, { usuarioId: 3, cantidad: 1150 });
    console.error(' FAILED: La oferta debió ser rechazada.\n');
  } catch (error: any) {
    console.log(` REJECTED (CORRECTO): ${error.message}\n`);
  }

  // -------------------------------------------------------------
  // ESCENARIO 3: RECHAZO - Oferta en lote que no está abierto
  // (Lote 2 está en estado 'Publicado')
  // -------------------------------------------------------------
  try {
    console.log('[ESCENARIO 3] Intentando ofertar $600 en Lote 2 (Estado: Publicado)...');
    await ofertasService.crear(2, { usuarioId: 2, cantidad: 600 });
    console.error(' FAILED: La oferta debió ser rechazada.\n');
  } catch (error: any) {
    console.log(` REJECTED (CORRECTO): ${error.message}\n`);
  }

  console.log('=== PRUEBAS FINALIZADAS ===');
}

ejecutarPruebas();