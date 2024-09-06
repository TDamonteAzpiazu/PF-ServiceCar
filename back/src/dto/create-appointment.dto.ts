import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Status } from '../enum/status.enum'; 
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAppointmentDto {
  
  @ApiProperty({
    description: 'id de usuario',
    example: 'id de usuario logueado',})
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    description: 'selecionar servicio',
    example: 'id de servicio',})
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  service: string[];
  
  @ApiProperty({
    description: 'selecionar fecha y hora',
    example: '2024-09-15',})
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Seleccionar hora',
    example: '14:30:00'})
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    description: 'sucursal',
    example: 'Cordoba',
  })
  @IsString()
  @IsNotEmpty()
  sucursal: string;
}
