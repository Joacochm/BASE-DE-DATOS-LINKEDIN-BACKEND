import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsMediaService } from './posts_media.service';
import { UpdatePostsMediaDto } from './dto/update-posts_media.dto';
import { CreatePostMediaDto } from './dto/create-posts_media.dto';

@Controller('posts-media')
export class PostsMediaController {
  constructor(private readonly postsMediaService: PostsMediaService) {}

  @Post()
  create(@Body() createPostsMediaDto: CreatePostMediaDto) {
    return this.postsMediaService.create(createPostsMediaDto);
  }

  @Get()
  findAll() {
    return this.postsMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsMediaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostsMediaDto: UpdatePostsMediaDto,
  ) {
    return this.postsMediaService.update(+id, updatePostsMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsMediaService.remove(+id);
  }
}
