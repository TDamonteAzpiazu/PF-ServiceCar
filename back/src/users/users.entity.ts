import { IsEmail, IsEnum, IsNotEmpty, IsString, IsOptional, IsStrongPassword, IsUUID } from "class-validator";
import { Appointment } from "../appointments/appointments.entity";
import { Role } from "../auth/roles.enum";
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
    @IsOptional()
    name?: string;

    @Column({ unique: true, nullable: true })
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @Column({ nullable: true })
    @IsStrongPassword()
    @IsOptional()
    password?: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    address?: string;

    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg', nullable: true })
    @IsString()
    @IsOptional()
    image?: string;

    @Column({ default: Role.User, nullable: true })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments?: Appointment[];

    @Column({ default: Status.Active, nullable: true })
    @IsEnum(Status)
    @IsOptional()
    status?: Status;
}
