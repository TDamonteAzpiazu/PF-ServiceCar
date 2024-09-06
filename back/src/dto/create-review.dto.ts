import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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
  @MinLength(20)
  @MaxLength(400)
  comment: string;
}
