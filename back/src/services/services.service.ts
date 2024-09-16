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
import { CreateServiceDto, UpdateServiceDto } from 'src/dto/create-service.dto';
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
    // return this.servicesRepository.find({relations: ['sucursales']});
    const services = await this.servicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.sucursales', 'sucursal')
      .getMany();
    
    // Transformar el resultado para solo incluir los nombres de las sucursales
    return services.map(service => ({
      ...service,
      sucursales: service.sucursales.map(sucursal => sucursal.name)
    }));
  }

  async getServiceById(id: string) {
    const service = await this.servicesRepository.createQueryBuilder('service')
      .leftJoinAndSelect('service.sucursales', 'sucursal')
      .where('service.id = :id', { id })
      .getOne();

    if (!service) {
      throw new NotFoundException(`Couldn't find service with id '${id}'`);
    }

    return {
      ...service,
      sucursales: service.sucursales.map(sucursal => sucursal.name)
    };
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

  async updateService(id: string, updateData: UpdateServiceDto): Promise<Service> {
    const { sucursales, ...rest } = updateData;

    // Buscar el servicio a actualizar
    const service = await this.servicesRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Si se proporcionan nombres de sucursales, convertirlos en entidades
    if (sucursales && sucursales.length > 0) {
      const sucursalesEntities = await this.findSucursalesByNames(sucursales);
      if (sucursalesEntities.length !== sucursales.length) {
        throw new BadRequestException('Some of the provided branch names are invalid');
      }
      service.sucursales = sucursalesEntities;
    }

    // Actualizar solo los campos proporcionados
    Object.assign(service, rest);

    return await this.servicesRepository.save(service);
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

    if(service.status === Status.Inactive){
      service.status = Status.Active;
    } else {
      service.status = Status.Inactive;
    }

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

  async updateImage(id: string, url: string) {
    const serviceFound = await this.servicesRepository.findOne({ where : { id: id }});
    if(!serviceFound) {
        throw new NotFoundException('Service not found');
    }
    serviceFound.image = url;
    return await this.servicesRepository.save(serviceFound);
}

//agragar un servicio a una sucursal 
async addServiceToSucursal(serviceId: string, sucursalId: string): Promise<Sucursal> {
  const sucursal = await this.sucursalRepository.findOne({
    where: { id: sucursalId },
    relations: ['services'],
  });

  if (!sucursal) {
    throw new NotFoundException('Sucursal no encontrada');
  }

  const service = await this.servicesRepository.findOne({
    where: { id: serviceId },
  });

  if (!service) {
    throw new NotFoundException('Service no encontrado');
  }

  // Agregar el servicio a la sucursal
  sucursal.services.push(service);
  
  return await this.sucursalRepository.save(sucursal);
}
}
