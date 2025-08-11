import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipioDepartamentoDto } from './create-municipio_departamento.dto';

export class UpdateMunicipioDepartamentoDto extends PartialType(CreateMunicipioDepartamentoDto) {}
