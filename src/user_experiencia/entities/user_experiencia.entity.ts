import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('experiences')
export class UserExperiencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.experiences, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  puesto: string;

  @Column({ type: 'varchar', length: 255 })
  cargo: string;

  @Column({ type: 'varchar', length: 255 })
  empresa: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin?: Date;

  @Column({ type: 'varchar', nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', nullable: true })
  ubicacion?: string;

  @Column({ type: 'varchar', nullable: true })
  aptitudes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
