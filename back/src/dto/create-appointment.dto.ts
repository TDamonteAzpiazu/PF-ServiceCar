import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Status } from '../enum/status.enum'; 

export class CreateAppointmentDto {
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @IsUUID()
  @IsNotEmpty()
  service: string;

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
