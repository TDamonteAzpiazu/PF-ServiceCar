import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { AppointmentsModule } from '../appointments/appointments.module';
import { SucursalesModule } from '../sucursales/sucursales.module';
import { Appointment } from '../appointments/appointments.entity';
import { Sucursal } from '../sucursales/sucursales.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Service, Appointment, Sucursal]),
    AppointmentsModule,
    SucursalesModule
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
