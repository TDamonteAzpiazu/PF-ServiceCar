import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { Status } from '../enum/status.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { Appointment } from 'src/appointments/appointments.entity';
import { Sucursal } from '../sucursales/sucursales.entity';
import { Vehiculos } from '../enum/vehiculos.enum';
import { Review } from 'src/reviews/reviews.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @Column()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({default: 'https://res.cloudinary.com/dc8tneepi/image/upload/v1719586450/nnpuge2eky9kzbswxmbk.png'})
  @IsString()
  @IsNotEmpty()
  image: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @Column({ default: Status.Active })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @Column()
  @IsEnum(Vehiculos)
  @IsNotEmpty()
  vehiculo: Vehiculos;

  @ManyToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];

  @ManyToMany(() => Sucursal, (sucursal) => sucursal.services)
  @JoinTable()
  sucursales: Sucursal[];

  @OneToMany(() => Review, (review) => review.service)
  reviews: Review[];
}
