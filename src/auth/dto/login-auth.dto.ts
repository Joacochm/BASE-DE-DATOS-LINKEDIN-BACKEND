import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @Length(5, 255, { message: 'El correo debe tener entre 5 y 255 caracteres' })
  @IsNotEmpty({ message: 'El correo electronico es obligatorio' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(6, 255, {
    message: 'La contraseña debe tener entre 6 y 255 caracteres',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
