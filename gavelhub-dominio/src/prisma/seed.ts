import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';
import { EstadoLote, EstadoOferta, PrismaClient, UsuarioRol } from '../../generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.venta.deleteMany({});
  await prisma.oferta.deleteMany({});
  await prisma.loteMedia.deleteMany({});
  await prisma.lote.deleteMany({});
  await prisma.usuario.deleteMany({});

  const correo = process.env.ADMIN_CORREO;
  const password = process.env.ADMIN_PASSWORD;

  if (!correo || !password) {
    throw new Error('Faltan ADMIN_CORREO y ADMIN_PASSWORD en el .env');
  }
  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD debe tener al menos 8 caracteres');
  }

  const admin = await prisma.usuario.upsert({
    where: { correo },
    update: { rol: 'ADMIN' },
    create: {
      correo,
      contrasena: await hash(password, 10),
      rol: 'ADMIN',
    },
  });

  console.log(`Administrador listo (${admin.correo})`);

  const userPasswordHash = await hash('12345678', 10);

  const postor4082 = await prisma.usuario.create({
    data: {
      id: '4082e400-e29b-41d4-a716-446655444082',
      correo: 'postor4082@gavelhub.com',
      contrasena: userPasswordHash,
      rol: UsuarioRol.USER,
    },
  });

  const postor2904 = await prisma.usuario.create({
    data: {
      id: '2904e400-e29b-41d4-a716-446655442904',
      correo: 'postor2904@gavelhub.com',
      contrasena: userPasswordHash,
      rol: UsuarioRol.USER,
    },
  });

  console.log("Usuarios listos")

  const fechaApertura = new Date();
  const fechaCierre = new Date(Date.now() + 1000 * 60 * 60 * 48);

  const lote109 = await prisma.lote.create({
    data: {
      id: '109e8400-e29b-41d4-a716-446655440109',
      descripcion: 'Centenario 50 Pesos Oro Ley .900 (1943) NGC MS64',
      estado: EstadoLote.ABIERTO,
      precioSalida: 50000.0,
      incrementoMinimo: 1500.0,
      precioReserva: 65000.0,
      fechaHoraApertura: fechaApertura,
      fechaHoraCierre: fechaCierre,
      usuarioId: admin.id, 
      mediaList: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Anverso',
          },
          {
            url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Reverso',
          },
          {
            url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Canto',
          },
          {
            url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
            descripcion: 'Cápsula NGC',
          },
        ],
      },
    },
  });

  await prisma.lote.create({
    data: {
      id: '112e8400-e29b-41d4-a716-446655440112',
      descripcion: 'Pluma Fuente Antigua de Colección Celuloide',
      estado: EstadoLote.ABIERTO,
      precioSalida: 15000.0,
      incrementoMinimo: 500.0,
      precioReserva: 20000.0,
      fechaHoraApertura: fechaApertura,
      fechaHoraCierre: new Date(Date.now() + 1000 * 60 * 20),
      usuarioId: admin.id,
      mediaList: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=85',
            descripcion: 'Pluma completa',
          },
          {
            url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
            descripcion: 'Detalle de escritura',
          },
        ],
      },
    },
  });

  await prisma.lote.create({
    data: {
      id: '108e8400-e29b-41d4-a716-446655440108',
      descripcion: 'Omega Speedmaster Professional Pre-Moon Calibre 321',
      estado: EstadoLote.ABIERTO,
      precioSalida: 90000.0,
      incrementoMinimo: 2500.0,
      precioReserva: 120000.0,
      fechaHoraApertura: fechaApertura,
      fechaHoraCierre: new Date(Date.now() + 1000 * 60 * 60 * 4),
      usuarioId: admin.id,
      mediaList: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=85',
            descripcion: 'Vista frontal',
          },
          {
            url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=85',
            descripcion: 'Esfera y corona',
          },
        ],
      },
    },
  });

  const lote107 = await prisma.lote.create({
    data: {
      id: '107e8400-e29b-41d4-a716-446655440107',
      descripcion: 'Cámara Leica X-E Typ 102 Edición Plateada',
      estado: EstadoLote.CERRADO,
      precioSalida: 30000.0,
      incrementoMinimo: 1000.0,
      precioReserva: 40000.0,
      fechaHoraApertura: new Date(Date.now() - 86400000),
      fechaHoraCierre: new Date(Date.now() - 3600000),
      usuarioId: admin.id,
      mediaList: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1794314816818-fcde3993833e?auto=format&fit=crop&w=1200&q=85',
            descripcion: 'Cámara y estuche',
          },
          {
            url: 'https://images.unsplash.com/photo-1794314816818-fcde3993833e?auto=format&fit=crop&w=1200&q=85',
            descripcion: 'Vista frontal',
          },
        ],
      },
    },
  });

  await prisma.venta.create({
    data: {
      loteId: lote107.id,
      usuarioId: postor4082.id,
      estadoPago: 'PENDIENTE',
    },
  });

  console.log("Lotes listos")

  await prisma.oferta.create({
    data: {
      id: 'oferta-1-uuid',
      cantidad: 66500.0,
      estado: EstadoOferta.SUPERADA,
      fechaHora: new Date(Date.now() - 1000 * 60 * 30),
      usuarioId: postor2904.id,
      loteId: lote109.id,
    },
  });

  await prisma.oferta.create({
    data: {
      id: 'oferta-2-uuid',
      cantidad: 68000.0,
      estado: EstadoOferta.ACEPTADA,
      fechaHora: new Date(Date.now() - 1000 * 60 * 5),
      usuarioId: postor4082.id,
      loteId: lote109.id,
    },
  });

  console.log("Ofertas listas")
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
