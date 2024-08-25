import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { user: userId, service: serviceId, date, time } = createAppointmentDto;

    // Verificar existencia de User
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verificar existencia de Service
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    // Crear nueva cita
    const appointment = this.appointmentRepository.create({
      user,
      service,
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

    // Asignar Service si se proporciona el ID del servicio
    if (updateAppointmentDto.service) {
      const service = await this.serviceRepository.findOne({ where: { id: updateAppointmentDto.service } });
      if (!service) {
        throw new NotFoundException(`Service with ID ${updateAppointmentDto.service} not found`);
      }
      appointment.service = service;
    }

    // Asignar otros campos
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
