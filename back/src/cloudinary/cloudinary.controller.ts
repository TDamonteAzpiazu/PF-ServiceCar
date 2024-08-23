import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { UsersService } from "src/users/users.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('cloudinary')
export class CloudinaryController {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly usersService: UsersService
    ) {}

    @Post('userImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadUserImage(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000000,
                        message: 'El archivo es demasiado pesado'
                    }),
                    new FileTypeValidator({ fileType: /.(jpg|jpeg|png|gif|webp|avif)$/ }),
                ]
            })
        )
        file: Express.Multer.File
    ) {
        await this.usersService.getUserById(id);
        const image = await this.cloudinaryService.uploadImage(file);
        return await this.usersService.updateImage(id, image.url);
    }
}