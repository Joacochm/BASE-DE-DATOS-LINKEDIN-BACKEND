import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pai } from './entities/pai.entity';

@Module({
  controllers: [PaisController],
  imports: [TypeOrmModule.forFeature([Pai])],
  providers: [PaisService],
})
export class PaisModule {}
