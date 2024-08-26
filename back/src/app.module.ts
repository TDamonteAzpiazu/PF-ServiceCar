import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from './services/services.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

import dbConfig from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
<<<<<<< HEAD
    AuthModule,
    UsersModule,
    AppointmentsModule,
    ServicesModule,
=======
    AuthModule, 
    UsersModule, 
    ServicesModule,
    CloudinaryModule,
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}