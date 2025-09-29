import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JoiExceptionFilter } from './common/filters/joi-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const url = 'http://localhost';

  app.useGlobalFilters(new JoiExceptionFilter());

  await app.listen(port);
  console.info(`Server is running on ${url}:${port}`);
}
bootstrap();
