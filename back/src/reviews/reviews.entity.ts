import { Service } from 'src/services/services.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../users/users.entity';
import { Status } from '../enum/status.enum';

@Entity({
  name: 'reviews',
})
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('integer')
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column({
    length: 50,
    default: 'Sin especificar',
  })
  occupation: string;

  @Column({
    length: 400,
  })
  comment: string;

  @Column('timestamp')
  createdAt: Date;

  @ManyToOne(() => Service, (service) => service.reviews)
  @JoinColumn({ name: 'idService' })
  service: Service;

  @Column({ default: Status.Active})
  status: Status;
}
