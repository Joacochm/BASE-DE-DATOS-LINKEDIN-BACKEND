import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';
import { Pai } from './entities/pai.entity';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepository: Repository<Pai>,
  ) {}

  async create(createPaiDto: CreatePaiDto) {
    const nuevoPais = this.paisRepository.create(createPaiDto);
    return await this.paisRepository.save(nuevoPais);
  }

  async findAll() {
    return await this.paisRepository.find({});
  }

  async findOne(id: string) {
    const pais = await this.paisRepository.findOne({
      where: { id },
      relations: ['usuarios'],
    });
    if (!pais) {
      throw new NotFoundException(`No se encontró el país con id ${id}`);
    }
    return pais;
  }

  async update(id: string, updatePaiDto: UpdatePaiDto) {
    const pais = await this.findOne(id);
    const paisActualizado = Object.assign(pais, updatePaiDto);
    return await this.paisRepository.save(paisActualizado);
  }

  async remove(id: string): Promise<void> {
    const pais = await this.findOne(id);
    await this.paisRepository.remove(pais);
  }
}
