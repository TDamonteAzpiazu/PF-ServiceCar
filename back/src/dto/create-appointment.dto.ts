import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Status } from '../enum/status.enum'; 
import { Type } from 'class-transformer';
export class CreateAppointmentDto {
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @IsUUID()
  @IsNotEmpty()
  service: string;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
