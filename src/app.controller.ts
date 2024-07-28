import { Controller, Get, Param } from '@nestjs/common';
import { AppService, Delivery, User } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/:id') // TODO: different controller or routing for larger app
  getUser(@Param('id') id: string): User {
    // console.log(params.id);
    return this.appService.getUser(id);
  }

  @Get('comms/your-next-delivery/:id') // TODO: different controller or routing for larger app
  getNextDelivery(@Param('id') id: string): Delivery {
    // console.log(params.id);
    return this.appService.getNextDelivery(id);
  }
}