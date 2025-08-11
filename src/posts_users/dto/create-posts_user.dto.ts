import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostMediaDto } from 'src/posts_media/dto/create-posts_media.dto';

export class CreatePostsUserDto {
  @IsOptional()
  @IsString({ message: 'El contenido debe ser una cadena de texto' })
  @MaxLength(5000, { message: 'El contenido no debe exceder 5000 caracteres' })
  content?: string;

  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;

  @IsOptional()
  @IsArray({ message: 'Los medios deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => CreatePostMediaDto)
  media?: CreatePostMediaDto[];
}

export class UpdatePostsUserDto {
  @IsOptional()
  @IsString({ message: 'El contenido debe ser una cadena de texto' })
  @MaxLength(5000, { message: 'El contenido no debe exceder 5000 caracteres' })
  content?: string;

  @IsOptional()
  @IsArray({ message: 'Los medios deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => CreatePostMediaDto)
  media?: CreatePostMediaDto[];
}
