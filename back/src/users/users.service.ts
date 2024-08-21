import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import * as bcrypt from 'bcryptjs';
import { Status } from "src/enum/status.enum";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

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

    async deleteUser(id: string): Promise<string> {
        try {
            const userFound = await this.userRepository.findOne({ where : { id: id }, relations: { appointments: true }});
            if(!userFound) {
                throw new NotFoundException('User not found');
            }
            userFound.status = Status.Inactive;
            await this.userRepository.save(userFound);
            return 'User deleted successfully';
        } catch (error) {
            if(error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}