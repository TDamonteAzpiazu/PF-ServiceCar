import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './services.entity';
import { Status } from '../enum/status.enum';
import { predefinedServices } from '../helpers/services';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async onModuleInit() {
    if ((await this.servicesRepository.count()) === 0) {
      for (const service of predefinedServices) {
        await this.addService(service);
      }
    }
  }

  async getServices() {
    return this.servicesRepository.find();
  }

  async getServiceById(id: string) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`No se encontró el servicio con id '${id}'`);
    }

    return service;
  }

  async addService(serviceData: Partial<Omit<Service, 'id' | 'status'>>) {
    // Crea una nueva entidad de servicio con los datos proporcionados
    const service = this.servicesRepository.create({
      ...serviceData,
      status: Status.Active, // Asigna el estado como activo por defecto
    });

    await this.servicesRepository.save(service);
    return service.id;
  }

  async updateService(id: string, serviceData: Partial<Omit<Service, 'id' | 'status'>>) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`No se encontró el servicio con id '${id}'`);
    }
    if (service.status === Status.Inactive) {
      throw new BadRequestException(`El servicio con id '${id}' está inactivo`);
    }

    // Actualiza solo los campos proporcionados
    await this.servicesRepository.update(id, serviceData);
    return id;
  }

  async disableService(id: string) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`No se encontró el servicio con id '${id}'`);
    }

    // Marca el servicio como inactivo
    service.status = Status.Inactive;
    await this.servicesRepository.save(service);

    return id;
  }
}
