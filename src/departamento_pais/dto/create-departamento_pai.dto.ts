import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateDepartamentoPaiDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @MaxLength(10, { message: 'El código no debe exceder los 10 caracteres' })
  codigo?: string;

  @IsNotEmpty({ message: 'El ID del país es obligatorio' })
  @IsUUID('4', { message: 'El ID del país debe ser un UUID válido' })
  paiId: string;
}
