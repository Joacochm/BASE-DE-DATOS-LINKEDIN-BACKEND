import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MunicipioDepartamento } from './entities/municipio_departamento.entity';
import { DepartamentoPai } from '../departamento_pais/entities/departamento_pai.entity';
import { CreateMunicipioDepartamentoDto } from './dto/create-municipio_departamento.dto';
import { UpdateMunicipioDepartamentoDto } from './dto/update-municipio_departamento.dto';

@Injectable()
export class MunicipioDepartamentoService {
  constructor(
    @InjectRepository(MunicipioDepartamento)
    private readonly municipioRepository: Repository<MunicipioDepartamento>,
    @InjectRepository(DepartamentoPai)
    private readonly departamentoRepository: Repository<DepartamentoPai>,
  ) {}

  async create(createMunicipioDto: CreateMunicipioDepartamentoDto) {
    const departamento = await this.departamentoRepository.findOne({
      where: { id: createMunicipioDto.departamentoId },
    });

    if (!departamento) {
      throw new NotFoundException(
        `Departamento con ID ${createMunicipioDto.departamentoId} no encontrado`,
      );
    }

    const exists = await this.municipioRepository.findOne({
      where: {
        nombre: createMunicipioDto.nombre,
        departamento: { id: createMunicipioDto.departamentoId },
      },
    });

    if (exists) {
      throw new BadRequestException(
        `El municipio ${createMunicipioDto.nombre} ya existe en este departamento`,
      );
    }

    const municipio = this.municipioRepository.create({
      nombre: createMunicipioDto.nombre,
      codigo: createMunicipioDto.codigo,
      departamento,
    });

    return this.municipioRepository.save(municipio);
  }

  async findAll() {
    return this.municipioRepository.find({
      relations: ['departamento', 'departamento.pai'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string) {
    const municipio = await this.municipioRepository.findOne({
      where: { id },
      relations: ['departamento', 'departamento.pai'],
    });

    if (!municipio) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    return municipio;
  }

  async findByDepartamento(departamentoId: string) {
    const departamento = await this.departamentoRepository.findOne({
      where: { id: departamentoId },
    });

    if (!departamento) {
      throw new NotFoundException(
        `Departamento con ID ${departamentoId} no encontrado`,
      );
    }

    return this.municipioRepository.find({
      where: { departamento: { id: departamentoId } },
      relations: ['departamento'],
      order: { nombre: 'ASC' },
    });
  }

  async update(id: string, updateMunicipioDto: UpdateMunicipioDepartamentoDto) {
    const municipio = await this.municipioRepository.findOne({
      where: { id },
      relations: ['departamento'],
    });

    if (!municipio) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    if (updateMunicipioDto.departamentoId) {
      const departamento = await this.departamentoRepository.findOne({
        where: { id: updateMunicipioDto.departamentoId },
      });

      if (!departamento) {
        throw new NotFoundException(
          `Departamento con ID ${updateMunicipioDto.departamentoId} no encontrado`,
        );
      }
      municipio.departamento = departamento;
    }

    if (
      updateMunicipioDto.nombre &&
      updateMunicipioDto.nombre !== municipio.nombre
    ) {
      const exists = await this.municipioRepository.findOne({
        where: {
          nombre: updateMunicipioDto.nombre,
          departamento: { id: municipio.departamento.id },
        },
      });

      if (exists) {
        throw new BadRequestException(
          `El municipio ${updateMunicipioDto.nombre} ya existe en este departamento`,
        );
      }
    }

    this.municipioRepository.merge(municipio, updateMunicipioDto);
    return this.municipioRepository.save(municipio);
  }

  async remove(id: string) {
    const municipio = await this.municipioRepository.findOne({
      where: { id },
    });

    if (!municipio) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    await this.municipioRepository.remove(municipio);
    return {
      message: `Municipio con ID ${id} eliminado correctamente`,
      deleted: true,
    };
  }
}
