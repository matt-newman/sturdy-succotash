import { Injectable } from '@nestjs/common';
import { calculatePrice, pluralise } from './app.utils';
import { Cat, Customer, Delivery } from './types';

import * as data from '../data.json'; // could abstract this to be storage class, easier to mock

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
const FREE_GIFT_PRICE_POINT = 120; // could make this an ENV var

const customerShell: Customer = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  cats: [],
};

const emptyDelivery: Delivery = {
  title: "",
  message: "",
  totalPrice: -1,
  freeGift: false,
};

interface deliveryArgs {
  cats: Array<Cat>;
  title: string;
}

const createDeliveryPayload = ({ cats, title }: deliveryArgs ): Delivery => {
  // TODO: handle the case of a user with no active cats?
  // Note: the following could combinded be a reduce to lower the amount of looping, but I feel this has better readablity
  const catsWithSubscription = cats?.filter(cat => {
    return cat.subscriptionActive === true;
  });

  const catNames = pluralise(catsWithSubscription.map(cat => cat.name));
  const totalPrice = calculatePrice(catsWithSubscription.map(cat => cat.pouchSize));
  const freeGift = totalPrice > FREE_GIFT_PRICE_POINT; // could move this to pricing as by its current mechanism it directly relates

  const delivery = {
    title: `Your next delivery for ${catNames}`,
    message: `Hey ${title}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
    totalPrice: totalPrice,
    freeGift: freeGift,
  }

  return delivery;
}

@Injectable()
export class AppService {
  getCustomer(customerId: string): Customer {
    let customer = data.find(({ id }) => id === customerId);

    if (!customer) {
      console.error('customer not found', { customerId });
      customer = customerShell;
    }

    return customer;
  }

  getNextDelivery(customerId: string): Delivery {
    let delivery = emptyDelivery;
    const user = this.getCustomer(customerId);

    if (!user?.firstName || user?.cats?.length === 0) {
      // something went wrong, return early, could log error
      return delivery;
    }

    delivery = createDeliveryPayload({ cats: user.cats, title: user.firstName });

    // console.log({ user, delivery });1

    return delivery;
  }
}
