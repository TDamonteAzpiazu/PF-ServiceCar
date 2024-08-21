import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Appointment } from "src/appointments/appointments.entity";
import { Role } from "src/auth/roles.enum";
import { Status } from "src/enum/status.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @Column({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Column() // agregar el default con un link a cloudinary de sin imagen
    @IsString()
    @IsNotEmpty()
    image: string;

    @Column({default: Role.User})
    @IsEnum(Role)
    role: Role;

    @OneToMany(() => Appointment, (appointments) => appointments.user)
    appointments: Appointment[]

    @Column({default: Status.Active})
    @IsEnum(Status)
    status: Status;
}
