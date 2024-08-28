import { Injectable } from '@nestjs/common';
import { preference } from '../config/mercadopago';

@Injectable()
export class MercadoPagoService {
    constructor() {}

    async createPreference(body: any) {
        const preferenceData = {
        items: body.items.map(item => ({
            id: item.id,
            service: item.service,
            price: item.price,
        })),
        back_urls: {
            success: "",
            failure: "",
        },
        auto_return: 'approved',
        };

        try {
            const response = await preference.create({body: preferenceData });
            return { preferenceId: response.id }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}