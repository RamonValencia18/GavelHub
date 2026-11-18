# GavelHub

Backend con NestJS, PostgreSQL y Prisma.

## Requisitos

- Node.js 20+
- PostgreSQL

## Instalación del Backend
1.- Ejecutar los siguiente comando:
```bash
cd gavelhub-dominio
npm install
```

2.- Crear `.env` a partir de `.env.ejemplo`:

```powershell
Copy-Item .env.ejemplo .env
```

3.- Configurar:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/gavelhub?schema=public"
JWT_SECRET="tu_clave_secreta"
JWT_EXPIRES_IN=3600
FRONTEND_URL="http://localhost:5173"
```

4.- Crear la base de datos `gavelhub` en PostgreSQL y ejecutar:

```bash
npx prisma migrate deploy
npx prisma generate
npm run seed
```

## Credenciales del administrador:

```env
ADMIN_CORREO="admin@gavelhub.com"
ADMIN_PASSWORD="Admin1234!"
```

## Ejecutar el backend

```bash
npm run start:dev
```

API: `http://localhost:3000`

Swagger: `http://localhost:3000/api`


## Instalación del Frontend

1.- Crear el archivo .env en base al .env.ejemplo

2.- Ejecutar npm install

3.- Ejecutar npm run dev

4.- Disfruta

## Credenciales de usuario:

Usuario 4082:
postor4082@gmail.com

Usuario 2904:
postro2904@gmail.com

La contraseñas para ambos es:
123456789