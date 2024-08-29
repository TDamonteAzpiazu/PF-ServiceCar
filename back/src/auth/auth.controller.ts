import { Body, Controller, Post, BadRequestException, UsePipes, ValidationPipe, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../dto/loginUser.dto"; 
import { CreateUserDto } from "../dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin")
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

    @Post("signin/auth0")
    async signInWithAuth0(@Body('idToken') idToken: string) {
        try {
            const response = await this.authService.signInWithAuth0(idToken);
            return response;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post("userinfo")
    async getUserInfo(@Body('accessToken') accessToken: string) {
        try {
            const userInfo = await this.authService.getAuth0UserInfo(accessToken);
            return userInfo;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @HttpCode(201)
    @Post("signup")
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user: CreateUserDto) {
        try {
            const createdUser = await this.authService.signUp(user);
            return createdUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
