import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.init();

  const modules = app.get(ModulesContainer);
  const metadataScanner = new MetadataScanner();

  const routes: any[] = [];

  modules.forEach((moduleRef) => {
    [...moduleRef.controllers.values()].forEach((wrapper) => {
      const { instance } = wrapper;
      if (!instance) return;

      const controllerPath = Reflect.getMetadata(
        PATH_METADATA,
        instance.constructor,
      );

      metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodKey: string) => {
          const routePath = Reflect.getMetadata(
            PATH_METADATA,
            instance[methodKey],
          );
          const requestMethod = Reflect.getMetadata(
            METHOD_METADATA,
            instance[methodKey],
          );

          if (routePath && requestMethod !== undefined) {
            routes.push({
              method: requestMethod,
              path: `/${controllerPath}/${routePath}`.replace(/\/+/g, '/'),
            });
          }
        },
      );
    });
  });

  console.table(routes);

  await app.close();
}

bootstrap();
