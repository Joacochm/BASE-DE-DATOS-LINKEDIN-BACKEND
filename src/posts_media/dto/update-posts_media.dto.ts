import { PartialType } from '@nestjs/mapped-types';
import { CreatePostMediaDto } from './create-posts_media.dto';

export class UpdatePostsMediaDto extends PartialType(CreatePostMediaDto) {}
