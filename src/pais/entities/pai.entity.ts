import { User } from 'src/auth/entities/auth.entity';
import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pais')
export class Pai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  codigo: string;

  @OneToMany(() => User, (user) => user.pais)
  usuarios: User[];

  @OneToMany(() => DepartamentoPai, (departamento) => departamento.pai)
  departamentos: DepartamentoPai[];
}
