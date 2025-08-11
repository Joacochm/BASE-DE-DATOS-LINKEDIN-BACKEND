import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserExperienciaService } from './user_experiencia.service';
import { CreateUserExperienciaDto } from './dto/create-user_experiencia.dto';
import { UpdateUserExperienciaDto } from './dto/update-user_experiencia.dto';

@Controller('user-experiencia')
export class UserExperienciaController {
  constructor(
    private readonly userExperienciaService: UserExperienciaService,
  ) {}

  @Post()
  create(@Body() createUserExperienciaDto: CreateUserExperienciaDto) {
    return this.userExperienciaService.create(createUserExperienciaDto);
  }

  @Get()
  findAll() {
    return this.userExperienciaService.findAll();
  }

  @Get('experiencias/:userId')
  findExperiencias(@Param('userId') userId: string) {
    return this.userExperienciaService.findExperiencias(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userExperienciaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserExperienciaDto: UpdateUserExperienciaDto,
  ) {
    return this.userExperienciaService.update(id, updateUserExperienciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userExperienciaService.remove(id);
  }
}
