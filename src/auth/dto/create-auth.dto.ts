import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateAuthDto {
  @IsUUID()
  @IsNotEmpty({ message: 'El pais del usuario es obligatorio' })
  paisId: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @Length(5, 255, { message: 'El correo debe tener entre 5 y 255 caracteres' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(6, 255, {
    message: 'La contraseña debe tener entre 6 y 255 caracteres',
  })
  password: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 255, { message: 'El nombre debe tener entre 2 y 255 caracteres' })
  name: string;

  @IsString({ message: 'La dirección debe ser un texto' })
  @Length(5, 255, {
    message: 'La dirección debe tener entre 5 y 255 caracteres',
  })
  direccion: string;

  @IsString({ message: 'El teléfono debe ser un texto' })
  @Length(7, 20, { message: 'El teléfono debe tener entre 7 y 20 caracteres' })
  telefono: string;

  @IsString({ message: 'El sexo debe ser un texto' })
  @IsIn(['Masculino', 'Femenino', 'Otro'], {
    message: 'El sexo debe ser Masculino, Femenino u Otro',
  })
  sexo: string;

  @IsString({ message: 'La identificación debe ser un texto' })
  @Length(5, 50, {
    message: 'La identificación debe tener entre 5 y 50 caracteres',
  })
  identificacion?: string;

  @IsOptional()
  @IsInt({ message: 'isActive debe ser un número entero' })
  @Type(() => Number)
  isActive?: number;

  @IsOptional()
  @IsInt({ message: 'isAuthorized debe ser un número entero' })
  @Type(() => Number)
  isAuthorized?: number;
}
