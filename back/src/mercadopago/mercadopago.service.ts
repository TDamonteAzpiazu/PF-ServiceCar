import { Injectable } from '@nestjs/common';
import { preference } from '../config/mercadopago';

@Injectable()
export class MercadoPagoService {
    constructor() {}

    async createPreference(body: any) {
        const preferenceData = {
        items: body.items.map(item => ({
            id: item.id,
            title: item.service,
            quantity: 1,
            unit_price: item.price,
        })),
        back_urls: {
            success: "https://garagejs.onrender.com/mercadopago/success",
            failure: "https://garagejs.onrender.com/mercadopago/failure",
        },
        auto_return: 'approved',
        external_reference: body.idAppointment,
        };

        try {
            const response = await preference.create({body: preferenceData });
            return { preferenceId: response.id }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}