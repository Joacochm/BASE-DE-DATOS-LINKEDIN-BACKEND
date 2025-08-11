import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MunicipioDepartamentoService } from './municipio_departamento.service';
import { CreateMunicipioDepartamentoDto } from './dto/create-municipio_departamento.dto';
import { UpdateMunicipioDepartamentoDto } from './dto/update-municipio_departamento.dto';

@Controller('municipios')
export class MunicipioDepartamentoController {
  constructor(
    private readonly municipioService: MunicipioDepartamentoService,
  ) {}

  @Post()
  create(@Body() createMunicipioDto: CreateMunicipioDepartamentoDto) {
    return this.municipioService.create(createMunicipioDto);
  }

  @Get()
  findAll() {
    return this.municipioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipioService.findOne(id);
  }

  @Get('departamento/:departamentoId')
  findByDepartamento(@Param('departamentoId') departamentoId: string) {
    return this.municipioService.findByDepartamento(departamentoId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMunicipioDto: UpdateMunicipioDepartamentoDto,
  ) {
    return this.municipioService.update(id, updateMunicipioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipioService.remove(id);
  }
}
