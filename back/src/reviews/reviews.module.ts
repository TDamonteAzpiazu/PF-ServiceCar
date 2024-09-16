import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { User } from 'src/users/users.entity';
import { Service } from 'src/services/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Service])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
