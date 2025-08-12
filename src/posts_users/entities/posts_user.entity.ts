import { User } from 'src/auth/entities/auth.entity';
import { LikesPost } from 'src/likes_posts/entities/likes_post.entity';
import { PostMedia } from 'src/posts_media/entities/posts_media.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('posts_user')
export class PostsUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => PostMedia, (media) => media.post, {
    cascade: true,
    eager: true,
  })
  media: PostMedia[];

  @OneToMany(() => LikesPost, (like) => like.post)
  likes: LikesPost[];

  get likesCount(): number {
    return this.likes ? this.likes.length : 0;
  }
}
