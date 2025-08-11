import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUserExperienciaDto {
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;

  @IsString({ message: 'El puesto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El puesto es obligatorio' })
  @MaxLength(255, { message: 'El puesto no debe exceder 255 caracteres' })
  puesto: string;

  @IsString({ message: 'El cargo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El cargo es obligatorio' })
  @MaxLength(255, { message: 'El cargo no debe exceder 255 caracteres' })
  cargo: string;

  @IsString({ message: 'La empresa debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La empresa es obligatoria' })
  @MaxLength(255, { message: 'La empresa no debe exceder 255 caracteres' })
  empresa: string;

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

  @IsOptional()
  @IsString({ message: 'La ubicacion debe ser una cadena de texto' })
  ubicacion?: string;

  @IsOptional()
  @IsString({ message: 'Las aptitudes debe ser una cadena de texto' })
  aptitudes?: string;
}

export class UpdateUserExperienciaDto {
  @IsOptional()
  @IsString({ message: 'El puesto debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El puesto no debe exceder 255 caracteres' })
  puesto?: string;

  @IsOptional()
  @IsString({ message: 'El cargo debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El cargo no debe exceder 255 caracteres' })
  cargo?: string;

  @IsOptional()
  @IsString({ message: 'La empresa debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La empresa no debe exceder 255 caracteres' })
  empresa?: string;

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

  @IsOptional()
  @IsString({ message: 'La ubicacion debe ser una cadena de texto' })
  ubicacion?: string;

  @IsOptional()
  @IsString({ message: 'Las aptitudes debe ser una cadena de texto' })
  aptitudes?: string;
}
