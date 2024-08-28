import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

    @Post()
    createOrder(@Body() body: any): Promise<any> {
        return this.mercadoPagoService.createPreference(body);
    }

}