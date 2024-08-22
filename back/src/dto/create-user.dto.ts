import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsNumberString, IsEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Match } from "../custom-decorators/match.decorator";

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  
  @IsString()
  date: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'The password of the user' })
  @MinLength(8)
  @MaxLength(80)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{3,80}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;

  @ApiProperty({ example: 'Password123!', description: 'Repeat password for confirmation' })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Match('password', { message: 'Las contraseñas no coinciden' })
  repeatPassword: string;

  @ApiProperty({ example: 1234567890, description: 'The phone number of the user' })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  @IsNumber({}, { message: 'El número de teléfono debe ser un número válido' })
  phone: number;

  @ApiProperty({ example: 'USA', description: 'The country of the user' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: '123 Main St', description: 'The address of the user' })
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({ example: 'New York', description: 'The city of the user' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  city: string;

 
  @IsEmpty()
  isAdmin: boolean;
}
