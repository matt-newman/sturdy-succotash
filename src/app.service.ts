import { Injectable } from '@nestjs/common';
import { calculatePrice, pluralise } from './app.utils';
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

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface Delivery {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

const customerShell: Customer = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  cats: [],
};

const emptyDelivery = {
  title: "",
  message: "",
  totalPrice: -1,
  freeGift: false,
};

@Injectable()
export class AppService {
  getCustomer(userId: string): Customer {
    let user = data.find(({ id }) => id === userId);

    if (!user) {
      console.error('user not found', { userId });
      user = customerShell;
    }

    return user;
  }

  getNextDelivery(userId: string): Delivery {
    let delivery = emptyDelivery;
    const user = this.getCustomer(userId);

    if (!user?.firstName || user?.cats?.length === 0) {
      // something went wrong, return early, could log error
      return delivery;
    }

    const catsWithSubscription = user.cats?.filter(cat => { 
      return cat.subscriptionActive === true;
    });

    // TODO: handle the case of a user with no active cats?

    // Note: the following could combinded be a reduce to lower the amount of looping, but I feel this has better readablity
    const catNames = pluralise(catsWithSubscription.map(cat => cat.name));
    const totalPrice = calculatePrice(catsWithSubscription.map(cat => cat.pouchSize));
    const eligableForGift = totalPrice > 120; // could move this to pricing as by its current mechanism it directly relates

    delivery.title = `Your next delivery for ${catNames}`;
    delivery.message = `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`;
    delivery.totalPrice = totalPrice;
    delivery.freeGift = eligableForGift;

    // console.log({ user, delivery });1

    return delivery;
  }
}
