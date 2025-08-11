import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseUUIDPipe,
  Get,
  Delete,
  BadRequestException,
} from '@nestjs/common';

import { Express } from 'express';
import { ProfileImagesService } from './profile_images.service';

import { User } from 'src/auth/entities/auth.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile-images')
export class ProfileImagesController {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    return this.profileImagesService.uploadProfileImage(userId, file);
  }

  @Get('current/:userId')
  async getCurrentProfileImage(@Param('userId') userId: string) {
    return this.profileImagesService.getCurrentProfileImage(userId);
  }

  @Get('all-images/:userId')
  async getImagesByUser(@Param('userId') userId: string) {
    return this.profileImagesService.getImagesByUser(userId);
  }

  @Delete(':id')
  async deleteProfileImage(@Param('id', ParseUUIDPipe) imageId: string) {
    return this.profileImagesService.deleteProfileImage(imageId);
  }
}
