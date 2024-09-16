import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateReviewDto } from 'src/dto/create-review.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async get() {
    return this.reviewsService.getReviews();
  }

  @Get('user/:id')
  async getByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.getReviewsByUser(id);
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.getReviewById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async post(@Body() body: CreateReviewDto, @Req() request) {
    const { rating, occupation, comment, idService } = body;
    console.log(request.user);
    return this.reviewsService.postReview({
      rating,
      occupation,
      comment,
      idService,
      userId: request.user.id,
    });
  }
}
