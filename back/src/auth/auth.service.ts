import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/users.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { Role } from "./roles.enum";
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

@Injectable()
export class AuthService {
    private readonly auth0BaseUrl = process.env.AUTH0_BASE_URL;
    private readonly auth0ClientId = process.env.AUTH0_CLIENT_ID;
    private readonly auth0Audience = process.env.AUTH0_AUDIENCE;
    private readonly auth0Secret = process.env.AUTH0_SECRET;

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
            roles: [user.role],
        };

        const token = this.jwtService.sign(userPayload, {secret: process.env.JWT_SECRET});

        return { success: 'Autenticación exitosa', token };
    }

    async signUp(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { name, email, password, address } = createUserDto;

        const existingUser = await this.usersRepository.findOne({ where: { email } });

        if (existingUser) {
            throw new Error("El usuario con este correo electrónico ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            address
        });

        const savedUser = await this.usersRepository.save(user);
        
        const { password: _, ...result } = savedUser;

        return result;
    }

    async validateAuth0Token(idToken: string): Promise<any> {
        try {
            
            const decoded = jwt.verify(idToken, this.auth0Secret, {
                algorithms: ['RS256'],
                audience: this.auth0Audience,
                issuer: `${this.auth0BaseUrl}/`
            });
            return decoded;
        } catch (error) {
            throw new BadRequestException('Token inválido');
        }
    }

    async getAuth0UserInfo(accessToken: string): Promise<any> {
        try {
            const response = await axios.get(`${this.auth0BaseUrl}/userinfo`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new BadRequestException('No se pudo obtener la información del usuario de Auth0');
        }
    }
}