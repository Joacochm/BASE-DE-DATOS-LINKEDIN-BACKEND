import { Module } from '@nestjs/common';
import { UserEducacionService } from './user_educacion.service';
import { UserEducacionController } from './user_educacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEducacion } from './entities/user_educacion.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [UserEducacionController],
  imports: [TypeOrmModule.forFeature([UserEducacion, User])],
  providers: [UserEducacionService],
})
export class UserEducacionModule {}
