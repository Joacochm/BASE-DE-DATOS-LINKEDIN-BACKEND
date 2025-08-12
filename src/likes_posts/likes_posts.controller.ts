import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikesPostsService } from './likes_posts.service';

@Controller('likes-posts')
export class LikesPostsController {
  constructor(private readonly likesPostsService: LikesPostsService) {}

  @Post(':userId/:postId')
  async likePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.likesPostsService.likePost(userId, { id: postId } as any);
  }

  @Delete(':userId/:postId')
  async unlikePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.likesPostsService.unlikePost(userId, {
      id: postId,
    } as any);
  }

  @Get(':postId')
  async getPostLikes(@Param('postId') postId: string) {
    return await this.likesPostsService.getPostLikes(postId);
  }

  @Get('user/:userId')
  async getUserLikes(@Param('userId') userId: string) {
    return await this.likesPostsService.getUserLikes(userId);
  }

  @Get('has-liked/:userId/:postId')
  async hasUserLikedPost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.likesPostsService.hasUserLikedPost(userId, postId);
  }

  @Get('count/:postId')
  async getLikesCount(@Param('postId') postId: string) {
    return {
      count: await this.likesPostsService.getLikesCount(postId),
    };
  }
}
