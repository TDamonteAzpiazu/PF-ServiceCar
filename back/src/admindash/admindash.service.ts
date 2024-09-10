import { Injectable } from "@nestjs/common";
import { Sucursal } from "../sucursales/sucursales.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Appointment } from "../appointments/appointments.entity";
import { User } from "../users/users.entity";
import { Service } from "../services/services.entity";

@Injectable()
export class AdmindashService {
    constructor(
        @InjectRepository(Sucursal) private readonly sucursalesRepository: Repository<Sucursal>,
        @InjectRepository(Appointment) private readonly appointmentsRepository: Repository<Appointment>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Service) private readonly servicesRepository: Repository<Service>,
    ) {}

    async getGananciaSucursales() {
        const sucursales = await this.sucursalesRepository.find();
        const year = new Date().getFullYear();
        
        // Inicializar el array de labels para los meses
        const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Anual'];
        
        // Inicializar arrays para almacenar datos
        const dataSucursales = [];
        const totalMensual = Array(12).fill(0); // Total mensual por todas las sucursales
        let totalAnual = 0; // Total acumulado anual de todas las sucursales
    
        for (const sucursal of sucursales) {
            const gananciasMensuales = Array(12).fill(0);
            let totalSucursal = 0;
    
            // Buscar las citas (appointments) de la sucursal en el año actual
            const appointments = await this.appointmentsRepository.find({
                where: {
                    sucursal: { id: sucursal.id },
                    date: Between(
                        new Date(`${year}-01-01`),
                        new Date(`${year}-12-31`)
                    )  // Filtrar por año actual
                },
                relations: ['service']
            });
    
            // Sumar ganancias por mes
            appointments.forEach(appointment => {
                const month = new Date(appointment.date).getMonth(); // Obtener el mes de la cita (0: Enero, 11: Diciembre)
                const ganancia = appointment.service.reduce((acc, service) => acc + service.price, 0); // Sumar los precios de los servicios
    
                // Sumar ganancias mensuales
                gananciasMensuales[month] += ganancia;
                totalSucursal += ganancia; // Sumar el total de la sucursal
                totalMensual[month] += ganancia; // Sumar al total mensual general
            });
    
            // Añadir el total anual al array de la sucursal
            gananciasMensuales.push(totalSucursal);
            totalAnual += totalSucursal; // Sumar el total de la sucursal al total anual general
    
            // Añadir datos de la sucursal al resultado final
            dataSucursales.push({
                label: sucursal.name,
                data: gananciasMensuales
            });
        }
    
        // Añadir el total anual al array del total mensual
        totalMensual.push(totalAnual);
    
        return {
            labels,
            dataSucursales,
            total: totalMensual
        };
    }
}