import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserEducacionDto } from './dto/create-user_educacion.dto';
import { UpdateUserEducacionDto } from './dto/update-user_educacion.dto';
import { UserEducacion } from './entities/user_educacion.entity';
import { User } from 'src/auth/entities/auth.entity';
import e from 'express';

@Injectable()
export class UserEducacionService {
  constructor(
    @InjectRepository(UserEducacion)
    private readonly educacionRepo: Repository<UserEducacion>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserEducacionDto: CreateUserEducacionDto) {
    const { userId, fechaInicio, institucion, titulo, descripcion, fechaFin } =
      createUserEducacionDto;
    try {
      const user_exist = await this.userRepo.findOne({ where: { id: userId } });
      if (!user_exist)
        throw new NotFoundException(
          'No se encontró el usuario que realiza la solicitud',
        );

      const educacion = this.educacionRepo.create({
        institucion,
        titulo,
        fechaInicio,
        fechaFin,
        descripcion,
        user: user_exist,
      });
      delete educacion.user.password;
      return await this.educacionRepo.save(educacion);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.educacionRepo.find();
  }

  async findAllUserId(userId: string) {
    try {
      const userExist = await this.userRepo.findOne({ where: { id: userId } });
      if (!userExist)
        throw new NotFoundException(
          'No se encontro el usuario que realiza esta peticion',
        );

      const eduacion_user = await this.educacionRepo.find({
        where: {
          user: { id: userId },
        },
      });
      if (!eduacion_user || eduacion_user.length === 0) {
        throw new NotFoundException(
          'No se encontro eduacacion para este usuario',
        );
      }

      return eduacion_user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const educacion = await this.educacionRepo.findOne({ where: { id } });
    if (!educacion) {
      throw new NotFoundException(`Educación con id ${id} no encontrada`);
    }
    return educacion;
  }

  async update(id: string, updateUserEducacionDto: UpdateUserEducacionDto) {
    const educacion = await this.findOne(id);
    Object.assign(educacion, updateUserEducacionDto);
    return await this.educacionRepo.save(educacion);
  }

  async remove(id: string): Promise<void> {
    const result = await this.educacionRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Educación con id ${id} no encontrada`);
    }
  }
}
