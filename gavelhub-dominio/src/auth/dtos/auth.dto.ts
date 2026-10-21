import { IsEmail, IsEnum, MinLength } from "class-validator";
import { Rol } from "../dominio/usuario";

export class RegistroDto{
    
    @IsEmail()
    correo!: string;

    @MinLength(8)
    password!: string;

    @IsEnum(Rol)
    rol!: Rol;

}