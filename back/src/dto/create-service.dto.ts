import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { Status } from '../enum/status.enum';

export class CreateServiceDto {


  @ApiProperty({
    description: 'Tipo de servicio',
    example: 'Cambio de aceite',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Descripción del servicio',
    example: 'Cambio de aceite para motores a gasolina',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Ubicación donde se proporciona el servicio',
    example: 'Madrid, España',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'URL de la imagen del servicio',
    example: 'http://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Precio del servicio',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Estado del servicio',
    enum: Status,
    example: Status.Active,
  })
  @IsEnum(Status)
  status: Status;
}
