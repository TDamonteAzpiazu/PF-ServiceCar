import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/enum/status.enum';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async getServices() {
    return this.servicesRepository.find();
  }

  async getServiceById(id: string) {
    const service = await this.servicesRepository.findOneBy({ id });

    if (!service)
      throw new NotFoundException(`Couldn't find service with id '${id}'`);

    return service;
  }

  async addService(serviceData: Omit<Service, 'id' | 'status'>) {
    const service = this.servicesRepository.create(serviceData);

    await this.servicesRepository.save(service);
    return service.id;
  }

  async updateService(id: string, serviceData: Partial<Service>) {
    const service = await this.servicesRepository.findOneBy({ id });

    if (!service)
      throw new NotFoundException(`Couldn't find service with id '${id}'`);
    if (service.status === Status.Inactive)
      throw new BadRequestException(`Service with id '${id}' is inactive`);

    await this.servicesRepository.update(id, serviceData);
    return service.id;
  }

  async disableService(id: string) {
    const service = await this.servicesRepository.findOneBy({ id });

    if (!service)
      throw new NotFoundException(`Couldn't find service with id '${id}'`);

    service.status = Status.Inactive;
    await this.servicesRepository.save(service);

    return service.id;
  }
}
