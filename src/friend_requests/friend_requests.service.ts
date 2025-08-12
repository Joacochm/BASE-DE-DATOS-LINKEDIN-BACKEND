import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FriendRequest,
  FriendRequestStatus,
} from './entities/friend_request.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendFriendRequest(senderId: string, receiverId: string) {
    try {
      if (senderId === receiverId) {
        throw new BadRequestException(
          'No puedes enviarte una solicitud a ti mismo',
        );
      }

      const [sender, receiver] = await Promise.all([
        this.userRepository.findOne({ where: { id: senderId } }),
        this.userRepository.findOne({ where: { id: receiverId } }),
      ]);

      if (!sender || !receiver) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const existingRequest = await this.friendRequestRepository.findOne({
        where: [
          { sender: { id: senderId }, receiver: { id: receiverId } },
          { sender: { id: receiverId }, receiver: { id: senderId } },
        ],
      });

      if (existingRequest) {
        throw new BadRequestException(
          'Ya existe una solicitud entre estos usuarios',
        );
      }

      const friendRequest = this.friendRequestRepository.create({
        sender,
        receiver,
        status: FriendRequestStatus.PENDING,
      });

      await this.friendRequestRepository.save(friendRequest);

      return 'Solicitud Enviada Exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async respondToFriendRequest(
    requestId: string,
    receiverId: string,
    status: FriendRequestStatus,
  ) {
    const request = await this.friendRequestRepository.findOne({
      where: { id: requestId, receiver: { id: receiverId } },
      relations: ['sender', 'receiver'],
    });

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.status !== FriendRequestStatus.PENDING) {
      throw new Error('Esta solicitud ya fue procesada');
    }

    request.status = status;
    await this.friendRequestRepository.save(request);

    if (status === FriendRequestStatus.ACCEPTED) {
      await this.addFriends(request.sender, request.receiver);
    }

    return 'Estado de solicitud actualizado';
  }

  private async addFriends(user1: User, user2: User) {
    user1.friends = [...(user1.friends || []), user2];
    user2.friends = [...(user2.friends || []), user1];
    await this.userRepository.save([user1, user2]);
  }

  async getPendingFriendRequests(userId: string) {
    const requests = await this.friendRequestRepository.find({
      where: [
        {
          receiver: { id: userId },
          status: FriendRequestStatus.PENDING,
        },

        {
          sender: { id: userId },
          status: FriendRequestStatus.PENDING,
        },
      ],
      relations: ['sender', 'receiver'],
      order: {
        createdAt: 'DESC',
      },
    });

    return requests.map((request) => ({
      id: request.id,
      sender: instanceToPlain(request.sender),
      receiver: instanceToPlain(request.receiver),
      status: request.status,
      createdAt: request.createdAt,
    }));
  }

  async getUserFriendRequests(userId: string) {
    return await this.friendRequestRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
    });
  }

  async getUserFriends(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    return instanceToPlain(user?.friends) || [];
  }
}
