import { IsString, Length } from 'class-validator';

export class CreatePaiDto {
  @IsString({ message: 'El nombre del país debe ser un texto' })
  @Length(2, 100, {
    message: 'El nombre del país debe tener entre 2 y 100 caracteres',
  })
  nombre: string;

  @IsString({ message: 'El código debe ser un texto' })
  @Length(2, 10, { message: 'El código debe tener entre 2 y 10 caracteres' })
  codigo: string;
}
