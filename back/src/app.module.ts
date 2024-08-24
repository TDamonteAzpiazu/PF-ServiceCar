import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'; 
import { UsersModule } from './users/users.module'; 
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from './services/services.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

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
    ServicesModule,
    CloudinaryModule,
    JwtModule.register({
      global:true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET || 'defaultSecret', 
       
    }),
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
