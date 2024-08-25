import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../custom-decorators/roles.decorator";
import { Role } from "../auth/roles.enum";
import { AuthGuard } from "../auth/auth.guard"
import { User } from "./users.entity";
import { CreateUserDto } from "../dto/create-user.dto"
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getAllUsers(){
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return await this.userService.getUserById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() data: Partial<CreateUserDto>): Promise<User> {
        return await this.userService.updateUser(id, data);
    }

    @Put('delete/:id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<{message: string, user: User}> {
        return await this.userService.deleteUser(id);
    }
}
