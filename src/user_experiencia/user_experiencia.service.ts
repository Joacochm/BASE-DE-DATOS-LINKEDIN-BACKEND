import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserExperienciaDto } from './dto/create-user_experiencia.dto';
import { UpdateUserExperienciaDto } from './dto/update-user_experiencia.dto';
import { UserExperiencia } from './entities/user_experiencia.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class UserExperienciaService {
  constructor(
    @InjectRepository(UserExperiencia)
    private readonly experienciaRepo: Repository<UserExperiencia>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserExperienciaDto: CreateUserExperienciaDto) {
    const user = await this.userRepo.findOne({
      where: { id: createUserExperienciaDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuario con id ${createUserExperienciaDto.userId} no encontrado`,
      );
    }

    const experiencia = this.experienciaRepo.create({
      ...createUserExperienciaDto,
      user,
    });
    delete experiencia.user.password;
    return await this.experienciaRepo.save(experiencia);
  }

  async findAll() {
    return await this.experienciaRepo.find({ relations: ['user'] });
  }

  async findExperiencias(userId: string) {
    try {
      const userExist = await this.userRepo.findOne({ where: { id: userId } });
      if (!userExist)
        throw new NotFoundException('El usuario seleccionado no existe');

      const experiencias = await this.experienciaRepo.find({
        where: { user: { id: userId } },
      });
      if (!experiencias || experiencias.length === 0) {
        throw new NotFoundException(
          'No se encontraron experiencias disponibles en este momento',
        );
      }

      return experiencias;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const experiencia = await this.experienciaRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!experiencia) {
      throw new NotFoundException(`Experiencia con id ${id} no encontrada`);
    }
    return experiencia;
  }

  async update(id: string, updateUserExperienciaDto: UpdateUserExperienciaDto) {
    const experiencia = await this.findOne(id);
    Object.assign(experiencia, updateUserExperienciaDto);
    return await this.experienciaRepo.save(experiencia);
  }

  async remove(id: string): Promise<void> {
    const result = await this.experienciaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Experiencia con id ${id} no encontrada`);
    }
  }
}
