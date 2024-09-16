import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from './sucursales.entity';
import { SucursalesController } from './sucursales.controller';
import { SucursalesService } from './sucursales.service';
import { Service } from 'src/services/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal, Service])],
  controllers: [SucursalesController],
  providers: [SucursalesService],
  exports: [SucursalesService],
})
export class SucursalesModule {}
