import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { Status } from "src/enum/status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({name: 'services'})
export class Service {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();

    @Column()
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

    @Column({default: Status.Active})
    @IsEnum(Status)
    status: Status;
}