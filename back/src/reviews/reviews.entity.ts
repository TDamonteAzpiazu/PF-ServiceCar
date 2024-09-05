import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'reviews',
})
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('integer')
  rating: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
    default: 'Sin especificar',
  })
  occupation: string;

  @Column({
    length: 400,
  })
  comment: string;

  @Column()
  iconUrl: string;

  @Column('timestamp')
  createdAt: Date;
}
