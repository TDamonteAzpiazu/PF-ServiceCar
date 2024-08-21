import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Role } from "src/auth/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    @IsString()
    @IsNotEmpty()
    date: string; //Revisar este formato según qué sea la fecha y como la querramos mandar

    @Column({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string; //va a ser la pass hasheada

    @Column()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    country: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    city: string;

    @Column({default: Role.User})
    @IsEnum(Role)
    role: Role;

    
}

//  password: hashedPassword,
//  phone,
//  country,
//  address,
//  city,