import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { MediaType } from '../entities/posts_media.entity';

export class CreatePostMediaDto {
  @IsNotEmpty({ message: 'La URL es obligatoria' })
  @IsString({ message: 'La URL debe ser una cadena de texto' })
  @IsUrl({}, { message: 'La URL debe ser válida' })
  @MaxLength(255, { message: 'La URL no debe exceder los 255 caracteres' })
  url: string;

  @IsOptional()
  @IsEnum(MediaType, { message: 'El tipo debe ser "image" o "video"' })
  type?: MediaType;

  @IsOptional()
  @IsString({ message: 'El thumbnail debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El thumbnail no debe exceder los 100 caracteres',
  })
  thumbnail?: string;

  @IsOptional()
  @IsInt({ message: 'La duración debe ser un número entero' })
  @Min(0, { message: 'La duración no puede ser negativa' })
  duration?: number;

  @IsOptional()
  @IsInt({ message: 'El orden debe ser un número entero' })
  @Min(0, { message: 'El orden no puede ser negativo' })
  order?: number;

  @IsNotEmpty({ message: 'El ID del post es obligatorio' })
  @IsUUID('4', { message: 'El ID del post debe ser un UUID válido' })
  postId: string;
}

export class UpdatePostMediaDto {
  @IsOptional()
  @IsString({ message: 'La URL debe ser una cadena de texto' })
  @IsUrl({}, { message: 'La URL debe ser válida' })
  @MaxLength(255, { message: 'La URL no debe exceder los 255 caracteres' })
  url?: string;

  @IsOptional()
  @IsEnum(MediaType, { message: 'El tipo debe ser "image" o "video"' })
  type?: MediaType;

  @IsOptional()
  @IsString({ message: 'El thumbnail debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El thumbnail no debe exceder los 100 caracteres',
  })
  thumbnail?: string;

  @IsOptional()
  @IsInt({ message: 'La duración debe ser un número entero' })
  @Min(0, { message: 'La duración no puede ser negativa' })
  duration?: number;

  @IsOptional()
  @IsInt({ message: 'El orden debe ser un número entero' })
  @Min(0, { message: 'El orden no puede ser negativo' })
  order?: number;
}
