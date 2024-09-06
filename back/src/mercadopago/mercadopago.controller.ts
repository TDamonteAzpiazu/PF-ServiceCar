import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from '../appointments/appointments.service';

@ApiTags('mercadopago')
@Controller('mercadopago')
export class MercadoPagoController {
    constructor(
        private readonly mercadoPagoService: MercadoPagoService,
        private readonly appointmentsService: AppointmentsService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Crea una orden de compra en MercadoPago' })
    createOrder(@Body() body: any): Promise<any> {
        return this.mercadoPagoService.createPreference(body);
    }

    @Get('success')
    @ApiOperation({ summary: 'Redirecciona a MercadoPago para pagar' })
    async success(@Query('external_reference') idAppointment: string, @Res() res) {
        console.log('success');
        console.log("Primera funcion: ",idAppointment);
        await this.appointmentsService.updatePayment(idAppointment);
        res.redirect('http://localhost:3000/account/reservations');
    }

    @Get('failure')
    @ApiOperation({ summary: 'Redirige al usuario a la página de servicios en caso de fallo en el pago' })
    failure(@Res() res) {
        console.log('failure');
        res.redirect('http://localhost:3000/servicios');
    }
}