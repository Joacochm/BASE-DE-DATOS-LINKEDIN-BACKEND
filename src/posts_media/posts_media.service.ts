import { Injectable } from '@nestjs/common';
import { CreatePostMediaDto } from './dto/create-posts_media.dto';
import { UpdatePostsMediaDto } from './dto/update-posts_media.dto';

@Injectable()
export class PostsMediaService {
  create(createPostsMediaDto: CreatePostMediaDto) {
    return 'This action adds a new postsMedia';
  }

  findAll() {
    return `This action returns all postsMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postsMedia`;
  }

  update(id: number, updatePostsMediaDto: UpdatePostsMediaDto) {
    return `This action updates a #${id} postsMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} postsMedia`;
  }
}
