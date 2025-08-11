import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartamentoPaiDto } from './create-departamento_pai.dto';

export class UpdateDepartamentoPaiDto extends PartialType(CreateDepartamentoPaiDto) {}
