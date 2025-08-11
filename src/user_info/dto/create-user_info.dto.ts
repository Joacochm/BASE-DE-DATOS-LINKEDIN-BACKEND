import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUserInfoDto {
  @IsUUID()
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  userId: string;

  @IsString({ message: 'El titular debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El titular es obligatorio' })
  @MaxLength(255, { message: 'El titular no debe exceder 255 caracteres' })
  titular: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  acercaDe?: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser texto' })
  @MaxLength(255, { message: 'La ubicación no debe exceder 255 caracteres' })
  ubicacion?: string;

  @IsOptional()
  @IsUrl({}, { message: 'El enlace debe ser una URL válida' })
  @MaxLength(255, { message: 'El enlace no debe exceder 255 caracteres' })
  enlaceSitioWeb?: string;
}
