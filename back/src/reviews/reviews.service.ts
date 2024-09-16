import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Service } from 'src/services/services.entity';
import { Status } from '../enum/status.enum';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getReviews() {
    const reviews = await this.reviewsRepository.find({
      relations: ['service', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });

    return reviews;
  }

  async getReviewById(id: string) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['service', 'user'],
    });

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  async postReview({ userId, idService, ...reviewData }) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const service = await this.servicesRepository.findOneBy({ id: idService });
    
    if (!user) throw new BadRequestException('User invalid');
    if (!service) throw new BadRequestException('Service invalid');

    const review = this.reviewsRepository.create({
      ...reviewData,
      user,
      createdAt: new Date(),
      service,
    });
    await this.reviewsRepository.save(review);

    return review;
  }

  async getReviewsByUser(userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');
    const reviews = await this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['service', 'user'],
    });

    if (!reviews) throw new NotFoundException('User has no reviews.');
    return reviews;
  }

  async disableReview(id: string) {
    const review = await this.reviewsRepository.findOne({ where: { id } , relations: ['service', 'user']});
    if (!review) throw new NotFoundException('Review not found');
    
    if(review.status === Status.Inactive) {
      review.status = Status.Active;
    } else {
      review.status = Status.Inactive;
    }
    await this.reviewsRepository.save(review);
    return review;
  }
}
