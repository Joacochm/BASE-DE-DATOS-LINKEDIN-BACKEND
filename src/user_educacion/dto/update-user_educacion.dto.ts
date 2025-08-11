import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEducacionDto } from './create-user_educacion.dto';

export class UpdateUserEducacionDto extends PartialType(CreateUserEducacionDto) {}
