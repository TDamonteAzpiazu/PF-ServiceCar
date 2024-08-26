import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

// Cargar variables de entorno
dotenvConfig({ path: '.env.development' });

// Verificar las variables de entorno
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Configuración de TypeORM
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  // dropSchema: true,
  logging: ['error'],
  entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
  migrations: [join(__dirname, '/../migrations/*.{js,ts}')],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
