import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/user_info.entity';
import { CreateUserInfoDto } from './dto/create-user_info.dto';
import { UpdateUserInfoDto } from './dto/update-user_info.dto';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepo: Repository<UserInfo>,
  ) {}

  async create(createUserInfoDto: CreateUserInfoDto) {
    try {
      const usuario_existe = await this.userInfoRepo.findOne({
        where: { user: { id: createUserInfoDto.userId } },
      });
      if (usuario_existe) {
        throw new Error('El usuario ya tiene un perfil creado');
      }

      const userInfo = this.userInfoRepo.create({
        ...createUserInfoDto,
        user: { id: createUserInfoDto.userId },
      });

      await this.userInfoRepo.save(userInfo);
      return 'Informacion del usuario guardada exitosamente';
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userInfoRepo.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const userInfo = await this.userInfoRepo.findOne({
      where: { user: { id } },
      relations: ['user'],
    });
    if (!userInfo) throw new NotFoundException('Perfil no encontrado');
    delete userInfo.user.password;
    return userInfo;
  }

  async update(id: string, updateUserInfoDto: UpdateUserInfoDto) {
    const userInfo = await this.findOne(id);

    Object.assign(userInfo, updateUserInfoDto);
    return this.userInfoRepo.save(userInfo);
  }

  async remove(id: string): Promise<void> {
    const userInfo = await this.findOne(id);
    await this.userInfoRepo.remove(userInfo);
  }

  async findByUserId(userId: string): Promise<UserInfo | null> {
    return this.userInfoRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
