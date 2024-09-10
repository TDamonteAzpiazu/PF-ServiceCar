import { Body, Controller, Post, BadRequestException, UsePipes, ValidationPipe, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../dto/loginUser.dto"; 
import { CreateUserDto } from "../dto/create-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MailService } from "../mail/mail.service"; 

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService // Inyecta el servicio de correos
    ) {}

    @Post("signin")
    @ApiOperation({ summary: 'loguear usuario' })
    @UsePipes(new ValidationPipe())
    async signIn(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials;

        try {
            const response = await this.authService.signIn(email, password);
            return response;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @HttpCode(201)
    @Post("signup")
    @ApiOperation({ summary: 'crear usuario' })
    async createUser(@Body() user: CreateUserDto) {
        try {
            const createdUser = await this.authService.signUp(user);
            
            // Enviar correo de bienvenida
            await this.mailService.sendWelcomeMail(user.email, user.name);

            return createdUser;
        } catch (error) {
            return { message: error.message };
        }
    }

    @Post("authGoogle")
    @ApiOperation({ summary: 'auth con google' })
    @UsePipes(new ValidationPipe())
    async signUpGoogle(@Body() body: { name: string, email: string }) {
        const { name, email } = body;

        try {
            const response = await this.authService.signUpGoogle(name, email);
            
            // Enviar correo de bienvenida
            await this.mailService.sendWelcomeMail(email, name);

            return response;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
