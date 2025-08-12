import { Module } from '@nestjs/common';
import { LikesPostsService } from './likes_posts.service';
import { LikesPostsController } from './likes_posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesPost } from './entities/likes_post.entity';
import { User } from 'src/auth/entities/auth.entity';
import { PostsUser } from 'src/posts_users/entities/posts_user.entity';

@Module({
  controllers: [LikesPostsController],
  imports: [TypeOrmModule.forFeature([LikesPost, User, PostsUser])],
  providers: [LikesPostsService],
})
export class LikesPostsModule {}
