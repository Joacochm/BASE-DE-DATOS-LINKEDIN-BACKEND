import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ImagenesPortadasService } from './imagenes_portadas.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('imagenes-portadas')
export class ImagenesPortadasController {
  constructor(
    private readonly imagenesPortadasService: ImagenesPortadasService,
  ) {}

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    return this.imagenesPortadasService.uploadProfileImage(userId, file);
  }

  @Get('current/:userId')
  async getCurrentPortadaImage(@Param('userId') userId: string) {
    return this.imagenesPortadasService.getCurrentPortadaImage(userId);
  }

  @Get('all-images/:userId')
  async getImagesByUser(@Param('userId') userId: string) {
    return this.imagenesPortadasService.getImagesByUser(userId);
  }

  @Delete(':id')
  async deleteProfileImage(@Param('id', ParseUUIDPipe) imageId: string) {
    return this.imagenesPortadasService.deleteProfileImage(imageId);
  }
}
