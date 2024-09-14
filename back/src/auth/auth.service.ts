import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/users.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';
import { auth0, jwtSecret } from 'src/config/envs';

@Injectable()
export class AuthService {
    private readonly auth0BaseUrl = auth0.baseUrl;
    private readonly auth0ClientId = auth0.clientId;
    private readonly auth0Audience = auth0.audience;
    private readonly auth0Secret = auth0.secret;

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

        const token = this.jwtService.sign(userPayload, {secret: jwtSecret});

        return { success: 'Autenticación exitosa', token };
    }

    async signUp(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { name, email, password, address } = createUserDto;

        const existingUser = await this.usersRepository.findOne({ where: { email } });

        if (existingUser) {
            throw new Error("El usuario con este correo electrónico ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const date = new Date();

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            address,
            registerDate: date
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



    async signUpGoogle(name: string, email: string): Promise<any> {
        // Buscar si el usuario ya existe en la base de datos por el email
        let userGoogle = await this.usersRepository.findOne({ where: { email } });

        if (!userGoogle) {
            // Si el usuario no existe, creamos un nuevo usuario
            const passwordDefault = "Nearvet@" + Math.floor(1000 + Math.random() * 9000).toString();
            const hashedPassword = await bcrypt.hash(passwordDefault, 10);
            const date = new Date();

            userGoogle = this.usersRepository.create({
                name,
                email,
                password: hashedPassword, // Guardamos la contraseña encriptada
                registerDate: date
            });

            // Guardar el nuevo usuario en la base de datos
            await this.usersRepository.save(userGoogle);
        }

        // Crear el payload para el token JWT
        const payload = { id: userGoogle.id, email: userGoogle.email };
        const jwtToken = this.jwtService.sign(payload, {secret: jwtSecret}); // Generar el token JWT

        // Retornar el usuario junto con el token
        return {
            user: userGoogle,
            token: jwtToken,
        };
    }

}