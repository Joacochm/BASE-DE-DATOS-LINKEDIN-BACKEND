import { User } from 'src/auth/entities/auth.entity';
import { PostsUser } from 'src/posts_users/entities/posts_user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('posts_likes')
@Unique(['user', 'post'])
export class LikesPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => PostsUser, (post) => post.likes)
  @JoinColumn({ name: 'postId' })
  post: PostsUser;

  @CreateDateColumn()
  createdAt: Date;
}
