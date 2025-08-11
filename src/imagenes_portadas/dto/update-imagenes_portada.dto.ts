import { PartialType } from '@nestjs/mapped-types';
import { CreateImagenesPortadaDto } from './create-imagenes_portada.dto';

export class UpdateImagenesPortadaDto extends PartialType(CreateImagenesPortadaDto) {}
