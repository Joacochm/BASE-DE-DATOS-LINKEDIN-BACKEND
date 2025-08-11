import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('municipio_departamento')
export class MunicipioDepartamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  codigo: string;

  @ManyToOne(() => DepartamentoPai, (departamento) => departamento.municipios)
  departamento: DepartamentoPai;
}
