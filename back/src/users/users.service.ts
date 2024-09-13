import { Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import * as bcrypt from 'bcryptjs';
import { Status } from "../enum/status.enum";
import { Role } from "../auth/roles.enum";

@Injectable()
export class UsersService implements OnModuleInit{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async onModuleInit() {
        const user = await this.userRepository.findOne({ where : { email: 'admin@example.com' }});
        if(!user) {
            const date = new Date();
            const newUser = this.userRepository.create({
                name: 'Admin',
                email: 'admin@example.com',
                password: await bcrypt.hash('Password1!', 10),
                address: 'Calle falsa 123',
                role: Role.Admin,
                registerDate: date,
            });
            await this.userRepository.save(newUser);
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userRepository.find();
            if(users.length === 0) throw new NotFoundException("No users found");
            return users
        } catch (error) {
            if(error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException()
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const userFound = await this.userRepository.findOne({ where : { id: id }, relations: { appointments: true }});
            if(!userFound) {
                throw new NotFoundException('User not found');
            }
            return userFound;
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        try {
            const userFound = await this.userRepository.findOne({ where : { id: id }, relations: { appointments: true }});
            if(!userFound) {
                throw new NotFoundException('User not found');
            }
            if(data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            const updatedUser = this.userRepository.merge(userFound, data);
            return await this.userRepository.save(updatedUser);
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async deleteUser(id: string) : Promise<{message: string, user: User}> {
        try {
            const userFound = await this.userRepository.findOne({ where : { id: id }, relations: { appointments: true }});
            if(!userFound) {
                throw new NotFoundException('User not found');
            }
            if(userFound.status === Status.Inactive) {
                userFound.status = Status.Active;
            } else {
                userFound.status = Status.Inactive;
            }
            await this.userRepository.save(userFound);
            return {message:'User status updated successfully', user: userFound};
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateImage(id: string, url: string) {
        const userFound = await this.userRepository.findOne({ where : { id: id }, relations: { appointments: true }});
        if(!userFound) {
            throw new NotFoundException('User not found');
        }
        userFound.image = url;
        return await this.userRepository.save(userFound);
    }
}