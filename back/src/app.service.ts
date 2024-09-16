import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments/appointments.entity';
import { Pago } from './enum/pago.enum';
import { Status } from './enum/status.enum';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('*/30 * * * *')
  async handleAppointmentCron() {
    const appointments = await this.appointmentsRepository.find({
      where: {
        status: Status.Active,
      },
      relations: ['user', 'service', 'sucursal'],
    });

    const now = new Date();

    for await (const appointment of appointments) {
      const scheduledTime = new Date(
        `${appointment.date.toISOString().slice(0, 10)} ${appointment.time}`,
      );

      const hoursDiff =
        (scheduledTime.valueOf() - now.valueOf()) / (1000 * 60 * 60);

      if (hoursDiff < 0.25) {
        appointment.status = Status.Inactive;
        await this.appointmentsRepository.save(appointment);
      }

      if (
        appointment.pago === Pago.Pendiente &&
        ((hoursDiff < 24.25 && hoursDiff > 23.75) ||
          (hoursDiff < 48.25 && hoursDiff > 47.75))
      ) {
        await this.mailService.sendPaymentReminderEmail(appointment);
      }
    }
  }
}
