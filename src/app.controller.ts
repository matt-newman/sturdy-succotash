import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('comms/welcome-fresh/:id') // TODO: different controller or routing for larger app
  getUser(@Param() params: any): string {
    console.log(params.id);
    return this.appService.getUser(params.id);
  }
}