import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { Vehiculos } from '../enum/vehiculos.enum'; // Importa la enumeración Vehiculos

export class CreateServiceDto {
  @ApiProperty({
    description: 'Tipo de servicio, por ejemplo, "Cambio de Filtro de Aire".',
    example: 'Cambio de Filtro de Aire',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Descripción detallada del servicio.',
    example: 'Reemplazo del filtro de aire para un mejor rendimiento del motor.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Precio del servicio en dólares.',
    example: 25,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Nombres de las sucursales donde se ofrecerá el servicio.',
    example: ['Sucursal 1', 'Sucursal 2'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  sucursales: string[];

  @ApiProperty({
    description: 'Tipo de vehículo para el que se aplica el servicio.',
    example: 'Auto',
    enum: Vehiculos,
  })
  @IsEnum(Vehiculos)
  @IsNotEmpty()
  vehiculo: Vehiculos;
}


export class UpdateServiceDto extends PartialType(CreateServiceDto) {}