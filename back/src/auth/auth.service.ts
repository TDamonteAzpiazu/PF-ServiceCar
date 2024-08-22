import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/users.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async signIn(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Email o contraseña incorrectos');
        }

        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: [user.role],  // Utiliza el campo `role` directamente
        };

        const token = this.jwtService.sign(userPayload);

        return { success: 'Autenticación exitosa', token };
    }

    async signUp(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { name, email, password, address, image, role } = createUserDto;

        const existingUser = await this.usersRepository.findOne({ where: { email } });

        if (existingUser) {
            throw new Error("El usuario con este correo electrónico ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            address,
            image,
            role,
            status: 'Active',  // El status inicial es 'Active'
        });

        const savedUser = await this.usersRepository.save(user);
        
        const { password: _, ...result } = savedUser;

        return result;
    }
}
