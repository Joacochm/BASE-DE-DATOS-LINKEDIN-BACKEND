import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pai } from 'src/pais/entities/pai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepository: Repository<Pai>,
  ) {}

  async runSeed() {
    const paises = [
      { nombre: 'Honduras', codigo: 'HN' },
      { nombre: 'Guatemala', codigo: 'GT' },
      { nombre: 'El Salvador', codigo: 'SV' },
      { nombre: 'Nicaragua', codigo: 'NC' },
      { nombre: 'Costa Rica', codigo: 'CR' },
      { nombre: 'Panamá', codigo: 'PN' },
      { nombre: 'México', codigo: 'MX' },
    ];

    await this.paisRepository.clear();

    await this.paisRepository.save(paises);

    return { message: 'Seed ejecutado con éxito', total: paises.length };
  }
}
