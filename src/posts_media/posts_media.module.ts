import { Module } from '@nestjs/common';
import { PostsMediaService } from './posts_media.service';
import { PostsMediaController } from './posts_media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMedia } from './entities/posts_media.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [PostsMediaController],
  imports: [TypeOrmModule.forFeature([PostMedia, User])],
  providers: [PostsMediaService],
})
export class PostsMediaModule {}
