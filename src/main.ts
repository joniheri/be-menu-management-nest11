import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JoiExceptionFilter } from './common/filters/joi-exception.filter';
import { setupSwagger } from './docs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const url = 'http://localhost';

  app.useGlobalFilters(new JoiExceptionFilter());
  setupSwagger(app, port, url);

  await app.listen(port);
  console.info(`Server is running on ${url}:${port}`);
}
bootstrap();
