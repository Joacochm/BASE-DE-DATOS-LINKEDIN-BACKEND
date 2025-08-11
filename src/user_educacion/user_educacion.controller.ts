import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserEducacionService } from './user_educacion.service';
import { CreateUserEducacionDto } from './dto/create-user_educacion.dto';
import { UpdateUserEducacionDto } from './dto/update-user_educacion.dto';

@Controller('user-educacion')
export class UserEducacionController {
  constructor(private readonly userEducacionService: UserEducacionService) {}

  @Post()
  create(@Body() createUserEducacionDto: CreateUserEducacionDto) {
    return this.userEducacionService.create(createUserEducacionDto);
  }

  @Get()
  findAll() {
    return this.userEducacionService.findAll();
  }

  @Get('educacion/:userId')
  findAllUserId(@Param('userId') userId: string) {
    return this.userEducacionService.findAllUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEducacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserEducacionDto: UpdateUserEducacionDto,
  ) {
    return this.userEducacionService.update(id, updateUserEducacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEducacionService.remove(id);
  }
}
