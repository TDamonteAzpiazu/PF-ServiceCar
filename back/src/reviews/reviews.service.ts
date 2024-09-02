import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getReviews() {
    const reviews = await this.reviewsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return reviews;
  }

  async getReviewById(id: string) {
    const review = await this.reviewsRepository.findOneBy({ id });

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  async postReview({ userId, ...reviewData }) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) throw new BadRequestException('User invalid');

    const review = this.reviewsRepository.create({
      ...reviewData,
      name: user.name,
      iconUrl: user.image,
      createdAt: new Date(),
    });
    await this.reviewsRepository.save(review);

    return review;
  }
}
