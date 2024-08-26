import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enum/status.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @Column()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  image: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @Column({ default: Status.Active })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
