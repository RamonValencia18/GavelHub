import { IsEmail, IsEnum, MinLength } from "class-validator";
import { Rol } from "../dominio/usuario";

export class RegistroDto {

    @IsEmail()
    correo!: string;

    @MinLength(8)
    password!: string;

    @IsEnum(Rol)
    rol!: Rol;

}
export class LoginDto {

    @IsEmail({}, { message: 'El correo debe ser un correo válido' })
    correo!: string;

    @MinLength(1, { message: 'La contraseña no puede estar vacía' })
    password!: string;
}