import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoPai } from './entities/departamento_pai.entity';
import { Pai } from '../pais/entities/pai.entity';
import { CreateDepartamentoPaiDto } from './dto/create-departamento_pai.dto';
import { UpdateDepartamentoPaiDto } from './dto/update-departamento_pai.dto';

@Injectable()
export class DepartamentoPaisService {
  constructor(
    @InjectRepository(DepartamentoPai)
    private readonly departamentoPaiRepository: Repository<DepartamentoPai>,
    @InjectRepository(Pai)
    private readonly paiRepository: Repository<Pai>,
  ) {}

  async create(createDepartamentoPaiDto: CreateDepartamentoPaiDto) {
    const pai = await this.paiRepository.findOne({
      where: { id: createDepartamentoPaiDto.paiId },
    });
    if (!pai) {
      throw new NotFoundException(
        `País con ID ${createDepartamentoPaiDto.paiId} no encontrado`,
      );
    }

    const exists = await this.departamentoPaiRepository.findOne({
      where: { nombre: createDepartamentoPaiDto.nombre },
    });
    if (exists) {
      throw new NotFoundException(
        `El departamento ${createDepartamentoPaiDto.nombre} ya existe`,
      );
    }

    const departamento = this.departamentoPaiRepository.create({
      ...createDepartamentoPaiDto,
      pai,
    });

    return this.departamentoPaiRepository.save(departamento);
  }

  async findAll() {
    return this.departamentoPaiRepository.find({
      relations: ['pai', 'municipios'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string) {
    const departamento = await this.departamentoPaiRepository.findOne({
      where: { id },
      relations: ['pai', 'municipios'],
    });

    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }

    return departamento;
  }

  async findByPai(paiId: string) {
    const pai = await this.paiRepository.findOne({
      where: { id: paiId },
    });
    if (!pai) {
      throw new NotFoundException(`País con ID ${paiId} no encontrado`);
    }

    return this.departamentoPaiRepository.find({
      where: { pai: { id: paiId } },
      relations: ['municipios'],
      order: { nombre: 'ASC' },
    });
  }

  async update(id: string, updateDepartamentoPaiDto: UpdateDepartamentoPaiDto) {
    const departamento = await this.departamentoPaiRepository.findOne({
      where: { id },
    });

    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }

    if (updateDepartamentoPaiDto.paiId) {
      const pai = await this.paiRepository.findOne({
        where: { id: updateDepartamentoPaiDto.paiId },
      });
      if (!pai) {
        throw new NotFoundException(
          `País con ID ${updateDepartamentoPaiDto.paiId} no encontrado`,
        );
      }
      departamento.pai = pai;
    }

    if (
      updateDepartamentoPaiDto.nombre &&
      updateDepartamentoPaiDto.nombre !== departamento.nombre
    ) {
      const exists = await this.departamentoPaiRepository.findOne({
        where: { nombre: updateDepartamentoPaiDto.nombre },
      });
      if (exists) {
        throw new NotFoundException(
          `El departamento ${updateDepartamentoPaiDto.nombre} ya existe`,
        );
      }
    }

    this.departamentoPaiRepository.merge(
      departamento,
      updateDepartamentoPaiDto,
    );
    return this.departamentoPaiRepository.save(departamento);
  }

  async remove(id: string) {
    const departamento = await this.departamentoPaiRepository.findOne({
      where: { id },
      relations: ['municipios'],
    });

    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }

    if (departamento.municipios && departamento.municipios.length > 0) {
      throw new NotFoundException(
        'No se puede eliminar el departamento porque tiene municipios asociados',
      );
    }

    await this.departamentoPaiRepository.remove(departamento);
    return { message: `Departamento con ID ${id} eliminado correctamente` };
  }
}
