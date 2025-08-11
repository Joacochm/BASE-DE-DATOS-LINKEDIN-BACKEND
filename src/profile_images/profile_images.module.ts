import { Module } from '@nestjs/common';
import { ProfileImagesService } from './profile_images.service';
import { ProfileImagesController } from './profile_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImage } from './entities/profile_image.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [ProfileImagesController],
  imports: [TypeOrmModule.forFeature([ProfileImage, User])],
  providers: [ProfileImagesService],
})
export class ProfileImagesModule {}
