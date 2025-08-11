import { Module } from '@nestjs/common';
import { DepartamentoPaisService } from './departamento_pais.service';
import { DepartamentoPaisController } from './departamento_pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoPai } from './entities/departamento_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';

@Module({
  controllers: [DepartamentoPaisController],
  imports: [TypeOrmModule.forFeature([DepartamentoPai, Pai])],
  providers: [DepartamentoPaisService],
})
export class DepartamentoPaisModule {}
