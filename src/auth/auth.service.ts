import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { instanceToPlain } from 'class-transformer';
import { LoginDto } from './dto/login-auth.dto';
import { Pai } from 'src/pais/entities/pai.entity';
import { MailService } from 'src/mail/mail.service';
import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';
import { MunicipioDepartamento } from 'src/municipio_departamento/entities/municipio_departamento.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pai)
    private readonly paiRepository: Repository<Pai>,
    @InjectRepository(DepartamentoPai)
    private readonly departamentoRepository: Repository<DepartamentoPai>,
    @InjectRepository(MunicipioDepartamento)
    private readonly municipioRepository: Repository<MunicipioDepartamento>,
    private readonly mailService: MailService,
  ) {}

  private async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const {
        direccion,
        email,
        name,
        password,
        sexo,
        telefono,
        identificacion,
        departamentoId,
        municipioId,
        isActive,
        isAuthorized,
        paisId,
      } = createAuthDto;

      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }

      const pais_existe = await this.paiRepository.findOne({
        where: { id: paisId },
      });
      if (!pais_existe)
        throw new NotFoundException('El pais seleccionado no existe');

      const pais = await this.paiRepository.findOne({
        where: { id: createAuthDto.paisId },
      });
      if (!pais) {
        throw new NotFoundException('El país seleccionado no existe');
      }

      const departamento = await this.departamentoRepository.findOne({
        where: { id: departamentoId },
        relations: ['pai'],
      });
      if (!departamento) {
        throw new NotFoundException('El departamento seleccionado no existe');
      }
      if (departamento.pai.id !== createAuthDto.paisId) {
        throw new BadRequestException(
          'El departamento no pertenece al país seleccionado',
        );
      }

      const municipio = await this.municipioRepository.findOne({
        where: { id: municipioId },
        relations: ['departamento'],
      });
      if (!municipio) {
        throw new NotFoundException('El municipio seleccionado no existe');
      }
      if (municipio.departamento.id !== createAuthDto.departamentoId) {
        throw new BadRequestException(
          'El municipio no pertenece al departamento seleccionado',
        );
      }

      const hashedPassword = await this.hashPassword(password);

      const newUser = this.userRepository.create({
        direccion,
        email,
        name,
        password: hashedPassword,
        municipio,
        departamento,
        sexo,
        telefono,
        identificacion,
        isActive,
        isAuthorized,
        pais: pais_existe,
      });
      this.mailService.sendWelcomeEmail(
        email,
        name,
        `${process.env.FRONTEND_URL}/login`,
      );

      await this.userRepository.save(newUser);

      return 'Usuario creado exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findAll() {
    try {
      const usuarios = await this.userRepository.find();
      if (!usuarios || usuarios.length === 0) {
        throw new NotFoundException(
          'No se encontraron usuarios disponibles en este momento',
        );
      }
      return instanceToPlain(usuarios);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.findOne(id);

    const updatedUser = this.userRepository.merge(user, updateAuthDto);

    return this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async actualizarContrasena(updatePassword: ChangePasswordDto) {
    const { email, nuevaContrasena } = updatePassword;

    try {
      const usuario = await this.userRepository.findOne({ where: { email } });

      if (!usuario) {
        throw new NotFoundException('El correo no existe en la base de datos');
      }

      const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
      usuario.password = hashedPassword;

      await this.userRepository.save(usuario);
      await this.mailService.sendEmailConfirm(email, nuevaContrasena);
      return 'Contraseña actualizada exitosamente';
    } catch (error) {
      throw error;
    }
  }
}
