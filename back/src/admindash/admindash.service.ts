import { Injectable, NotFoundException } from '@nestjs/common';
import { Sucursal } from '../sucursales/sucursales.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Appointment } from '../appointments/appointments.entity';
import { User } from '../users/users.entity';
import { Service } from '../services/services.entity';
import { Review } from 'src/reviews/reviews.entity';

@Injectable()
export class AdmindashService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalesRepository: Repository<Sucursal>,
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async getGananciaSucursales() {
    const sucursales = await this.sucursalesRepository.find();
    const year = new Date().getFullYear();

    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
      'Anual',
    ];

    const dataSucursales = [];
    const totalMensual = Array(12).fill(0);
    let totalAnual = 0;

    for (const sucursal of sucursales) {
      const gananciasMensuales = Array(12).fill(0);
      let totalSucursal = 0;

      const appointments = await this.appointmentsRepository.find({
        where: {
          sucursal: { id: sucursal.id },
          date: Between(new Date(`${year}-01-01`), new Date(`${year}-12-31`)),
        },
        relations: ['service'],
      });

      appointments.forEach((appointment) => {
        const month = new Date(appointment.date).getMonth();
        const ganancia = appointment.service.reduce(
          (acc, service) => acc + service.price,
          0,
        );

        gananciasMensuales[month] += ganancia;
        totalSucursal += ganancia;
        totalMensual[month] += ganancia;
      });

      gananciasMensuales.push(totalSucursal);
      totalAnual += totalSucursal;

      dataSucursales.push({
        label: sucursal.name,
        data: gananciasMensuales,
      });
    }

    totalMensual.push(totalAnual);

    return {
      labels,
      dataSucursales,
      total: totalMensual,
    };
  }

  async getNewUsers() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const endDate = new Date(currentDate.getFullYear(), 11, 31);

    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.registerDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    const usersPerMonth = new Array(12).fill(0);

    users.forEach((user) => {
      const month = user.registerDate.getMonth();
      usersPerMonth[month] += 1;
    });

    return {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      label: 'Nuevos usuarios',
      data: usersPerMonth,
    };
  }

  async getReviewsByService(idService: string) {
    const service = await this.servicesRepository.findOne({
      where: { id: idService },
      relations: ['reviews', 'reviews.user'],
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!service.reviews || service.reviews.length === 0) {
      throw new NotFoundException('No reviews found for this service.');
    }

    return service.reviews;
  }
}
