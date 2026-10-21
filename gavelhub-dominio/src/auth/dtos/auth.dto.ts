import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegistroDto {
  @IsEmail({}, { message: 'El correo debe ser un correo válido' })
  correo!: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;
}
export class LoginDto {
  @IsEmail({}, { message: 'El correo debe ser un correo válido' })
  correo!: string;

  @MinLength(1, { message: 'La contraseña no puede estar vacía' })
  password!: string;
}
export class TakenDto {
  accessToken!: string; //jwt token
  tokenType!: string; //bearer
  expiresIn!: number; //expiracion en segundos
}
