import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { UsersService } from "src/users/users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ServicesService } from "../services/services.service";

@ApiTags('cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly usersService: UsersService,
        private readonly servicesService: ServicesService
    ) {}

    @Post('userImage/:id')
    @ApiOperation({ summary: 'subir una imagen asociado a un id de usuario' })
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

    @Post('serviceImage/:id')
    @ApiOperation({ summary: 'subir una imagen asociado a un id de usuario' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadServiceImage(
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
        await this.servicesService.getServiceById(id);
        const image = await this.cloudinaryService.uploadImage(file);
        return await this.servicesService.updateImage(id, image.url);
    }
}