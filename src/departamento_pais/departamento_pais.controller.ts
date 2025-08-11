import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { CreateDepartamentoPaiDto } from './dto/create-departamento_pai.dto';
import { UpdateDepartamentoPaiDto } from './dto/update-departamento_pai.dto';
import { DepartamentoPaisService } from './departamento_pais.service';

@Controller('departamentos')
export class DepartamentoPaisController {
  constructor(
    private readonly departamentoPaisService: DepartamentoPaisService,
  ) {}

  @Post()
  create(@Body() createDepartamentoPaiDto: CreateDepartamentoPaiDto) {
    return this.departamentoPaisService.create(createDepartamentoPaiDto);
  }

  @Get()
  findAll() {
    return this.departamentoPaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentoPaisService.findOne(id);
  }

  @Get('pais/:paiId')
  findByPai(@Param('paiId') paiId: string) {
    return this.departamentoPaisService.findByPai(paiId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartamentoPaiDto: UpdateDepartamentoPaiDto,
  ) {
    return this.departamentoPaisService.update(id, updateDepartamentoPaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentoPaisService.remove(id);
  }
}
