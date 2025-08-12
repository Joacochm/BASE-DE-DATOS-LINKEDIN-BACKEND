import { IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { FriendRequestStatus } from '../entities/friend_request.entity';

export class CreateFriendRequestDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'El ID del remitente debe ser un UUID válido' })
  senderId: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'El ID del receptor debe ser un UUID válido' })
  receiverId: string;

  @IsEnum(FriendRequestStatus, {
    message: 'El estado debe ser pending, accepted o rejected',
  })
  status?: FriendRequestStatus = FriendRequestStatus.PENDING;
}
