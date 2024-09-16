import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  occupation?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(400)
  comment: string;

  @IsUUID()
  @IsNotEmpty()
  idService: string;
}
