import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pai } from 'src/pais/entities/pai.entity';
import { User } from 'src/auth/entities/auth.entity';
import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';
import { MunicipioDepartamento } from 'src/municipio_departamento/entities/municipio_departamento.entity';

@Module({
  controllers: [SeedController],
  imports: [
    TypeOrmModule.forFeature([
      Pai,
      User,
      DepartamentoPai,
      MunicipioDepartamento,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
