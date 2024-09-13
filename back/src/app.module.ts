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
import { ReviewsModule } from './reviews/reviews.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { AdmindashModule } from './admindash/admindash.module';
import { MailService } from './mail/mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { jwtSecret } from './config/envs';

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
    AdmindashModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: jwtSecret,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
