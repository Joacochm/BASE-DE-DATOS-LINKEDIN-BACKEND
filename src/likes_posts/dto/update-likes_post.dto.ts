import { PartialType } from '@nestjs/mapped-types';
import { CreateLikesPostDto } from './create-likes_post.dto';

export class UpdateLikesPostDto extends PartialType(CreateLikesPostDto) {}
