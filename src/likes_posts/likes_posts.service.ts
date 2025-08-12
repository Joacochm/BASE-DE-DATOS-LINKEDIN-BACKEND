import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikesPost } from './entities/likes_post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsUser } from 'src/posts_users/entities/posts_user.entity';
import { User } from 'src/auth/entities/auth.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class LikesPostsService {
  constructor(
    @InjectRepository(LikesPost)
    private readonly postLikeRepository: Repository<LikesPost>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PostsUser)
    private readonly postRepository: Repository<PostsUser>,
  ) {}

  private async verifyPostExists(postId: string) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`El post con ID ${postId} no existe`);
    }
    return post;
  }

  async likePost(userId: string, post: PostsUser) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new BadRequestException(
        'No se encontro el usuario que realiza esta accion',
      );
    delete user.password;
    const like = this.postLikeRepository.create({ user, post });
    return await this.postLikeRepository.save(like);
  }

  async unlikePost(userId: string, post: PostsUser) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new BadRequestException(
        'No se encontro el usuario que realiza esta accion',
      );
    await this.postLikeRepository.delete({ user, post });
    return 'Post eliminado exitosamente';
  }

  async getPostLikes(postId: string) {
    await this.verifyPostExists(postId);
    const posts = await this.postLikeRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });

    return instanceToPlain(posts);
  }

  async getUserLikes(userId: string) {
    const users_like = await this.postLikeRepository.find({
      where: { user: { id: userId } },
      relations: ['post'],
    });

    return instanceToPlain(users_like);
  }

  //SIRVE PARA VER SI UN USUARIO DIO LIKE A UN POST DEVUELVE TRUE O FALSE
  async hasUserLikedPost(userId: string, postId: string) {
    await this.verifyPostExists(postId);

    const like = await this.postLikeRepository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });
    return !!like;
  }

  //CANTIDAD DE LIKES QUE TIENE UN POST
  async getLikesCount(postId: string): Promise<number> {
    await this.verifyPostExists(postId);

    return await this.postLikeRepository.count({
      where: { post: { id: postId } },
    });
  }
}
