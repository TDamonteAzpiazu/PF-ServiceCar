import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra User como una entidad de TypeORM disponible en AuthModule
  ],
  providers: [AuthService], // Registra AuthService como el proveedor principal del módulo
  controllers: [AuthController], // Registra AuthController como el controlador del módulo
})
export class AuthModule {}

