import {
  BadRequestException,
  Injectable,
  NotFoundException,
<<<<<<< HEAD
  OnModuleInit,
=======
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { Repository } from 'typeorm';
<<<<<<< HEAD
import { Status } from '../enum/status.enum'
import { predefinedServices } from '../helpers/services';

@Injectable()
export class ServicesService implements OnModuleInit {
=======
import { Status } from 'src/enum/status.enum';

@Injectable()
export class ServicesService {
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

<<<<<<< HEAD
  async onModuleInit() {
    if ((await this.getServices()).length === 0) {
      for (const service of predefinedServices) {
        await this.addService(service);
      }
    }
  }

=======
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
