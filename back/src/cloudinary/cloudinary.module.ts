import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary";
import { ServicesService } from "../services/services.service";
import { Service } from "../services/services.entity";
import { AppointmentsService } from "../appointments/appointments.service";
import { Appointment } from "../appointments/appointments.entity";
import { Sucursal } from "../sucursales/sucursales.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Service, Appointment, Sucursal])],
    controllers: [CloudinaryController],
    providers: [CloudinaryConfig, UsersService, CloudinaryService, ServicesService],
})

export class CloudinaryModule {}