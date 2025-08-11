import { PartialType } from '@nestjs/mapped-types';
import { CreateUserExperienciaDto } from './create-user_experiencia.dto';

export class UpdateUserExperienciaDto extends PartialType(CreateUserExperienciaDto) {}
