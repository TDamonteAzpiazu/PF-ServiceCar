import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Status } from "../enum/status.enum";
import { Service } from "../services/services.entity";
import { User } from "../users/users.entity";

@Entity({ name: 'appointments' })
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;

    @ManyToMany(() => Service, (service) => service.appointments, { cascade: true })
    @JoinTable()
    service: Service[];

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column({ default: Status.Active })
    status: Status;
}
