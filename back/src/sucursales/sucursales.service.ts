import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from './sucursales.entity';
import { CreateSucursalDto, UpdateSucursalDto } from '../dto/sucursales.dto'
import { Status } from '../enum/status.enum';
import { Service } from 'src/services/services.entity';

@Injectable()
export class SucursalesService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalRepository.find();
  }

  async findById(id: string): Promise<Sucursal | undefined> {
    return await this.sucursalRepository.findOne({ where: { id } });
  }

  async create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const services = [];

    for await (const serviceType of createSucursalDto.services) {
      const service = await this.servicesRepository.findOneBy({
        type: serviceType,
      });

      if (!service) {
        throw new BadRequestException('Servicio no encontrado');
      }

      services.push(service);
    }

    const sucursal = this.sucursalRepository.create({
      ...createSucursalDto,
      services,
      status: Status.Active,
    });
    return await this.sucursalRepository.save(sucursal);
  }

  async update(id: string, updateSucursalDto: UpdateSucursalDto): Promise<Sucursal> {
    const sucursal = await this.findById(id);
    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    if (updateSucursalDto.services) {
      const services = [];

      for await (const serviceType of updateSucursalDto.services) {
        const service = await this.servicesRepository.findOneBy({
          type: serviceType,
        });

        if (!service) {
          throw new BadRequestException('Servicio no encontrado');
        }

        services.push(service);
      }

      sucursal.services = services;
    }

    Object.assign(sucursal, updateSucursalDto);
    return await this.sucursalRepository.save(sucursal);
  }

  async softDelete(id: string): Promise<void> {
    const sucursal = await this.findById(id);
    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }
    if(sucursal.status === Status.Inactive) {
      sucursal.status = Status.Active;
    } else {
      sucursal.status = Status.Inactive;
    }
    await this.sucursalRepository.save(sucursal);
  }

  async findByNames(names: string[]): Promise<Sucursal[]> {
    return this.sucursalRepository.createQueryBuilder('sucursal')
      .where('sucursal.name IN (:...names)', { names })
      .getMany();
  }
}
