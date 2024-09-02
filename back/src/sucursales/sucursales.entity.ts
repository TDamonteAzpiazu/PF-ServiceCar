import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Service } from "../services/services.entity";
import { Status } from "../enum/status.enum";

@Entity({ name: 'sucursales' })
export class Sucursal {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    latitud: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    longitud: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    details: string;

    @ManyToMany(() => Service, (service) => service.sucursales)
    services: Service[]

    @Column({default: Status.Active})
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status
}