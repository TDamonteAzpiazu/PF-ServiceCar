import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

// Cargar las variables de entorno desde el archivo .env.development
dotenvConfig({ path: '.env.development' });

// Configuración de TypeORM para Local
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_LOCAL,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
