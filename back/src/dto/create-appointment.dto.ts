import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Status } from '../enum/status.enum'; 
import { Type } from 'class-transformer';
export class CreateAppointmentDto {
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  service: string[];
  
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;
}
