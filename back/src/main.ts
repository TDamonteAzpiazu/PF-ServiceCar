import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from "./config/auth0.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ServiceCar')
    .setDescription('Este es un proyecto para el último módulo de Henry, consiste de una web de contratación de servicios para autos.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
