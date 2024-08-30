import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

    @Post()
    createOrder(@Body() body: any): Promise<any> {
        return this.mercadoPagoService.createPreference(body);
    }

    @Get('success')
    success(@Res() res) {
        console.log('success');
        res.redirect('http://localhost:3000/');
    }

    @Get('failure')
    failure(@Res() res) {
        console.log('failure');
        res.redirect('http://localhost:3000/servicios');
    }
}