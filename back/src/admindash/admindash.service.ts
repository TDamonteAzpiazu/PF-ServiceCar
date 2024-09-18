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

    const data = [];
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

      data.push({
        label: sucursal.name,
        data: gananciasMensuales,
      });
    }

    totalMensual.push(totalAnual);

    return {
      labels,
      data,
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

  async getAppointmentsBySucursal() {
    // Obtenemos todas las sucursales desde el repositorio
    const sucursales = await this.sucursalesRepository.find();

    // Obtenemos el año actual
    const year = new Date().getFullYear();

    // Definimos las etiquetas que serán los meses del año más un valor "Anual" para el total anual
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

    // Arreglos para almacenar los datos de turnos por sucursal y los totales mensuales y anuales
    const dataSucursales = [];
    const totalMensual = Array(12).fill(0); // Inicializamos el total mensual en 0 para cada mes
    let totalAnual = 0; // Variable para el total anual de turnos

    // Iteramos por cada sucursal
    for (const sucursal of sucursales) {
      const turnosMensuales = Array(12).fill(0); // Inicializamos el conteo de turnos por mes para la sucursal actual
      let totalSucursal = 0; // Variable para el total de turnos de la sucursal actual

      // Obtenemos los turnos (appointments) de la sucursal dentro del año actual
      const appointments = await this.appointmentsRepository.find({
        where: {
          sucursal: { id: sucursal.id },
          date: Between(
            new Date(`${year}-01-01`), // Fecha inicio del año
            new Date(`${year}-12-31`), // Fecha fin del año
          ),
        },
      });

      // Iteramos sobre cada turno de la sucursal
      appointments.forEach((appointment) => {
        const month = new Date(appointment.date).getMonth(); // Obtenemos el mes del turno (0 para Enero, 11 para Diciembre)

        // Incrementamos el conteo de turnos para el mes correspondiente
        turnosMensuales[month] += 1;
        totalSucursal += 1; // Sumamos al total de la sucursal
        totalMensual[month] += 1; // Sumamos al total mensual general
      });

      // Agregamos el total anual de la sucursal al arreglo de turnos mensuales
      turnosMensuales.push(totalSucursal);
      totalAnual += totalSucursal; // Sumamos el total de la sucursal al total anual

      // Añadimos los datos de la sucursal actual al arreglo de `dataSucursales`
      dataSucursales.push({
        label: sucursal.name, // Nombre de la sucursal
        data: turnosMensuales, // Array con los turnos mensuales y el total de la sucursal
      });
    }

    // Al final, agregamos el total anual a los datos mensuales
    totalMensual.push(totalAnual);

    // Devolvemos el formato esperado con labels, datos de sucursales, y los totales
    return {
      labels,
      data: dataSucursales,
    };
  }

  async getAppointmentsByService() {
    // Obtenemos todos los servicios y la fecha actual
    const servicios = await this.servicesRepository.find();
    const currentDate = new Date();

    // Obtenemos el mes y el año actual
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Definimos las etiquetas para el mes anterior, el actual y el siguiente
    const labels = [
      new Date(currentYear, currentMonth - 1).toLocaleString('es-ES', {
        month: 'long',
      }),
      new Date(currentYear, currentMonth).toLocaleString('es-ES', {
        month: 'long',
      }),
      new Date(currentYear, currentMonth + 1).toLocaleString('es-ES', {
        month: 'long',
      }),
    ];

    // Inicializamos la estructura para almacenar la cantidad de turnos por servicio
    const dataServicios = [];

    // Iteramos sobre cada servicio
    for (const servicio of servicios) {
      const turnosMensuales = Array(3).fill(0); // Array para el mes anterior, actual y siguiente

      // Obtenemos los turnos relacionados con el servicio actual dentro del rango de fechas
      const appointments = await this.appointmentsRepository.find({
        where: {
          service: { id: servicio.id },
          date: Between(
            new Date(currentYear, currentMonth - 1, 1), // Inicio del mes anterior
            new Date(currentYear, currentMonth + 2, 0), // Fin del mes siguiente
          ),
        },
      });

      // Iteramos sobre los turnos obtenidos para calcular la cantidad por mes
      appointments.forEach((appointment) => {
        const appointmentMonth = new Date(appointment.date).getMonth();

        // Calculamos el índice correcto basado en el mes (mes anterior, actual y siguiente)
        const monthDifference = appointmentMonth - (currentMonth - 1);
        if (monthDifference >= 0 && monthDifference < 3) {
          turnosMensuales[monthDifference] += 1; // Ajustamos el índice para los tres meses
        }
      });

      // Añadimos los datos del servicio actual al arreglo de `dataServicios`
      dataServicios.push({
        label: servicio.type, // Nombre del servicio
        data: turnosMensuales, // Cantidad de turnos por mes
      });
    }

    // Devolvemos el formato esperado con las etiquetas de los meses y los datos por servicio
    return {
      labels,
      data: dataServicios,
    };
  }
}

