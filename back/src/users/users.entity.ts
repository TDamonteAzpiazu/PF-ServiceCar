import { Appointment } from "src/appointments/appointments.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column()
    address: string;

    @Column({ default: 'default-image-url' }) // URL predeterminada para la imagen
    image: string;

    @Column()
    role: string; // Asumiendo que los valores del enum serán manejados como strings

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @Column()
    status: string; // Asumiendo que los valores del enum serán manejados como strings
}
