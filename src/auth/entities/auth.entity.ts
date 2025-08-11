import { Exclude } from 'class-transformer';
import { Pai } from 'src/pais/entities/pai.entity';
import { ProfileImage } from 'src/profile_images/entities/profile_image.entity';
import { UserEducacion } from 'src/user_educacion/entities/user_educacion.entity';
import { UserExperiencia } from 'src/user_experiencia/entities/user_experiencia.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  telefono: string;

  @Column({ type: 'varchar', length: 20 })
  sexo: string;

  @Column({
    type: 'varchar',
    default: 'Sin Identificacion',
    unique: true,
    length: 50,
  })
  identificacion: string;

  @Column({ type: 'int', default: 1 })
  isActive: number;

  @Column({ type: 'int', default: 0 })
  isAuthorized: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Pai, (pais) => pais.usuarios, { eager: true })
  @JoinColumn({ name: 'paisId' })
  pais: Pai;

  @OneToMany(() => ProfileImage, (profileImage) => profileImage.user, {
    eager: true,
  })
  profileImages: ProfileImage[];

  get currentProfileImage(): ProfileImage | null {
    if (!this.profileImages || this.profileImages.length === 0) return null;

    return this.profileImages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];
  }

  @OneToMany(() => UserExperiencia, (experience) => experience.user, {
    eager: true,
  })
  experiences: UserExperiencia[];

  @OneToMany(() => UserEducacion, (education) => education.user, {
    eager: true,
  })
  educations: UserEducacion[];
}
