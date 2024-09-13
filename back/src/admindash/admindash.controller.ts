import { Body, Controller, Get } from "@nestjs/common";
import { AdmindashService } from "./admindash.service";

@Controller('admindash')
export class AdmindashController {
    constructor(private readonly admindashService: AdmindashService) {}

    // Ganancias anuales por mes por sucursal
    @Get('gananciasSucursales')
    async getGananciaSucursales() {
        return await this.admindashService.getGananciaSucursales();
    }

    // Cantidad de turnos por mes por sucursal 

    // Cantidad de turnos por servicio por mes (configurado para que sea 0 no se vea en el grafico)

    // Usuarios registrados por mes (agregar date: new Date() a la entidad user)
    @Get('newUsers')
    async getNewUsers() {
        return await this.admindashService.getNewUsers();
    }
}