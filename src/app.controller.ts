import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DocGetHello } from './docs/app/app.doc';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @DocGetHello()
  getHello(): string {
    return this.appService.getHello();
  }
}
