export enum Rol {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Usuario {
  id: string;
  correo: string;
  passwordHash: string;
  rol: Rol;
}
export interface JwtPayload {
  sub: string;
  correo: string;
  rol: Rol;
}
export type UsuarioPublico = Omit<Usuario, 'passwordHash'>;
