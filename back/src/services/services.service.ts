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
import { Appointment } from '../appointments/appointments.entity';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  async onModuleInit() {
    if ((await this.getServices()).length === 0) {
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

    if (!service)
      throw new NotFoundException(`Couldn't find service with id '${id}'`);

    return service;
  }

  async addService(serviceData: Partial<Omit<Service, 'id' | 'status'>>) {
    const service = this.servicesRepository.create({
      ...serviceData,
      status: Status.Active,
    });

    await this.servicesRepository.save(service);
    return service.id;
  }

  async updateService(id: string, serviceData: Partial<Omit<Service, 'id' | 'status'>>) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service)
      throw new NotFoundException(`Couldn't find service with id '${id}'`);
    if (service.status === Status.Inactive)
      throw new BadRequestException(`Service with id '${id}' is inactive`);

    await this.servicesRepository.update(id, serviceData);
    return id;
  }

  async disableService(id: string) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service)
      throw new NotFoundException(`Couldn't find service with id '${id}'`);

    service.status = Status.Inactive;
    await this.servicesRepository.save(service);

    return service.id;
  }

  async getActiveReservationsForService(
    serviceId: string,
  ): Promise<{ reservations: { id: string; userId: string }[]; total: number }> {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException(`Couldn't find service with id '${serviceId}'`);
    }

    // Obtener todas las citas activas asociadas al servicio
    const appointments = await this.appointmentsRepository.find({
      where: {
        service: { id: serviceId },
        status: Status.Active,
      },
      select: ['id', 'user'], // Seleccionamos el ID y el ID de usuario
      relations: ['user'], 
    });

    // Extraer los IDs de las citas y los IDs de usuario
    const reservations = appointments.map(app => ({
      id: app.id,
      userId: app.user.id,
    }));

    // Total de reservas
    const total = reservations.length;

    return { reservations, total };
  }
}
