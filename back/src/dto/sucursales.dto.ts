import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateSucursalDto {
  @ApiProperty({
    description: 'Nombre de la sucursal',
    example: 'Sucursal Central',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Dirección de la sucursal',
    example: 'Calle Principal 123, Ciudad',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Latitud de la sucursal',
    example: '-34.6037',
  })
  @IsString()
  @IsNotEmpty()
  latitud: string;

  @ApiProperty({
    description: 'Longitud de la sucursal',
    example: '-58.3816',
  })
  @IsString()
  @IsNotEmpty()
  longitud: string;

  @ApiProperty({
    description: 'Detalles adicionales de la sucursal',
    example: 'Edificio rojo, tercer piso',
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({
    description: 'Tipos de servicios que ofrece la sucursal',
    example: ['Alineación y Balanceo - Auto', 'Cambio de Bujías - Camion'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  services: string[];
}

export class UpdateSucursalDto {
  @ApiProperty({
    description: 'Nombre de la sucursal',
    example: 'Sucursal Central',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Dirección de la sucursal',
    example: 'Calle Principal 123, Ciudad',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Latitud de la sucursal',
    example: '-34.6037',
  })
  @IsString()
  @IsOptional()
  latitud?: string;

  @ApiProperty({
    description: 'Longitud de la sucursal',
    example: '-58.3816',
  })
  @IsString()
  @IsOptional()
  longitud?: string;

  @ApiProperty({
    description: 'Detalles adicionales de la sucursal',
    example: 'Edificio rojo, tercer piso',
  })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty({
    description: 'Tipos de servicios que ofrece la sucursal',
    example: ['Alineación y Balanceo - Auto', 'Cambio de Bujías - Camion'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  services?: string[];
}
