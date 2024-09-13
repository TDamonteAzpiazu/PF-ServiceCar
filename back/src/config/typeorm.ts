import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { registerAs } from '@nestjs/config';
import { db } from './envs';

// Configuración de TypeORM
const config: DataSourceOptions = {
  type: 'postgres',
  host: db.host,
  port: parseInt(db.port, 10),
  username: db.username,
  password: db.password,
  database: db.name,
  synchronize: true,
  // dropSchema: true,
  logging: ['error'],
  entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
  migrations: [join(__dirname, '/../migrations/*.{js,ts}')],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
