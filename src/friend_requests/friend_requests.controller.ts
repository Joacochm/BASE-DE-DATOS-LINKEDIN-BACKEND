import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FriendRequestsService } from './friend_requests.service';
import { FriendRequestStatus } from './entities/friend_request.entity';

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Post('send/:senderId/:receiverId')
  async sendFriendRequest(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return await this.friendRequestsService.sendFriendRequest(
      senderId,
      receiverId,
    );
  }

  @Post('respond/:requestId/:userId')
  async respondToFriendRequest(
    @Param('requestId') requestId: string,
    @Param('userId') userId: string,
    @Body('status') status: FriendRequestStatus,
  ) {
    return await this.friendRequestsService.respondToFriendRequest(
      requestId,
      userId,
      status,
    );
  }

  @Get('pending/:userId')
  async getPendingRequests(@Param('userId') userId: string) {
    return this.friendRequestsService.getPendingFriendRequests(userId);
  }

  @Get('user-requests/:userId')
  async getUserFriendRequests(@Param('userId') userId: string) {
    return await this.friendRequestsService.getUserFriendRequests(userId);
  }

  @Get('user-friends/:userId')
  async getUserFriends(@Param('userId') userId: string) {
    return await this.friendRequestsService.getUserFriends(userId);
  }
}
