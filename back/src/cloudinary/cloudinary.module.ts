import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [CloudinaryController],
    providers: [CloudinaryConfig, UsersService, CloudinaryService],
})

export class CloudinaryModule {}