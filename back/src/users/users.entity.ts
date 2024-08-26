import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";
<<<<<<< HEAD
import { Appointment } from "../appointments/appointments.entity"
import { Role } from "../auth/roles.enum"
import { Status } from "../enum/status.enum";
=======
import { Appointment } from "src/appointments/appointments.entity";
import { Role } from "src/auth/roles.enum";
import { Status } from "src/enum/status.enum";
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();

    @Column({length : 50})
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg' }) 
    @IsString()
    @IsNotEmpty()
    image: string;

    @Column({default: Role.User})
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @Column({default: Status.Active})
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status; 
}
