import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../../.env.development') });

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
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
      from: process.env.EMAIL_USER, // Dirección del remitente
      to: userEmail, // Dirección del destinatario
      subject, // Asunto del correo
      text, // Cuerpo del correo
    });
  }
}
