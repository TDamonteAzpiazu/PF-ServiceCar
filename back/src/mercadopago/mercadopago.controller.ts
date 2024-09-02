import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('mercadopago')
@Controller('mercadopago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

    @Post()
    @ApiOperation({ summary: 'Crea una orden de compra en MercadoPago' })
    createOrder(@Body() body: any): Promise<any> {
        return this.mercadoPagoService.createPreference(body);
    }

    @Get('success')
    @ApiOperation({ summary: 'Redirecciona a MercadoPago para pagar' })
    success(@Res() res) {
        console.log('success');
        res.redirect('http://localhost:3000/');
    }

    @Get('failure')
    @ApiOperation({ summary: 'Redirige al usuario a la página de servicios en caso de fallo en el pago' })
    failure(@Res() res) {
        console.log('failure');
        res.redirect('http://localhost:3000/servicios');
    }
}