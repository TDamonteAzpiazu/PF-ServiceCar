import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/users.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async signIn(email:string,password:string) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Email or password incorrect');
        }

        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: [user.isAdmin ? Role.Admin : Role.User],
        };

        const token = this.jwtService.sign(userPayload);

        return { success: 'Authentication successful', token };
    }

    async signUp(createUserDto: CreateUserDto): Promise<Omit<User, 'password' | 'isAdmin'>> {
        const { name, date, email, password, phone, country, address, city } = createUserDto;

        const existingUser = await this.usersRepository.findOne({
            where: { email },
        });

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            name,
            date,
            email,
            password: hashedPassword,
            phone,
            country,
            address,
            city,
        });

        const savedUser = await this.usersRepository.save(user);
        
        // Excluir los campos password e isAdmin del objeto resultante
        const { password: _, isAdmin: __, ...result } = savedUser;

        return result;
    }
}
