import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileImageDto } from './create-profile_image.dto';

export class UpdateProfileImageDto extends PartialType(CreateProfileImageDto) {}
