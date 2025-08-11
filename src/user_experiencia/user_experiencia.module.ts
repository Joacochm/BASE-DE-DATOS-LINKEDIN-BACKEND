import { Module } from '@nestjs/common';
import { UserExperienciaService } from './user_experiencia.service';
import { UserExperienciaController } from './user_experiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExperiencia } from './entities/user_experiencia.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [UserExperienciaController],
  imports: [TypeOrmModule.forFeature([UserExperiencia, User])],
  providers: [UserExperienciaService],
})
export class UserExperienciaModule {}
