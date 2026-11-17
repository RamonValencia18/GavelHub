# GavelHub

Backend con NestJS, PostgreSQL y Prisma.

## Requisitos

- Node.js 20+
- PostgreSQL

## Instalación

```bash
cd gavelhub-dominio
npm install
```

Crear `.env` a partir de `.env.ejemplo`:

```powershell
Copy-Item .env.ejemplo .env
```

Configurar:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/gavelhub?schema=public"
JWT_SECRET="tu_clave_secreta"
JWT_EXPIRES_IN=3600
FRONTEND_URL="http://localhost:5173"
```

Credenciales del administrador:

```env
ADMIN_CORREO="admin@gavelhub.com"
ADMIN_PASSWORD="Admin1234!"
```

Crear la base de datos `gavelhub` en PostgreSQL y ejecutar:

```bash
npx prisma migrate deploy
npx prisma generate
npm run seed
```

## Ejecutar el backend

```bash
npm run start:dev
```

API: `http://localhost:3000`

Swagger: `http://localhost:3000/api`
