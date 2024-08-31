import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Match } from "../custom-decorators/match.decorator";
import { Role } from "src/auth/roles.enum";
import { Status } from "src/enum/status.enum";

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

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
  @MaxLength(80)
  @Match('password', { message: 'Las contraseñas no coinciden' })
  repeatPassword: string;

  @ApiProperty({ example: '123 Main St', description: 'The address of the user' })
  @MinLength(3)
  @MaxLength(80)
  address: string;
  
}
