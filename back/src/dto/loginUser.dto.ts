import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()    
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'The password of the user' })
  @IsNotEmpty()
  password: string;
}
