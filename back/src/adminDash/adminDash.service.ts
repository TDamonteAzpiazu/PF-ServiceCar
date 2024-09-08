import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from '../sucursales/sucursales.entity';  
import { Appointment } from 'src/appointments/appointments.entity';

@Injectable()
export class AdminDashService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
    @InjectRepository(Appointment)
    private readonly reservaRepository: Repository<Appointment>,
  ) {}

  // Método para obtener la sucursal con más reservas
  async sucursalConMasReservas(): Promise<{ sucursalId: string, totalReservas: number }> {
    const sucursales = await this.sucursalRepository.find();
  
    const reservasPorSucursal = await Promise.all(
      sucursales.map(async (sucursal) => {
        const cantidadReservas = await this.reservaRepository.count({ where: { sucursal } });
        return { sucursalId: sucursal.id, cantidadReservas };
      }),
    );
  
    const sucursalConMasReservas = reservasPorSucursal.reduce((max, sucursalActual) => {
      return sucursalActual.cantidadReservas > max.cantidadReservas ? sucursalActual : max;
    }, { sucursalId: null, cantidadReservas: 0 });
  
    return {
      sucursalId: sucursalConMasReservas.sucursalId,
      totalReservas: sucursalConMasReservas.cantidadReservas
    };
  }
}