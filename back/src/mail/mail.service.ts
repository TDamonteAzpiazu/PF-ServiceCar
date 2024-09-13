import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Appointment } from 'src/appointments/appointments.entity';
import { email } from 'src/config/envs';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: email.user,
        pass: email.pass,
      },
    });
  }

  async sendWelcomeMail(userEmail: string, userName: string): Promise<void> {
    const subject = '¡Bienvenido a Servicejs!';
    const text = `Hola ${userName},\n\n` +
                  `¡Bienvenido a Servicejs! Nos complace informarte que ya puedes reservar un turno en cualquier sucursal para realizar tu servicio contratado.\n\n` +
                  `Gracias por confiar en nosotros.\n\n` +
                  `Saludos,\nEl equipo de Servicejs`;

    await this.transporter.sendMail({
      from: email.user, // Dirección del remitente
      to: userEmail, // Dirección del destinatario
      subject, // Asunto del correo
      text, // Cuerpo del correo
    });
  }

  async sendPaymentReminderEmail(appointment: Appointment): Promise<void> {
    await this.transporter.sendMail({
      from: email.user,
      to: appointment.user.email,
      subject: 'Pago pendiente',
      html: `
        <h3>Hola, ${appointment.user.name}</h3>

        <p>Tienes un pago pendiente para tu reserva el día ${appointment.date.toISOString().slice(0, 10)} a las ${appointment.time}</p>
        
        <b>Servicios:</b>
        <ul>
          ${appointment.service.reduce((res, s) => res + `<li>${s.type}: ${s.description}</li>`, '')}
        </ul>

        <p><b>Sucursal: </b>${appointment.sucursal.name}</p>
        <p>
          Haz click <a href="http://localhost:3000/account/reservations">aqui</a> para realizar el pago
        </p>

        <p>
          Saludos,<br/>
          El equipo de Servicejs
        </p>
      `,
    });
  }
}
