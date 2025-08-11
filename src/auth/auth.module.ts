import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Pai])],
  providers: [AuthService, MailService],
})
export class AuthModule {}
