import { Module } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { UserInfoController } from './user_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [UserInfoController],
  imports: [TypeOrmModule.forFeature([UserInfo, User])],
  providers: [UserInfoService],
})
export class UserInfoModule {}
