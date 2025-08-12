import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend_requests.service';
import { FriendRequestsController } from './friend_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend_request.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [FriendRequestsController],
  imports: [TypeOrmModule.forFeature([FriendRequest, User])],
  providers: [FriendRequestsService],
})
export class FriendRequestsModule {}
