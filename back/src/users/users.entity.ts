import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";
import { Appointment } from "../appointments/appointments.entity"
import { Role } from "../auth/roles.enum"
import { Status } from "../enum/status.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();

    @Column({ length: 50, nullable: true })
    @IsString()
    name: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ nullable: true })
    @IsStrongPassword()
    password: string;
    
    @Column({ nullable: true })
    @IsString()
    address: string;

    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg' }) 
    @IsString()
    image: string;

    @Column({ default: Role.User })
    @IsEnum(Role)
    role: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @Column({ default: Status.Active })
    @IsEnum(Status)
    status: Status; 
}
