import { Module } from '@nestjs/common';
import { ImagenesPortadasService } from './imagenes_portadas.service';
import { ImagenesPortadasController } from './imagenes_portadas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenesPortada } from './entities/imagenes_portada.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [ImagenesPortadasController],
  imports: [TypeOrmModule.forFeature([ImagenesPortada, User])],
  providers: [ImagenesPortadasService],
})
export class ImagenesPortadasModule {}
