import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Service } from './services.entity';
import { Status } from '../enum/status.enum';
import { predefinedServices } from '../helpers/services';
import { Appointment } from '../appointments/appointments.entity';
import { CreateServiceDto } from 'src/dto/create-service.dto';
import { Sucursal } from '../sucursales/sucursales.entity';
import { predefinedSucursales } from '../helpers/sucursales';

@Injectable()
export class ServicesService implements OnModuleInit {
  create(CreateServiceDto: CreateServiceDto): Service | PromiseLike<Service> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async onModuleInit() {
    const existingSucursales = await this.sucursalRepository.find();
    if (existingSucursales.length === 0) {
      for (const sucursalData of predefinedSucursales) {
        await this.sucursalRepository.save(sucursalData);
      }
    }

    const sucursales = await this.sucursalRepository.find();
    const sucursalesMap = new Map(sucursales.map(s => [s.name, s]));

    const existingServices = await this.servicesRepository.find();
    if (existingServices.length === 0) {
      for (const serviceData of predefinedServices) {
        const sucursalesParaServicio = serviceData.sucursales.map(sucursalName => sucursalesMap.get(sucursalName));
        const serviceToSave = {
          ...serviceData,
          sucursales: sucursalesParaServicio,
        };
        await this.servicesRepository.save(serviceToSave);
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

  async addService(serviceData: CreateServiceDto): Promise<string> {
    const { sucursales, ...serviceDetails } = serviceData;

    // Buscar las sucursales en la base de datos
    const sucursalEntities = await this.sucursalRepository.find({
      where: { name: In(sucursales) },
    });

    if (sucursalEntities.length !== sucursales.length) {
      throw new NotFoundException('Una o más sucursales no fueron encontradas');
    }

    // Crear el servicio con las sucursales relacionadas
    const service = this.servicesRepository.create({
      ...serviceDetails,
      sucursales: sucursalEntities,
      status: Status.Active,
    });

    await this.servicesRepository.save(service);
    return service.id;
  }

  async updateService(id: string, serviceData: Partial<Omit<Service, 'id' | 'status'>>) {
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Couldn't find service with id '${id}'`);
    }
    
    if (service.status === Status.Inactive) {
      throw new BadRequestException(`Service with id '${id}' is inactive`);
    }

    // Update service with provided data
    await this.servicesRepository.update(id, serviceData);
    return id;
  }

  async findSucursalesByNames(names: string[]): Promise<Sucursal[]> {
    return this.sucursalRepository.createQueryBuilder('sucursal')
      .where('sucursal.name IN (:...names)', { names })
      .getMany();
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
