import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Appointment } from './appointments.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { User } from '../users/users.entity';
import { Service } from '../services/services.entity';
import { Status } from '../enum/status.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['user', 'service'] });
  }

  async findAllByUser(id: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: { user: { id } }, relations: ['user', 'service'] });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'service'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { user: userId, service: serviceIds, date, time } = createAppointmentDto;

    // Verificar existencia de User
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Validar que al menos haya un servicio
    if (!serviceIds || serviceIds.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos un servicio');
    }

    // Validación de servicios duplicados
    const uniqueServiceIds = [...new Set(serviceIds)];
    if (uniqueServiceIds.length !== serviceIds.length) {
      throw new BadRequestException('No puedes agregar el mismo servicio más de una vez');
    }

    // Verificar existencia de Services
    const services = await this.serviceRepository.findBy({ id: In(serviceIds) });
    const foundServiceIds = services.map(service => service.id);

    // Verificar si todos los servicios fueron encontrados
    const notFoundIds = serviceIds.filter(id => !foundServiceIds.includes(id));
    if (notFoundIds.length > 0) {
      throw new NotFoundException(`Los siguientes servicios no fueron encontrados: ${notFoundIds.join(', ')}`);
    }

    // Validación no más de dos servicios por cita
    if (serviceIds.length > 2) {
      throw new BadRequestException('Solo puedes agregar hasta 2 servicios por cita');
    }

    // Crear nueva cita sin validación de fecha y hora
    const appointment = this.appointmentRepository.create({
      user,
      service: services,
      date,
      time,
    });

    try {
      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create appointment');
    }
  }

  async update(id: string, updateAppointmentDto: Partial<CreateAppointmentDto>): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'service'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    // Asignar User si se proporciona el ID del usuario
    if (updateAppointmentDto.user) {
      const user = await this.userRepository.findOne({ where: { id: updateAppointmentDto.user } });
      if (!user) {
        throw new NotFoundException(`User with ID ${updateAppointmentDto.user} not found`);
      }
      appointment.user = user;
    }

    // Asignar Services si se proporcionan los IDs de los servicios
    if (updateAppointmentDto.service && updateAppointmentDto.service.length > 0) {
      if (updateAppointmentDto.service.length > 2) {
        throw new BadRequestException('Solo puedes agregar hasta 2 servicios por cita');
      }

      // Buscar todos los servicios por sus IDs
      const services = await this.serviceRepository.findBy({ id: In(updateAppointmentDto.service) });
      // Verificar si todos los servicios fueron encontrados
      if (services.length !== updateAppointmentDto.service.length) {
        throw new NotFoundException('One or more services not found');
      }
      appointment.service = services;
    }

    // Asignar otros campos sin validación de fecha y hora
    if (updateAppointmentDto.date) {
      appointment.date = updateAppointmentDto.date;
    }
    if (updateAppointmentDto.time) {
      appointment.time = updateAppointmentDto.time;
    }

    try {
      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update appointment');
    }
  }

  async remove(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    try {
      appointment.status = Status.Inactive;
      await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete appointment');
    }
  }
}
