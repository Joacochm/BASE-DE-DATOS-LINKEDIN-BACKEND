import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pai } from '../pais/entities/pai.entity';

import { User } from '../auth/entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DepartamentoPai } from 'src/departamento_pais/entities/departamento_pai.entity';
import { MunicipioDepartamento } from 'src/municipio_departamento/entities/municipio_departamento.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepository: Repository<Pai>,
    @InjectRepository(DepartamentoPai)
    private readonly departamentoRepository: Repository<DepartamentoPai>,
    @InjectRepository(MunicipioDepartamento)
    private readonly municipioRepository: Repository<MunicipioDepartamento>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.clearDatabase();
    const paises = await this.seedPaises();
    const honduras = paises.find((p) => p.codigo === 'HN');
    if (!honduras) throw new Error('Honduras no encontrada');

    const departamentos = await this.seedDepartamentos([honduras]);
    const municipios = await this.seedMunicipios(departamentos);
    await this.seedUsuario(honduras, departamentos, municipios);

    return { message: 'Seed ejecutado con éxito' };
  }

  private async clearDatabase() {
    const users = await this.userRepository.find();
    if (users.length > 0) {
      await this.userRepository.remove(users);
    }

    const municipios = await this.municipioRepository.find();
    if (municipios.length > 0) {
      await this.municipioRepository.remove(municipios);
    }

    const departamentos = await this.departamentoRepository.find();
    if (departamentos.length > 0) {
      await this.departamentoRepository.remove(departamentos);
    }

    const paises = await this.paisRepository.find();
    if (paises.length > 0) {
      await this.paisRepository.remove(paises);
    }
  }

  private async seedPaises() {
    const paises = [
      { nombre: 'Honduras', codigo: 'HN' },
      { nombre: 'Guatemala', codigo: 'GT' },
      { nombre: 'El Salvador', codigo: 'SV' },
      { nombre: 'Nicaragua', codigo: 'NI' },
      { nombre: 'Costa Rica', codigo: 'CR' },
      { nombre: 'Panamá', codigo: 'PA' },
      { nombre: 'México', codigo: 'MX' },
    ];

    return await this.paisRepository.save(paises);
  }

  private async seedDepartamentos(paises: Pai[]) {
    const departamentos = [];

    const hn = paises.find((d) => d.codigo === 'HN');
    departamentos.push(
      { nombre: 'Atlántida', codigo: 'AT', pai: hn },
      { nombre: 'Choluteca', codigo: 'CH', pai: hn },
      { nombre: 'Colón', codigo: 'CL', pai: hn },
      { nombre: 'Comayagua', codigo: 'CM', pai: hn },
      { nombre: 'Copán', codigo: 'CP', pai: hn },
      { nombre: 'Cortés', codigo: 'CR', pai: hn },
      { nombre: 'El Paraíso', codigo: 'EP', pai: hn },
      { nombre: 'Francisco Morazán', codigo: 'FM', pai: hn },
      { nombre: 'Gracias a Dios', codigo: 'GD', pai: hn },
      { nombre: 'Intibucá', codigo: 'IN', pai: hn },
      { nombre: 'Islas de la Bahía', codigo: 'IB', pai: hn },
      { nombre: 'La Paz', codigo: 'LP', pai: hn },
      { nombre: 'Lempira', codigo: 'LE', pai: hn },
      { nombre: 'Ocotepeque', codigo: 'OC', pai: hn },
      { nombre: 'Olancho', codigo: 'OL', pai: hn },
      { nombre: 'Santa Bárbara', codigo: 'SB', pai: hn },
      { nombre: 'Valle', codigo: 'VA', pai: hn },
      { nombre: 'Yoro', codigo: 'YO', pai: hn },
    );

    return await this.departamentoRepository.save(departamentos);
  }

  private async seedMunicipios(departamentos: DepartamentoPai[]) {
    const municipios = [];

    const fm = departamentos.find((d) => d.codigo === 'FM');
    municipios.push(
      { nombre: 'Tegucigalpa', codigo: '01', departamento: fm },
      { nombre: 'Comayagüela', codigo: '02', departamento: fm },
      { nombre: 'Valle de Ángeles', codigo: '03', departamento: fm },
      { nombre: 'Santa Lucía', codigo: '04', departamento: fm },
    );

    const cortes = departamentos.find((d) => d.codigo === 'CR');
    municipios.push(
      { nombre: 'San Pedro Sula', codigo: '01', departamento: cortes },
      { nombre: 'Choloma', codigo: '02', departamento: cortes },
      { nombre: 'Puerto Cortés', codigo: '03', departamento: cortes },
      { nombre: 'Villanueva', codigo: '04', departamento: cortes },
    );

    const atlantida = departamentos.find((d) => d.codigo === 'AT');
    municipios.push(
      { nombre: 'La Ceiba', codigo: '01', departamento: atlantida },
      { nombre: 'Tela', codigo: '02', departamento: atlantida },
      { nombre: 'Jutiapa', codigo: '03', departamento: atlantida },
      { nombre: 'Arizona', codigo: '04', departamento: atlantida },
    );

    const islas = departamentos.find((d) => d.codigo === 'IB');
    municipios.push(
      { nombre: 'Roatán', codigo: '01', departamento: islas },
      { nombre: 'Guanaja', codigo: '02', departamento: islas },
      { nombre: 'Utila', codigo: '03', departamento: islas },
    );

    return await this.municipioRepository.save(municipios);
  }

  private async seedUsuario(
    pais: Pai,
    departamentos: DepartamentoPai[],
    municipios: MunicipioDepartamento[],
  ) {
    const hashedPassword = await bcrypt.hash('Password123', 10);
    const franciscoMorazan = departamentos.find((d) => d.codigo === 'FM');
    const tegucigalpa = municipios.find(
      (m) =>
        m.nombre === 'Tegucigalpa' && m.departamento.id === franciscoMorazan.id,
    );

    const usuario = this.userRepository.create({
      email: 'honduras@ejemplo.com',
      password: hashedPassword,
      name: 'Usuario Honduras',
      direccion: 'Colonia Palmira, Tegucigalpa',
      telefono: '22334455',
      sexo: 'Masculino',
      identificacion: '0801199901234',
      isActive: 1,
      isAuthorized: 1,
      pais: pais,
      departamento: franciscoMorazan,
      municipio: tegucigalpa,
    });

    return await this.userRepository.save(usuario);
  }
}
