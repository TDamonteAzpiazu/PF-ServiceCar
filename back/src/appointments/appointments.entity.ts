import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Status } from "../enum/status.enum";
import { Service } from "../services/services.entity";
import { User } from "../users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({ name: 'appointments' })
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;

    @ManyToOne(() => Service)
    service: Service;

    @Column()
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @Column()
    @IsString()
    @IsNotEmpty()
    time: string;

    @Column({default: Status.Active})
    @IsEnum(Status)
    status: Status;
}