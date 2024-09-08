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
import { config as dotenvConfig } from 'dotenv';
import { ReviewsModule } from './reviews/reviews.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { AdminDashModule } from './adminDash/adminDash.module';
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
    AuthModule,
    UsersModule,
    AppointmentsModule,
    ServicesModule,
    ReviewsModule,
    SucursalesModule,
    CloudinaryModule,
    MercadopagoModule,
    AdminDashModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
