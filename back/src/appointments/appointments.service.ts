import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Appointment } from './appointments.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { User } from '../users/users.entity';
import { Service } from '../services/services.entity';
import { Status } from '../enum/status.enum';
import { Pago } from '../enum/pago.enum';
import { Sucursal } from '../sucursales/sucursales.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['user', 'service'] });
  }

  async findAllByUser(id: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { user: { id } },
      relations: ['user', 'service', 'sucursal'],
    });
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

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const {
      user: userId,
      service: serviceIds,
      date,
      time,
      sucursal,
    } = createAppointmentDto;

    // Verificar existencia de User
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verificar cantidad de turnos activos del usuario
    const activeAppointmentsCount = await this.appointmentRepository.count({
      where: {
        user: { id: userId },
        status: Status.Active,
      },
    });

    if (activeAppointmentsCount >= 4) {
      throw new BadRequestException('No puedes tener más de 4 turnos activos');
    }

    const idSucursal = await this.sucursalRepository.findOne({
      where: { name: sucursal },
    });

    if (!idSucursal) {
      throw new NotFoundException(`Sucursal with name: ${sucursal} not found`);
    }

    // Validar que al menos haya un servicio
    if (!serviceIds || serviceIds.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos un servicio');
    }

    // Validación de servicios duplicados
    const uniqueServiceIds = [...new Set(serviceIds)];
    if (uniqueServiceIds.length !== serviceIds.length) {
      throw new BadRequestException(
        'No puedes agregar el mismo servicio más de una vez',
      );
    }

    // Verificar existencia de Services
    const services = await this.serviceRepository.findBy({
      id: In(serviceIds),
    });
    const foundServiceIds = services.map((service) => service.id);

    // Verificar si todos los servicios fueron encontrados
    const notFoundIds = serviceIds.filter(
      (id) => !foundServiceIds.includes(id),
    );
    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `Los siguientes servicios no fueron encontrados: ${notFoundIds.join(', ')}`,
      );
    }

    // Validación de no más de dos servicios por cita
    if (serviceIds.length > 2) {
      throw new BadRequestException(
        'Solo puedes agregar hasta 2 servicios por cita',
      );
    }

    // Crear nueva cita
    const appointment = this.appointmentRepository.create({
      user,
      service: services,
      date,
      time,
      sucursal: idSucursal,
    });

    try {
      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create appointment');
    }
  }

  async update(
    id: string,
    updateAppointmentDto: Partial<CreateAppointmentDto>,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'service'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const userId = updateAppointmentDto.user || appointment.user.id;

    // Verificar cantidad de turnos activos del usuario
    const activeAppointmentsCount = await this.appointmentRepository.count({
      where: {
        user: { id: userId },
        status: Status.Active,
        id: Not(id), // Excluir el turno actual en caso de que se esté actualizando
      },
    });

    if (activeAppointmentsCount >= 4) {
      throw new BadRequestException(
        'El usuario ya tiene 4 turnos activos, no se pueden agregar más',
      );
    }

    // Asignar User si se proporciona el ID del usuario
    if (updateAppointmentDto.user) {
      const user = await this.userRepository.findOne({
        where: { id: updateAppointmentDto.user },
      });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateAppointmentDto.user} not found`,
        );
      }
      appointment.user = user;
    }

    // Asignar Services si se proporcionan los IDs de los servicios
    if (
      updateAppointmentDto.service &&
      updateAppointmentDto.service.length > 0
    ) {
      if (updateAppointmentDto.service.length > 2) {
        throw new BadRequestException(
          'Solo puedes agregar hasta 2 servicios por cita',
        );
      }

      // Buscar todos los servicios por sus IDs
      const services = await this.serviceRepository.findBy({
        id: In(updateAppointmentDto.service),
      });
      // Verificar si todos los servicios fueron encontrados
      if (services.length !== updateAppointmentDto.service.length) {
        throw new NotFoundException(
          'Uno o más servicios no fueron encontrados',
        );
      }
      appointment.service = services;
    }

    // Asignar Sucursal
    if (updateAppointmentDto.sucursal) {
      const sucursal = await this.sucursalRepository.findOne({
        where: { name: updateAppointmentDto.sucursal },
      });
      if (!sucursal) {
        throw new NotFoundException(
          `Sucursal with name: ${updateAppointmentDto.sucursal} not found`,
        );
      }
      appointment.sucursal = sucursal;
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
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    try {
      if (appointment.status === Status.Active) {
        appointment.status = Status.Inactive;
      } else {
        appointment.status = Status.Active;
      }
      await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete appointment');
    }
  }

  async updatePayment(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    try {
      appointment.pago = Pago.Realizado;
      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update payment');
    }
  }
}
