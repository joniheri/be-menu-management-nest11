import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
  port: number | string,
  url: string,
) {
  if (process.env.NODE_ENV !== 'development') return; // --- Ensure Swagger is only set up in development

  const config = new DocumentBuilder()
    .setTitle('API Documentation for Menu Management')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  console.info(`Swagger documentation is available at ${url}:${port}/swagger`);
}
