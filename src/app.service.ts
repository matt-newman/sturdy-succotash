import { Injectable } from '@nestjs/common';
import * as data from '../data.json'; // could abstract this to be storage class, easier to mock

// const userShape = {
//   "title": "Your next delivery for <cat names, separated by comma or 'and'>",
//   "message": "Hey <firstName>! In two days' time, we'll be charging you for your next order for <cat names, formatted as described below>'s fresh food.",
//   "totalPrice": <total price, calculated via the formula shown in a later section in this README>,
//   "freeGift": <true if the total price exceeds 120 pounds, otherwise false>
// }

// {
//   "id": "618f4ed6-1c5b-4993-a149-f64700bf31dd",
//   "firstName": "Cordell",
//   "lastName": "Koepp-Torphy",
//   "email": "Cordell.Koepp-Torphy23@hotmail.com",
//   "cats": [
//     {
//       "name": "Betsy",
//       "subscriptionActive": true,
//       "breed": "Savannah",
//       "pouchSize": "E"
//     }
//   ]
// },

// {
//   "message": "Welcome to KatKin, <full-name>! We're super excited for <cat1> and <cat2> to join the KatKin club and start loving fresh!"
// }

// TODO: in a larger app / seperate these into their own folders, but this small doesn't need the indirection for the tidiness trade-off

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

did the same for pouchSize, found its A-F
*/

type Cat = {
  name: string,
  subscriptionActive: boolean,
  breed: string,
  pouchSize: string,
}

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  cats: Array<Cat>,
};

const emptyUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  cats: [],
};

export type Delivery = {
  title: string,
  message: string,
  totalPrice: number,
  freeGift: boolean,
};

const emptyDelivery = {
  title: "",
  message: "",
  totalPrice: -1,
  freeGift: false,
};

const pluralise = ( terms: Array<string>, seperator:string = ", ", concatTerm:string = " and " ): string => {
  let output = "";
  const last = terms.pop() as string;

  if (terms.length === 0) {
    return last;
  }

  output = terms.join(seperator);
  output = output + `${concatTerm}${last}`

  return output;
}

const pluraliseCats = ( cat: Array<Cat> ): string => {
  return "";
}

@Injectable()
export class AppService {
  getUser(userId: string): User {
    let user = data.find(({ id }) => id === userId);

    if (!user) {
      console.log('user not found', { userId, data });
      user = emptyUser;
    }

    return user;
  }

  getNextDelivery(userId: string): Delivery {
    let delivery = emptyDelivery;
    const user = this.getUser(userId);
  
    const temp = pluralise(['a', 'c']);

    console.log( {temp} );

    return delivery;
  }
}
