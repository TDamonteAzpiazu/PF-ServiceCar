import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enum/status.enum';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column({ default: Status.Active })
  status: Status;
}
