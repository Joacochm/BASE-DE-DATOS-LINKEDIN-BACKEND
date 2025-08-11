import { Module } from '@nestjs/common';
import { PostsUsersService } from './posts_users.service';
import { PostsUsersController } from './posts_users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsUser } from './entities/posts_user.entity';
import { User } from 'src/auth/entities/auth.entity';
import { PostMedia } from 'src/posts_media/entities/posts_media.entity';

@Module({
  controllers: [PostsUsersController],
  imports: [TypeOrmModule.forFeature([PostsUser, User, PostMedia])],
  providers: [PostsUsersService],
})
export class PostsUsersModule {}
