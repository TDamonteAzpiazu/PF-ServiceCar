import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { mercadopagoAccessToken } from './envs';

const client = new MercadoPagoConfig({
    accessToken: mercadopagoAccessToken,
});
const preference = new Preference(client);
const payment = new Payment(client);

export { preference, payment };