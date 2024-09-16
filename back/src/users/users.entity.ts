import { IsEmail, IsEnum, IsNotEmpty, IsString, IsOptional, IsStrongPassword, IsUUID, IsDate } from "class-validator";
import { Appointment } from "../appointments/appointments.entity";
import { Role } from "../auth/roles.enum";
import { Status } from "../enum/status.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Review } from "../reviews/reviews.entity";

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
    @IsOptional()
    password?: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    address?: string;

    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg' })
    @IsString()
    @IsNotEmpty()
    image: string;

    @Column({default: Role.User})
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments?: Appointment[];

    @Column({default: Status.Active})
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status; 

    @Column()
    @IsDate()
    @IsNotEmpty()
    registerDate: Date;

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}

