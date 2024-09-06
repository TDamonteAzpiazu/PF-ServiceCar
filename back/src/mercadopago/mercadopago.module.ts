import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
    imports: [AppointmentsModule],
    controllers: [MercadoPagoController],
    providers: [MercadoPagoService],
})
export class MercadopagoModule {}
