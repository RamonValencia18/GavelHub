import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());