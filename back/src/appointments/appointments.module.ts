import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointments.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { User } from '../users/users.entity';
import { Service } from 'src/services/services.entity';
import { Sucursal } from '../sucursales/sucursales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Service, Sucursal])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService, TypeOrmModule], 
})
export class AppointmentsModule {}
