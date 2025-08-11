import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { MailService } from 'src/mail/mail.service';
import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';
import { MunicipioDepartamento } from 'src/municipio_departamento/entities/municipio_departamento.entity';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Pai,
      DepartamentoPai,
      MunicipioDepartamento,
    ]),
  ],
  providers: [AuthService, MailService],
})
export class AuthModule {}
