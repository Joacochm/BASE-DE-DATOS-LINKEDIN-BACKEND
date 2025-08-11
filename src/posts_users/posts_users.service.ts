import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostsUserDto } from './dto/create-posts_user.dto';
import { UpdatePostsUserDto } from './dto/update-posts_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsUser } from './entities/posts_user.entity';
import {
  MediaType,
  PostMedia,
} from 'src/posts_media/entities/posts_media.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { CreatePostMediaDto } from 'src/posts_media/dto/create-posts_media.dto';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsUsersService {
  constructor(
    @InjectRepository(PostsUser) private postRepo: Repository<PostsUser>,
    @InjectRepository(PostMedia) private mediaRepo: Repository<PostMedia>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createPost(
    createPostDto: CreatePostsUserDto,
    files: Express.Multer.File[],
  ) {
    const user = await this.userRepo.findOne({
      where: { id: createPostDto.userId },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'posts');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const post = this.postRepo.create({
      content: createPostDto.content,
      user,
    });
    await this.postRepo.save(post);

    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const medias: PostMedia[] = [];

    for (const [index, file] of files.entries()) {
      const ext = path.extname(file.originalname);
      const fileName = `${uuidv4()}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file.buffer);

      const type: MediaType = file.mimetype.startsWith('video')
        ? MediaType.VIDEO
        : MediaType.IMAGE;

      medias.push(
        this.mediaRepo.create({
          url: `${baseUrl}/uploads/posts/${fileName}`,
          type,
          order: index,
          post,
        }),
      );
    }

    await this.mediaRepo.save(medias);

    return await this.postRepo.findOne({
      where: { id: post.id },
      relations: ['media'],
    });
  }

  async findAllPosts() {
    return this.postRepo.find({
      relations: ['user', 'media'],
      order: { createdAt: 'DESC' },
    });
  }

  async findPostById(id: string) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user', 'media'],
    });

    if (!post) {
      throw new NotFoundException(`
Publicación con ID ${id} no encontrada`);
    }

    return post;
  }

  async findUserPosts(userId: string) {
    return this.postRepo.find({
      where: { user: { id: userId } },
      relations: ['media'],
      order: { createdAt: 'DESC' },
    });
  }

  async updatePost(
    userId: string,
    postId: string,
    updatePostDto: UpdatePostsUserDto,
    files?: Express.Multer.File[],
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['user', 'media'],
    });

    if (!post) {
      throw new NotFoundException(`Publicación con ID ${postId} no encontrada`);
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException(
        'Solo puedes actualizar tus propias publicaciones.',
      );
    }

    if (updatePostDto.content !== undefined) {
      post.content = updatePostDto.content;
    }

    const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'posts');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const baseUrl = process.env.APP_URL || 'http://localhost:3000';

    if (files && files.length > 0) {
      if (post.media && post.media.length > 0) {
        for (const media of post.media) {
          const filePath = path.join(uploadDir, path.basename(media.url));
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }

        await this.mediaRepo.delete({ post: { id: postId } });
      }

      const medias: PostMedia[] = [];
      for (const [index, file] of files.entries()) {
        const ext = path.extname(file.originalname);
        const fileName = `${uuidv4()}${ext}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, file.buffer);

        const type: MediaType = file.mimetype.startsWith('video')
          ? MediaType.VIDEO
          : MediaType.IMAGE;

        medias.push(
          this.mediaRepo.create({
            url: `${baseUrl}/uploads/posts/${fileName}`,
            type,
            order: index,
            post,
          }),
        );
      }

      post.media = await this.mediaRepo.save(medias);
    } else if (updatePostDto.media) {
      await this.mediaRepo.delete({ post: { id: postId } });
      post.media = updatePostDto.media.map((mediaDto, index) =>
        this.mediaRepo.create({
          ...mediaDto,
          order: index,
          post,
        }),
      );
      await this.mediaRepo.save(post.media);
    }

    await this.postRepo.save(post);

    return await this.postRepo.findOne({
      where: { id: postId },
      relations: ['media'],
    });
  }

  async deletePost(userId: string, id: string) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException(
        'Solo puedes eliminar tus propias publicaciones.',
      );
    }

    await this.postRepo.remove(post);
    return { message: 'Publicación eliminada exitosamente' };
  }

  async addMediaToPost(
    userId: string,
    postId: string,
    mediaDto: CreatePostMediaDto[],
  ) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['user', 'media'],
    });

    if (!post) {
      throw new NotFoundException(`Publicación con ID ${postId} no encontrada`);
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException(
        'Solo puedes agregar medios a tus propias publicaciones.',
      );
    }

    const currentMaxOrder = post.media.reduce(
      (max, media) => Math.max(max, media.order),
      -1,
    );

    const newMedia = mediaDto.map((media, index) =>
      this.mediaRepo.create({
        ...media,
        order: currentMaxOrder + index + 1,
        post,
      }),
    );

    await this.mediaRepo.save(newMedia);
    return this.postRepo.findOne({
      where: { id: postId },
      relations: ['user', 'media'],
    });
  }
}
