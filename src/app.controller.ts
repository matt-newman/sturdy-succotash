import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Delivery } from './types';
import { CustomerDetails } from './customer/customer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/:id') // TODO: different controller or routing for larger app
  getCustomer(@Param('id') id: string): CustomerDetails {
    // console.log(params.id);
    return this.appService.getCustomer(id);
  }

  @Get('comms/your-next-delivery/:id') // TODO: different controller or routing for larger app
  getNextDelivery(@Param('id') id: string): Delivery {
    // console.log(params.id);
    return this.appService.getNextDelivery(id);
  }
}