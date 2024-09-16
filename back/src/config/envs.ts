import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

export const auth0 = {
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  clientId: process.env.AUTH0_CLIENT_ID,
  baseUrl: process.env.AUTH0_BASE_URL,
};

export const db = {
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export const cloud = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const jwtSecret = process.env.JWT_SECRET;

export const email = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  from: process.env.EMAIL_FROM,
};

export const mercadopagoAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
