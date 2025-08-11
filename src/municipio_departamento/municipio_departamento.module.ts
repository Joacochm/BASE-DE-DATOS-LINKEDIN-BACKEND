import { Module } from '@nestjs/common';
import { MunicipioDepartamentoService } from './municipio_departamento.service';
import { MunicipioDepartamentoController } from './municipio_departamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioDepartamento } from './entities/municipio_departamento.entity';
import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';

@Module({
  controllers: [MunicipioDepartamentoController],
  imports: [TypeOrmModule.forFeature([MunicipioDepartamento, DepartamentoPai])],
  providers: [MunicipioDepartamentoService],
})
export class MunicipioDepartamentoModule {}
