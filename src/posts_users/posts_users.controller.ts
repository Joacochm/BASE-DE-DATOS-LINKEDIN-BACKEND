import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostsUsersService } from './posts_users.service';
import { CreatePostsUserDto } from './dto/create-posts_user.dto';
import { UpdatePostsUserDto } from './dto/update-posts_user.dto';
import { CreatePostMediaDto } from 'src/posts_media/dto/create-posts_media.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts-users')
export class PostsUsersController {
  constructor(private readonly postsUsersService: PostsUsersService) {}

  @Post('crear')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostsUserDto,
  ) {
    return this.postsUsersService.createPost(createPostDto, files);
  }

  @Get()
  findAll() {
    return this.postsUsersService.findAllPosts();
  }

  @Get('user/:userId')
  findUserPosts(@Param('userId') userId: string) {
    return this.postsUsersService.findUserPosts(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsUsersService.findPostById(id);
  }

  @Patch('actualizar/:userId/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostsUserDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.postsUsersService.updatePost(userId, id, updatePostDto, files);
  }

  @Delete('eliminar/:userId/:id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.postsUsersService.deletePost(userId, id);
  }

  @Post(':userId/:id/media')
  addMedia(
    @Param('userId') userId: string,
    @Param('id') postId: string,
    @Body() mediaDto: CreatePostMediaDto[],
  ) {
    return this.postsUsersService.addMediaToPost(userId, postId, mediaDto);
  }
}
