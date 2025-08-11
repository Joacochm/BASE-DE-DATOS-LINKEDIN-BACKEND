import { PostsUser } from 'src/posts_users/entities/posts_user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

export const MediaType = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const;
export type MediaType = (typeof MediaType)[keyof typeof MediaType];

@Entity('post_media')
export class PostMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: MediaType.IMAGE,
  })
  type: MediaType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  thumbnail?: string;

  @Column({ type: 'int', nullable: true })
  duration?: number;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => PostsUser, (post) => post.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: PostsUser;
}
