import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLikesPostDto {
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;

  @IsNotEmpty({ message: 'El ID del post es obligatorio' })
  @IsUUID('4', { message: 'El ID del post debe ser un UUID válido' })
  postId: string;
}
