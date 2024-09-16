import { Module } from "@nestjs/common";
import { AdmindashController } from "./admindash.controller";
import { AdmindashService } from "./admindash.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sucursal } from "../sucursales/sucursales.entity";
import { Appointment } from "../appointments/appointments.entity";
import { User } from "../users/users.entity";
import { Service } from "../services/services.entity";
import { Review } from "src/reviews/reviews.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Sucursal, Appointment, User, Service,Review])],
    controllers: [AdmindashController],
    providers: [AdmindashService],
})

export class AdmindashModule {}