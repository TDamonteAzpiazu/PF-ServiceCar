import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from './sucursales.entity';
import { CreateSucursalDto, UpdateSucursalDto } from '../dto/sucursales.dto'
import { Status } from '../enum/status.enum';

@Injectable()
export class SucursalesService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalRepository.find();
  }

  async findById(id: string): Promise<Sucursal | undefined> {
    return await this.sucursalRepository.findOne({ where: { id } });
  }

  async create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const sucursal = this.sucursalRepository.create({
      ...createSucursalDto,
      status: Status.Active,
    });
    return await this.sucursalRepository.save(sucursal);
  }

  async update(id: string, updateSucursalDto: UpdateSucursalDto): Promise<Sucursal> {
    const sucursal = await this.findById(id);
    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    Object.assign(sucursal, updateSucursalDto);
    return await this.sucursalRepository.save(sucursal);
  }

  async softDelete(id: string): Promise<void> {
    const sucursal = await this.findById(id);
    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    sucursal.status = Status.Inactive;
    await this.sucursalRepository.save(sucursal);
  }

  async findByNames(names: string[]): Promise<Sucursal[]> {
    return this.sucursalRepository.createQueryBuilder('sucursal')
      .where('sucursal.name IN (:...names)', { names })
      .getMany();
  }
}
