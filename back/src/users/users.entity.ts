import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";
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
