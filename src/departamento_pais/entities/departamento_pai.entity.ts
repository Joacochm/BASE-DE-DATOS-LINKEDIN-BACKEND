import { MunicipioDepartamento } from 'src/municipio_departamento/entities/municipio_departamento.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('departamento_pai')
export class DepartamentoPai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  codigo: string;

  @ManyToOne(() => Pai, (pai) => pai.departamentos)
  pai: Pai;

  @OneToMany(() => MunicipioDepartamento, (municipio) => municipio.departamento)
  municipios: MunicipioDepartamento[];
}
