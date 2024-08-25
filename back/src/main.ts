import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de CORS
  app.enableCors();

    // Configuración global del ValidationPipe con transformación
    app.useGlobalPipes(new ValidationPipe({
      transform: true,  // Habilita la transformación automática
      whitelist: true,  // Elimina propiedades no especificadas en el DTO
      forbidNonWhitelisted: true,  // Lanza un error si hay propiedades no especificadas en el DTO
    }));
  // Configura el middleware Auth0
  app.use(auth(auth0Config));

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ServiceCar')
    .setDescription('Este es un proyecto para el último módulo de Henry, consiste en una web de contratación de servicios para autos.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
