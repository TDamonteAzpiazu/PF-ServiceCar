import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { AppointmentsModule } from '../appointments/appointments.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    AppointmentsModule, 
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
