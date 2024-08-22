import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { requiresAuth } from "express-openid-connect";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth).forRoutes("users/auth0/protected")}
    }
 