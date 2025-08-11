import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsUserDto } from './create-posts_user.dto';

export class UpdatePostsUserDto extends PartialType(CreatePostsUserDto) {}
