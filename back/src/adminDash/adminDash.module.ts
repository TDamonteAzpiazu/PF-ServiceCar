import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDashService } from './adminDash.service';
import { AdminDashController } from './adminDash.controller';
import { Sucursal } from '../sucursales/sucursales.entity';
import { Appointment } from '../appointments/appointments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal, Appointment])],
  providers: [AdminDashService],
  controllers: [AdminDashController],
})
export class AdminDashModule {}
