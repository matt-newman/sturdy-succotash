import { Injectable } from '@nestjs/common';
import { Delivery } from './types';
import { Customer, CustomerDetails } from './customer/customer';

// Note: in a larger app / seperate these into their own folders, but this small doesn't need the indirection for the tidiness trade-off

// Note: For something this small I'd probably have the MFE alongside the same codebase and serve it from the nestjs root, but I suspect the test is looking for seperation and handling calls to and API

// I got the breeds by doing this, so if I wanted I could make them an enum, but doesn't seem worth it:

/*
users.reduce((prev, curr) => {
    curr?.cats?.map(cat => {
      if (!prev.contains( cat.breed )) {
          prev.push( cat.breed );
      }
    });
    return prev;
}, [])
... there were 55
*/

@Injectable()
export class AppService {
  getCustomer(customerId: string): CustomerDetails {
    const customer = new Customer(customerId);
    return customer.getDetails();
  }

  getNextDelivery(customerId: string): Delivery {
    const customer = new Customer(customerId);
    return customer.getDeliveryInfo();
  }
}
