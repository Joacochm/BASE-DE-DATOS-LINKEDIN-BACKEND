import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUserEducacionDto {
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;

  @IsString({ message: 'La institución debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La institución es obligatoria' })
  @MaxLength(255, { message: 'La institución no debe exceder 255 caracteres' })
  institucion: string;

  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(255, { message: 'El título no debe exceder 255 caracteres' })
  titulo: string;

  @IsDateString(
    {},
    { message: 'La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)' },
  )
  fechaInicio: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de fin debe ser una fecha válida (YYYY-MM-DD)' },
  )
  fechaFin?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;
}

export class UpdateUserEducacionDto {
  @IsOptional()
  @IsString({ message: 'La institución debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La institución no debe exceder 255 caracteres' })
  institucion?: string;

  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El título no debe exceder 255 caracteres' })
  titulo?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)' },
  )
  fechaInicio?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de fin debe ser una fecha válida (YYYY-MM-DD)' },
  )
  fechaFin?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;
}
