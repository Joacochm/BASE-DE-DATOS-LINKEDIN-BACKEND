import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('educations')
export class UserEducacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.educations, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  institucion: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin?: Date;

  @Column({ type: 'varchar', nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', nullable: true })
  aptitudes?: string;

  @Column({ type: 'varchar', nullable: true })
  nota?: string;

  @Column({ type: 'varchar', nullable: true })
  disciplina_academia?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
